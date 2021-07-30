import firebase from 'firebase/app'

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
  likedLectureId: string[] //lecturnId
  followers: string[] //userId
  following: string[] //userId
  lecturnCount: number
  notificationCount: number
  notificationUnreadCount: number
  createDate: firebase.firestore.Timestamp
  updateDate: firebase.firestore.Timestamp
}
