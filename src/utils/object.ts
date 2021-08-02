interface Json {
  [key: string]: any
}

export const removeUndefined = (json: Json): Json => {
  Object.keys(json).forEach(
    key => (json[key] === undefined || json[key] === '') && delete json[key],
  )
  return json
}
