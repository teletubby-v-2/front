/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MenuInfo } from 'rc-menu/lib/interface'
import React, { useEffect, useState } from 'react'
import { LectureContainer } from '../../components'
import { userInfoStore } from '../../store/user.store'
import { LectureDTO } from '../../constants/dto/lecture.dto'
import { LeftCircleOutlined } from '@ant-design/icons'
import { useHistory, useParams } from 'react-router-dom'
import { Dropdown, Menu } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { FilterBox, IFilter } from '../../components/FilterBox'
import MenuItem from 'antd/lib/menu/MenuItem'
import {
  bookmarkLectureRef,
  getBookmarkLectures,
  getLectures,
  getLecturesById,
  getLecturesByListOfId,
  getMySubject,
  getOwnLectures,
  lectureRef,
  listSubjectRef,
  mySubjectRef,
  subjectRef,
  userLectureRef,
} from '../../service/lectures/getLecture'
import { useInfiniteQuery } from '../../hooks/useInfiniteQuery'
import { firestore } from '../../config/firebase'
import { Collection } from '../../constants'
import firebase from 'firebase/app'

const setNewQuery = (query: firebase.firestore.Query, option: IFilter) => {
  console.log(option)

  if (option.isFinal) {
    query.where('isFinal', '==', true)
  }
  if (option.isMid) {
    query.where('isMid', '==', true)
  }
  if (option.rating) {
    query.where('ratingScore', '>=', option.rating)
  }
  console.log(query)

  return query
}

export const ViewAll: React.FC = () => {
  const { userInfo } = userInfoStore()
  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const [viewAllLecture, setViewAllLecture] = useState<LectureDTO[]>([] as LectureDTO[])
  const [title, settitle] = useState('')
  const [originQuery, setOriginQuery] = useState<firebase.firestore.Query>()
  const { data, fetchMore, setQuery, error } = useInfiniteQuery<LectureDTO>(
    firestore.collection(Collection.Lectures).where('id', '==', 1),
    'lectureId',
    Infinity,
  )

  console.log(data)
  error && console.log('error: ', error)
  useEffect(() => {
    setViewAllLecture([])
    if (id) {
      switch (id) {
        case 'ownLecture':
          settitle(id)
          if (userInfo.userId) {
            setQuery(userLectureRef(userInfo.userId))
            // getOwnLectures(userInfo.userId).then(data => setViewAllLecture(data))
          }
          break
        case 'mySubject':
          settitle(id)
          console.log(userInfo.userSubject)
          const query1 = mySubjectRef(userInfo.userSubject)
          if (userInfo.userSubject && userInfo.userSubject.length !== 0) {
            setQuery(query1)
            setOriginQuery(query1)
          }
          // getMySubject(userInfo.userSubject).then(data => setViewAllLecture(data))
          break
        case 'bookmark':
          settitle(id)
          const query2 = mySubjectRef(userInfo.userSubject)

          if (userInfo.bookmark && userInfo.bookmark.length !== 0) {
            setQuery(query2)
            setOriginQuery(query2)
            // getBookmarkLectures(userInfo.bookmark).then(data => setViewAllLecture(data))
          }
          break
        case 'all':
          const query3 = lectureRef
          settitle(id)
          setQuery(query3)
          setOriginQuery(query3)
          // getLectures().then(data => setViewAllLecture(data))
          break
        default:
          let query: firebase.firestore.Query
          if (id.search('lecture') != -1) {
            settitle('สรุปของ ' + id.substring(id.search('lecture'), 0))
            query = userLectureRef(id.substring(id.search('lecture') + 7)).orderBy(
              'createAt',
              'desc',
            )
            setOriginQuery(query)
            setQuery(query)
            // getOwnLectures(id.substring(id.search('lecture') + 7)).then(data =>
            //   setViewAllLecture(data),
            // )
          } else if (id?.[0] === '[') {
            settitle('ค้นหาด้วยวิชาของฉัน')
            query = listSubjectRef(JSON.parse(id))
            // getLecturesByListOfId(JSON.parse(id)).then(data => setViewAllLecture(data))
          } else {
            settitle('สรุปของวิชา ' + id)
            query = subjectRef(id.slice(0, 8))
            // getLecturesById(id.slice(0, 8)).then(data => setViewAllLecture(data))
          }
          setQuery(query)
          setOriginQuery(query)
      }
    }
  }, [userInfo, id])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleMenuClick = ({ key }: MenuInfo) => {
    switch (key) {
      case 'lastest':
        return
      case 'view':
        return
    }
  }
  return (
    <div className="mx-2 space-y-7 md:mx-5 lg:mx-20 xl:mx-30 my-10">
      <LectureContainer
        title={
          <>
            <LeftCircleOutlined onClick={() => history.goBack()} className="align-middle mr-3" />
            {title}
          </>
        }
        data={data}
        limit={false}
        extra={
          <div className="space-x-3 ">
            <FilterBox
              callback={option => {
                setQuery(setNewQuery(originQuery as firebase.firestore.Query, option))
              }}
            />
            <Dropdown
              placement="bottomRight"
              overlay={
                <Menu onClick={handleMenuClick}>
                  <MenuItem key="lastest">ล่าสุด</MenuItem>
                  <MenuItem key="view">เข้าดูมากสุด</MenuItem>
                </Menu>
              }
              trigger={['click']}
            >
              <a onClick={e => e.preventDefault()}>
                เรียงตาม <DownOutlined />
              </a>
            </Dropdown>
          </div>
        }
      />
      {/* <Button onClick={fetchMore}>more</Button> */}
    </div>
  )
}
