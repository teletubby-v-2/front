import { MyUser, SocialLink } from './../../constants/interface/myUser.interface'
import firebase from 'firebase/app'

export interface UserInfo {
  userInfo: MyUser
  setUserName: (userName: string) => void
  setImageURL: (imageURL: string) => void
  setSocialLink: (socialLink: SocialLink[]) => void
  setFollower: (follower: string[]) => void
  addFollower: (userId: string) => void
  removeFollower: (userId: string) => void
  setFollowing: (following: string[]) => void
  addFollowing: (userId: string) => void
  removeFollowing: (userId: string) => void
  addBookmark: (lectureId: string) => void
  removeBookmark: (lectureId: string) => void
  setAll: (info: MyUser) => void
  setAllFirebase: (info: firebase.UserInfo) => void
  clearAll: () => void
  setAboutme: (aboutme: string) => void
  setDonate: (donateImage: string, description: string) => void
}
