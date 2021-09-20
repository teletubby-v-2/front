import firebase from 'firebase/app'
import { UserSubjectDTO } from '../dto/myUser.dto'

export interface SocialLink {
  facebook?: string
  instagram?: string
  youtube?: string
}

export interface MyUser {
  userId: string
  email?: string
  userName: string
  imageUrl?: string
  socialLink: SocialLink
  userSubject: UserSubjectDTO[]
  followers: string[] //user id
  following: string[] //user id
  donateImage?: string
  donateDescription?: string
  lectureCount: number
  bookmark: string[]
  createAt?: firebase.firestore.Timestamp
  updateAt?: firebase.firestore.Timestamp
  notificationReadCount: string[]
  aboutMe?: string
}
