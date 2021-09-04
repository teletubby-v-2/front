/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { LectureContainer } from '../../components'
import { userInfoStore } from '../../store/user.store'
import { LectureDTO } from '../../constants/dto/lecture.dto'
import { firestore } from '../../config/firebase'
import { Collection } from '../../constants'
import { useHistory, useParams } from 'react-router-dom'
import firebase from 'firebase/app'

export const ViewAll: React.FC = () => {
  const { userInfo } = userInfoStore()
  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const [viewAllLecture, setViewAllLecture] = useState<LectureDTO[]>([] as LectureDTO[])

  const getAllParamLecture = (
    key: firebase.firestore.FieldPath | string | false,
    query: firebase.firestore.WhereFilterOp,
    value: any,
  ) => {
    firestore
      .collection(Collection.Lectures)
      .where(key ? key : firebase.firestore.FieldPath.documentId(), query, value)
      // .orderBy('createAt', 'desc')
      .get()
      .then(doc => {
        doc.forEach(lecture => {
          setViewAllLecture(allSubject => [
            ...allSubject,
            { lectureId: lecture.id, ...lecture.data() } as LectureDTO,
          ])
        })
      })
  }

  useEffect(() => {
    setViewAllLecture([])
    if (id) {
      switch (id) {
        case 'ownLecture':
          if (userInfo.userId) {
            return getAllParamLecture('userId', '==', userInfo.userId)
          }
          break
        case 'mySubject':
          // eslint-disable-next-line no-case-declarations
          const subjectId = userInfo.userSubject
            .filter(subject => subject.isActive === true)
            .map(subject => subject.subjectId)
            .flatMap(x => x)

          if (subjectId && subjectId.length !== 0) {
            return getAllParamLecture('subjectId', 'in', subjectId)
          }
          break
        case 'bookmark':
          if (userInfo.bookmark && userInfo.bookmark.length !== 0) {
            return getAllParamLecture(false, 'in', userInfo.bookmark)
          }
          break
        case 'all':
          firestore
            .collection(Collection.Lectures)
            .orderBy('createAt', 'desc')
            .get()
            .then(doc => {
              doc.forEach(lecture => {
                setViewAllLecture(allLecture => [
                  ...allLecture,
                  { lectureId: lecture.id, ...lecture.data() } as LectureDTO,
                ])
              })
            })
          break
        default:
          return getAllParamLecture('subjectId', '==', id)
      }
    }
  }, [userInfo, id])

  return (
    <div className="mx-2 space-y-7 md:mx-5 lg:mx-20 xl:mx-30 my-10">
      <LectureContainer
        title={id}
        data={viewAllLecture}
        limit={false}
        extra={<a onClick={() => history.goBack()}>back</a>}
      />
    </div>
  )
}
