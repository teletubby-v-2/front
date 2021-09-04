import { Button, Card, CardProps, Dropdown, Menu, message, Popconfirm, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import { Lecture } from '../../constants/interface/lecture.interface'
import { addUserBookmark, deleteUserBookmark } from '../../service/user'
import { userInfoStore } from '../../store/user.store'
import { CreateLectureForm } from '../CreateLectureForm'
import { LectureCard } from '../LectureCard'
import {
  BookOutlined,
  MoreOutlined,
  EditOutlined,
  BookFilled,
  DeleteOutlined,
} from '@ant-design/icons'
import { AuthZone } from '..'
import { deleteLecture } from '../../service/lectures'

export interface LectureContainerProps extends CardProps {
  limit?: number | false
  data?: Lecture[]
  minRow?: 1 | 2
}

interface LectureWithDropdown extends Lecture {
  dropDownVisible: boolean
}

export const LectureContainer: React.FC<LectureContainerProps> = props => {
  const { limit, data, className, minRow = 2, title, ...restCradProps } = props

  const [isOnEdit, setIsOnEdit] = useState(false)
  const [loading, setLoading] = useState(true)
  const [size] = useState(limit !== false ? limit || 10 : data?.length)
  const { userInfo, addBookmark, removeBookmark } = userInfoStore()
  const [lectures, setLectures] = useState<LectureWithDropdown[]>()

  useEffect(() => {
    if (data) {
      setLoading(false)
    }
    setLectures(data?.map(lecture => ({ ...lecture, dropDownVisible: false })))
  }, [data])

  const handleAddBookmark = (data: Lecture) => {
    if (data?.lectureId) {
      addUserBookmark(data.lectureId, userInfo.bookmark)
        .then(() => {
          addBookmark(data.lectureId || '')
          message.success('add bookmark')
        })
        .catch(() => message.error('fail'))
    }
  }

  const handleDeleteBookmark = (data: Lecture) => {
    if (data?.lectureId) {
      deleteUserBookmark(data.lectureId, userInfo.bookmark).then(() => {
        removeBookmark(data.lectureId || '')
        message.success('remove bookmark')
      })
    }
  }

  const setIsDropDownVisible = (value: boolean, index: number) => {
    setLectures(lectures => {
      if (lectures) {
        return [
          ...lectures.slice(0, index),
          { ...lectures[index], dropDownVisible: value },
          ...lectures.slice(index + 1),
        ]
      }
    })
  }

  const updateLecture = (lecture: Lecture, index: number) => {
    setLectures(lectures => {
      if (lectures) {
        return [
          ...lectures.slice(0, index),
          { ...lecture, dropDownVisible: false },
          ...lectures.slice(index + 1),
        ]
      }
    })
  }

  const removeLecture = (index: number) => {
    setLectures(lectures => {
      if (lectures) {
        return [...lectures.slice(0, index), ...lectures.slice(index + 1)]
      }
    })
  }

  const menu = (data: Lecture, index: number) => (
    <Menu onMouseLeave={() => !isOnEdit && setIsDropDownVisible(false, index)}>
      <Menu.Item key="edit" className="m-0 p-0">
        <CreateLectureForm
          initData={data}
          callback={(lecture?: Lecture) => {
            setIsOnEdit(false)
            setIsDropDownVisible(false, index)
            lecture && updateLecture(lecture, index)
          }}
        >
          <div className="text-black w-full h-full px-2 py-1" onClick={() => setIsOnEdit(true)}>
            <EditOutlined className="align-middle" /> แก้ไข
          </div>
        </CreateLectureForm>
      </Menu.Item>
      <Menu.Item danger className="m-0 p-0">
        <Popconfirm
          title="คุณแน่ใจใช่ไหมที่จะลบ"
          placement="right"
          className="px-2 py-1.5"
          onConfirm={() => {
            deleteLecture(data.lectureId || '').then(() => removeLecture(index))
            setIsDropDownVisible(false, index)
          }}
        >
          <div className="px-2 py-1.5">
            <DeleteOutlined className="align-middle" /> ลบ
          </div>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  )

  return (
    <Card
      {...restCradProps}
      title={<span className="title-lecture-container">{title}</span>}
      className={`${className} shadow-1`}
    >
      <Skeleton loading={loading} paragraph active>
        <div
          className={`grid grid-cols-3 gap-y-10 md:grid-cols-4 lg:grid-cols-5 row-${minRow}-card `}
        >
          {lectures?.slice(0, size).map((lecture, index) => (
            <div className="relative w-40 h-52 mx-auto" key={index}>
              <div className="absolute z-10 right-0 top-0">
                {userInfo.userId === lecture?.userId && (
                  <Dropdown
                    visible={lecture.dropDownVisible}
                    overlay={menu(lecture, index)}
                    placement="bottomRight"
                    trigger={['click']}
                  >
                    <Button
                      shape="circle"
                      className="mt-1 mr-1"
                      onClick={() => setIsDropDownVisible(true, index)}
                    >
                      <MoreOutlined className=" align-middle text-lg" rotate={90} />
                    </Button>
                  </Dropdown>
                )}
                {userInfo.userId !== lecture?.userId &&
                  userInfo.bookmark &&
                  (userInfo.bookmark.findIndex(mark => mark === lecture?.lectureId) === -1 ? (
                    <AuthZone>
                      <Button
                        shape="circle"
                        className="mt-1 mr-1"
                        onClick={() => handleAddBookmark(lecture)}
                      >
                        <BookOutlined className=" align-middle" />
                      </Button>
                    </AuthZone>
                  ) : (
                    <Button
                      shape="circle"
                      className="mt-1 mr-1"
                      onClick={() => handleDeleteBookmark(lecture)}
                    >
                      <BookFilled className=" align-middle text-green-500" />
                    </Button>
                  ))}
              </div>
              <LectureCard data={lecture} className="mx-auto" />
            </div>
          ))}
        </div>
      </Skeleton>
    </Card>
  )
}
