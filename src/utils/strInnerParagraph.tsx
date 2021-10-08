export const strInnerParagraph = (str: string) => {
  const strArr = str.split('\n')
  const strArrFinal = []
  for (let i = 0; i < strArr.length; i++) {
    if (i !== strArr.length - 1) {
      strArrFinal.push(strArr[i])
      strArrFinal.push(null)
    } else {
      strArrFinal.push(strArr[i])
    }
  }
  return (
    <>
      {strArrFinal.map(str => {
        if (str) return str
        // eslint-disable-next-line react/jsx-key
        return <br />
      })}
    </>
  )
}
