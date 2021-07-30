import firebase from 'firebase/app'

const queryOperators = ['<', '<=', '==', '>', '>=', '!=', 'in', 'not-in']

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
  lectureCount: number
  notificationCount: number
  notificationUnreadCount: number
  createDate: firebase.firestore.Timestamp
  updateDate: firebase.firestore.Timestamp
}

export interface FilterUserDTO {
  queryOperator: string
  userId?: string
  email?: string
  displayName?: string
  createDate?: firebase.firestore.Timestamp
  likedLectureId?: string[]
  followers?: string[]
  following?: string[]
  lectureCount?: number
}
