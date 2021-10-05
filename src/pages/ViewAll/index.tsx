import { MenuInfo } from 'rc-menu/lib/interface'
import React, { useEffect, useState } from 'react'
import { LectureContainer } from '../../components'
import { userInfoStore } from '../../store/user.store'
import { LectureDTO } from '../../constants/dto/lecture.dto'
import { LeftCircleOutlined } from '@ant-design/icons'
import { useHistory, useParams } from 'react-router-dom'
import { Dropdown, Menu, Skeleton } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { FilterBox, IFilter } from '../../components/FilterBox'
import MenuItem from 'antd/lib/menu/MenuItem'
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

const setNewQuery = (data: LectureDTO[], option: IFilter) => {
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

  useEffect(() => {
    setFilterData(viewAllLecture)
  }, [viewAllLecture])

  useEffect(() => {
    setViewAllLecture([])
    if (id) {
      switch (id) {
        case 'ownLecture':
          setTitle('สรุปของฉัน')
          if (userInfo.userId) {
            getOwnLectures(userInfo.userId).then(data => setViewAllLecture(data))
          }
          break
        case 'mySubject':
          setTitle('วิชาของฉัน')
          getMySubject(userInfo.userSubject).then(data => setViewAllLecture(data))
          break
        case 'bookmark':
          setTitle('บุ๊คมาร์ค')
          if (userInfo.bookmark && userInfo.bookmark.length !== 0) {
            getBookmarkLectures(userInfo.bookmark).then(data => setViewAllLecture(data))
          }
          break
        case 'all':
          setTitle('สรุปล่าสุด')
          getLectures().then(data => setViewAllLecture(data))
          break
        default:
          if (id.search('lecture') != -1) {
            setTitle('สรุปของ ' + id.substring(id.search('lecture'), 0))
            getOwnLectures(id.substring(id.search('lecture') + 7)).then(data =>
              setViewAllLecture(data),
            )
          } else if (id?.[0] === '[') {
            setTitle('ค้นหาด้วยวิชาของฉัน')
            getLecturesByListOfId(JSON.parse(id)).then(data => setViewAllLecture(data))
          } else {
            setTitle(<>สรุปวิชา {id.split(' ').slice(1, id.split(' ').length).join(' ')}</>)
            getLecturesById(id.slice(0, 8)).then(data => setViewAllLecture(data))
          }
      }
    }
  }, [userInfo, id])

  const handleMenuClick = ({ key }: MenuInfo) => {
    switch (key) {
      case 'lastest':
        return setFilterData(
          [...filterData].sort((a, b) => {
            const timeA = a.createAt?.toMillis() || 0
            const timeB = b.createAt?.toMillis() || 0
            return timeB - timeA
          }),
        )
      case 'view':
        return setFilterData([...filterData].sort((a, b) => b.viewCount - a.viewCount))
    }
  }
  console.log(limit, limit < filterData.length)

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
          extra={
            <div className="space-x-3 ">
              <FilterBox
                callback={option => {
                  setFilterData(setNewQuery(viewAllLecture, option))
                  setLimit(20)
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
      </InfiniteScroll>
    </div>
  )
}
