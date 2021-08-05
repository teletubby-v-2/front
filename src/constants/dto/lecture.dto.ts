import firebase from 'firebase/app'
import { Review, Lecture, QAndA, Comments } from './../interface/lecture.interface'
import { queryOperator, queryOperatorObject } from './queryOperatorDTO'

//-------------------------- Lecture -------------------------

export interface PostLectureDTO {
  lectureId?: string
  userId: string
  subjectId: string
  lectureTitle: string
  description?: string
  isMid: boolean
  isFinal: boolean
  imagesUrl: string[]
  tags: string[]
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
}

export interface LectureDTO extends Lecture {}

//-------------------------- review -------------------------

export interface ReviewDTO extends Review {}
export interface EditReviewDTO {
  reviewId?: string
  lectureId?: string
  userId?: string
  rating?: number
  message?: string
  createAt?: firebase.firestore.Timestamp
  updateAt?: firebase.firestore.Timestamp
}

//-------------------------- Q&A -------------------------

export interface QAndADTO extends QAndA {}

export interface EditQAndADTO {
  qaId?: string
  lectureId: string
  userId: string
  displayName?: string
  imageUrl?: string
  question: string
  answer?: string[]
  status?: number
}

//-------------------------- Comment -------------------------

export interface CommentsDTO extends Comments {}

export interface EditCommentDTO {
  commentId: string
  lectureId: string
  userId: string
  displayName?: string
  imageUrl?: string
  message?: string
  reply?: string[]
}

//-------------------------- Filter -------------------------

export interface FilterLectureDTO {
  lectureID?: string | [queryOperator, string]
  userId?: string | [queryOperator, string]
  subjectId?: string | [queryOperator, string]
  lectureTitile?: string | [queryOperator, string]
  keyword?: string[] | [queryOperator, string[]]
  isMid?: boolean | [queryOperator, boolean]
  isFinal?: boolean | [queryOperator, boolean]
  tags?: string | [queryOperator, string]
}
