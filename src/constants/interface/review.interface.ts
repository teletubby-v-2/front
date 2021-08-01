import firebase from 'firebase/app'

export interface Review {
  reviewId: string
  lectureId: string
  userId: string
  rating: number
  message: string
  createAt: firebase.firestore.Timestamp
  updateAt: firebase.firestore.Timestamp

  //----------------------------------------
}
