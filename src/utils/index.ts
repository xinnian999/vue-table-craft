export { default as getDataByPath } from './getDataByPath'
export { default as deepParse } from './deepParse'
export { default as request } from './request'

export const timeParse = (obj = new Date(), format = 'YYYY-MM-DD HH:mm:ss') => {
  obj = new Date(obj)
  const year = obj.getFullYear()
  const mon = obj.getMonth() + 1 < 10 ? '0' + (obj.getMonth() + 1) : obj.getMonth() + 1
  const day = obj.getDate() < 10 ? '0' + obj.getDate() : obj.getDate()
  const hour = obj.getHours() < 10 ? '0' + obj.getHours() : obj.getHours()
  const min = obj.getMinutes() < 10 ? '0' + obj.getMinutes() : obj.getMinutes()
  const second = obj.getSeconds() < 10 ? '0' + obj.getSeconds() : obj.getSeconds()

  format = format
    .replace('YYYY', year + '')
    .replace('MM', mon + '')
    .replace('DD', day + '')
    .replace('HH', hour + '')
    .replace('mm', min + '')
    .replace('ss', second + '')

  return format
}
