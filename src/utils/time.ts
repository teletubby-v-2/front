function convertTimestampToTime(date: Date) {
  const hours = '0' + date.getHours()
  const minutes = '0' + date.getMinutes()
  const seconds = '0' + date.getSeconds()

  return hours.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
}

export { convertTimestampToTime }
