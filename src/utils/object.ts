/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadFile } from 'antd/lib/upload/interface'
import firebase from 'firebase/app'
import { getFilePath } from '../service/storage'

export const removeUndefined = (json: Record<string, any>): Record<string, any> => {
  Object.keys(json).forEach(
    key => (json[key] === undefined || json[key] === '') && delete json[key],
  )
  return json
}

export const removeFieldUndefined = (json: Record<string, any>): Record<string, any> => {
  const cleanValue: Record<string, any> = {}
  Object.keys(json).forEach(key => {
    if (json[key] === undefined || json[key] === '')
      cleanValue[key] = firebase.firestore.FieldValue.delete
    else cleanValue[key] = json[key]
  })
  return cleanValue
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
