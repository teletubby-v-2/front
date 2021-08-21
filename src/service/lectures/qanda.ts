import firebase from 'firebase'
import { firebaseApp, firestore } from '../../config/firebase'
import { CreateQAndADTO, UpdateQAndADTO } from '../../constants/dto/lecture.dto'

const lectureCollection = firestore.collection('Lectures')

function getQAndACollection(
  lectureId: string,
): firebase.firestore.CollectionReference<firebase.firestore.DocumentData> {
  return lectureCollection.doc(lectureId).collection('QAndA')
}

async function createQAndA(qanda: CreateQAndADTO): Promise<void> {
  const qAndACollection = getQAndACollection(qanda.lectureId)
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  const data: CreateQAndADTO = {
    ...qanda,
    createAt: timeStamp,
    updateAt: timeStamp,
    userId: firebaseApp.auth().currentUser?.uid as string,
  }
  console.log(data)
  return await qAndACollection.doc().set(data)
}

async function updateQAndA(qanda: UpdateQAndADTO): Promise<void> {
  const qAndACollection = getQAndACollection(qanda?.lectureId as string)
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  const data = {
    ...qanda,
    createAt: timeStamp,
    updateAt: timeStamp,
  }
  return await qAndACollection.doc(data.lectureId).update(data)
}

async function daleteQAndA(qaId: string, lectureId: string) {
  const qAndACollection = getQAndACollection(lectureId)
  return await qAndACollection.doc(qaId).delete()
}

export { createQAndA, updateQAndA, daleteQAndA }
