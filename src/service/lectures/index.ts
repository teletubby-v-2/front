import firebase from 'firebase'
import { firebaseApp, firestore } from '../../config/firebase'
import { CreateLectureDTO, UpdateLectureDTO } from '../../constants/dto/lecture.dto'

const lectureCollection = firestore.collection('Lectures')

async function createLecture(lecture: CreateLectureDTO): Promise<any> {
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  const data = {
    ...lecture,
    userId: firebaseApp.auth().currentUser?.uid,
    createdAt: timeStamp,
    updateAt: timeStamp,
    viewCount: 0,
    sumRating: 0,
  }
  console.log(data)
  return await lectureCollection.doc().set(data)
}

async function updateLecture(lecture: UpdateLectureDTO): Promise<any> {
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  const data = {
    ...lecture,
    updateAt: timeStamp,
  }
  return await lectureCollection.doc(data.lectureId).update(data)
}

async function deleteLecture(lectureId: string) {
  return await lectureCollection.doc(lectureId).delete()
}

export { createLecture, updateLecture }
