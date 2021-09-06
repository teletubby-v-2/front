import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ProfileComponent } from '../../components/ProfileComponent/ProfileComponent'
import { firestore } from '../../config/firebase'
import { Collection } from '../../constants'
import { MyUser } from '../../constants/interface/myUser.interface'
import { Spin } from 'antd'
import styled from 'styled-components'
import { QRComponent } from '../../components/QRComponent/QRComponent'
import { LectureContainer } from '../../components'
import { LectureDTO } from '../../constants/dto/lecture.dto'

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
  const [Info, setInfo] = useState({} as MyUser)
  const [Lecture, setLecture] = useState([] as LectureDTO[])
  const history = useHistory()
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    firestore
      .collection(Collection.Users)
      .doc(id)
      .get()
      .then(doc => {
        if (doc.exists) {
          setInfo({ ...doc.data(), userId: doc.id } as MyUser)
        } else {
          history.push('/Not_found')
        }
      })
  }, [id])

  useEffect(() => {
    setLecture([])
    if (id) {
      firestore
        .collection(Collection.Lectures)
        .where('userId', '==', id)
        .get()
        .then(doc => {
          doc.forEach(lecture => {
            setLecture([...Lecture, { lectureId: lecture.id, ...lecture.data() } as LectureDTO])
          })
        })
    }
  }, [id])

  const title = 'สรุปของ ' + Info.userName
  const viewAllurl = '/viewAll/' + Info.userName + 'lecture' + id

  return (
    <>
      <div className="flex justify-center my-10 space-x-6">
        <div style={{ width: 350 }}>
          <div className="mb-6 shadow-1">
            <ProfileComponent isMy={false} Info={Info} />
          </div>
          <div className="shadow-1">
            <QRComponent isMy={false} Info={Info} />
          </div>
        </div>
        <div className="flex-grow">
          <div className=" space-y-8">
            <LectureContainer
              profile
              title={title}
              data={Lecture}
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
