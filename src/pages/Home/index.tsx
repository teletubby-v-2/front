import React from 'react'
import { LectureContainer } from '../../components'
import { dummyLectures } from '../../constants/dummyData/lecture.dummy'
import { userInfoStore } from '../../store/user.store'
import { Dropdown, Menu } from 'antd'
import { DownOutlined } from '@ant-design/icons/lib/icons'
export const Home: React.FC = () => {
  const { userInfo } = userInfoStore()

  return (
    <div className="mb-10 mx-2 space-y-7">
      {userInfo.userId.length !== 0 && (
        <>
          <LectureContainer
            title="My Subject"
            data={dummyLectures}
            limit={8}
            extra={<a href="/myLecture">ดูทั้งหมด</a>}
          />
          <LectureContainer
            title="BookMark Lectures"
            data={dummyLectures}
            limit={8}
            extra={<a href="/myLecture">ดูทั้งหมด</a>}
          />
        </>
      )}
      <LectureContainer
        title="Recent Lectures"
        data={dummyLectures}
        limit={8}
        extra={
          <div className="space-x-3">
            <Dropdown
              overlay={<Menu>{/* //TODO add filter component here */}</Menu>}
              trigger={['click']}
            >
              <a onClick={e => e.preventDefault()}>
                filter <DownOutlined />
              </a>
            </Dropdown>
            <Dropdown
              overlay={<Menu>{/* //TODO add sort component here */}</Menu>}
              trigger={['click']}
            >
              <a onClick={e => e.preventDefault()}>
                sort <DownOutlined />
              </a>
            </Dropdown>
          </div>
        }
      />
    </div>
  )
}
