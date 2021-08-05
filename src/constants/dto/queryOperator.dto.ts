export enum QUERY_OPERATOR {
  lth = '<',
  leq = '<=',
  eq = '==',
  gth = '>',
  geq = '>=',
  neq = '!=',
  in = 'in',
  nin = 'not-in',
  arrayContains = 'array-contains',
  arrayContainsAny = 'array-contains-any',
}

export type queryOperator =
  | '<'
  | '<='
  | '=='
  | '>'
  | '>='
  | '!='
  | 'in'
  | 'not-in'
  | 'array-contains'
  | 'array-contains-any'

export type queryOperatorObject<Type> = {
  [key in QUERY_OPERATOR]: Type
}

type PartialRecord<K extends queryOperator, T> = { [P in K]?: T }

// let lectureX: PartialRecord<'<',string> = {
//     eq : "1010101"
// }
