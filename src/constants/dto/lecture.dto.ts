import firebase from 'firebase/app'

import { Lecture } from '../interface/lecture.interface'

export type queryOperator = '<' | '<=' | '==' | '>' | '>=' | '!=' | 'in' | 'not-in'

//-------------------------- Lecture -------------------------

export interface PostLectureDTO {
  lectureId?: string
  userId: string
  subjectId: string
  lectureTitle: string
  description?: string
  isMid?: boolean
  isFinal?: boolean
  imagesUrl: string[]
  keyword?: string[]
  createDate: firebase.firestore.Timestamp

  // no likeCount: number
  // no viewCount: number
  // no updateDate: firebase.firestore.Timestamp
  // todo: คณะ ภาค ชื่อวิชา รหัสวิชา tags
}

export interface EditLectureDTO {
  lectureId?: string
  userId: string
  lectureTitle?: string
  subjectId: string
  description?: string
  isMid?: boolean
  isFinal?: boolean
  imagesUrl: string[]
  keyword?: string[]
  createDate: firebase.firestore.Timestamp
  updateDate: firebase.firestore.Timestamp

  // todo: คณะ ภาค ชื่อวิชา รหัสวิชา tags
}

export interface LectureDTO extends Lecture {}

//-------------------------- review -------------------------

export interface ReviewDTO {
  reviewId: string
  lectureId: string
  userId: string
  displayName: string
  imageUrl: string
  rating: number
  message?: string
  createDate: firebase.firestore.Timestamp
  updateDate: firebase.firestore.Timestamp
}

export interface EditReviewDTO {
  reviewId: string
  lectureId: string
  userId: string
  displayName: string
  imageUrl: string
  rating?: number
  message?: string
  createDate: firebase.firestore.Timestamp
  updateDate: firebase.firestore.Timestamp
}

//-------------------------- Q&A -------------------------

export interface QAndADTO {
  qaId?: string
  lectureId: string
  userId: string
  displayName: string
  imageUrl: string
  question: string
  answer?: string[]
  status?: number
  createDate: firebase.firestore.Timestamp
}

export interface EditQAndADTO {
  qaId?: string
  lectureId: string
  userId: string
  displayName: string
  imageUrl: string
  question: string
  answer?: string[]
  status?: number
  createDate: firebase.firestore.Timestamp
  updateDate: firebase.firestore.Timestamp
}

//-------------------------- Comment -------------------------

export interface CommentDTO {
  commentId: string
  lectureId: string
  userId: string
  displayName: string
  imageUrl: string
  message?: string
  reply?: string[]
  createDate: firebase.firestore.Timestamp
}

export interface EditCommentDTO {
  commentId: string
  lectureId: string
  userId: string
  displayName: string
  imageUrl: string
  message?: string
  reply?: string[]
  createDate: firebase.firestore.Timestamp
  updateDate: firebase.firestore.Timestamp
}

//-------------------------- Filter -------------------------

export interface FilterLectureDTO {
  queryOperator: queryOperator
  lectureID?: string
  userId?: string
  subjectId?: string
  createDate?: firebase.firestore.Timestamp
  lectureTitile?: string
  keyword?: string[]
  isMid?: boolean
  isFinal?: boolean
  tags?: string
}
