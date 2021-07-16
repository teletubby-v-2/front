import firebase from 'firebase/app'
import 'firebase/auth'
// import 'firebase/database'
import 'firebase/firestore'

export const Timestamp = firebase.firestore.Timestamp
export type ITimestamp = firebase.firestore.Timestamp

export const FieldValue = firebase.firestore.FieldValue
export type IFieldValue = firebase.firestore.FieldValue

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}
// Initialize Firebase
export const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()
// firebase.analytics();
firebaseApp.auth().languageCode = 'TH'

firebaseApp.auth().onAuthStateChanged(user => {
  if (user) {
    if(!user.emailVerified){
      user.sendEmailVerification()
    }
    const uid = user.uid
    console.log(user.email)
    console.log(uid)
    console.log(firebase.auth().currentUser)
  } else {
    // User is signed out
    // ...
    console.log('invalid user')
  }
})

export const user = firebaseApp.auth().currentUser