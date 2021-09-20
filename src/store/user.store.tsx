import firebase from 'firebase/app'
import create from 'zustand'
import { UserSubjectDTO } from '../constants/dto/myUser.dto'
import { MyUser, SocialLink } from '../constants/interface/myUser.interface'
import { UserInfo } from './types/userInfo.type'

export const userInfoStore = create<UserInfo>((set, get) => ({
  userInfo: {
    userId: '',
    email: '',
    imageUrl: '',
    userName: '',
    socialLink: [],
    userSubject: [],
    followers: [], //user id
    following: [], //user id
    lectureCount: 0,
    notificationReadCount: [],
    donateImage: '',
    donateDescription: '',
    aboutme: '',
    bookmark: [],
  },
  setUserSubject: (userSubject: UserSubjectDTO[]) => {
    set({ userInfo: { ...get().userInfo, userSubject } })
  },
  setDonate: (donateImage: string, donateDescription: string) => {
    set({ userInfo: { ...get().userInfo, donateImage, donateDescription } })
  },
  setUserName: (userName: string) => {
    set({ userInfo: { ...get().userInfo, userName } })
  },
  setImageURL: (imageUrl: string) => {
    set({ userInfo: { ...get().userInfo, imageUrl } })
  },
  setSocialLink: (socialLink: SocialLink[]) => {
    set({ userInfo: { ...get().userInfo, socialLink } })
  },
  setAllFirebase: (info: firebase.UserInfo) => {
    set({
      userInfo: {
        ...get().userInfo,
        userName: info.displayName || '',
        imageUrl: info.photoURL || '',
        userId: info.uid || '',
        email: info.email || '',
      },
    })
  },
  setAll: (info: MyUser) => {
    set({ userInfo: info })
  },
  setFollower: (followers: string[]) => {
    set({ userInfo: { ...get().userInfo, followers } })
  },
  addFollower: (userId: string) => {
    set({ userInfo: { ...get().userInfo, followers: [...get().userInfo.followers, userId] } })
  },
  removeFollower: (userId: string) => {
    set({
      userInfo: {
        ...get().userInfo,
        followers: get().userInfo.followers.filter((i: string) => i != userId),
      },
    })
  },
  setFollowing: (following: string[]) => {
    set({ userInfo: { ...get().userInfo, following } })
  },
  addFollowing: (userId: string) => {
    set({ userInfo: { ...get().userInfo, following: [...get().userInfo.following, userId] } })
  },
  addBookmark: (lectureId: string) => {
    set({ userInfo: { ...get().userInfo, bookmark: [...get().userInfo.bookmark, lectureId] } })
  },
  removeBookmark: (lectureId: string) => {
    set({
      userInfo: {
        ...get().userInfo,
        bookmark: [...get().userInfo.bookmark.filter((i: string) => i != lectureId)],
      },
    })
  },
  removeFollowing: (userId: string) => {
    set({
      userInfo: {
        ...get().userInfo,
        following: get().userInfo.following.filter((i: string) => i != userId),
      },
    })
  },
  clearAll: () => {
    set({
      userInfo: {
        notificationReadCount: [],
        userId: '',
        email: '',
        imageUrl: '',
        userName: '',
        socialLink: [],
        userSubject: [],
        followers: [], //user id
        following: [], //user id
        donateImage: '',
        donateDescription: '',
        lectureCount: 0,
        aboutMe: '',
        bookmark: [],
      },
    })
  },
  setAboutme: (aboutMe: string) => {
    set({ userInfo: { ...get().userInfo, aboutMe } })
  },
}))
