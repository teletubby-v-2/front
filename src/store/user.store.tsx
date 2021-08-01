import firebase from 'firebase/app'
import create from 'zustand'
import { MyUser } from '../constants/interface/myUser.interface'
import { UserInfo } from './types/userInfo.type'

export const userInfoStore = create<UserInfo>((set, get) => ({
  userInfo: {
    displayName: '',
    photoURL: '',
    userId: '',
    providerId: '',
    phoneNumber: '',
    email: '',
    type: 0,
    likedLectures: [], //lecture id
    lectureCount: 0,
    follower: [], //user id
    following: [], //user id
    lecture: [], //lecture id
    notificationUnReadCount: 0,
    notificationCount: 0,
  },
  setDisplayName: (displayName: string) => {
    set({ userInfo: { ...get().userInfo, displayName } })
  },
  setPhotoURL: (photoURL: string) => {
    set({ userInfo: { ...get().userInfo, photoURL } })
  },
  setUserId: (userId: string) => {
    set({ userInfo: { ...get().userInfo, userId } })
  },
  setProviderId: (providerId: string) => {
    set({ userInfo: { ...get().userInfo, providerId } })
  },
  setEmail: (email: string) => {
    set({ userInfo: { ...get().userInfo, email } })
  },
  setAll: (info: MyUser) => {
    set({ userInfo: info })
  },
  setAllFirebase: (info: firebase.UserInfo) => {
    set({
      userInfo: {
        ...get().userInfo,
        displayName: info.displayName || '',
        photoURL: info.photoURL || '',
        userId: info.uid || '',
        providerId: info.providerId || '',
        phoneNumber: info.phoneNumber || '',
        email: info.email || '',
      },
    })
  },
  setLikedLectures: (lectureId: string[]) => {
    set({ userInfo: { ...get().userInfo, likedLectures: lectureId } })
  },
  setFollower: (follower: string[]) => {
    set({ userInfo: { ...get().userInfo, follower } })
  },
  addFollower: (userid: string) => {
    set({ userInfo: { ...get().userInfo, follower: [...get().userInfo.follower, userid] } })
  },
  removeFollower: (userid: string) => {
    set({
      userInfo: {
        ...get().userInfo,
        follower: get().userInfo.follower.filter((i: string) => i != userid),
      },
    })
  },
  setFollowing: (following: string[]) => {
    set({ userInfo: { ...get().userInfo, following } })
  },
  addFollowing: (userid: string) => {
    set({ userInfo: { ...get().userInfo, following: [...get().userInfo.following, userid] } })
  },
  removeFollowing: (userid: string) => {
    set({
      userInfo: {
        ...get().userInfo,
        following: get().userInfo.following.filter((i: string) => i != userid),
      },
    })
  },
  setLecture: (lectureId: string[]) => {
    set({ userInfo: { ...get().userInfo, lecture: lectureId } })
  },
  addLecture: (lectureId: string) => {
    set({ userInfo: { ...get().userInfo, lecture: [...get().userInfo.lecture, lectureId] } })
  },
  removeLecture: (lectureId: string) => {
    set({
      userInfo: {
        ...get().userInfo,
        lecture: get().userInfo.lecture.filter((i: string) => i != lectureId),
      },
    })
  },
  clearAll: () => {
    set({
      userInfo: {
        displayName: '',
        photoURL: '',
        userId: '',
        providerId: '',
        phoneNumber: '',
        email: '',
        type: 0,
        likedLectures: [],
        lectureCount: 0,
        follower: [],
        following: [],
        lecture: [],
        notificationUnReadCount: 0,
        notificationCount: 0,
      },
    })
  },
}))
