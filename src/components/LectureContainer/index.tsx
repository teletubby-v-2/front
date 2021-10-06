import {
  Button,
  Card,
  CardProps,
  Dropdown,
  Empty,
  Menu,
  message,
  Popconfirm,
  Skeleton,
  Tooltip,
} from 'antd'
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
import { lectureStore } from '../../store/lecture.store'

export interface LectureContainerProps extends CardProps {
  limit?: number | false
  data?: Lecture[]
  minRow?: 1 | 2
  profile?: boolean
  loading?: boolean
  numOfSkeleton?: number
}

interface LectureWithDropdown extends Lecture {
  dropDownVisible: boolean
}

export const LectureContainer: React.FC<LectureContainerProps> = props => {
  const {
    limit,
    data,
    className,
    minRow = 1,
    profile = false,
    title,
    loading = false,
    numOfSkeleton = 5,
    ...restCradProps
  } = props
  const [isOnEdit, setIsOnEdit] = useState(false)
  const [lastOpenIndex, setLastOpenIndex] = useState(0)
  const [size, setSize] = useState(limit !== false ? limit || 10 : data?.length)
  const { userInfo, addBookmark, removeBookmark } = userInfoStore()
  const { removeOwnLecture } = lectureStore()
  const [lectures, setLectures] = useState<LectureWithDropdown[]>()

  useEffect(() => {
    if (!limit) {
      setSize(data?.length)
    }
    setLectures(data?.map(lecture => ({ ...lecture, dropDownVisible: false })))
  }, [data])

  useEffect(() => {
    setSize(limit || data?.length)
  }, [limit])

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
    if (lectures?.[lastOpenIndex].dropDownVisible) {
      setLectures(lectures => {
        if (lectures) {
          return [
            ...lectures.slice(0, lastOpenIndex),
            { ...lectures[lastOpenIndex], dropDownVisible: false },
            ...lectures.slice(lastOpenIndex + 1),
          ]
        }
      })
    }
    if (lectures?.[lastOpenIndex].dropDownVisible !== value) {
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
    if (value) {
      setLastOpenIndex(index)
    }
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
            <EditOutlined /> แก้ไข
          </div>
        </CreateLectureForm>
      </Menu.Item>
      <Menu.Item danger className="m-0 p-0">
        <Popconfirm
          title="คุณแน่ใจใช่ไหมที่จะลบ"
          placement="right"
          className="px-2 py-1.5"
          onConfirm={() => {
            deleteLecture(data.lectureId || '').then(() => {
              if (data.userId === userInfo.userId) {
                removeOwnLecture(data.lectureId || '')
              }
              removeLecture(index)
            })
            setIsDropDownVisible(false, index)
          }}
        >
          <div className="px-2 py-1.5">
            <DeleteOutlined /> ลบ
          </div>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  )

  return (
    <Card
      {...restCradProps}
      title={<span className="text-xl">{title}</span>}
      className={`${className} shadow-1`}
    >
      <div
        className={`grid grid-cols-3 gap-y-10 md:grid-cols-4 ${
          profile ? 'lg:grid-cols-4' : 'lg:grid-cols-5'
        } ${lectures?.length === 0 ? '' : `row-${minRow}-card`}`}
      >
        {loading
          ? Array(numOfSkeleton)
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
              ))
          : lectures &&
            lectures?.length !== 0 &&
            lectures?.slice(0, size).map((lecture, index) => (
              <div className="relative w-40 h-52 mx-auto border-2 border-gray-500" key={index}>
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
                  {userInfo.userId !== lecture?.userId && userInfo.bookmark && (
                    <AuthZone>
                      <Tooltip title="บุ๊คมาร์ค">
                        <Button
                          shape="circle"
                          className="mt-1 mr-1"
                          onClick={() =>
                            userInfo.bookmark.some(mark => mark === lecture?.lectureId)
                              ? handleDeleteBookmark(lecture)
                              : handleAddBookmark(lecture)
                          }
                        >
                          {userInfo.bookmark.some(mark => mark === lecture?.lectureId) ? (
                            <BookFilled className=" align-middle text-green-500" />
                          ) : (
                            <BookOutlined className=" align-middle" />
                          )}
                        </Button>
                      </Tooltip>
                    </AuthZone>
                  )}
                </div>
                <LectureCard data={lecture} className="mx-auto border-2 border-gray-500" />
              </div>
            ))}
      </div>
      {!loading && lectures && lectures?.length === 0 && (
        <div className="row-1-card flex justify-center items-center">
          <Empty description="ไม่มีรายการ" />
        </div>
      )}
    </Card>
  )
}
