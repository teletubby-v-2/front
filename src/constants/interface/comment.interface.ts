import firebase from 'firebase/app'

export interface Comment {
  commentId: string
  lectureId: string
  userId: string
  message: string
  createAt: firebase.firestore.Timestamp
  updateAt: firebase.firestore.Timestamp

  //-----------------------
  displayName: string
  imageURL: string
}
