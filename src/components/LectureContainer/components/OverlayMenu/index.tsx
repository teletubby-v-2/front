import { Menu, Popconfirm } from 'antd'
import React from 'react'
import { Lecture } from '../../../../constants/interface/lecture.interface'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { CreateLectureForm } from '../../../CreateLectureForm'
import { deleteLecture } from '../../../../service/lectures'
import { userInfoStore } from '../../../../store/user.store'
import { lectureStore } from '../../../../store/lecture.store'

export interface OverlayMenuProps {
  data: Lecture
  index: number
  isOnEdit: boolean
  setIsOnEdit: (v: boolean) => void
  removeLecture: (n: number) => void
  updateLecture: (l: Lecture, i: number) => void
  setIsDropDownVisible: (value: boolean, index: number) => void
}

export const OverlayMenu: React.FC<OverlayMenuProps> = ({
  data,
  index,
  isOnEdit,
  setIsOnEdit,
  removeLecture,
  setIsDropDownVisible,
  updateLecture,
}) => {
  const { userInfo } = userInfoStore()
  const { removeOwnLecture } = lectureStore()

  return (
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
}
