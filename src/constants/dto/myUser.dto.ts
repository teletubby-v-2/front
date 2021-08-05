import firebase from 'firebase/app'

import { MyUser } from '../interface/myUser.interface'
import { queryOperator } from './queryOperatorDTO'

export interface CreateUserEmailDTO {
  userId: string
  email: string
  userName: string
  password: string
}

export interface UpdateProfileDTO {
  userId: string
  photoURL?: string
  userName?: string
  aboutme?: string
  socialLinkIG?: string
  socialLinkFB?: string
  socialLinkYT?: string
  donatePicture?: string
  aboutDonate?: string

  // ต้องแยกส่วนหรือป่าว
  // likedLectureId?: string[] //lectureId
  // followers?: string[] //userId
  // following?: string[] //userId
  // lectureCount?: number
  // notificationCount?: number
  // notificationUnreadCount?: number
}

export interface MyUserDTO extends MyUser {} //รวมProfile

export interface FilterUserDTO {
  queryOperator: queryOperator
  userId?: string
  email?: string
  userName?: string
  socialLinkIG?: string
  socialLinkFB?: string
  socialLinkYT?: string
  likedLectureId?: string[]
  followers?: string[]
  following?: string[]
  lectureCount?: number
}
