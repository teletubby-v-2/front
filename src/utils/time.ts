function convertTimestampToTime(date: Date) {
  try {
    const hours = '0' + date.getHours()
    const minutes = '0' + date.getMinutes()
    const seconds = '0' + date.getSeconds()

    return hours.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
  } catch {
    console.error('time มาไม่ทัน')
  }
}

export { convertTimestampToTime }
