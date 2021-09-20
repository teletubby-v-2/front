import React, { useEffect, useState } from 'react'
import { LectureContainer } from '../../components'
import { MyProfile } from './components/MyProfile'
import { CreateLectureForm } from '../../components/CreateLectureForm'
import { MyQR } from './components/MyQR'
import { userInfoStore } from '../../store/user.store'
import { LectureDTO } from '../../constants/dto/lecture.dto'
import { firebaseApp } from '../../config/firebase'
import { lectureStore } from '../../store/lecture.store'
import { Button, Card } from 'antd'
import { DiffTwoTone, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { SubjectTable } from '../../components/SubjectTable'
import { getBookmarkLectures, getOwnLectures } from '../../service/lectures/getLecture'

export const Profile: React.FC = () => {
  const { userInfo } = userInfoStore()
  const { ownLecture, setOwnLecture } = lectureStore()
  const [bookmarkLecture, setBookmarkLecture] = useState<LectureDTO[]>([] as LectureDTO[])
  // const [ownLecture, setOwnLecture] = useState<LectureDTO[]>([] as LectureDTO[])

  useEffect(() => {
    setOwnLecture([])
    if (userInfo.userId) {
      getOwnLectures(userInfo.userId).then(data => setOwnLecture(data))
    }
  }, [userInfo.userId])

  useEffect(() => {
    if (bookmarkLecture.length === 0 && userInfo.bookmark && userInfo.bookmark.length !== 0) {
      getBookmarkLectures(userInfo.bookmark).then(data => setBookmarkLecture(data))
    }
  }, [userInfo.bookmark])

  return (
    <>
      {firebaseApp.auth().currentUser ? (
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
              <Card
                title={
                  <>
                    <DiffTwoTone twoToneColor="black" className="align-text-top" /> วิชาของฉัน
                  </>
                }
                extra={
                  <>
                    <Button
                      type="primary"
                      icon={<SearchOutlined className="align-middle" />}
                      className="mr-3"
                    >
                      ค้นหา
                    </Button>
                    <Button type="primary" icon={<PlusOutlined className="align-middle" />}>
                      เพิ่มตาราง
                    </Button>
                  </>
                }
                className="shadow-1"
              >
                <SubjectTable data={userInfo.userSubject} />
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="text-center text-3xl my-48">กรุณา ลงชี่อเข้าใช้ เพื่อใช้งานหน้านี้</div>
        </>
      )}
    </>
  )
}
