import { UserInfo } from './types/userInfo.type';
import firebase from 'firebase/app';
import create from 'zustand'
import { AuthError } from '../constants/interface/error.interface';

export const userInfoStore = create<UserInfo>((set) => ({
  displayName: '',
  photoURL: '',
  uid: '',
  providerId: '',
  phoneNumber: '',
  email: '',
  error: {},
  setDisplayName: (displayName: string) => {
    set({ displayName })
  },
  setPhotoURL: (photoURL: string) => {
    set({ photoURL })
  },
  setUid: (uid: string) => {
    set({ uid })
  },
  setProviderId: (providerId: string) => {
    set({ providerId })
  },
  setEmail: (email: string) => {
    set({ email })
  },
  setAll: (info:firebase.UserInfo) => {
    set({
      displayName:info.displayName || '',
      photoURL: info.photoURL || '',
      uid: info.uid || '',
      providerId: info.providerId || '',
      phoneNumber: info.phoneNumber || '',
      email: info.email || '',
    })
  },
  clearAll: () => {
    set({
      displayName: '',
      photoURL: '',
      uid: '',
      providerId: '',
      phoneNumber: '',
      email: ''
    })
  } ,
  setError: (error: AuthError) => {
    set({ error })
  }
}))