import React, { useEffect, useMemo, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ProfileComponent } from '../../components/ProfileComponent/ProfileComponent'
import { MyUser } from '../../constants/interface/myUser.interface'
import styled from 'styled-components'
import { QRComponent } from '../../components/QRComponent/QRComponent'
import { LectureContainer } from '../../components'
import { LectureDTO } from '../../constants/dto/lecture.dto'
import { getUserDetial } from '../../service/user'
import { getOwnLectures } from '../../service/lectures/getLecture'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const OtherProfile: React.FC = () => {
  const [info, setinfo] = useState({} as MyUser)
  const [otherlecture, setotherlecture] = useState([] as LectureDTO[])
  const history = useHistory()
  const { userId } = useParams<{ userId: string }>()

  useEffect(() => {
    getUserDetial(userId)
      .then(doc => {
        setinfo({ ...doc, userId: doc.userId } as MyUser)
      })
      .catch(() => {
        history.replace('/Not_found')
      })
  }, [userId])

  useEffect(() => {
    setotherlecture([])
    if (userId) {
      getOwnLectures(userId).then(data => setotherlecture(data))
    }
  }, [userId])

  const title = useMemo(() => {
    return 'สรุปของ ' + info.userName
  }, [info])
  const viewAllurl = useMemo(() => {
    return '/viewAll/' + info.userName + 'lecture' + userId
  }, [info, userId])

  return (
    <>
      <div className="flex justify-center my-10 space-x-6">
        <div style={{ width: 350 }}>
          <div className="mb-6 shadow-1">
            <ProfileComponent isMy={false} info={info} />
          </div>
          <div className="shadow-1">
            <QRComponent isMy={false} Info={info} />
          </div>
        </div>
        <div className="flex-grow">
          <div className=" space-y-8">
            <LectureContainer
              profile
              title={title}
              data={otherlecture}
              limit={8}
              extra={
                <div className="space-x-3">
                  <a href={viewAllurl}>ดูทั้งหมด</a>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </>
  )
}
