import firebase from 'firebase/app'

export interface Lecture {
  lectureId?: string
  userId: string
  imageUrl: string[]
  subjectId: string
  viewCount: number
  reviewCount: number
  sumRating: number
  lectureTitle: string
  description?: string
  isMid: boolean
  isFinal: boolean
  tags: string[]
  faculty?: string
  major?: string
  createAt?: firebase.firestore.Timestamp
  updateAt?: firebase.firestore.Timestamp
  qa?: QAndA[]
  comment?: Comment[]
  review?: Review[]
}

export interface Comments {
  id?: string
  lectureId: string
  userId?: string
  username?: string
  photoURL?: string
  message: string
  createAt?: firebase.firestore.Timestamp
  updateAt?: firebase.firestore.Timestamp
  canReply?: boolean
  reply: Comments[]
}

export interface Review {
  reviewId?: string
  lectureId: string
  userId?: string
  username?: string
  photoURL?: string
  rating: number
  message: string
  createAt?: firebase.firestore.Timestamp
  updateAt?: firebase.firestore.Timestamp
}
export interface QAndA {
  qaId?: string
  lectureId: string
  username?: string
  photoURL?: string
  userId?: string
  question: string
  answer: Comments[]
  createAt?: firebase.firestore.Timestamp
  updateAt?: firebase.firestore.Timestamp
}
