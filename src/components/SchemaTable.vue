<template>
  <el-table v-loading="loading" :data="data" style="width: 100%">
    <el-table-column
      v-for="{ label, prop, width, fixed } in schema.columns"
      :key="prop"
      :prop="prop"
      :label="label"
      :width="width"
      :fixed="fixed"
    />
  </el-table>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import type { schemaType } from '@/release/types'
import { getDataByPath } from '@/utils'

const props = defineProps<{
  schema: schemaType
}>()

const data = ref<any[]>([])

const loading = ref(false)

const fetchData = async () => {
  const { remoteConfig } = props.schema

  if (!remoteConfig) return

  const { api, dataPath } = remoteConfig

  loading.value = true

  const res = await axios(api)

  loading.value = false

  const newData = getDataByPath(res, dataPath)

  if (Array.isArray(newData)) {
    data.value = newData
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
</script>
