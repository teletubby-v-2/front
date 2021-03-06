import { firebaseApp } from '../../config/firebase'
import firebase from 'firebase/app'

const auth = firebaseApp.auth()

async function signInWithEmailAndPassword(
  email: string,
  password: string,
): Promise<firebase.auth.UserCredential> {
  const userCredential = await auth.signInWithEmailAndPassword(email, password)
  if (!userCredential.user?.emailVerified) {
    userCredential.user?.sendEmailVerification()
  }
  return userCredential
}

async function logout(): Promise<void> {
  await auth.signOut()
  localStorage.removeItem('idToken')
  localStorage.removeItem('providerToken')
}

async function providerSignIn(
  provider: firebase.auth.AuthProvider,
): Promise<firebase.auth.UserCredential> {
  const userCredentail = await auth.signInWithPopup(provider)
  const credential = userCredentail.credential as firebase.auth.OAuthCredential
  // This gives you a provider Access Token. You can use it to access the provider API.
  if (credential.accessToken) {
    localStorage.setItem('providerToken', credential.accessToken)
  }
  return userCredentail
}

async function signInWithGoogle(): Promise<firebase.auth.UserCredential> {
  const provider = new firebase.auth.GoogleAuthProvider()
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
  provider.addScope('https://www.googleapis.com/auth/userinfo.email')
  provider.addScope('https://www.googleapis.com/auth/userinfo.profile')

  // Comment: can implement to get more data from user.
  // provider.addScope('https://www.googleapis.com/auth/user.birthday.read')
  // provider.addScope('https://www.googleapis.com/auth/user.phonenumbers.read')

  const userCredentail = await providerSignIn(provider)

  if (!firebase.auth().currentUser?.photoURL) {
    await firebase.auth().currentUser?.updateProfile({
      photoURL: firebaseApp.auth().currentUser?.photoURL + '?type=large&return_ssl_resources=1',
    })
  }

  return userCredentail
}

async function signInWithFacebook(): Promise<firebase.auth.UserCredential> {
  const provider = new firebase.auth.FacebookAuthProvider()

  // Comment: can implement to get more data from user.
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

  const userCredential = await providerSignIn(provider)

  if (!userCredential.user?.emailVerified) {
    userCredential.user?.sendEmailVerification()
  }
  // get higher quality photo
  if (!firebase.auth().currentUser?.photoURL) {
    await firebaseApp.auth().currentUser?.updateProfile({
      photoURL: firebase.auth().currentUser?.photoURL + '?type=large&return_ssl_resources=1',
    })
  }
  return userCredential
}

async function signInWithTwitter(): Promise<firebase.auth.UserCredential> {
  const provider = new firebase.auth.TwitterAuthProvider()
  const userCredential = await providerSignIn(provider)

  // get higher quality photo
  if (!firebase.auth().currentUser?.photoURL) {
    await firebase.auth().currentUser?.updateProfile({
      photoURL: firebaseApp.auth().currentUser?.photoURL?.replace('_normal', ''),
    })
  }

  return userCredential
}

function getProviderForProviderId(method: string): firebase.auth.AuthProvider | void {
  switch (method) {
    case 'google.com':
      return new firebase.auth.GoogleAuthProvider()
    case 'facebook.com':
      return new firebase.auth.FacebookAuthProvider()
    case 'twitter.com':
      return new firebase.auth.TwitterAuthProvider()
  }

  new firebase.auth.EmailAuthProvider_Instance()
}

async function linkAccountWithProvider(email: string, pendingCred: firebase.auth.AuthCredential) {
  const methods = await auth.fetchSignInMethodsForEmail(email)
  const provider = getProviderForProviderId(methods[0])
  if (provider) {
    const result = await auth.signInWithPopup(provider)
    return await result.user?.linkAndRetrieveDataWithCredential(pendingCred)
  }
}

async function linkWithEmailAndPassword(
  email: string,
  password: string,
  pendingCred: firebase.auth.AuthCredential,
) {
  const result = await auth.signInWithEmailAndPassword(email, password)
  return result.user?.linkWithCredential(pendingCred)
}

export {
  signInWithEmailAndPassword,
  logout,
  signInWithGoogle,
  signInWithFacebook,
  signInWithTwitter,
  linkWithEmailAndPassword,
  linkAccountWithProvider,
}
