import { queryOperatorObject } from './queryOperatorDTO'

import { Lecture } from '../interface/lecture.interface'

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

  // no likeCount: number
  // no viewCount: number
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

  // todo: คณะ ภาค ชื่อวิชา รหัสวิชา tags
}

export interface LectureDTO extends Lecture {}

//-------------------------- review -------------------------

export interface ReviewDTO {
  reviewId: string
  lectureId: string
  userId: string
  displayName?: string
  imageUrl?: string
  rating: number
  message?: string
}

export interface EditReviewDTO {
  reviewId: string
  lectureId: string
  userId: string
  displayName?: string
  imageUrl?: string
  rating?: number
  message?: string
}

//-------------------------- Q&A -------------------------

export interface QAndADTO {
  qaId?: string
  lectureId: string
  userId: string
  displayName?: string
  imageUrl?: string
  question: string
  answer?: string[]
  status?: number
}

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

export interface CommentDTO {
  commentId: string
  lectureId: string
  userId: string
  displayName?: string
  imageUrl?: string
  message?: string
  reply?: string[]
}

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
  lectureID?: string | queryOperatorObject<string>
  userId?: string | queryOperatorObject<string>
  subjectId?: string | queryOperatorObject<string>
  lectureTitile?: string | queryOperatorObject<string>
  keyword?: string[] | queryOperatorObject<string[]>
  isMid?: boolean | queryOperatorObject<boolean>
  isFinal?: boolean | queryOperatorObject<boolean>
  tags?: string | queryOperatorObject<string>
}
