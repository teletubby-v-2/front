import firebase from 'firebase/app'

import { MyUser, SocialLink } from '../interface/myUser.interface'
import { queryOperator } from './queryOperator.dto'

export interface CreateUserDTO {
  imageUrl?: string | firebase.firestore.FieldValue
  userName?: string | firebase.firestore.FieldValue
  socialLink?: SocialLink | firebase.firestore.FieldValue
  userId?: string | firebase.firestore.FieldValue
  email?: string | firebase.firestore.FieldValue
  aboutMe?: string | firebase.firestore.FieldValue
  userSubject?: UserSubjectDTO[] | firebase.firestore.FieldValue
  donateImage?: string | firebase.firestore.FieldValue
  donateDescription?: string | firebase.firestore.FieldValue
  lectureCount?: number | firebase.firestore.FieldValue
  followers?: string[] | firebase.firestore.FieldValue
  following?: string[] | firebase.firestore.FieldValue
  bookmark?: string[] | firebase.firestore.FieldValue
  createAt?: firebase.firestore.Timestamp | firebase.firestore.FieldValue
  updateAt?: firebase.firestore.Timestamp | firebase.firestore.FieldValue
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
  socialLink?: SocialLink | [queryOperator, SocialLink]
}

export interface UserSubjectDTO {
  usersSubjectsId?: string
  title: string
  isActive: boolean
  subjectId: string[]
}
