import { UserSubjectDTO } from './../../constants/dto/myUser.dto'
import firebase from 'firebase'
import { firestore } from '../../config/firebase'
import { Collection } from '../../constants'
import { LectureDTO } from '../../constants/dto/lecture.dto'
import { updateViewCount } from '.'

export const lectureRef = firestore.collection(Collection.Lectures)
export const subjectRef = (subjectId: string) => lectureRef.where('subjectId', '==', subjectId)
export const listSubjectRef = (iistSubject: string) =>
  lectureRef.where('subjectId', 'in', iistSubject)
export const userLectureRef = (userId: string) => lectureRef.where('userId', '==', userId)
export const bookmarkLectureRef = (bookmark: string[]) =>
  lectureRef.where(firebase.firestore.FieldPath.documentId(), 'in', bookmark)
export const mySubjectRef = (userSubject: UserSubjectDTO[]) => {
  const subjectId = userSubject
    .filter(subject => subject.isActive === true)
    .map(subject => subject.subjectId)
    .flatMap(x => x)
  return lectureRef.where('subjectId', 'in', subjectId)
}

async function getLectures(limit = Infinity) {
  const data: LectureDTO[] = []
  const lectures = await lectureRef.orderBy('createAt', 'desc').limit(limit).get()
  lectures.forEach(lecture => data.push({ lectureId: lecture.id, ...lecture.data() } as LectureDTO))
  return data
}

async function getLecturesById(subjectId: string, limit = Infinity) {
  const data: LectureDTO[] = []
  const lectures = await lectureRef
    .where('subjectId', '==', subjectId)
    .orderBy('createAt', 'desc')
    .limit(limit)
    .get()
  lectures.forEach(lecture => data.push({ lectureId: lecture.id, ...lecture.data() } as LectureDTO))
  return data
}

async function getLecturesByListOfId(sujectIds: string[], limit = Infinity) {
  const data: LectureDTO[] = []

  const lectures = await lectureRef.where('subjectId', 'in', sujectIds).limit(limit).get()
  lectures.forEach(lecture => data.push({ lectureId: lecture.id, ...lecture.data() } as LectureDTO))
  return data
}

async function getOwnLectures(userId: string, limit = Infinity) {
  const data: LectureDTO[] = []
  const lectures = await lectureRef
    .where('userId', '==', userId)
    .limit(limit)
    .orderBy('createAt', 'desc')
    .get()
  lectures.forEach(lecture => data.push({ lectureId: lecture.id, ...lecture.data() } as LectureDTO))
  return data
}

async function getLectureDetail(lectureId: string) {
  const bundle = await lectureRef.doc(lectureId).get()
  const data = {
    ...bundle.data(),
    lectureId: bundle.id,
  } as LectureDTO
  updateViewCount(lectureId)
  return data
}

async function getBookmarkLectures(bookmark: string[], limit = Infinity) {
  const data: LectureDTO[] = []
  const lectures = await lectureRef
    .where(firebase.firestore.FieldPath.documentId(), 'in', bookmark)
    .limit(limit)
    .get()
  lectures.forEach(lecture => data.push({ lectureId: lecture.id, ...lecture.data() } as LectureDTO))
  return data
}

async function getMySubject(userSubject: UserSubjectDTO[], limit = Infinity) {
  const data: LectureDTO[] = []
  const subjectId = userSubject
    .filter(subject => subject.isActive === true)
    .map(subject => subject.subjectId)
    .flatMap(x => x)

  if (subjectId && subjectId.length !== 0) {
    const myLecturs = await lectureRef
      .where('subjectId', 'in', subjectId)
      .orderBy('createAt', 'desc')
      .limit(limit)
      .get()
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
  getLecturesByListOfId,
}
