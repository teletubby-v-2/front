import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

export const Timestamp = firebase.firestore.Timestamp
export type ITimestamp = firebase.firestore.Timestamp

export const FieldValue = firebase.firestore.FieldValue
export type IFieldValue = firebase.firestore.FieldValue

const firebaseConfig = {
  apiKey: 'AIzaSyCmzqH-rB39P8f1QtEwrCHgldPGRlIk1Fc',
  authDomain: 'teletubby-v2.firebaseapp.com',
  databaseURL: 'https://teletubby-v2-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'teletubby-v2',
  storageBucket: 'teletubby-v2.appspot.com',
  messagingSenderId: '361077742594',
  appId: '1:361077742594:web:e9c6fd64caffe182b69b1b',
  measurementId: 'G-CYMJG1BQVT',
}

// Initialize Firebase
export const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

// firebase.analytics();
firebaseApp.auth().languageCode = 'TH'
firebase.auth().useDeviceLanguage()

export const firestore = firebaseApp.firestore()

export const storage = firebaseApp.storage()

export const storageRef = storage.ref()

export const imagesRef = storageRef.child('images')
export const pdfRef = storageRef.child('pdfs')
