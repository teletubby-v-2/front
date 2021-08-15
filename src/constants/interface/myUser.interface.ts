import firebase from 'firebase/app'

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
  userSubject: string[]
  followLecture: string[]
  follower: string[] //user id
  following: string[] //user id
  donateImage?: string
  donateDescription?: string
  createAt?: firebase.firestore.Timestamp
  updateAt?: firebase.firestore.Timestamp
}
