import firebase from 'firebase/app'

export interface MyUser {
  userId: string
  email: string
  displayName: string
  imageUrl: string
  type: number
  createAt: firebase.firestore.Timestamp
  updateAt: firebase.firestore.Timestamp
}
