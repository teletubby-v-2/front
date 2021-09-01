import { Badge, Button, Dropdown, Menu, Popconfirm, CardProps, message, Typography } from 'antd'
import { BookOutlined, MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { MenuInfo } from 'rc-menu/lib/interface'
import React, { useState } from 'react'
import { SubjectDTO } from '../../constants/dto/subjects.dto'
import { Lecture } from '../../constants/interface/lecture.interface'
import kuSubject from '../../constants/subjects.json'
import { userInfoStore } from '../../store/user.store'
import BookFilled from '@ant-design/icons/lib/icons/BookFilled'
import { addUserBookmark, deleteUserBookmark } from '../../service/user'
import { AuthZone } from '..'
import { useHistory } from 'react-router'
import { CreateLectureForm } from '../CreateLectureForm'
export interface LectureCardProps extends CardProps {
  data?: Lecture
  className?: string
}

export const LectureCard: React.FC<LectureCardProps> = props => {
  const { data, className } = props
  const { userInfo, addBookmark, removeBookmark } = userInfoStore()

  const [subject] = useState<Record<string, SubjectDTO>>(kuSubject.subjects)
  const history = useHistory()

  const handleAddBookmark = () => {
    if (data?.lectureId) {
      addUserBookmark(data.lectureId, userInfo.bookmark)
        .then(() => {
          addBookmark(data.lectureId || '')
          message.success('add bookmark')
        })
        .catch(() => message.error('fail'))
    }
  }

  const handleDeleteBookmark = () => {
    if (data?.lectureId) {
      deleteUserBookmark(data.lectureId, userInfo.bookmark).then(() => {
        removeBookmark(data.lectureId || '')
        message.success('remove bookmark')
      })
    }
  }

  const handleMenuItem = (info: MenuInfo) => {
    switch (info.key) {
      case 'edit':
        return setIsDropDownVisible(true)
    }
  }

  const menu = (
    <Menu onMouseLeave={() => setIsDropDownVisible(false)}>
      <Menu.Item key="edit" className="m-0 p-0">
        <CreateLectureForm
          initData={data}
          className="w-full h-full px-2 py-1.5"
          callback={() => setIsDropDownVisible(false)}
        >
          <EditOutlined className="align-middle" /> แก้ไข
        </CreateLectureForm>
      </Menu.Item>
      <Menu.Item danger className="m-0 p-0">
        <div className="px-2 py-1.5">
          <Popconfirm
            title="คุณแน่ใจใช่ไหมที่จะลบ"
            placement="right"
            className="px-2 py-1.5"
            onConfirm={() => setIsDropDownVisible(false)}
          >
            {/* <div className="px-2 py-1.5"> */}
            <DeleteOutlined className="align-middle" /> ลบ
            {/* </div> */}
          </Popconfirm>
        </div>
      </Menu.Item>
    </Menu>
  )

  const [isDropDownVisible, setIsDropDownVisible] = useState(false)

  return (
    <div className={`relative w-40 h-52 ${className}`}>
      <div className="absolute z-10 right-0 top-0">
        {userInfo.userId === data?.userId && (
          <Dropdown
            visible={isDropDownVisible}
            overlay={menu}
            placement="bottomRight"
            trigger={['click']}
          >
            <Button shape="circle" className="mt-1 mr-1" onClick={() => setIsDropDownVisible(true)}>
              <MoreOutlined className=" align-middle text-lg" rotate={90} />
            </Button>
          </Dropdown>
        )}
        {userInfo.userId !== data?.userId &&
          userInfo.bookmark &&
          (userInfo.bookmark.findIndex(mark => mark === data?.lectureId) === -1 ? (
            <AuthZone>
              <Button shape="circle" className="mt-1 mr-1" onClick={handleAddBookmark}>
                <BookOutlined className=" align-middle" />
              </Button>
            </AuthZone>
          ) : (
            <Button shape="circle" className="mt-1 mr-1" onClick={handleDeleteBookmark}>
              <BookFilled className=" align-middle text-green-500" />
            </Button>
          ))}
      </div>
      <div
        className={`cursor-pointer  ${className}`}
        onClick={() => history.push(`post/${data?.lectureId}`)}
      >
        <Badge.Ribbon text={`${data?.viewCount} views`} placement="start" className="mt-1">
          <div
            className={`border-2 w-40 h-52 bg-cover flex flex-col justify-end hover:shadow-lg bg-center`}
            style={{ backgroundImage: `url(${data?.imageUrl[0]})` }}
          >
            <div className="flex flex-col items-end justify-end w-full h-full">
              <div>
                {data?.tags.map((tag, index) => (
                  <div
                    className="bg-white mb-1 mr-1 px-1 rounded-sm opacity-75 text-xs"
                    key={index}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            <div className=" bg-black h-9 opacity-75 text-white p-1 text-xs flex flex-col justify-center">
              <p>{data?.lectureTitle}</p>
              <Typography.Text ellipsis className="text-white">
                วิชา{' '}
                {subject[data?.subjectId as string] &&
                  subject[data?.subjectId as string].subjectNameEn}
              </Typography.Text>
            </div>
          </div>
        </Badge.Ribbon>
      </div>
    </div>
  )
}
