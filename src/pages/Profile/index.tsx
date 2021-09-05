import React, { useEffect, useState } from 'react'
import { LectureContainer } from '../../components'
import { MyProfile } from './components/MyProfile'
import { CreateLectureForm } from '../../components/CreateLectureForm'
import { MyQR } from './components/MyQR'
import { userInfoStore } from '../../store/user.store'
import { LectureDTO } from '../../constants/dto/lecture.dto'
import { firestore } from '../../config/firebase'
import { Collection } from '../../constants'
import firebase from 'firebase/app'

export const Profile: React.FC = () => {
  const { userInfo } = userInfoStore()
  const [bookmarkLecture, setBookmarkLecture] = useState<LectureDTO[]>([] as LectureDTO[])
  const [ownLecture, setOwnLecture] = useState<LectureDTO[]>([] as LectureDTO[])

  useEffect(() => {
    if (ownLecture.length === 0 && userInfo.userId) {
      firestore
        .collection(Collection.Lectures)
        .where('userId', '==', userInfo.userId)
        .get()
        .then(doc => {
          doc.forEach(lecture => {
            setOwnLecture(ownLecture => [
              ...ownLecture,
              { lectureId: lecture.id, ...lecture.data() } as LectureDTO,
            ])
          })
        })
    }
  }, [userInfo.userId])

  useEffect(() => {
    if (bookmarkLecture.length === 0 && userInfo.bookmark && userInfo.bookmark.length !== 0) {
      firestore
        .collection(Collection.Lectures)
        .where(firebase.firestore.FieldPath.documentId(), 'in', userInfo.bookmark)
        .get()
        .then(doc => {
          doc.forEach(lecture => {
            setBookmarkLecture(bookmarklLecture => [
              ...bookmarklLecture,
              { lectureId: lecture.id, ...lecture.data() } as LectureDTO,
            ])
          })
        })
    }
  }, [userInfo.bookmark])

  return (
    <div className="flex justify-center my-10 space-x-6">
      <div style={{ width: 350 }}>
        <div className="mb-6 shadow-1">
          <MyProfile />
        </div>
        <div className="shadow-1">
          <MyQR />
        </div>
      </div>
      <div className="flex-grow">
        <div className=" space-y-8">
          <LectureContainer
            profile
            title="สรุปของฉัน"
            data={ownLecture}
            limit={8}
            extra={
              <div className="space-x-3">
                <CreateLectureForm className="inline-block" />
                <a href="/viewAll/ownLecture">ดูทั้งหมด</a>
              </div>
            }
          />
          <LectureContainer
            profile
            title="บุ๊คมาร์ค"
            data={bookmarkLecture}
            limit={8}
            extra={<a href="/viewAll/bookmark">ดูทั้งหมด</a>}
          />
        </div>
      </div>
      {/* </div> */}
    </div>
  )
}
