<template>
  <div class="grid-table">
    <el-table v-loading="loading" :data="data" style="width: 100%" height="100%">
      <el-table-column
        v-for="{ label, prop, width, fixed } in schema.columns"
        :key="prop"
        :prop="prop"
        :label="label"
        :width="width"
        :fixed="fixed"
      />
    </el-table>
    <div>
      <el-pagination
        class="pagination"
        v-model:page-size="currentParams.pageSize"
        v-model:currentPage="currentParams.pageNum"
        background
        layout="total, ->, sizes, jumper, prev, next"
        :page-sizes="[5, 10, 20, 50, 100]"
        :total="total"
        :pager-count="3"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import axios from 'axios'
import type { schemaType } from '@/release/types'
import { getDataByPath } from '@/utils'

const props = defineProps<{
  schema: schemaType
}>()

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

  const { api, dataPath } = remoteConfig

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

  if (Array.isArray(newData)) {
    data.value = newData
  }

  if (res.data.total) {
    total.value = res.data.total
  }
}

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
