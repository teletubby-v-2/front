import React, { useState } from 'react'
import { LectureContainer } from '../../components'
import { dummyLectures } from '../../constants/dummyData/lecture.dummy'
import { MyProfile } from './components/MyProfile'
import { CreateLectureForm } from '../../components/CreateLectureForm'

export const Profile: React.FC = () => {
  const [isViewAllOwn, setIsViewAllOwn] = useState(false)
  const [isViewAllRecent, setIsViewAllRecent] = useState(false)

  return (
    <>
      <div className="flex justify-center my-10 space-x-5">
        <div className="w-1/4">
          <MyProfile />
        </div>
        <div className="w-3/4 space-y-5">
          <LectureContainer
            title="My Lecture"
            data={dummyLectures}
            limit={8}
            viewAll={isViewAllOwn}
            extra={
              <>
                <CreateLectureForm className="inline-block" />
                <span className="m-2" />
                <a onClick={() => setIsViewAllOwn(!isViewAllOwn)}>
                  {isViewAllOwn ? 'View Less' : 'View All'}
                </a>
              </>
            }
          />
          <div></div>
          <LectureContainer
            title="Recent Lecture"
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
