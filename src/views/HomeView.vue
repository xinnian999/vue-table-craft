<template>
  <div style="padding: 100px 15%; box-sizing: border-box; height: 100%">
    <SchemaTable :schema="schema" :event-dict="eventDict" />
  </div>
</template>

<script setup lang="ts">
import SchemaTable from '@/components/SchemaTable.vue'
import type { schemaType, eventDictType } from '@/release/types'

const schema: schemaType = {
  columns: [
    {
      label: '文章标题',
      prop: 'title',
      width: 200,
      fixed: 'left',
      search: true
    },
    {
      label: '描述',
      width: 150,
      prop: 'introduce'
    },
    {
      label: '文章分类',
      prop: 'category',
      width: 150,
      formatter: {
        component: 'el-tag',
        slots: { default: '{{ $val }}' }
      }
    },
    {
      label: '评论数',
      prop: 'comments'
    },
    {
      label: '阅读数',
      prop: 'visits'
    },
    {
      label: '创建日期',
      prop: 'createTime',
      width: 150,
      formatter: '{{ $utils.timeParse($val) }}'
    },
    {
      label: '更新日期',
      prop: 'updateTime',
      width: 150,
      formatter: '{{ $utils.timeParse($val) }}'
    }
  ],
  dataMode: 'remote',
  remoteConfig: {
    api: {
      url: 'https://hyl999.co/api/current/query/article',
      method: 'GET'
    },
    dataPath: 'data.data',
    totalPath: 'data.total'
  },
  rowActions: [
    {
      name: '编辑',
      event: 'rowEdit',
      hidden: '{{ $row.id%2===0 }}'
    },
    {
      name: '删除',
      event: 'rowDelete',
      disabled: '{{ $row.id%2!==0 }}'
    },
    {
      name: '同步',
      event: 'rowDelete'
    }
  ]
}

const eventDict: eventDictType = {
  rowEdit: (rowData, index, e) => {
    console.log(index)
  },
  rowDelete: (rowData) => {
    console.log(rowData)
  }
}
</script>
