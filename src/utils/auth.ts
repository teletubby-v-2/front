import { firebaseApp } from 'config/firebase';
import firebase from 'firebase/app'

async function signInWithEmailAndPassword(email: string,password: string):Promise<firebase.auth.UserCredential > {
  const userCredentail = await firebaseApp.auth().signInWithEmailAndPassword(email,password)
  const token = await userCredentail.user?.getIdToken()
  if(token){
    localStorage.setItem('idToken',token)
  }
  return userCredentail
} 

async function logout() {
  await firebaseApp.auth().signOut()
  localStorage.removeItem('idToken')
}
async function providerSignIn(provider: firebase.auth.AuthProvider):Promise<void> {
  try{
    const userCredentail = await firebase.auth().signInWithPopup(provider)
    var credential = userCredentail.credential as firebase.auth.OAuthCredential;
    const token = await userCredentail.user?.getIdToken()
    if(token){
      localStorage.setItem('idToken',token)
    }
    // This gives you a Google Access Token. You can use it to access the Google API.
    if(credential){
      localStorage.setItem('providerToken',credential.accessToken as string)
    }
    console.log(userCredentail.credential)
      // The signed-in user info.
      // var user = result.user;
  } catch(error:any){
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential as firebase.auth.OAuthCredential;
    // ...
  }
}

async function signInWithGoogle():Promise<void> {
  const provider = new firebase.auth.GoogleAuthProvider()
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
  provider.addScope('https://www.googleapis.com/auth/user.birthday.read')
  provider.addScope('https://www.googleapis.com/auth/user.phonenumbers.read')
  provider.addScope('https://www.googleapis.com/auth/userinfo.email')
  provider.addScope('https://www.googleapis.com/auth/userinfo.profile')
  await providerSignIn(provider)
}

async function signInWithFacebook():Promise<void> {
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
}

async function signInWithTwitter():Promise<void> {
  const provider = new firebase.auth.TwitterAuthProvider()
  await providerSignIn(provider)
}

export {
  signInWithEmailAndPassword,
  logout,
  signInWithGoogle,
  signInWithFacebook,
  signInWithTwitter,
}
