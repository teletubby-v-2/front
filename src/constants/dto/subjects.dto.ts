import firebase from 'firebase/app'

import { queryOperator } from './queryOperatorDTO'

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
  subjectId?: string | [queryOperator, string]
  subjectNameTH?: string | [queryOperator, string]
  subjectNameEN?: string | [queryOperator, string]
  semester1?: boolean | [queryOperator, boolean]
  semester2?: boolean | [queryOperator, boolean]
  type?: string | [queryOperator, string]
  subtype?: string | [queryOperator, string]
}
