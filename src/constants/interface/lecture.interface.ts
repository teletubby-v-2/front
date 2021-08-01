import firebase from 'firebase/app'

export interface Lecture {
  lectureId: string
  userId: string
  imagesUrl: string[]
  subjectId: string
  likeCount: number
  viewCount: number
  lectureTitle?: string
  description?: string
  keyword?: string[]
  commentCount: number
  reviewCount: number
  qaCount: number
  isMid?: boolean
  isFinal?: boolean
  tags?: string[]
  qa: QAndA[]
  Comment: Comment[]
  review: Review[]
  createAt?: firebase.firestore.Timestamp
  updateAt?: firebase.firestore.Timestamp
}

export interface CommentNoReply {
  parentCommendId?: string
  id?: string
  lectureId: string
  userId: string
  displayName: string
  imageUrl: string
  message?: string
  createAt?: firebase.firestore.Timestamp
  updateAt?: firebase.firestore.Timestamp
}

export interface Comment extends CommentNoReply {
  reply?: CommentNoReply[]
}

export interface Review extends CommentNoReply {
  rating?: number
}

export interface QAndA {
  id?: string
  lectureId: string
  userId: string
  displayName: string
  imageUrl: string
  question: string
  answer?: CommentNoReply[]
  status?: number
  createAt?: firebase.firestore.Timestamp
  updateAt?: firebase.firestore.Timestamp
}

export interface Subject {
  subjectId: string
  subjectCode: string
  subjectName: string
  subjectYear: string
  subjectGroup: string
  subjectGroup2?: string
  subjectFaculty: string
  subjectMajor: string
}
