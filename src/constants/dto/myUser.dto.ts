import firebase from 'firebase/app'

import { MyUser, SocialLink } from '../interface/myUser.interface'
import { queryOperator } from './queryOperatorDTO'

export interface CreateUserEmailDTO {
  userId: string
  email: string
  userName: string
  createAt?: firebase.firestore.Timestamp
  updateAt?: firebase.firestore.Timestamp
}

export interface UpdateProfileDTO {
  userId: string
  imageUrl?: string
  userName?: string
  socialLink: SocialLink[]
  donateImage?: string
  donateDescription?: string
  createAt?: firebase.firestore.Timestamp
  updateAt?: firebase.firestore.Timestamp
}

export interface MyUserDTO extends MyUser {} //รวมProfile

export interface FilterUserDTO {
  queryOperator: queryOperator
  userId?: string
  email?: string
  userName?: string
  socialLink?: SocialLink[]
  followLecture?: string[]
  followers?: string[]
  following?: string[]
  lectureCount?: number
}
