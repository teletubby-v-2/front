import { MyUser, SocialLink } from './../../constants/interface/myUser.interface'
import firebase from 'firebase/app'

export interface UserInfo {
  userInfo: MyUser
  setUserName: (userName: string) => void
  setImageURL: (imageURL: string) => void
  setSocialLink: (socialLink: SocialLink[]) => void
  setFollower: (follower: string[]) => void
  addFollower: (userid: string) => void
  removeFollower: (userid: string) => void
  setFollowing: (following: string[]) => void
  addFollowing: (userid: string) => void
  removeFollowing: (userid: string) => void
  setFollowLecture: (lectureId: string[]) => void
  addFollowLecture: (lectureId: string) => void
  removeFollowLecture: (lectureId: string) => void
  setAll: (info: MyUser) => void
  setAllFirebase: (info: firebase.UserInfo) => void
  clearAll: () => void
  setAboutme: (aboutme: string) => void
}
