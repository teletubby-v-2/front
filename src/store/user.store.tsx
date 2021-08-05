import firebase from 'firebase/app'
import create from 'zustand'
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
    followLecture: [],
    follower: [], //user id
    following: [], //user id
    donateImage: '',
    donateDescription: '',
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
  setFollowLecture: (lectureId: string[]) => {
    set({ userInfo: { ...get().userInfo, followLecture: lectureId } })
  },
  addFollowLecture: (lectureId: string) => {
    set({
      userInfo: {
        ...get().userInfo,
        followLecture: [lectureId, ...get().userInfo.followLecture],
      },
    })
  },
  removeFollowLecture: (lectureId: string) => {
    set({
      userInfo: {
        ...get().userInfo,
        followLecture: get().userInfo.followLecture.filter(lecture => lecture !== lectureId),
      },
    })
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
  clearAll: () => {
    set({
      userInfo: {
        userId: '',
        email: '',
        imageUrl: '',
        userName: '',
        socialLink: [],
        userSubject: [],
        followLecture: [],
        follower: [], //user id
        following: [], //user id
        donateImage: '',
        donateDescription: '',
      },
    })
  },
}))
