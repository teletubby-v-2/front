import firebase from 'firebase/app'

const queryOperators = ['<', '<=', '==', '>', '>=', '!=', 'in', 'not-in']

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
  queryOperator: string
  subjectId?: string
  subjectCode?: string
  subjectName?: string
  subjectYear?: string
  subjectGroup?: string
  subjectGroup2?: string
  subjectFaculty?: string
  subjectMajor?: string
}
