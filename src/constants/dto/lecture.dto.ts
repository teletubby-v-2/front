import firebase from 'firebase/app'

//-------------------------- Lecture -------------------------

export interface postLecture {
  lectureId?: string
  userId: string
  lectureTitle: string
  description?: string
  isMid?: boolean
  isFinal?: boolean
  imagesUrl: string[]
  keyword: string[]
  createDate: firebase.firestore.Timestamp

  // no likeCount: number
  // no viewCount: number
  // no updateDate: firebase.firestore.Timestamp
  // todo: คณะ ภาค ชื่อวิชา รหัสวิชา
}

export interface editLecture {
  lectureId?: string
  userId: string
  lectureTitle?: string
  description?: string
  isMid?: boolean
  isFinal?: boolean
  imagesUrl: string[]
  keyword: string[]
  createDate: firebase.firestore.Timestamp
  updateDate: firebase.firestore.Timestamp
  likeCount?: number
  viewCount?: number

  // todo: คณะ ภาค ชื่อวิชา รหัสวิชา
}

//-------------------------- review -------------------------

export interface review {
  reviewId: string
  lectureId: string
  userId: string
  displayName: string
  imageUrl: string
  rating: number
  message?: string
  createDate: firebase.firestore.Timestamp
}

export interface editReview {
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

export interface qAndA {
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

export interface editQAndA {
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

export interface comment {
  commentId: string
  lectureId: string
  userId: string
  displayName: string
  imageUrl: string
  message?: string
  reply?: string[]
  createDate: firebase.firestore.Timestamp
}

export interface comment {
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
