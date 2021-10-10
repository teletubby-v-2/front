import { MyUser, SocialLink } from './../../constants/interface/myUser.interface'
import firebase from 'firebase/app'
import { UserSubjectDTO } from '../../constants/dto/myUser.dto'

export interface UserInfo {
  userInfo: MyUser
  isOldUser: boolean
  setUserName: (userName: string) => void
  setImageURL: (imageURL: string) => void
  setSocialLink: (socialLink: SocialLink) => void
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
  setUserSubject: (userSubject: UserSubjectDTO[]) => void
  addNotificationReadCount: (notiId: string) => void
  setNotificationReadCount: (notiIds: string[]) => void
}
