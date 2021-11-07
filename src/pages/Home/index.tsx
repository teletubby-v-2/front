import React, { useEffect, useState } from 'react'
import { LectureContainer } from '../../components'
import { userInfoStore } from '../../store/user.store'
import { LectureDTO } from '../../constants/dto/lecture.dto'
import { Link } from 'react-router-dom'
import { containerTitle } from '../../utils/titleLecture'
import { getBookmarkLectures, getLectures, getMySubject } from '../../service/lectures/getLecture'

export const Home: React.FC = () => {
  const { userInfo } = userInfoStore()
  const [allLecture, setAllLecture] = useState<LectureDTO[]>([] as LectureDTO[])
  const [loading1, setLoading1] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [loading3, setLoading3] = useState(false)
  const [bookmarkSubject, setBookmarkSubject] = useState([] as LectureDTO[])
  const [mySubject, setMySubject] = useState<LectureDTO[]>([] as LectureDTO[])

  useEffect(() => {
    setLoading2(true)
    getLectures(12)
      .then(data => setAllLecture(data))
      .finally(() => setLoading2(false))
  }, [])

  useEffect(() => {
    if (userInfo.userSubject.length !== 0) {
      setLoading1(true)
      getMySubject(userInfo.userSubject, 12)
        .then(data => setMySubject(data))
        .catch(() => console.log('no data'))
        .finally(() => setLoading1(false))
    }
  }, [userInfo.userSubject])

  useEffect(() => {
    if (userInfo.bookmark.length !== 0) {
      setLoading3(true)
      getBookmarkLectures(userInfo.bookmark, 12)
        .then(data => setBookmarkSubject(data))
        .catch(() => console.log('no data'))
        .finally(() => setLoading3(false))
    }
  }, [userInfo.bookmark])

  return (
    <div className="mb-10 mx-2 space-y-7 md:mx-5 lg:mx-20 xl:mx-30 ">
      {userInfo.userId && userInfo.userId.length !== 0 && (
        <LectureContainer
          title={containerTitle.mySubject}
          data={mySubject}
          loading={loading1}
          extra={<Link to="/viewAll/mySubject">ดูทั้งหมด</Link>}
        />
      )}
      {userInfo.userId && userInfo.userId.length !== 0 && (
        <LectureContainer
          title={containerTitle.bookmark}
          data={bookmarkSubject}
          loading={loading3}
          extra={<Link to="/viewAll/bookmark">ดูทั้งหมด</Link>}
        />
      )}
      <LectureContainer
        title={containerTitle.all}
        data={allLecture}
        loading={loading2}
        extra={<Link to="/viewAll/all">ดูทั้งหมด</Link>}
      />
    </div>
  )
}
