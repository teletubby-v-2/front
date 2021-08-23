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
    console.log('Print', data)
    try {
      return await lectureCollection.doc().set(data)
    } catch {
      console.log('error')
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
  delete data.lectureId
  return await lectureCollection.doc(lecture.lectureId).update(data)
}

async function deleteLecture(lectureId: string) {
  return await lectureCollection.doc(lectureId).delete()
}

export { createLecture, updateLecture, deleteLecture }
