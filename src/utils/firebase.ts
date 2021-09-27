/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterUserDTO } from './../constants/dto/myUser.dto'
import { FilterSubjectDTO } from './../constants/dto/subjects.dto'
import { FilterLectureDTO } from './../constants/dto/lecture.dto'
import firebase from 'firebase/app'
import { firestore } from '../config/firebase'

type FilterDTO = FilterLectureDTO | FilterSubjectDTO | FilterUserDTO

function filterTransfer(
  collection: string,
  filter: FilterDTO,
): firebase.firestore.Query<firebase.firestore.DocumentData> {
  let setFilter: firebase.firestore.Query<firebase.firestore.DocumentData> =
    firestore.collection(collection)

  Object.entries(filter).forEach(([key, value]) => {
    if (!Array.isArray(value)) {
      setFilter = setFilter.where(key, '==', value)
    } else {
      setFilter = setFilter.where(key, value[0], value[1])
    }
  })
  return setFilter
}

const getUserFromIndexDB = async () => {
  return new Promise(resolve => {
    const asyncForEach = (array: any, callback: any, done: any) => {
      const runAndWait = (i: any) => {
        if (i === array.length) return done()
        return callback(array[i], () => runAndWait(i + 1))
      }
      return runAndWait(0)
    }
    const dump = {} as any
    const dbRequest = window.indexedDB.open('firebaseLocalStorageDb')
    dbRequest.onsuccess = () => {
      const db = dbRequest.result
      const stores = ['firebaseLocalStorage']

      const tx = db.transaction(stores)
      asyncForEach(
        stores,
        (store: any, next: any) => {
          const req = tx.objectStore(store).getAll()
          req.onsuccess = () => {
            dump[store] = req.result
            next()
          }
        },
        () => {
          resolve(dump)
        },
      )
    }
  })
}
export { filterTransfer, getUserFromIndexDB }
