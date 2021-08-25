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
  return qAndA.doc(qaId).collection(Collection.Answer)
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
  console.log('qanddata', data)
  return await qAndACollection.doc().set(data)
}

async function updateQAndA(qanda: UpdateQAndADTO): Promise<void> {
  const qAndACollection = getQAndACollection(qanda?.lectureId as string)
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  const qaId = qanda.qaId
  const data = {
    ...qanda,
    updateAt: timeStamp,
  }
  delete data['qaId']
  return await qAndACollection.doc(qaId).update(data)
}

async function daleteQAndA(qaId: string, lectureId: string) {
  const qAndACollection = getQAndACollection(lectureId)
  return await qAndACollection.doc(qaId).delete()
}

async function createAnswer(ansqanda: AnswerDTO): Promise<void> {
  const answerCollection = getAnswerCollection(ansqanda.lectureId, ansqanda.qaId as string)
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  const data: AnswerDTO = {
    ...ansqanda,
    createAt: timeStamp,
    updateAt: timeStamp,
    userId: firebaseApp.auth().currentUser?.uid as string,
  }
  return await answerCollection.doc().set(data)
}

async function updateAnswer(ansqanda: AnswerDTO): Promise<void> {
  const answerCollection = getAnswerCollection(ansqanda.lectureId, ansqanda.qaId as string)
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  const answerId = ansqanda.answerId
  const data: AnswerDTO = {
    ...ansqanda,
    updateAt: timeStamp,
    userId: firebaseApp.auth().currentUser?.uid as string,
  }
  delete data['answerId']
  return await answerCollection.doc(answerId).update(data)
}

async function deleteAnswer(ansqanda: AnswerDTO): Promise<void> {
  const answerCollection = getAnswerCollection(ansqanda.lectureId, ansqanda.qaId as string)
  return await answerCollection.doc(ansqanda.answerId).delete()
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

export { createQAndA, updateQAndA, daleteQAndA, createAnswer, updateAnswer, deleteAnswer }
