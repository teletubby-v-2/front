import { queryOperator } from './queryOperator.dto'

export interface SubjectDTO {
  subjectId?: string
  subjectNameEn: string | null
  subjectNameTh: string
  semester1: boolean
  semester2: boolean
  type?: string | null
  subtype?: string | null
}

export interface FilterSubjectDTO {
  subjectId?: string | [queryOperator, string | string[]]
  subjectNameTH?: string | [queryOperator, string | string[]]
  subjectNameEN?: string | [queryOperator, string | string[]]
  semester1?: boolean | [queryOperator, boolean]
  semester2?: boolean | [queryOperator, boolean]
  type?: string | [queryOperator, string | string[]]
  subtype?: string | [queryOperator, string | string[]]
}
