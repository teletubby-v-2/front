/* eslint-disable @typescript-eslint/no-explicit-any */
import { MenuInfo } from 'rc-menu/lib/interface'
import React, { useEffect, useState } from 'react'
import { LectureContainer } from '../../components'
import { userInfoStore } from '../../store/user.store'
import { LectureDTO } from '../../constants/dto/lecture.dto'
import { firestore } from '../../config/firebase'
import { Collection } from '../../constants'
import { useHistory, useParams } from 'react-router-dom'
import firebase from 'firebase/app'
import { Dropdown, Menu } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { FilterBox } from '../../components/FilterBox'
import MenuItem from 'antd/lib/menu/MenuItem'
export const ViewAll: React.FC = () => {
  const { userInfo } = userInfoStore()
  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const [viewAllLecture, setViewAllLecture] = useState<LectureDTO[]>([] as LectureDTO[])
  const [title, settitle] = useState('')

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
          settitle(id)
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
          settitle(id)
          if (subjectId && subjectId.length !== 0) {
            return getAllParamLecture('subjectId', 'in', subjectId)
          }
          break
        case 'bookmark':
          settitle(id)
          if (userInfo.bookmark && userInfo.bookmark.length !== 0) {
            return getAllParamLecture(false, 'in', userInfo.bookmark)
          }
          break
        case 'all':
          settitle(id)
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
          if (id.search('lecture') != -1) {
            settitle('สรุปของ ' + id.substring(id.search('lecture'), 0))
            return getAllParamLecture('userId', '==', id.substring(id.search('lecture') + 7))
          } else {
            settitle('สรุปของวิชา ' + id)
            console.log(id.slice(0, 9))
            return getAllParamLecture('subjectId', '==', id.slice(0, 9))
          }
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
        title={title}
        data={viewAllLecture}
        limit={false}
        extra={
          <div className="space-x-3 ">
            <FilterBox isSubject />
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
    </div>
  )
}
