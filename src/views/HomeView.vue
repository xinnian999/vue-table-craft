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
      label: 'ID',
      prop: 'id',
      width: 80,
      fixed: 'left',
      search: true,
      sortable: true
    },
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
      event: 'rowEdit'
    },
    {
      name: '删除',
      event: 'rowDelete',
      disabled: '{{ $row.id%2!==0 }}'
    },
    {
      name: '同步',
      event: 'rowDelete'
    },
    {
      name: '同步',
      event: 'rowDelete',
      disabled: true
    }
  ],
  batchActions: [
    {
      name: '批量删除',
      event: 'batchEdit'
    },
    {
      name: '批量编辑',
      event: 'rowEdit'
    }
  ],
  toolbarActions: [
    {
      name: '新建',
      event: 'batchEdit'
    }
  ]
}

const eventDict: eventDictType = {
  rowEdit: (rowData) => {},
  rowDelete: (rowData) => {
    console.log(rowData)
  },
  batchEdit: (selected) => {
    console.log(selected)
  }
}
</script>
