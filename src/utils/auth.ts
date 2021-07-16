import { firebaseApp } from '../config/firebase'
import firebase from 'firebase/app'

async function signInWithEmailAndPassword(
  email: string,
  password: string,
): Promise<firebase.auth.UserCredential> {
  const userCredentail = await firebaseApp.auth().signInWithEmailAndPassword(email, password)
  const token = await userCredentail.user?.getIdToken()
  if (token) {
    localStorage.setItem('idToken', token)
  }
  return userCredentail
}

async function logout(): Promise<void> {
  await firebaseApp.auth().signOut()
  localStorage.removeItem('idToken')
  localStorage.removeItem('providerToken')
}

async function providerSignIn(provider: firebase.auth.AuthProvider): Promise<firebase.auth.UserCredential> {
  const userCredentail = await firebase.auth().signInWithPopup(provider)
  var credential = userCredentail.credential as firebase.auth.OAuthCredential
  const token = await userCredentail.user?.getIdToken()
  if (token) {
    localStorage.setItem('idToken', token)
  }
  // This gives you a Google Access Token. You can use it to access the Google API.
  if (credential) {
    localStorage.setItem('providerToken', credential.accessToken as string)
  }
  return userCredentail;

  // console.log(userCredentail.credential)

  // The signed-in user info.
  // var user = result.user;}
}

async function signInWithGoogle(): Promise<void> {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
  provider.addScope('https://www.googleapis.com/auth/user.birthday.read')
  provider.addScope('https://www.googleapis.com/auth/user.phonenumbers.read')
  provider.addScope('https://www.googleapis.com/auth/userinfo.email')
  provider.addScope('https://www.googleapis.com/auth/userinfo.profile')
  await providerSignIn(provider)

  await firebase.auth().currentUser?.updateProfile({
    photoURL: firebase.auth().currentUser?.photoURL?.replace('s96-c', 's400-c'),
  })
}

async function signInWithFacebook(): Promise<void> {
  const provider = new firebase.auth.FacebookAuthProvider()
  // provider.addScope('user_birthday');
  // provider.addScope('user_age_range');
  // provider.addScope('Oembed Read');
  // provider.addScope('user_videos');
  // provider.addScope('user_photos');
  // provider.addScope('user_location');
  // provider.addScope('user_link');
  // provider.addScope('user_hometown');
  // provider.addScope('user_gender');
  // provider.addScope('user_friends');
  // provider.addScope('user_birthday');
  // provider.addScope('user_age_range');
  await providerSignIn(provider)
  await firebase.auth().currentUser?.updateProfile({
    photoURL: firebase.auth().currentUser?.photoURL + '?type=large&return_ssl_resources=1',
  })
}

async function signInWithTwitter(): Promise<void> {
  const provider = new firebase.auth.TwitterAuthProvider()
  await providerSignIn(provider)

  await firebase.auth().currentUser?.updateProfile({
    photoURL: firebase.auth().currentUser?.photoURL?.replace('_normal', ''),
  })
}

export {
  signInWithEmailAndPassword,
  logout,
  signInWithGoogle,
  signInWithFacebook,
  signInWithTwitter,
}
