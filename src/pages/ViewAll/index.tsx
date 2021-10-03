/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { LectureContainer } from '../../components'
import { userInfoStore } from '../../store/user.store'
import { LectureDTO } from '../../constants/dto/lecture.dto'
import { LeftCircleOutlined } from '@ant-design/icons'
import { useHistory, useParams } from 'react-router-dom'
import {
  getBookmarkLectures,
  getLectures,
  getLecturesById,
  getLecturesByListOfId,
  getMySubject,
  getOwnLectures,
} from '../../service/lectures/getLecture'

export const ViewAll: React.FC = () => {
  const { userInfo } = userInfoStore()
  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const [viewAllLecture, setViewAllLecture] = useState<LectureDTO[]>([] as LectureDTO[])
  const [title, settitle] = useState('')
  // const { data, fetchMore } = useInfiniteQuery<LectureDTO>(
  //   firestore.collection(Collection.Lectures),
  //   'lectureId',
  //   4,
  // )

  useEffect(() => {
    setViewAllLecture([])
    if (id) {
      switch (id) {
        case 'ownLecture':
          settitle(id)
          if (userInfo.userId) {
            getOwnLectures(userInfo.userId).then(data => setViewAllLecture(data))
          }
          break
        case 'mySubject':
          settitle(id)
          getMySubject(userInfo.userSubject).then(data => setViewAllLecture(data))
          break
        case 'bookmark':
          settitle(id)
          if (userInfo.bookmark && userInfo.bookmark.length !== 0) {
            getBookmarkLectures(userInfo.bookmark).then(data => setViewAllLecture(data))
          }
          break
        case 'all':
          settitle(id)
          getLectures().then(data => setViewAllLecture(data))
          break
        default:
          if (id.search('lecture') != -1) {
            settitle('สรุปของ ' + id.substring(id.search('lecture'), 0))
            getOwnLectures(id.substring(id.search('lecture') + 7)).then(data =>
              setViewAllLecture(data),
            )
          } else if (id?.[0] === '[') {
            settitle('ค้นหาด้วยวิชาของฉัน')
            getLecturesByListOfId(JSON.parse(id)).then(data => setViewAllLecture(data))
          } else {
            settitle('สรุปของวิชา ' + id)
            getLecturesById(id.slice(0, 8)).then(data => setViewAllLecture(data))
          }
      }
    }
  }, [userInfo, id])

  return (
    <div className="mx-2 space-y-7 md:mx-5 lg:mx-20 xl:mx-30 my-10">
      <LectureContainer
        title={
          <>
            <LeftCircleOutlined onClick={() => history.goBack()} className="align-middle mr-3" />
            {title}
          </>
        }
        data={viewAllLecture}
        limit={false}
      />
      {/* <Button onClick={fetchMore}>more</Button> */}
    </div>
  )
}
