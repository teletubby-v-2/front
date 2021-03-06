import React, { Key, useEffect, useState } from 'react'
import { LectureContainer } from '../../components'
import { MyProfile } from './components/MyProfile'
import { CreateLectureForm } from '../../components/CreateLectureForm'
import { MyQR } from './components/MyQR'
import { userInfoStore } from '../../store/user.store'
import { LectureDTO } from '../../constants/dto/lecture.dto'
import { lectureStore } from '../../store/lecture.store'
import { Button, Card, Tooltip } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { SubjectTable } from '../../components/SubjectTable'
import { getBookmarkLectures, getOwnLectures } from '../../service/lectures/getLecture'
import { AddSubject } from '../../components/SubjectTable/components/AddSubject'
import { TableRowSelection } from 'antd/lib/table/interface'
import { UserSubjectDTO } from '../../constants/dto/myUser.dto'
import { Link, useHistory } from 'react-router-dom'
import { containerTitle } from '../../utils/titleLecture'
import { ProfileSkeleton } from '../../components/MySkeleton/ProfileSkeleton'
import { getUserFromIndexDB } from '../../utils/firebase'

export const Profile: React.FC = () => {
  const { userInfo } = userInfoStore()
  const history = useHistory()
  const { ownLecture, setOwnLecture } = lectureStore()
  const [bookmarkLecture, setBookmarkLecture] = useState<LectureDTO[]>([] as LectureDTO[])
  const [selectKey, setSelectKey] = useState<Key[]>([])
  const [loading1, setLoading1] = useState(false)
  const [loading2, setLoading2] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rowSelection: TableRowSelection<UserSubjectDTO> = {
    selectedRowKeys: selectKey,
    onChange: selectedRowKeys => setSelectKey(selectedRowKeys),
  }

  useEffect(() => {
    getUserFromIndexDB()
      .then(value => {
        if (!value) history.push('/login')
      })
      .catch(() => history.push('/login'))
  }, [])

  useEffect(() => {
    setOwnLecture([])
    if (userInfo.userId) {
      setLoading1(true)
      getOwnLectures(userInfo.userId, 10)
        .then(data => setOwnLecture(data))
        .finally(() => setLoading1(false))
    }
  }, [userInfo.userId])

  useEffect(() => {
    if (bookmarkLecture.length === 0 && userInfo.bookmark && userInfo.bookmark.length !== 0) {
      setLoading2(true)
      getBookmarkLectures(userInfo.bookmark, 10)
        .then(data => setBookmarkLecture(data))
        .finally(() => setLoading2(false))
    }
  }, [userInfo.bookmark])

  return (
    <>
      <div className="flex justify-center my-10 space-x-6">
        <div className="flex-shrink-0 profile">
          <Card className="shadow-1 mb-6">
            <ProfileSkeleton loading={loading1}>
              <MyProfile />
            </ProfileSkeleton>
          </Card>
          <Card className="shadow-1">
            <MyQR />
          </Card>
        </div>
        <div className="flex-grow">
          <div className=" space-y-8">
            <LectureContainer
              numOfSkeleton={10}
              profile
              limit={8}
              title={containerTitle.ownLecture}
              data={ownLecture}
              loading={loading1}
              extra={
                <div className="space-x-3">
                  <CreateLectureForm className="inline-block" />
                  <Link to="/viewAll/ownLecture">???????????????????????????</Link>
                </div>
              }
            />
            <LectureContainer
              profile
              title={containerTitle.bookmark}
              numOfSkeleton={10}
              limit={8}
              data={bookmarkLecture}
              loading={loading2}
              extra={<Link to="/viewAll/bookmark">???????????????????????????</Link>}
            />
            <Card
              title={<span className="text-xl">{containerTitle.mySubject}</span>}
              extra={
                <>
                  <Tooltip title="????????????????????????????????????????????????????????????">
                    <Button
                      type="primary"
                      icon={<SearchOutlined />}
                      className="mr-3"
                      disabled={!selectKey.length}
                      onClick={async () => {
                        let searchSubject: string[] = []
                        for await (const id of selectKey) {
                          const subjectId = userInfo.userSubject.find(
                            table => table.title === id,
                          )?.subjectId
                          if (subjectId) searchSubject = [...searchSubject, ...subjectId]
                        }
                        history.push(`/viewAll/${JSON.stringify(searchSubject)}`)
                      }}
                    >
                      ???????????????
                    </Button>
                  </Tooltip>
                  <AddSubject>
                    <Button type="primary" icon={<PlusOutlined />}>
                      ??????????????????????????????
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
    </>
  )
}
