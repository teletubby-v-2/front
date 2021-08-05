import { MyUser } from './../../constants/interface/myUser.interface'
import firebase from 'firebase/app'

export interface UserInfo {
  userInfo: MyUser
  setDisplayName: (displayName: string) => void
  setPhotoURL: (photoURL: string) => void
  setUserId: (userId: string) => void
  setEmail: (email: string) => void
  setLikedLectures: (lectureId: string[]) => void
  setFollower: (follower: string[]) => void
  addFollower: (userid: string) => void
  removeFollower: (userid: string) => void
  setFollowing: (following: string[]) => void
  addFollowing: (userid: string) => void
  removeFollowing: (userid: string) => void
  setLecture: (lectureId: string[]) => void
  addLecture: (lectureId: string) => void
  removeLecture: (lectureId: string) => void
  setAll: (info: MyUser) => void
  setAllFirebase: (info: firebase.UserInfo) => void
  clearAll: () => void
}
