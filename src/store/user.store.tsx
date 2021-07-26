import { UserInfo } from './types/userInfo.type'
import firebase from 'firebase/app'
import create from 'zustand'
import { MyUser } from '../constants/interface/myUser.interface'

export const userInfoStore = create<UserInfo>((set, get) => ({
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
  setDisplayName: (displayName: string) => {
    set({ displayName })
  },
  setPhotoURL: (photoURL: string) => {
    set({ photoURL })
  },
  setUserId: (userId: string) => {
    set({ userId })
  },
  setProviderId: (providerId: string) => {
    set({ providerId })
  },
  setEmail: (email: string) => {
    set({ email })
  },
  setAll: (info: MyUser) => {
    set({
      displayName: info.displayName,
      photoURL: info.photoURL,
      userId: info.userId,
      providerId: info.providerId,
      phoneNumber: info.phoneNumber,
      email: info.email,
      type: info.type,
      likedLectures: info.likedLectures,
      lectureCount: info.lectureCount,
      follower: info.follower,
      following: info.following,
      lecture: info.lecture,
      notificationUnReadCount: info.notificationUnReadCount,
      notificationCount: info.notificationCount,
    })
  },
  setAllFirebase: (info: firebase.UserInfo) => {
    set({
      displayName: info.displayName || '',
      photoURL: info.photoURL || '',
      userId: info.uid || '',
      providerId: info.providerId || '',
      phoneNumber: info.phoneNumber || '',
      email: info.email || '',
    })
  },
  setLikedLectures: (lectureId: string[]) => {
    set({ likedLectures: lectureId })
  },
  setFollower: (follower: string[]) => {
    set({ follower })
  },
  addFollower: (userid: string) => {
    set({ follower: [...get().follower, userid] })
  },
  removeFollower: (userid: string) => {
    set({ follower: get().follower.filter(i => i != userid) })
  },
  setFollowing: (following: string[]) => {
    set({ following })
  },
  addFollowing: (userid: string) => {
    set({ following: [...get().following, userid] })
  },
  removeFollowing: (userid: string) => {
    set({ following: get().following.filter(i => i != userid) })
  },
  setLecture: (lectureId: string[]) => {
    set({ lecture: lectureId })
  },
  addLecture: (lectureId: string) => {
    set({ lecture: [...get().lecture, lectureId] })
  },
  removeLecture: (lectureId: string) => {
    set({ lecture: get().lecture.filter(i => i != lectureId) })
  },
  clearAll: () => {
    set({
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
    })
  },
}))
