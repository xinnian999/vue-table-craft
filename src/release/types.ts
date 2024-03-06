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
  search?: boolean
}

export type columnsType = colType[]

export type ActionType = {
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
  rowActions?: ActionType[]
  batchActions?: ActionType[]
  toolbarActions?: ActionType[]
}

export type eventDictType = { [key: string]: (...args: any[]) => void }
