import React, { useEffect, useState } from 'react'
import { LectureContainer } from '../../components'
import { userInfoStore } from '../../store/user.store'
import { LectureDTO } from '../../constants/dto/lecture.dto'
import { LeftCircleOutlined } from '@ant-design/icons'
import { useHistory, useParams } from 'react-router-dom'
import { Select, Skeleton, Form } from 'antd'
import { FilterBox, IFilter } from '../../components/FilterBox'
import {
  getBookmarkLectures,
  getLectures,
  getLecturesById,
  getLecturesByListOfId,
  getMySubject,
  getOwnLectures,
} from '../../service/lectures/getLecture'
import InfiniteScroll from 'react-infinite-scroll-component'
import ScrollToTop from '../../components/ScrollToTop'

const options = [
  { label: 'ล่าสุด', value: 'lastest' },
  { label: 'เข้าดูมากสุด', value: 'view' },
  { label: 'คะแนนโหวด', value: 'rating' },
]

const setNewQuery = (data: LectureDTO[], option: IFilter, sortBy = 'lastest') => {
  let newData = data
  if (option.isFinal && option.isMid) {
    newData = newData.filter(lecture => lecture.isFinal || lecture.isMid)
  } else if (option.isFinal) {
    newData = newData.filter(lecture => lecture.isFinal)
  } else if (option.isMid) {
    newData = newData.filter(lecture => lecture.isMid)
  }
  if (option.rating) {
    newData = newData.filter(lecture => lecture.ratingScore || 0 >= option.rating)
  }
  switch (sortBy) {
    case 'lastest':
      return newData.sort((a, b) => {
        const timeA = a.createAt?.toMillis() || 0
        const timeB = b.createAt?.toMillis() || 0
        return timeB - timeA
      })
    case 'view':
      return newData.sort((a, b) => b.viewCount - a.viewCount)
    case 'rating':
      return newData.sort((a, b) => (b.ratingScore || 0) - (a.ratingScore || 0))
  }
  return newData
}

export const ViewAll: React.FC = () => {
  const { userInfo } = userInfoStore()
  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const [viewAllLecture, setViewAllLecture] = useState<LectureDTO[]>([] as LectureDTO[])
  const [title, setTitle] = useState<React.ReactNode>('')
  const [filterData, setFilterData] = useState<LectureDTO[]>([] as LectureDTO[])
  const [limit, setLimit] = useState(20)
  const [loading, setLoading] = useState(false)
  const [sortState, setSortState] = useState('lastest')

  useEffect(() => {
    setFilterData(viewAllLecture)
  }, [viewAllLecture])

  useEffect(() => {
    setViewAllLecture([])
    setLoading(true)
    if (id) {
      switch (id) {
        case 'ownLecture':
          setTitle('สรุปของฉัน')
          if (userInfo.userId) {
            getOwnLectures(userInfo.userId)
              .then(data => setViewAllLecture(data))
              .finally(() => setLoading(false))
          }
          break
        case 'mySubject':
          setTitle('วิชาของฉัน')
          getMySubject(userInfo.userSubject)
            .then(data => setViewAllLecture(data))
            .finally(() => setLoading(false))
          break
        case 'bookmark':
          setTitle('บุ๊คมาร์ค')
          if (userInfo.bookmark && userInfo.bookmark.length !== 0) {
            getBookmarkLectures(userInfo.bookmark)
              .then(data => setViewAllLecture(data))
              .finally(() => setLoading(false))
          }
          break
        case 'all':
          setTitle('สรุปล่าสุด')
          getLectures()
            .then(data => setViewAllLecture(data))
            .finally(() => setLoading(false))
          break
        default:
          if (id.search('lecture') != -1) {
            setTitle('สรุปของ ' + id.substring(id.search('lecture'), 0))
            getOwnLectures(id.substring(id.search('lecture') + 7))
              .then(data => setViewAllLecture(data))
              .finally(() => setLoading(false))
          } else if (id?.[0] === '[') {
            setTitle('ค้นหาด้วยวิชาของฉัน')
            getLecturesByListOfId(JSON.parse(id))
              .then(data => setViewAllLecture(data))
              .finally(() => setLoading(false))
          } else {
            setTitle(<>สรุปวิชา {id.split(' ').slice(1, id.split(' ').length).join(' ')}</>)
            getLecturesById(id.slice(0, 8))
              .then(data => setViewAllLecture(data))
              .finally(() => setLoading(false))
          }
      }
    }
  }, [userInfo, id])

  const handleSort = (key: string) => {
    setLoading(true)
    switch (key) {
      case 'lastest':
        setFilterData(
          [...filterData].sort((a, b) => {
            const timeA = a.createAt?.toMillis() || 0
            const timeB = b.createAt?.toMillis() || 0
            return timeB - timeA
          }),
        )
        return setLoading(false)
      case 'view':
        setFilterData([...filterData].sort((a, b) => b.viewCount - a.viewCount))
        return setLoading(false)
      case 'rating':
        setFilterData([...filterData].sort((a, b) => (b.ratingScore || 0) - (a.ratingScore || 0)))
        return setLoading(false)
    }
  }

  useEffect(() => {
    handleSort(sortState)
  }, [sortState])

  return (
    <div className="mx-2 space-y-7 md:mx-5 lg:mx-20 xl:mx-30 my-10">
      <ScrollToTop />
      <InfiniteScroll
        next={() => setLimit(limit => limit + 10)}
        hasMore={limit < filterData.length}
        loader={
          <div className="w-full flex justify-evenly mt-5 bg-white">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <Skeleton.Avatar
                  active
                  size={160}
                  shape="square"
                  className="mx-auto"
                  key={index}
                  style={{ height: '208px', borderRadius: 4 }}
                />
              ))}
          </div>
        }
        dataLength={limit}
      >
        <LectureContainer
          title={
            <>
              <LeftCircleOutlined onClick={() => history.goBack()} className="align-middle mr-3" />
              {title}
            </>
          }
          data={filterData}
          limit={limit}
          loading={loading}
          numOfSkeleton={15}
          extra={
            <div className="space-x-3 ">
              <FilterBox
                callback={option => {
                  setLoading(true)
                  setFilterData(setNewQuery(viewAllLecture, option, sortState))
                  setLimit(20)
                  setLoading(false)
                }}
              />
              <Form className="inline-block">
                <Form.Item label="เรียงตาม" name="" className="mb-0 w-48">
                  <Select
                    options={options}
                    className="w-28 pl-0"
                    defaultValue="lastest"
                    value={sortState}
                    onChange={v => setSortState(v)}
                  />
                </Form.Item>
              </Form>
            </div>
          }
        />
      </InfiniteScroll>
    </div>
  )
}
