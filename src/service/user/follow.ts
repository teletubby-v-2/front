import { COLLECTION } from './../../constants/index'
import firebase from 'firebase'
import { firestore } from '../../config/firebase'
import { MyUserDTO } from '../../constants/dto/myUser.dto'
import { fetchUserArray } from '../../utils/fetchUser'
import { createFollowNoti } from '../noti'

const userCollection = firestore.collection(COLLECTION.USERS)

async function getUserCollection(userId: string) {
  return await userCollection.doc(userId).get()
}

async function getUserFollow(userId: string) {
  const snapshot = await getUserCollection(userId)
  const userData = snapshot.data() as MyUserDTO
  const arrayUser = await fetchUserArray(userData.followers)
  return arrayUser
}

async function followUser(userId: string) {
  const authId = firebase.auth().currentUser?.uid
  userCollection.doc(authId).update({ following: firebase.firestore.FieldValue.arrayUnion(userId) })
  userCollection.doc(userId).update({ followers: firebase.firestore.FieldValue.arrayUnion(authId) })
  createFollowNoti(userId)
}

async function unFollowUser(userId: string) {
  const authId = firebase.auth().currentUser?.uid
  userCollection
    .doc(authId)
    .update({ following: firebase.firestore.FieldValue.arrayRemove(userId) })
  userCollection
    .doc(userId)
    .update({ followers: firebase.firestore.FieldValue.arrayRemove(authId) })
}

export { getUserFollow, followUser, unFollowUser }
