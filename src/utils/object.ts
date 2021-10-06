import { UploadFile } from 'antd/lib/upload/interface'
import { getFilePath } from '../service/storage'
export interface Json {
  [key: string]: unknown
}

export const removeUndefined = (json: Json): Json => {
  Object.keys(json).forEach(
    key => (json[key] === undefined || json[key] === '') && delete json[key],
  )
  return json
}

export const initPhoto = (urls = [] as string[]): UploadFile[] => {
  return urls.map(url => {
    const path = getFilePath(url).split('/')

    return {
      uid: getFilePath(url),
      name: path.slice(1, path.length).join(' '),
      status: 'done',
      url: url,
    }
  })
}
