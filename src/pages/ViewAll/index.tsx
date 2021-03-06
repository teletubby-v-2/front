import React, { useEffect, useState } from 'react'
import { LectureContainer } from '../../components'
import { userInfoStore } from '../../store/user.store'
import { LectureDTO } from '../../constants/dto/lecture.dto'
import { ArrowLeftOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { useHistory, useParams } from 'react-router-dom'
import { Select, Form, BackTop, Button } from 'antd'
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
  { label: 'จำนวนดาว', value: 'rating' },
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
    newData = newData.filter(lecture => (lecture.ratingScore || 0) >= option.rating)
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
  console.log(newData)

  return newData
}

import { useLocation } from 'react-router-dom'

export function useSearchParam(find: string) {
  return new URLSearchParams(useLocation()?.search).get(find) || ''
}

export const ViewAll: React.FC = () => {
  const { userInfo } = userInfoStore()
  const history = useHistory()
  const location = useLocation()
  const { id } = useParams<{ id: string }>()
  const [viewAllLecture, setViewAllLecture] = useState<LectureDTO[]>([] as LectureDTO[])
  const [title, setTitle] = useState<React.ReactNode>('')
  const [filterData, setFilterData] = useState<LectureDTO[]>([] as LectureDTO[])
  const [limit, setLimit] = useState(20)
  const [loading, setLoading] = useState(false)
  const paramFilter = useSearchParam('filter')
  const sort = useSearchParam('sort')
  const [sortState, setSortState] = useState(useSearchParam('sort'))
  const [filter, setFilter] = useState<IFilter>({} as IFilter)

  useEffect(() => {
    setFilterData(viewAllLecture)
  }, [viewAllLecture])

  useEffect(() => {
    if (paramFilter[0] == '{') {
      setFilter(JSON.parse(paramFilter))
    }
  }, [paramFilter])

  useEffect(() => {
    setSortState(sort)
  }, [sort])

  useEffect(() => {
    setFilterData(setNewQuery(viewAllLecture, filter, sort))
  }, [filter, viewAllLecture])

  useEffect(() => {
    handleSort(sortState)
  }, [sortState])

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
          } else return setLoading(false)
          break
        case 'all':
          setTitle('สรุปล่าสุด')
          getLectures()
            .then(data => setViewAllLecture(data))
            .finally(() => setLoading(false))
          break
        default:
          if (id.search('lecture') != -1) {
            setTitle('สรุปของ "' + id.substring(id.search('lecture'), 0) + '"')
            getOwnLectures(id.substring(id.search('lecture') + 7))
              .then(data => setViewAllLecture(data))
              .finally(() => setLoading(false))
          } else if (id?.[0] === '[') {
            setTitle('ค้นหาด้วยวิชาของฉัน')
            getLecturesByListOfId(JSON.parse(id))
              .then(data => setViewAllLecture(data))
              .finally(() => setLoading(false))
          } else {
            setTitle(<>สรุปวิชา {`"${id.split(' ').slice(1, id.split(' ').length).join(' ')}"`}</>)
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

  return (
    <div className="mx-2 space-y-7 md:mx-5 lg:mx-20 xl:mx-30 my-10">
      <ScrollToTop />
      <InfiniteScroll
        next={() => setLimit(limit => limit + 10)}
        hasMore={limit < filterData.length}
        loader={''}
        dataLength={limit}
      >
        <LectureContainer
          title={
            <>
              <ArrowLeftOutlined
                onClick={() => history.goBack()}
                className="mr-3 ant-page-header-back-button"
              />
              {title}
            </>
          }
          data={filterData}
          limit={limit}
          loading={loading}
          more={limit < filterData.length}
          numOfSkeleton={20}
          maxRow={Infinity}
          extra={
            <div className="space-x-3 text-gray">
              <FilterBox
                initialData={filter}
                callback={option => {
                  setLoading(true)
                  history.replace(
                    location.pathname + `?filter=${JSON.stringify(option)}&sort=${sortState}`,
                  )
                  setLimit(20)
                  setLoading(false)
                }}
              />
              <Form className="inline-block ">
                <Form.Item
                  label={<label className="text-gray-600">เรียงตาม</label>}
                  name=""
                  colon={false}
                  className="mb-0 w-48"
                  initialValue={sortState || 'lastest'}
                >
                  <Select
                    options={options}
                    className="w-28 pl-0 text-gray-600"
                    value={sortState}
                    onChange={v => {
                      setSortState(v)
                      history.replace(
                        location.pathname + `?filter=${JSON.stringify(filter)}&sort=${v}`,
                      )
                    }}
                  />
                </Form.Item>
              </Form>
            </div>
          }
        />
      </InfiniteScroll>
      <BackTop className="right-10">
        <Button type="primary" icon={<ArrowUpOutlined />} className="w-10 h-10" />
      </BackTop>
    </div>
  )
}
