import { LectureDTO } from './../../constants/dto/lecture.dto'
import { Lecture } from './../../constants/interface/lecture.interface'

export type TLecture = {
  ownLecture: LectureDTO[]
  relativeLecture: Lecture[]
  recentLecture: Lecture[]
  setOwnLecture: (lectures: Lecture[]) => void
  addOwnLecture: (lecture: Lecture) => void
  removeOwnLecture: (lectureid: string) => void
  setRelativeLecture: (lectures: Lecture[]) => void
  addRelativeLecture: (lecture: Lecture) => void
  removeRelativeLecture: (lectureid: string) => void
  setRecentLecture: (lectures: Lecture[]) => void
  addRecentLecture: (lecture: Lecture) => void
  removeRecentLecture: (lectureid: string) => void
  clearOwnLecture: () => void
  clearRelativeLecture: () => void
  clearRecentLecture: () => void
  clearAll: () => void
}
