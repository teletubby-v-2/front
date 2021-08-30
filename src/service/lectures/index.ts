import firebase from 'firebase'
import { firebaseApp, firestore } from '../../config/firebase'
import { CreateLectureDTO, UpdateLectureDTO } from '../../constants/dto/lecture.dto'

const lectureCollection = firestore.collection('Lectures')

async function createLecture(lecture: CreateLectureDTO): Promise<void> {
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  const data = {
    ...lecture,
    userId: firebaseApp.auth().currentUser?.uid,
    createAt: timeStamp,
    updateAt: timeStamp,
    viewCount: 0,
    sumRating: 0,
    reviewCount: 0,
  }
  if (firebaseApp.auth().currentUser) {
    return await lectureCollection.doc().set(data)
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
  delete data.lectureId
  return await lectureCollection.doc(lecture.lectureId).update(data)
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

export { createLecture, updateLecture, deleteLecture }
