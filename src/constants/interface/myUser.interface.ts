import { Lecture } from './lecture.interface'
import firebase from 'firebase/app'

export interface MyUser {
  userId: string
  email: string
  displayName: string
  imageUrl: string
  type: number
  likedLectures: Lecture[]
  followerCount: number
  folowingCount: number
  lectureCount: number
  follower: string[]
  folowing: string[]
  lecture?: Lecture[]
  notificationUnReadedCount: number
  notificationCount: number
  notification?: Notification[]
  createAt: firebase.firestore.Timestamp
  updateAt: firebase.firestore.Timestamp
}
