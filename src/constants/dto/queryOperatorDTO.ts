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
  [Property in keyof queryOperator]: Type
}
