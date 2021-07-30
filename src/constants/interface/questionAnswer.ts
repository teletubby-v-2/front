import firebase from 'firebase/app'

export interface questionAnswer {
  qaId: string
  lectureId: string
  userId: string
  question: string
  answer: string[]
  status: number
  createAt: firebase.firestore.Timestamp
  updateAt: firebase.firestore.Timestamp

  //------------------------
  displayName: string
  imageURL: string
}
screenLeft
