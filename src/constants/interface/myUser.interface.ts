import { Lecture } from './lecture.interface'
import firebase from 'firebase/app'

export interface MyUser {
  userId: string
  email?: string
  providerId?: string
  displayName: string
  photoURL: string
  phoneNumber?: string
  aboutMe?: string // เพิ่ม
  socialLinkIG?: string // เพิ่ม
  socialLinkFB?: string
  socialLinkYT?: string
  donatePicture?: string // เพิ่ม
  aboutDonate?: string // เพิ่ม
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
