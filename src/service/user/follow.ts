import { Collection } from './../../constants/index'
import firebase from 'firebase'
import { firestore } from '../../config/firebase'
import { MyUserDTO } from '../../constants/dto/myUser.dto'
import { fetchUserArray } from '../../utils/fetchUser'

const userCollection = firestore.collection(Collection.Users)

async function getUserCollection(userId: string) {
  return await userCollection.doc(userId).get()
}

async function getUserFollow(userId: string) {
  const snapshot = await getUserCollection(userId)
  const userData = snapshot.data() as MyUserDTO
  const arrayUser = await fetchUserArray(userData.followers)
  console.log(arrayUser)
  return arrayUser
}

async function followUser(userId: string) {
  const authId = firebase.auth().currentUser?.uid
  userCollection.doc(authId).update({ following: firebase.firestore.FieldValue.arrayUnion(userId) })
  userCollection.doc(userId).update({ followers: firebase.firestore.FieldValue.arrayUnion(authId) })
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
