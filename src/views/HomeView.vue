<template>
  <div style="padding: 100px 15%; box-sizing: border-box; height: 100%">
    <SchemaTable :schema="schema" />
  </div>
</template>

<script setup lang="ts">
import SchemaTable from '@/components/SchemaTable.vue'
import type { schemaType } from '@/release/types'

const schema: schemaType = {
  columns: [
    {
      label: '文章标题',
      prop: 'title'
    },
    {
      label: '创建日期',
      prop: 'createTime'
    }
  ],
  // dataMode: 'static',
  // dataSource: [
  //   {
  //     date: '2016-05-03',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles'
  //   },
  //   {
  //     date: '2016-05-02',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles'
  //   },
  //   {
  //     date: '2016-05-04',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles'
  //   },
  //   {
  //     date: '2016-05-01',
  //     name: 'Tom',
  //     address: 'No. 189, Grove St, Los Angeles'
  //   }
  // ],
  dataMode: 'remote',
  remoteConfig: {
    api: {
      url: 'https://hyl999.co/api/current/query/article',
      method: 'GET'
    },
    dataPath: 'data.data'
  }
}
</script>
