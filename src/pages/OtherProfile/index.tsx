import React, { useEffect, useMemo, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { ProfileComponent } from '../../components/ProfileComponent/ProfileComponent'
import { MyUser } from '../../constants/interface/myUser.interface'
import { QRComponent } from '../../components/QRComponent/QRComponent'
import { LectureContainer } from '../../components'
import { LectureDTO } from '../../constants/dto/lecture.dto'
import { getUserDetial } from '../../service/user'
import { getOwnLectures } from '../../service/lectures/getLecture'
import BookOutlined from '@ant-design/icons/lib/icons/BookOutlined'
import { Card } from 'antd'

export const OtherProfile: React.FC = () => {
  const [info, setinfo] = useState({} as MyUser)
  const [otherlecture, setotherlecture] = useState([] as LectureDTO[])
  const history = useHistory()
  const { userId } = useParams<{ userId: string }>()
  const [loading, setLoading] = useState(false)

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
    setLoading(true)
    if (userId) {
      getOwnLectures(userId, 10)
        .then(data => setotherlecture(data))
        .finally(() => setLoading(false))
    }
  }, [userId])

  const title = useMemo(() => {
    return (
      <>
        <BookOutlined className="mr-3" />
        สรุปของ {`"${info.userName}"`}
      </>
    )
  }, [info])
  const viewAllurl = useMemo(() => {
    return '/viewAll/' + info.userName + 'lecture' + userId
  }, [info, userId])

  return (
    <>
      <div className="flex justify-center my-10 space-x-6">
        <div style={{ width: 350 }}>
          <Card className="mb-6 shadow-1">
            <ProfileComponent isMy={false} info={info} />
          </Card>
          <Card className="shadow-1">
            <QRComponent isMy={false} Info={info} />
          </Card>
        </div>
        <div className="flex-grow">
          <div className=" space-y-8">
            <LectureContainer
              numOfSkeleton={10}
              title={title}
              data={otherlecture}
              limit={8}
              loading={loading}
              extra={
                <div className="space-x-3">
                  <Link to={viewAllurl}>ดูทั้งหมด</Link>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </>
  )
}
