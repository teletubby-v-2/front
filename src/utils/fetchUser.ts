const fetchUser = async (uid: string) => {
  const userData = await fetch(`https://kushare-server.herokuapp.com/?uid=${uid}`)
  return (await userData.json()) as {
    username: string
    photoURL: string
  }
}

const fetchUserArray = async (uid: string[]) => {
  const userData = await fetch(
    `https://kushare-server.herokuapp.com/user_array?uid=${JSON.stringify(uid)}`,
  )
  return (await userData.json()) as {
    username: string
    photoURL: string
  }
}

export { fetchUser, fetchUserArray }
