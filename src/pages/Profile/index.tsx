import React, { useState } from 'react'
import { LectureContainer } from '../../components'
import { dummyLectures } from '../../constants/dummyData/lecture.dummy'
import { CreateLecture } from './components/CreateLecture'
import { MyProfile } from './components/MyProfile'

export const Profile: React.FC = () => {
  const [isViewAllOwn, setIsViewAllOwn] = useState(false)
  const [isViewAllRecent, setIsViewAllRecent] = useState(false)
  const [isOnCreate, setIsOnCreate] = useState(false)

  return (
    <>
      <div className="flex justify-center my-10">
        <MyProfile />
        <div className="w-1/2 m-2.5">
          <LectureContainer
            title="My Lecture"
            style={{ minHeight: '500px' }}
            data={dummyLectures}
            limit={8}
            viewAll={isViewAllOwn}
            extra={
              <>
                <CreateLecture className="inline-block" />
                <span className="m-2" />
                <a onClick={() => setIsViewAllOwn(!isViewAllOwn)}>
                  {isViewAllOwn ? 'View Less' : 'View All'}
                </a>
              </>
            }
          />
          <div className="m-4"></div>
          <LectureContainer
            title="Recent Lecture"
            style={{ minHeight: '500px' }}
            data={dummyLectures}
            limit={8}
            viewAll={isViewAllRecent}
            extra={
              <a onClick={() => setIsViewAllRecent(!isViewAllRecent)}>
                {isViewAllRecent ? 'View Less' : 'View All'}
              </a>
            }
          />
        </div>
      </div>
    </>
  )
}
