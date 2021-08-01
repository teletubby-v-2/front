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
    if (Array.isArray(value)) {
      setFilter = setFilter.where(key, '==', value)
    } else {
      setFilter = setFilter.where(key, value[0], value[1])
    }
  })
  return setFilter
}

export { filterTransfer }
