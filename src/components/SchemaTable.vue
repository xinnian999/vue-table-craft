<template>
  <div class="grid-table">
    <el-table v-loading="loading" :data="data" height="100%">
      <el-table-column
        v-for="({ label, prop, width, fixed }, index) in schema.columns"
        :key="prop"
        :prop="prop"
        :label="label"
        :width="width"
        :fixed="fixed"
        :formatter="(rowData) => formatterColumn({ rowData, column: schema.columns[index] })"
      />

      <el-table-column fixed="right" :min-width="150" label="操作" v-if="schema.rowActions">
        <template #default="record">
          <el-space style="vertical-align: middle">
            <el-button
              v-for="{ name, disabled, onClick } in formatterRowActions(record).slice(
                0,
                formatterRowActions(record).length === 3 ? 3 : 2
              )"
              :key="name"
              :disabled="disabled"
              size="small"
              type="primary"
              link
              @click="onClick"
              >{{ name }}</el-button
            >

            <el-dropdown v-if="formatterRowActions(record).length > 3" trigger="click">
              <span>
                <el-button size="small" type="primary" link
                  >更多 <el-icon><CaretBottom /></el-icon
                ></el-button>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    :key="name"
                    v-for="{ name, onClick, disabled } in formatterRowActions(record).slice(2)"
                  >
                    <el-button
                      size="small"
                      :key="name"
                      type="primary"
                      link
                      :disabled="disabled"
                      @click="onClick"
                      >{{ name }}</el-button
                    >
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-space>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        v-model:page-size="currentParams.pageSize"
        v-model:currentPage="currentParams.pageNum"
        background
        layout="total, ->, sizes, jumper, prev,pager, next"
        :page-sizes="[5, 10, 20, 50, 100]"
        :total="total"
        :pager-count="5"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { h, onMounted, reactive, ref, watch, resolveComponent, computed } from 'vue'
import axios from 'axios'
import type { schemaType, anyObject, colType, eventDictType } from '@/release/types'
import { getDataByPath, timeParse, deepParse } from '@/utils'
import { isArray, isNumber, isPlainObject, isString, isFunction, mapValues } from 'lodash'

const $utils = {
  timeParse
}

export interface Props {
  schema: schemaType
  eventDict?: eventDictType
}
const props = withDefaults(defineProps<Props>(), {
  eventDict: () => ({})
})

const data = ref<any[]>([])

const loading = ref(false)

const total = ref(0)

const currentParams = reactive({
  pageNum: 1,
  pageSize: 20
})

const fetchData = async () => {
  const { remoteConfig } = props.schema

  if (!remoteConfig) return

  const { api, dataPath, totalPath } = remoteConfig

  const { method = 'GET' } = api

  if (['GET', 'get'].includes(method)) {
    api.params = { ...api.params, ...currentParams }
  }

  if (['POST', 'post'].includes(method)) {
    api.data = { ...api.data, ...currentParams }
  }

  loading.value = true

  const res = await axios(api)

  loading.value = false

  const newData = getDataByPath(res, dataPath)
  const dataTotal = getDataByPath(res, totalPath)

  if (isArray(newData)) {
    data.value = newData
  }

  if (isNumber(dataTotal)) {
    total.value = dataTotal
  }
}

const formatterColumn = ({ rowData, column }: { rowData: anyObject; column: colType }) => {
  const { formatter, prop } = column

  const context = { $val: rowData[prop], $row: rowData, $utils }

  if (!formatter) {
    return rowData[prop]
  }

  if (isString(formatter)) {
    return deepParse(formatter, context)
  }
  if (isPlainObject(formatter)) {
    const componentNode = resolveComponent(formatter.component)
    const parseProps = deepParse(formatter.props, context)
    const parseSlots = mapValues(formatter.slots, (value) => {
      return () => deepParse(value, context)
    })

    return h(componentNode, parseProps, parseSlots)
  }
}

const formatterRowActions = computed(() => {
  const { rowActions = [] } = props.schema

  return (record) =>
    rowActions
      .map((item) => {
        const parseItem = deepParse(item, { $row: record.row })
        //字典找到对应事件函数
        const clickEvent = props.eventDict[item.event]

        if (isFunction(clickEvent)) {
          parseItem.onClick = (e) => clickEvent(record.row, record.$index, e)
        }

        return parseItem
      })
      .filter((item) => !item.hidden)
})

onMounted(() => {
  const { dataMode = 'static', dataSource = [] } = props.schema
  if (dataMode === 'static') {
    data.value = dataSource
  }
  if (dataMode === 'remote') {
    fetchData()
  }
})

watch(currentParams, () => {
  fetchData()
})
</script>

<style scoped>
.grid-table {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  position: relative;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;

  h3 {
    margin-bottom: 0;
  }

  .pagination {
    margin-top: 15px;
    justify-content: right;
  }

  .expandContent {
    padding: 0 20px;
    padding-left: 100px;
    padding-bottom: 20px;
  }

  h2 {
    margin: 0 15px 15px;
  }

  .grid-table-toolbar {
    /* display: flex; */
    margin-bottom: 5px;
    .searchBar {
      display: flex;
    }
    .selected {
      margin-right: 15px;
    }

    .actionBar {
      display: flex;
      justify-content: space-between;
    }

    .toolButton {
      display: flex;
    }

    button {
      height: 100%;
    }
  }

  .cell {
    text-align: center;
  }
}
</style>
