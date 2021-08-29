import React from 'react'
import { LectureContainer } from '../../components'
import { dummyLectures } from '../../constants/dummyData/lecture.dummy'
import { userInfoStore } from '../../store/user.store'

export const Home: React.FC = () => {
  const { userInfo } = userInfoStore()

  return (
    <div className="mb-10 mx-2 space-y-7">
      {userInfo.userId.length !== 0 && (
        <>
          <LectureContainer
            title="My Subject"
            data={dummyLectures}
            limit={8}
            extra={
              <>
                <span className="m-2" />
                <a href="/myLecture">View All</a>
              </>
            }
          />
          <LectureContainer
            title="BookMark Lectures"
            data={dummyLectures}
            limit={8}
            extra={
              <>
                <span className="m-2" />
                <a href="/myLecture">View All</a>
              </>
            }
          />
        </>
      )}
      <LectureContainer
        title="Recent Lectures"
        data={dummyLectures}
        limit={8}
        extra={
          <>
            <span className="m-2" />
            <a href="/myLecture">View All</a>
          </>
        }
      />
    </div>
  )
}
