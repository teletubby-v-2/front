import { UserSubjectDTO } from './../../constants/dto/myUser.dto'
import firebase from 'firebase'
import { firestore } from '../../config/firebase'
import { Collection } from '../../constants'
import { LectureDTO } from '../../constants/dto/lecture.dto'

const lectureCollection = firestore.collection(Collection.Lectures)

async function getLectures() {
  const data: LectureDTO[] = []
  const lectures = await lectureCollection.orderBy('createAt', 'desc').get()
  lectures.forEach(lecture => data.push({ lectureId: lecture.id, ...lecture.data() } as LectureDTO))
  return data
}

async function getLecturesById(lectureId: string) {
  const data: LectureDTO[] = []
  const lectures = await lectureCollection.where('subjectId', '==', lectureId).get()
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

async function getMySubject(userSubject: UserSubjectDTO[]) {
  const data: LectureDTO[] = []
  const subjectId = userSubject
    .filter(subject => subject.isActive === true)
    .map(subject => subject.subjectId)
    .flatMap(x => x)

  if (subjectId && subjectId.length !== 0) {
    const myLecturs = await lectureCollection.where('subjectId', 'in', subjectId).get()
    myLecturs.forEach(lecture =>
      data.push({ lectureId: lecture.id, ...lecture.data() } as LectureDTO),
    )
    return data
  } else {
    throw new Error('err')
  }
}
export {
  getLectures,
  getMySubject,
  getLectureDetail,
  getOwnLectures,
  getBookmarkLectures,
  getLecturesById,
}
