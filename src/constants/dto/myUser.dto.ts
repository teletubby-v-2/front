import firebase from 'firebase/app'

import { MyUser } from '../interface/myUser.interface'

export type queryOperator = '<' | '<=' | '==' | '>' | '>=' | '!=' | 'in' | 'not-in'

export interface CreateUserEmailDTO {
  userId: string
  email: string
  displayName: string
  password: string
  createDate: firebase.firestore.Timestamp
}

export interface UpdateProfileDTO {
  userId: string
  photoURL?: string
  displayName?: string
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
  // createDate?: firebase.firestore.Timestamp
  // updateDate?: firebase.firestore.Timestamp
}

export interface MyUserDTO extends MyUser {} //รวมProfile

export interface FilterUserDTO {
  queryOperator: queryOperator
  userId?: string
  email?: string
  displayName?: string
  socialLinkIG?: string
  socialLinkFB?: string
  socialLinkYT?: string
  likedLectureId?: string[]
  followers?: string[]
  following?: string[]
  lectureCount?: number
  createDate?: firebase.firestore.Timestamp
}
