import firebase from 'firebase/app';

export interface UserInfo extends firebase.UserInfo { 
  setDisplayName: (displayName: string) => void;
  setPhotoURL: (photoURL: string) => void;
  setUid: (uid: string) => void;
  setProviderId: (providerId: string) => void;
  setEmail: (email: string) => void;
  setAll: (info: firebase.UserInfo) => void;
  clearAll: () => void;
}
