import { UserSubjectDTO } from './../../constants/dto/myUser.dto'
import firebase from 'firebase'
import { firestore } from '../../config/firebase'
import { Collection } from '../../constants'
import { LectureDTO } from '../../constants/dto/lecture.dto'
import { updateViewCount } from '.'

export const lectureRef = firestore.collection(Collection.Lectures)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getContentById<T = any, R = any>(
  ref: firebase.firestore.CollectionReference,
  ids: T[],
  limit = Infinity,
  field?: string,
) {
  return new Promise(res => {
    // don't run if there aren't any ids or a path for the collection
    if (ids.length === 0) return res([])

    const batches = []
    const uniqIds = Array.from(new Set(ids))

    while (uniqIds.length) {
      // firestore limits batches to 10
      const batch = uniqIds.splice(0, 10)

      // add the batch request to to a queue
      batches.push(
        new Promise(response => {
          ref
            .where(field || firebase.firestore.FieldPath.documentId(), 'in', [...batch])
            .limit(limit)
            .get()
            .then(results => response(results.docs.map(result => ({ ...result.data() }))))
        }),
      )
    }

    // after all of the data is fetched, return it
    Promise.all(batches).then(content => {
      console.log(content)

      res(content.flat().slice(0, limit) as R[])
    })
  })
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

async function getLecturesByListOfId(subjectIds: string[], limit = Infinity) {
  const data = await getContentById<string, LectureDTO>(lectureRef, subjectIds, limit, 'subjectId')
  return data as LectureDTO[]
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

async function getBookmarkLectures(bookmarks: string[], limit = Infinity) {
  const data = await getContentById<string, LectureDTO>(lectureRef, bookmarks, limit)
  console.log(data)

  return data as LectureDTO[]
}

async function getMySubject(userSubject: UserSubjectDTO[], limit = Infinity) {
  const subjectId = userSubject
    .filter(subject => subject.isActive === true)
    .map(subject => subject.subjectId)
    .flatMap(x => x)

  const data = await getContentById<string, LectureDTO>(lectureRef, subjectId, limit, 'subjectId')
  return data as LectureDTO[]
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
