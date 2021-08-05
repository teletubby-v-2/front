import firebase from 'firebase/app'

export interface Notification {
  notificationId: string
  targetUserId: string
  relevantUserId: string
  type: string
  body: string
  link: string
  isRead: boolean
  createAt?: firebase.firestore.Timestamp
  updateAt?: firebase.firestore.Timestamp
}
