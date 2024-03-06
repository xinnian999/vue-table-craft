import type { AxiosRequestConfig } from 'axios'

export type anyObject = { [key: string]: any }

export type formatterComponent = {
  component: string
  props?: anyObject
  slots?: anyObject
}

export type colType = {
  label?: string
  prop: string
  width?: number
  fixed?: 'left' | 'right'
  formatter?: string | formatterComponent
}

export type columnsType = colType[]

export type rowActionType = {
  name: string
  event: string
  hidden?: boolean | string
  disabled?: boolean | string
}

export type schemaType = {
  dataMode?: 'static' | 'remote'
  dataSource?: any[]
  columns: columnsType
  remoteConfig?: {
    api: AxiosRequestConfig
    dataPath: string
    totalPath: string
  }
  rowActions?: rowActionType[]
}

export type eventDictType = { [key: string]: (rowData: anyObject) => void }
