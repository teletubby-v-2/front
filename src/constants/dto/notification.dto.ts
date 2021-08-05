import firebase from 'firebase/app'
import { Notification } from '../interface/notification.interface'

export interface NotificationDTO extends Notification {}

export interface FilterNotificationDTO {
  notificationId?: string
  targetUserId?: string
  relevantUserId?: string
  type?: string
  body?: string
  link?: string
  isRead?: boolean
  createAt?: firebase.firestore.Timestamp
  updateAt?: firebase.firestore.Timestamp
}
