import { firebaseApp } from '../config/firebase'
import firebase from 'firebase/app'

const auth = firebaseApp.auth()

async function signInWithEmailAndPassword(
  email: string,
  password: string,
): Promise<firebase.auth.UserCredential> {
  const userCredentail = await auth.signInWithEmailAndPassword(email, password)
  const token = await userCredentail.user?.getIdToken()
  if (token) {
    localStorage.setItem('idToken', token)
  }
  return userCredentail
}

async function logout(): Promise<void> {
  await auth.signOut()
  localStorage.removeItem('idToken')
  localStorage.removeItem('providerToken')
}

async function providerSignIn(provider: firebase.auth.AuthProvider): Promise<firebase.auth.UserCredential> {
  const userCredentail = await auth.signInWithPopup(provider)
  var credential = userCredentail.credential as firebase.auth.OAuthCredential
  // This gives you a Google Access Token. You can use it to access the provider API.
  if (credential.accessToken) {
    localStorage.setItem('providerToken', credential.accessToken)
  }
  return userCredentail;
}

async function signInWithGoogle(): Promise<void> {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
  provider.addScope('https://www.googleapis.com/auth/user.birthday.read')
  provider.addScope('https://www.googleapis.com/auth/user.phonenumbers.read')
  provider.addScope('https://www.googleapis.com/auth/userinfo.email')
  provider.addScope('https://www.googleapis.com/auth/userinfo.profile')
  try{
    const userCredentail = await firebase.auth().signInWithPopup(provider)
    await firebase.auth().currentUser?.updateProfile({
      photoURL: firebase.auth().currentUser?.photoURL + '?type=large&return_ssl_resources=1',
    })
  } catch(error: any){
    if (error.code === 'auth/account-exists-with-different-credential') {
      const pendingCred = error.credential
      const email = error.email
      const methods = await auth.fetchSignInMethodsForEmail(email)
      const provider = getProviderForProviderId(methods[0])
      console.log(provider)
      if(provider){
        const result = await auth.signInWithPopup(provider)
        console.log(result)
        await result.user?.linkAndRetrieveDataWithCredential(pendingCred)
      }
    }
  }
}

function getProviderForProviderId(method: string):firebase.auth.AuthProvider | void{
  switch (method) {
    case 'google.com':
      return new firebase.auth.GoogleAuthProvider()
    case 'facebook.com':
      return new firebase.auth.FacebookAuthProvider()
    case 'twitter.com':
      return new firebase.auth.TwitterAuthProvider()
  }

  new firebase.auth.EmailAuthProvider_Instance
}

async function signInWithFacebook(): Promise<void> {
  const provider = new firebase.auth.FacebookAuthProvider()
  // can implement more data from user
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
  const userCredentail = await firebase.auth().signInWithPopup(provider)
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

async function linkAccountWithProvider(email:string,pendingCred:any) {
  const methods = await auth.fetchSignInMethodsForEmail(email)
  const provider = getProviderForProviderId(methods[0])
  if(provider){
    const result = await auth.signInWithPopup(provider)
    console.log(result)
    await result.user?.linkAndRetrieveDataWithCredential(pendingCred)
  }
}

async function linkWithEmailAndPassword(email: string, password: string, pendingCred: any) {
  const result = await auth.signInWithEmailAndPassword(email, password)
  return result.user?.linkWithCredential(pendingCred);
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
