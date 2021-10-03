import { MyUser } from './../../constants/interface/myUser.interface'
import { Collection } from './../../constants/index'
import firebase from 'firebase'
import { firebaseApp, firestore } from '../../config/firebase'
import {
  CreateUserDTO,
  MyUserDTO,
  UpdateUserDTO,
  UserSubjectDTO,
} from '../../constants/dto/myUser.dto'
import { removeUndefined } from '../../utils/object'
import { NotificationDTO } from '../../constants/dto/notification.dto'

const userCollection = firestore.collection(Collection.Users)

async function getUser() {
  const userId = firebaseApp.auth().currentUser?.uid
  if (userId) {
    const doc = await userCollection.doc(userId).get()
    return { ...doc.data(), userId: doc.id }
  } else {
    return firebase.auth().currentUser
  }
}

async function createUser(user: CreateUserDTO): Promise<MyUser> {
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  const userId = firebaseApp.auth().currentUser?.uid
  const data = removeUndefined({
    ...user,
    imageUrl: user.imageUrl,
    createAt: timeStamp,
    updateAt: timeStamp,
    bookmark: [],
    userSubject: [],
    followers: [],
    following: [],
    lectureCount: 0,
    notificationReadCount: [],
  }) as unknown as MyUser
  if (userId) {
    await userCollection.doc(userId).set(data)
    if (data.imageUrl) {
      await firebaseApp.auth().currentUser?.updateProfile({
        photoURL: data.imageUrl,
        displayName: data.userName,
      })
    } else
      await firebaseApp.auth().currentUser?.updateProfile({
        displayName: data.userName,
      })
    return {
      ...data,
      userId,
    } as MyUser
  } else {
    throw new Error('ออดเฟล')
  }
}

async function updateUser(user: UpdateUserDTO): Promise<void> {
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  const userId = firebaseApp.auth().currentUser?.uid
  const data = removeUndefined({
    ...user,
    updateAt: timeStamp,
  })

  await userCollection.doc(userId).update(data)
  if (firebaseApp.auth().currentUser && data.imageUrl) {
    await firebaseApp.auth().currentUser?.updateProfile({
      photoURL: data.imageUrl as string,
    })
  }
}

async function deleteUser(userId: string) {
  return await userCollection.doc(userId).delete()
}

async function addUserBookmark(lectureId: string, oldBookmark: string[]) {
  const userId = firebaseApp.auth().currentUser?.uid
  const data = {
    bookmark: [lectureId, ...oldBookmark],
  }
  if (userId) {
    await userCollection.doc(userId).update(data)
  } else {
    throw new Error('young mai login')
  }
}

async function deleteUserBookmark(lectureId: string, oldBookmark: string[]) {
  const userId = firebaseApp.auth().currentUser?.uid
  const data = {
    bookmark: oldBookmark.filter(id => id != lectureId),
  }
  if (userId) {
    await userCollection.doc(userId).update(data)
  }
}
async function updateUserSubject(userSubject: UserSubjectDTO[]) {
  const userId = firebase.auth().currentUser?.uid
  if (userId) {
    userCollection
      .doc(userId)
      .update({ userSubject, updateAt: firebase.firestore.Timestamp.fromDate(new Date()) })
  }
}

async function getUserDetial(userId: string) {
  const bundleUser = await firestore.collection(Collection.Users).doc(userId).get()
  if (bundleUser.exists) {
    const data = { ...bundleUser.data(), userId: userId } as MyUserDTO
    return data
  } else {
    throw new Error('no user')
  }
}

async function addnotification(notiId: string) {
  const userId = firebaseApp.auth().currentUser?.uid
  if (userId) {
    await userCollection
      .doc(userId)
      .update({ notificationReadCount: firebase.firestore.FieldValue.arrayUnion(notiId) })
  } else {
    throw new Error('young mai login')
  }
}

async function readAllNoti(notiList: NotificationDTO[]) {
  const userId = firebaseApp.auth().currentUser?.uid
  const idList = notiList.map(noti => noti.notiId || '')
  if (userId) {
    await userCollection.doc(userId).update({
      notificationReadCount: firebase.firestore.FieldValue.arrayUnion(idList),
    })
  } else {
    throw new Error('young mai login')
  }
  return idList
}

export {
  createUser,
  updateUser,
  deleteUser,
  addUserBookmark,
  deleteUserBookmark,
  updateUserSubject,
  getUser,
  getUserDetial,
  addnotification,
  readAllNoti,
}
