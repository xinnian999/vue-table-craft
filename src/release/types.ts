import type { AxiosRequestConfig } from 'axios'

export type anyObject = { [key: string]: any }

export type colType = {
  label?: string
  prop: string
  width?: number
  fixed?: 'left' | 'right'
}

export type columnsType = colType[]

export type schemaType = {
  dataMode?: 'static' | 'remote'
  dataSource?: any[]
  columns: columnsType
  remoteConfig?: {
    api: AxiosRequestConfig
    dataPath: string
  }
}
