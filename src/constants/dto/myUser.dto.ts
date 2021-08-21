import firebase from 'firebase/app'

import { MyUser, SocialLink } from '../interface/myUser.interface'
import { queryOperator } from './queryOperator.dto'

export interface CreateUserDTO {
  userId: string
  email: string
  userName: string
  createAt?: firebase.firestore.Timestamp
  updateAt?: firebase.firestore.Timestamp
}

export interface UpdateUserDTO {
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
  userId?: string | [queryOperator, string]
  email?: string | [queryOperator, string]
  userName?: string | [queryOperator, string]
  socialLink?: SocialLink[] | [queryOperator, SocialLink[]]
  followLecture?: string[] | [queryOperator, string[]]
  followers?: string[] | [queryOperator, string[]]
  following?: string[] | [queryOperator, string[]]
  lectureCount?: number | [queryOperator, number]
}
