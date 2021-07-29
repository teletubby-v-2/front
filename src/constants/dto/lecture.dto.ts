export interface postLecture {
  lectureId?: string
  userId: string
  lectureTitle: string
  description?: string
  isMid?: boolean
  isFinal?: boolean
  imagesUrl: string[]
  // todo: คณะ ภาค ชื่อวิชา รหัสวิชา
}

export interface comment {
  lectureId: string
  userId: string
  displayName: string
  imageUrl: string
  message?: string
  reply?: string
}

export interface review {
  lectureId: string
  userId: string
  displayName: string
  imageUrl: string
  rating: number
}

export interface qAndA {
  id?: string
  lectureId: string
  userId: string
  displayName: string
  imageUrl: string
  question: string
  answer?: string
  status?: number
}
