import { Collection } from './../../constants/index'
import firebase from 'firebase'
import { firebaseApp, firestore } from '../../config/firebase'
import { AnswerDTO, CreateQAndADTO, UpdateQAndADTO } from '../../constants/dto/lecture.dto'

const lectureCollection = firestore.collection(Collection.Lectures)
// const batch = firestore.batch()

function getQAndACollection(
  lectureId: string,
): firebase.firestore.CollectionReference<firebase.firestore.DocumentData> {
  return lectureCollection.doc(lectureId).collection(Collection.QAs)
}

function getAnswerCollection(
  lectureId: string,
  qaId: string,
): firebase.firestore.CollectionReference<firebase.firestore.DocumentData> {
  const qAndA = getQAndACollection(lectureId)
  return qAndA.doc(qaId).collection(Collection.Answers)
}

async function createQAndA(qAndA: CreateQAndADTO): Promise<void> {
  const qAndACollection = getQAndACollection(qAndA.lectureId)
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  const data: CreateQAndADTO = {
    ...qAndA,
    createAt: timeStamp,
    updateAt: timeStamp,
    userId: firebaseApp.auth().currentUser?.uid as string,
  }
  return await qAndACollection.doc().set(data)
}

async function updateQAndA(qAndA: UpdateQAndADTO): Promise<void> {
  const qAndACollection = getQAndACollection(qAndA?.lectureId as string)
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  const qaId = qAndA.qaId
  const data = {
    ...qAndA,
    updateAt: timeStamp,
  }
  delete data['qaId']
  console.log(data)
  return await qAndACollection.doc(qaId).update(data)
}

async function deleteQAndA(lectureId: string, qaId: string) {
  const qAndACollection = getQAndACollection(lectureId)
  return await qAndACollection.doc(qaId).delete()
}

async function createAnswer(ansQAndA: AnswerDTO): Promise<void> {
  const answerCollection = getAnswerCollection(ansQAndA.lectureId, ansQAndA.qaId as string)
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  const data: AnswerDTO = {
    ...ansQAndA,
    createAt: timeStamp,
    updateAt: timeStamp,
    userId: firebaseApp.auth().currentUser?.uid as string,
  }
  console.log(data)

  return await answerCollection.doc().set(data)
}

async function updateAnswer(ansQAndA: AnswerDTO): Promise<void> {
  const answerCollection = getAnswerCollection(ansQAndA.lectureId, ansQAndA.qaId as string)
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  const answerId = ansQAndA.answerId
  const data: AnswerDTO = {
    ...ansQAndA,
    updateAt: timeStamp,
    userId: firebaseApp.auth().currentUser?.uid as string,
  }
  console.log(data)

  delete data['answerId']
  return await answerCollection.doc(answerId).update(data)
}

async function deleteAnswer(ansQAndA: AnswerDTO): Promise<void> {
  const answerCollection = getAnswerCollection(ansQAndA.lectureId, ansQAndA.qaId as string)
  return await answerCollection.doc(ansQAndA.answerId).delete()
}

// export interface AnswerDTO {
//   qaId?: string
//   lectureId: string
//   userId?: string
//   username?: string
//   photoURL?: string
//   message: string
//   createAt?: firebase.firestore.Timestamp
//   updateAt?: firebase.firestore.Timestamp
// }

export { createQAndA, updateQAndA, deleteQAndA, createAnswer, updateAnswer, deleteAnswer }
