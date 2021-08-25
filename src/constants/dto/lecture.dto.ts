import firebase from 'firebase/app'
import { Review, Lecture, QAndA, Comments } from './../interface/lecture.interface'
import { queryOperator } from './queryOperator.dto'

//-------------------------- Lecture -------------------------

export interface CreateLectureDTO {
  username?: string
  lectureId?: string
  userId?: string
  subjectId: string
  lectureTitle: string
  description?: string
  isMid?: boolean
  isFinal?: boolean
  imageUrl: string[]
  tags?: string[]
  sumRating?: number
  reviewCount?: number
  createAt?: firebase.firestore.Timestamp
  updateAt?: firebase.firestore.Timestamp
}

export interface UpdateLectureDTO extends Partial<CreateLectureDTO> {}

export interface LectureDTO extends Lecture {}

//-------------------------- review -------------------------

export interface CreateReviewDTO extends Review {}
export interface UpdateReviewDTO extends Partial<CreateReviewDTO> {
  lectureId: string
}

//-------------------------- Q&A -------------------------

export interface CreateQAndADTO extends QAndA {}

export interface UpdateQAndADTO extends Partial<CreateQAndADTO> {
  lectureId: string
}

export interface AnswerDTO {
  answerId?: string
  qaId: string
  lectureId: string
  userId?: string
  username?: string
  photoURL?: string
  message: string
  createAt?: firebase.firestore.Timestamp
  updateAt?: firebase.firestore.Timestamp
}

//-------------------------- Comment -------------------------

export interface CreateCommentDTO extends Comments {}

export interface UpdateCommentDTO extends Partial<CreateCommentDTO> {
  lectureId: string
}

export interface ReplyDTO {
  replyId?: string
  id: string
  lectureId: string
  userId?: string
  username?: string
  photoURL?: string
  message: string
  createAt?: firebase.firestore.Timestamp
  updateAt?: firebase.firestore.Timestamp
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
