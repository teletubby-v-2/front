import create from 'zustand'
import { Lecture } from '../constants/interface/lecture.interface'
import { TLecture } from './types/lecture.type'

export const lectureStore = create<TLecture>((set, get) => ({
  ownLecture: [],
  relativeLecture: [],
  recentLecture: [],
  setOwnLecture: (lectures: Lecture[]) => {
    set({ ownLecture: lectures })
  },
  addOwnLecture: (lecture: Lecture) => {
    set({ ownLecture: [...get().ownLecture, lecture] })
  },
  removeOwnLecture: (lectureid: string) => {
    set({ ownLecture: get().ownLecture.filter(i => i.lectureId != lectureid) })
  },
  setRelativeLecture: (lectures: Lecture[]) => {
    set({ relativeLecture: lectures })
  },
  addRelativeLecture: (lecture: Lecture) => {
    set({ relativeLecture: [...get().relativeLecture, lecture] })
  },
  removeRelativeLecture: (lectureid: string) => {
    set({ relativeLecture: get().relativeLecture.filter(i => i.lectureId != lectureid) })
  },
  setRecentLecture: (lectures: Lecture[]) => {
    set({ recentLecture: lectures })
  },
  addRecentLecture: (lecture: Lecture) => {
    set({ recentLecture: [...get().recentLecture, lecture] })
  },
  removeRecentLecture: (lectureid: string) => {
    set({ recentLecture: get().recentLecture.filter(i => i.lectureId != lectureid) })
  },
  clearOwnLecture: () => {
    set({ ownLecture: [] })
  },
  clearRelativeLecture: () => {
    set({ relativeLecture: [] })
  },
  clearRecentLecture: () => {
    set({ recentLecture: [] })
  },
  clearAll: () => {
    set({
      ownLecture: [],
      relativeLecture: [],
      recentLecture: [],
    })
  },
}))
