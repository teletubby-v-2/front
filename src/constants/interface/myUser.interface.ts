import firebase from 'firebase/app'
import { UserSubjectDTO } from '../dto/myUser.dto'

export interface SocialLink {
  socialMediaName: string
  socialMedisUrl: string
}

export interface MyUser {
  userId: string
  email?: string
  userName: string
  imageUrl?: string
  socialLink: SocialLink[]
  userSubject: UserSubjectDTO[]
  followLecture: string[]
  follower: string[] //user id
  following: string[] //user id
  donateImage?: string
  donateDescription?: string
  bookmark: string[]
  createAt?: firebase.firestore.Timestamp
  updateAt?: firebase.firestore.Timestamp
}
