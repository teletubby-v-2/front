import React, { useState } from 'react'
import { LectureContainer } from '../../components/LectureContainer'
import { dummyLecture } from '../../constants/dummyData/lecture.dummy'

export const Profile: React.FC = () => {
  const [isViewAllOwn, setIsViewAllOwn] = useState(false)
  const [isViewAllRecent, setIsViewAllRecent] = useState(false)

  return (
    <div className="flex justify-center my-10">
      <div className="w-1/5 h-screen bg-gray-400 mx-2"></div>
      <div className="w-1/2 m-2.5">
        <LectureContainer
          title="My Lecture"
          style={{ minHeight: '500px' }}
          data={dummyLecture}
          limit={8}
          viewAll={isViewAllOwn}
          extra={
            <>
              <a href="#">Add New</a>
              <span className="m-2" />
              <a onClick={() => setIsViewAllOwn(!isViewAllOwn)}>
                {isViewAllOwn ? 'View Less' : 'View All'}
              </a>
            </>
          }
        ></LectureContainer>
        <div className="m-4"></div>
        <LectureContainer
          title="Recent Lecture"
          style={{ minHeight: '500px' }}
          data={dummyLecture}
          limit={8}
          viewAll={isViewAllRecent}
          extra={
            <a onClick={() => setIsViewAllRecent(!isViewAllRecent)}>
              {isViewAllRecent ? 'View Less' : 'View All'}
            </a>
          }
        ></LectureContainer>
      </div>
    </div>
  )
}
