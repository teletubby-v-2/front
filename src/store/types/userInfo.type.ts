import firebase from 'firebase/app'
import { AuthError } from '../../constants/interface/error.interface'

export interface UserInfo extends firebase.UserInfo {
  error: AuthError
  setDisplayName: (displayName: string) => void
  setPhotoURL: (photoURL: string) => void
  setUid: (uid: string) => void
  setProviderId: (providerId: string) => void
  setEmail: (email: string) => void
  setAll: (info: firebase.UserInfo) => void
  clearAll: () => void
  setError: (error: AuthError) => void
}
