import { queryOperator } from './queryOperator.dto'

export interface SubjectDTO {
  subjectId: string
  subjectCode: string
  subjectName: string
  subjectYear: string
  subjectGroup: string
  subjectGroup2: string
  subjectFaculty: string
  subjectMajor: string
}

export interface FilterSubjectDTO {
  queryOperator: queryOperator
  subjectId?: string
  subjectCode?: string
  subjectName?: string
  subjectYear?: string
  subjectGroup?: string
  subjectGroup2?: string
  subjectFaculty?: string
  subjectMajor?: string
}
