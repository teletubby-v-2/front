import { queryOperator } from './queryOperator.dto'

export interface SubjectDTO {
  subjectId: string
  subjectNameTH: string
  subjectNameEN: string
  semester1: boolean
  semester2: boolean
  type?: string
  subtype?: string
}

export interface FilterSubjectDTO {
  queryOperator: queryOperator
  subjectId?: string
  subjectNameTH?: string
  subjectNameEN?: string
  semester1?: boolean
  semester2?: boolean
  type?: string
  subtype?: string
}
