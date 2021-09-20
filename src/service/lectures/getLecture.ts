import firebase from 'firebase'
import { doc } from 'prettier'
import { firestore } from '../../config/firebase'
import { Collection } from '../../constants'
import { LectureDTO } from '../../constants/dto/lecture.dto'
import { MyUserDTO } from '../../constants/dto/myUser.dto'

const lectureCollection = firestore.collection(Collection.Lectures)
const usersCollection = firestore.collection(Collection.Users)

async function getLectures() {
  const data: LectureDTO[] = []
  const lectures = await lectureCollection.orderBy('createAt', 'desc').get()
  lectures.forEach(lecture => data.push({ lectureId: lecture.id, ...lecture.data() } as LectureDTO))
  return data
}

async function getOwnLectures(userId: string) {
  const data: LectureDTO[] = []
  const lectures = await lectureCollection.where('userId', '==', userId).get()
  lectures.forEach(lecture => data.push({ lectureId: lecture.id, ...lecture.data() } as LectureDTO))
  return data
}

async function getLectureDetail(lectureId: string) {
  const bundle = await lectureCollection.doc(lectureId).get()
  const data = {
    ...bundle.data(),
    lectureId: bundle.id,
  } as LectureDTO
  return data
}

async function getBookmarkLectures(bookmark: string[]) {
  const data: LectureDTO[] = []
  const lectures = await lectureCollection
    .where(firebase.firestore.FieldPath.documentId(), 'in', bookmark)
    .get()
  lectures.forEach(lecture => data.push({ lectureId: lecture.id, ...lecture.data() } as LectureDTO))
  return data
}

async function getMySubject(subjectId: string[]) {
  const data: LectureDTO[] = []
  const myLecturs = await lectureCollection.where('subjectId', 'in', subjectId).get()
  myLecturs.forEach(lecture =>
    data.push({ lectureId: lecture.id, ...lecture.data() } as LectureDTO),
  )
  return data
}
export { getLectures, getMySubject, getLectureDetail, getOwnLectures, getBookmarkLectures }
