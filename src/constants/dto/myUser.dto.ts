import firebase from 'firebase/app'

import { MyUser, SocialLink } from '../interface/myUser.interface'
import { queryOperator } from './queryOperator.dto'

export interface CreateUserDTO {
  imageUrl?: string
  userName?: string
  socialLink?: SocialLink[]
  userId?: string
  email?: string
  aboutMe?: string
  userSubject?: string[]
  donateImage?: string
  donateDescription?: string
  lectureCount?: number
  followers?: string[]
  following?: string[]
  bookmark?: string[]
  createAt?: firebase.firestore.Timestamp
  updateAt?: firebase.firestore.Timestamp
}

export interface UpdateUserDTO extends Partial<CreateUserDTO> {}

export interface MyUserDTO extends MyUser {} //รวมProfile

export interface FilterUserDTO {
  userId?: string | [queryOperator, string | string[]]
  email?: string | [queryOperator, string | string[]]
  userName?: string | [queryOperator, string | string[]]
  followLecture?: string[] | [queryOperator, string | string[]]
  followers?: string[] | [queryOperator, string | string[]]
  following?: string[] | [queryOperator, string | string[]]
  lectureCount?: number | [queryOperator, number]
  userSubject: string[] | [queryOperator, string | string[]]
  bookmark: string[] | [queryOperator, string | string[]]
  aboutme: string | [queryOperator, string | string[]]
  // socialLink?: SocialLink[] | [queryOperator, SocialLink[]]
}
