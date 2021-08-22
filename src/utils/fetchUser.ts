const fetchUser = async (uid: string) => {
  const userData = await fetch(`https://kushare-server.herokuapp.com/?uid=${uid}`)
  return await userData.json()
}

export { fetchUser }
