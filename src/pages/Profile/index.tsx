import React from 'react'
import { LectureContainer } from '../../components'
import { dummyLectures } from '../../constants/dummyData/lecture.dummy'
import { MyProfile } from './components/MyProfile'
import { CreateLectureForm } from '../../components/CreateLectureForm'

export const Profile: React.FC = () => {
  return (
    <>
      <div className="flex justify-center my-10 space-x-8">
        <div className="w-1/4">
          <MyProfile />
        </div>
        <div className="w-3/4 space-y-8">
          <LectureContainer
            title="My Lecture"
            data={dummyLectures}
            limit={8}
            extra={
              <>
                <CreateLectureForm className="inline-block" />
                <span className="m-2" />
                <a href="/myLecture">View All</a>
              </>
            }
          />
          <LectureContainer
            title="Recent Lecture"
            data={dummyLectures}
            limit={8}
            extra={<a href="/recentLecture">View All</a>}
          />
        </div>
      </div>
    </>
  )
}
