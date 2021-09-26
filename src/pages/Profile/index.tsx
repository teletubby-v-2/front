import React, { Key, useEffect, useState } from 'react'
import { LectureContainer } from '../../components'
import { MyProfile } from './components/MyProfile'
import { CreateLectureForm } from '../../components/CreateLectureForm'
import { MyQR } from './components/MyQR'
import { userInfoStore } from '../../store/user.store'
import { LectureDTO } from '../../constants/dto/lecture.dto'
import { firebaseApp } from '../../config/firebase'
import { lectureStore } from '../../store/lecture.store'
import { Button, Card, Tooltip } from 'antd'
import { DiffTwoTone, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { SubjectTable } from '../../components/SubjectTable'
import { getBookmarkLectures, getOwnLectures } from '../../service/lectures/getLecture'
import { AddSubject } from '../../components/SubjectTable/components/AddSubject'
import { TableRowSelection } from 'antd/lib/table/interface'
import { UserSubjectDTO } from '../../constants/dto/myUser.dto'
import { Link, useHistory } from 'react-router-dom'

export const Profile: React.FC = () => {
  const { userInfo } = userInfoStore()
  const history = useHistory()
  const { ownLecture, setOwnLecture } = lectureStore()
  const [bookmarkLecture, setBookmarkLecture] = useState<LectureDTO[]>([] as LectureDTO[])
  const [selectKey, setSelectKey] = useState<Key[]>([])
  const rowSelection: TableRowSelection<UserSubjectDTO> = {
    selectedRowKeys: selectKey,
    onChange: selectedRowKeys => setSelectKey(selectedRowKeys),
  }
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
                    <Link to="/viewAll/ownLecture">ดูทั้งหมด</Link>
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
                    <Tooltip title="เลือกตารางเพื่อค้นหา">
                      <Button
                        type="primary"
                        icon={<SearchOutlined />}
                        className="mr-3"
                        disabled={!selectKey.length}
                        onClick={async () => {
                          let searchSubject: string[] = []
                          for await (const id of selectKey) {
                            console.log(
                              userInfo.userSubject.find(table => table.title === id)?.subjectId,
                            )
                            const subjectId = userInfo.userSubject.find(
                              table => table.title === id,
                            )?.subjectId
                            if (subjectId) searchSubject = [...searchSubject, ...subjectId]
                          }
                          history.push(`/viewAll/${JSON.stringify(searchSubject)}`)
                        }}
                      >
                        ค้นหา
                      </Button>
                    </Tooltip>
                    <AddSubject>
                      <Button type="primary" icon={<PlusOutlined />}>
                        เพิ่มตาราง
                      </Button>
                    </AddSubject>
                  </>
                }
                className="shadow-1"
              >
                <SubjectTable rowSelection={rowSelection} />
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
