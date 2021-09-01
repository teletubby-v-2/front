import React, { useEffect, useState } from 'react'
import { LectureContainer } from '../../components'
import { dummyLectures } from '../../constants/dummyData/lecture.dummy'
import { userInfoStore } from '../../store/user.store'
import { Dropdown, Menu } from 'antd'
import { DownOutlined } from '@ant-design/icons/lib/icons'
import { LectureDTO } from '../../constants/dto/lecture.dto'
import { firestore } from '../../config/firebase'
import { Collection } from '../../constants'
import firebase from 'firebase'
export const Home: React.FC = () => {
  const { userInfo } = userInfoStore()

  const [allLecture, setAllLecture] = useState<LectureDTO[]>([] as LectureDTO[])
  const [bookmarkLecture, setBookmarkLecture] = useState<LectureDTO[]>([] as LectureDTO[])

  useEffect(() => {
    firestore
      .collection(Collection.Lectures)
      .orderBy('createAt', 'desc')
      .get()
      .then(doc => {
        doc.forEach(lecture => {
          setAllLecture(allLecture => [
            ...allLecture,
            { lectureId: lecture.id, ...lecture.data() } as LectureDTO,
          ])
          // if (userInfo.bookmark.findIndex(id => id === lecture.id)) {
          //   setBookmarkLecture(bookmarkLecture => [
          //     ...bookmarkLecture,
          //     { lectureId: lecture.id, ...lecture.data() } as LectureDTO,
          //   ])
          // }
        })
      })
  }, [])

  useEffect(() => {
    if (bookmarkLecture.length === 0) {
      userInfo.bookmark &&
        userInfo.bookmark.length !== 0 &&
        firestore
          .collection(Collection.Lectures)
          .where(firebase.firestore.FieldPath.documentId(), 'in', userInfo.bookmark)
          .get()
          .then(doc => {
            doc.forEach(lecture => {
              console.log(lecture.data())
              setBookmarkLecture(bookmarklLecture => [
                ...bookmarklLecture,
                { lectureId: lecture.id, ...lecture.data() } as LectureDTO,
              ])
            })
          })
    }
  }, [userInfo])

  return (
    <div className="mb-10 mx-2 space-y-7 md:mx-5 lg:mx-20 xl:mx-30 ">
      {userInfo.userId && userInfo.userId.length !== 0 && (
        <>
          <LectureContainer
            className=""
            title="My Subject"
            data={dummyLectures}
            limit={8}
            extra={<a href="/myLecture">ดูทั้งหมด</a>}
          />
          <LectureContainer
            title="Bookmark Lectures"
            data={bookmarkLecture}
            limit={8}
            extra={<a href="/myLecture">ดูทั้งหมด</a>}
          />
        </>
      )}
      <LectureContainer
        title="Recent Lectures"
        data={allLecture}
        limit={8}
        extra={
          <div className="space-x-3">
            <Dropdown
              overlay={<Menu>{/* //TODO add filter component here */}</Menu>}
              trigger={['click']}
            >
              <a onClick={e => e.preventDefault()}>
                filter <DownOutlined />
              </a>
            </Dropdown>
            <Dropdown
              overlay={<Menu>{/* //TODO add sort component here */}</Menu>}
              trigger={['click']}
            >
              <a onClick={e => e.preventDefault()}>
                sort <DownOutlined />
              </a>
            </Dropdown>
          </div>
        }
      />
    </div>
  )
}
