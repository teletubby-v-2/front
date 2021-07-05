import firebase from 'firebase/app'
import 'firebase/auth'
// import 'firebase/database'
import 'firebase/firestore'

export const Timestamp = firebase.firestore.Timestamp
export type ITimestamp = firebase.firestore.Timestamp

export const FieldValue = firebase.firestore.FieldValue
export type IFieldValue = firebase.firestore.FieldValue

export const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
}

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig)
// firebase.analytics();