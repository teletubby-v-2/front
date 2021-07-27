import { Lecture } from './lecture.interface'
import firebase from 'firebase/app'

export interface MyUser {
  userId: string
  email?: string
  providerId?: string
  displayName: string
  photoURL: string
  phoneNumber?: string
  type?: number
  likedLectures: string[] //lecture id
  lectureCount: number
  follower: string[] //user id
  following: string[] //user id
  lecture: string[] //lecture id
  notificationUnReadCount: number
  notificationCount: number
  notification?: string[] //notification id
  createAt?: firebase.firestore.Timestamp
  updateAt?: firebase.firestore.Timestamp
}
