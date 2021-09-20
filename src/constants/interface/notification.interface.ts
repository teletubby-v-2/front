import firebase from 'firebase/app'

export interface Notification {
  notiId?: string
  targetUserId: string
  relevantUserId: string[]
  type: string
  body: string
  link: string
  createAt?: firebase.firestore.Timestamp
  updateAt?: firebase.firestore.Timestamp
}
