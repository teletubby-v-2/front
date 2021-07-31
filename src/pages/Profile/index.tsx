import React, { useState } from 'react'
import { LectureContainer } from '../../components'
import { EditComponent } from './components/MyProfile/EditComponent'
import { ProfileComponent } from './components/MyProfile/ProfileComponent'
import { dummyLectures } from '../../constants/dummyData/lecture.dummy'
import { CreateLecture } from './components/CreateLecture'

export const Profile: React.FC = () => {
  const [isViewAllOwn, setIsViewAllOwn] = useState(false)
  const [isViewAllRecent, setIsViewAllRecent] = useState(false)
  const [isOnCreate, setIsOnCreate] = useState(false)
  const [isEdit, setEdit] = useState(false)

  return (
    <>
      <CreateLecture isOnCreate={isOnCreate} setIsOnCreate={setIsOnCreate} />
      <div className="flex justify-center my-10">
        <div className="w-1/5 h-screen bg-gray-400 mx-2">
          {isEdit ? (
            <EditComponent onfin={() => setEdit(false)} />
          ) : (
            <ProfileComponent onEdit={() => setEdit(true)} />
          )}
        </div>
        <div className="w-1/2 m-2.5">
          <LectureContainer
            title="My Lecture"
            style={{ minHeight: '500px' }}
            data={dummyLectures}
            limit={8}
            viewAll={isViewAllOwn}
            extra={
              <>
                <a onClick={() => setIsOnCreate(true)}>Add New</a>
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
            data={dummyLectures}
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
    </>
  )
}
