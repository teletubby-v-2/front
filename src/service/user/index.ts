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
    bookmark: [],
    userSubject: [],
    followers: [],
    following: [],
    lectureCount: 0,
  }
  if (firebaseApp.auth().currentUser) {
    await userCollection.doc(userId).set(data)
    await firebaseApp.auth().currentUser?.updateProfile({
      photoURL: data.imageUrl,
      displayName: data.userName,
    })
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
  await userCollection.doc(userId).update(data)
  if (firebaseApp.auth().currentUser && data.imageUrl) {
    await firebaseApp.auth().currentUser?.updateProfile({
      photoURL: data.imageUrl,
    })
  }
}

async function deleteUser(userId: string) {
  return await userCollection.doc(userId).delete()
}

export { createUser, updateUser, deleteUser }
