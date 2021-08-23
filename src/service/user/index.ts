import firebase from 'firebase'
import { firebaseApp, firestore } from '../../config/firebase'
import { CreateUserDTO, UpdateUserDTO } from '../../constants/dto/myUser.dto'

const userCollection = firestore.collection('Users')

async function createUser(user: CreateUserDTO): Promise<void> {
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  const userId = firebaseApp.auth().currentUser?.uid
  const data = {
    ...user,
    createAt: timeStamp,
    updateAt: timeStamp,
  }
  if (firebaseApp.auth().currentUser) {
    console.log('Print', data)
    return await userCollection.doc(userId).set(data)
  } else {
    throw new Error('ออดเฟล')
  }
}

async function updateUser(user: UpdateUserDTO): Promise<void> {
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  const userId = firebaseApp.auth().currentUser?.uid
  const data = {
    ...user,
    updateAt: timeStamp,
  }
  return await userCollection.doc(userId).update(data)
}

async function deleteUser(userId: string) {
  return await userCollection.doc(userId).delete()
}

export { createUser, updateUser, deleteUser }
