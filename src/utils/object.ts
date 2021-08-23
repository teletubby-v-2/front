import { UploadFile } from 'antd/lib/upload/interface'
interface Json {
  [key: string]: unknown
}

export const removeUndefined = (json: Json): Json => {
  Object.keys(json).forEach(
    key => (json[key] === undefined || json[key] === '') && delete json[key],
  )
  return json
}

export const initPhoto = (urls = [] as string[]): UploadFile[] => {
  return urls.map(url => ({
    uid: url,
    name: url,
    status: 'done',
    url: url,
  }))
}
