import React, { useEffect, useState } from 'react'
import { LectureContainer } from '../../components'
import { userInfoStore } from '../../store/user.store'
import { Dropdown, Menu } from 'antd'
import { DownOutlined } from '@ant-design/icons/lib/icons'
import { LectureDTO } from '../../constants/dto/lecture.dto'
import { getLectures, getMySubject } from '../../service/lectures/getLecture'
export const Home: React.FC = () => {
  const { userInfo } = userInfoStore()
  const [allLecture, setAllLecture] = useState<LectureDTO[]>([] as LectureDTO[])
  const [mySubject, setMySubject] = useState<LectureDTO[]>([] as LectureDTO[])

  useEffect(() => {
    getLectures().then(data => setAllLecture(data))
  }, [])

  useEffect(() => {
    if (mySubject.length === 0 && userInfo.userSubject) {
      const subjectId = userInfo.userSubject
        .filter(subject => subject.isActive === true)
        .map(subject => subject.subjectId)
        .flatMap(x => x)
      if (subjectId && subjectId.length !== 0) {
        getMySubject(subjectId).then(data => setMySubject(data))
      }
    }
  }, [userInfo.userSubject])

  return (
    <div className="mb-10 mx-2 space-y-7 md:mx-5 lg:mx-20 xl:mx-30 ">
      {userInfo.userId && userInfo.userId.length !== 0 && (
        <LectureContainer
          title="วิชาของฉัน"
          data={mySubject}
          limit={10}
          extra={<a href="/viewAll/mySubject">ดูทั้งหมด</a>}
        />
      )}
      <LectureContainer
        title="สรุปล่าสุด"
        data={allLecture}
        limit={10}
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
