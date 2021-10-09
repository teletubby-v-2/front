import { LectureDTO } from './../../constants/dto/lecture.dto'
import { COLLECTION } from './../../constants/index'
import firebase from 'firebase'
import { firebaseApp, firestore } from '../../config/firebase'
import { CreateLectureDTO, UpdateLectureDTO } from '../../constants/dto/lecture.dto'
import { createLectureNoti } from '../noti'

const lectureCollection = firestore.collection(COLLECTION.LECTURES)

async function createLecture(lecture: CreateLectureDTO): Promise<LectureDTO> {
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  const userId = firebaseApp.auth().currentUser?.uid
  if (userId) {
    const data = {
      isMid: false,
      isFinal: false,
      tags: [],
      userId,
      ratingScore: 0,
      viewCount: 0,
      sumRating: 0,
      reviewCount: 0,
      ...lecture,
      createAt: timeStamp,
      updateAt: timeStamp,
    }

    const newLecture = await lectureCollection.add(data)
    createLectureNoti(`/lectureDetail/${newLecture.id}`)
    return {
      ...data,
      lectureId: newLecture.id,
    }
  } else {
    throw new Error('ออดเฟล')
  }
}

async function updateLecture(lecture: UpdateLectureDTO): Promise<void> {
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  const data = {
    ...lecture,
    updateAt: timeStamp,
  }
  const lectureId = data.lectureId

  delete data.lectureId

  return await lectureCollection.doc(lectureId).update(data)
}

async function updateViewCount(lectureId: string): Promise<void> {
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  return await lectureCollection
    .doc(lectureId)
    .update({ viewCount: firebase.firestore.FieldValue.increment(1), updateAt: timeStamp })
}

async function deleteLecture(lectureId: string) {
  // const batch = firestore.batch()
  // const lectureRef = lectureCollection.doc(lectureId)
  // batch.delete(lectureRef)
  // batch.delete(lectureRef.collection(Collection.Comments).doc())
  // batch.delete(lectureRef.collection(Collection.QAs).doc())
  // batch.delete(lectureRef.collection(Collection.Reviews).doc())
  // return batch.commit()
  return await lectureCollection.doc(lectureId).delete()
}

export { createLecture, updateLecture, deleteLecture, updateViewCount }
