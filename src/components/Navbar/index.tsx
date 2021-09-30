import React, { ReactElement, useEffect, useMemo, useState } from 'react'
import {
  Avatar,
  Menu,
  Dropdown,
  Button,
  Select,
  Tooltip,
  Badge,
  Empty,
  Popover,
  Divider,
} from 'antd'
import { useHistory } from 'react-router'
import KUshare from '../../assets/icons/KUshare.svg'
import {
  UserOutlined,
  BellOutlined,
  FileAddOutlined,
  SearchOutlined,
  BellFilled,
  LogoutOutlined,
} from '@ant-design/icons'
import { userInfoStore } from '../../store/user.store'
import { logout } from '../../service/auth'
import { MenuInfo } from 'rc-menu/lib/interface'
import { firebaseApp } from '../../config/firebase'
import { AuthZone } from '..'
import { CreateLectureForm } from '../CreateLectureForm'
import kuSubject from '../../constants/subjects.json'
import { getNoti } from '../../service/noti'
import { NotiMenuItem } from '../NotiMenu'
import { Notification } from '../../constants/interface/notification.interface'
import { addnotification } from '../../service/user'

export const Navbar: React.FC = () => {
  const history = useHistory()
  const { userInfo, addnotificationReadCount } = userInfoStore()
  const [numnoti, setNumnoti] = useState(0)
  const [notilist, setNotilist] = useState<Notification[]>([])
  const isLogin = () => (firebaseApp.auth().currentUser ? true : false)

  useEffect(() => {
    getNoti().then(data => {
      setNotilist(data)
    })
  }, [isLogin()])

  const onSearch = (value: string) => {
    value ? history.push('/viewAll/' + value) : null
  }

  const onClickLogo = () => {
    history.push('/home')
  }

  const onLogout = () => {
    logout()
    history.push('/login')
  }

  const handleMenuClick = (info: MenuInfo) => {
    switch (info.key) {
      case 'profile':
        return history.push('/Profile')
      case 'logout':
        return onLogout()
    }
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile" hidden={!isLogin()} icon={<UserOutlined />}>
        โปรไฟล์
      </Menu.Item>
      <Menu.Item key="logout" hidden={!isLogin()} icon={<LogoutOutlined />}>
        ออกจากระบบ
      </Menu.Item>
    </Menu>
  )

  const readAll = () => {
    const idlist = notilist.map(notiinfo => notiinfo.notiId)
    idlist.forEach(notiId => {
      if (notiId && !userInfo.notificationReadCount.includes(notiId ? notiId : '')) {
        addnotification(notiId).then(() => addnotificationReadCount(notiId))
      }
    })
  }

  const notiMenu = useMemo(() => {
    const idlist = notilist.map(notiinfo => notiinfo.notiId)
    const intersec = userInfo.notificationReadCount?.filter(id => idlist.includes(id)) || []
    setNumnoti(idlist.length - intersec.length)
    return (
      <>
        <div className="pb-1 flex items-center justify-between">
          <div className="py-1 text-lg">
            <BellFilled className="mr-2 align-middle" />
            การแจ้งเตือน
          </div>
          <div>
            <Button
              onClick={readAll}
              className="flex"
              size="small"
              disabled={userInfo.notificationReadCount.length === notilist.length}
            >
              อ่านทั้งหมด
            </Button>
          </div>
        </div>
        <div className="overflow-y-scroll max-h-96">
          {notilist.length !== 0 ? (
            notilist.map(notiInfo => {
              if (notiInfo.notiId) {
                return (
                  <>
                    <NotiMenuItem
                      notiId={notiInfo.notiId}
                      type={notiInfo.type}
                      body={notiInfo.body}
                      link={notiInfo.link}
                      key={notiInfo.notiId}
                    />
                    <Divider className="my-0" />
                  </>
                )
              }
            })
          ) : (
            <>
              <Divider className="mt-1 mb-2" />
              <Empty description="ไม่มีการแจ้งเตือน" />
            </>
          )}
        </div>
      </>
    )
  }, [notilist, userInfo.notificationReadCount])

  return (
    <div>
      <nav className="text-xl h-16 navbar">
        <div className="container mx-auto flex justify-between items-center p-3 ">
          <img width={129} src={KUshare} onClick={onClickLogo} className="cursor-pointer " />
          <div className="text-center w-full space-x-2">
            <SearchOutlined className="text-xl" />
            <Select
              allowClear
              showSearch
              className="max-w-3xl w-4/6 text-left"
              onSelect={onSearch}
              size="large"
              dropdownClassName="fixed"
              showArrow={false}
              placeholder="ค้นหารายวิชา"
            >
              {Object.entries(kuSubject.subjects).map(([key, subject]) => (
                <Select.Option
                  key={key}
                  value={`${key} ${subject.subjectNameTh}${subject.subjectNameEn}`}
                >
                  {key} {subject.subjectNameTh} {subject.subjectNameEn}
                </Select.Option>
              ))}
            </Select>
          </div>

          {isLogin() ? (
            <div className="flex items-center space-x-5">
              <CreateLectureForm>
                <Tooltip title="เพิ่มสรุป" placement="bottom">
                  <Button className="text-xl text-black" type="link" shape="circle">
                    <FileAddOutlined className="align-top" />
                  </Button>
                </Tooltip>
              </CreateLectureForm>

              <Badge count={numnoti}>
                <Popover
                  className="text-xl text-black"
                  content={notiMenu}
                  placement="bottomLeft"
                  trigger="click"
                  overlayStyle={{
                    top: '50px !important',
                    marginLeft: '4px',
                  }}
                  overlayClassName="w-72 fixed "
                  autoAdjustOverflow
                >
                  <Button type="link" shape="circle">
                    <BellOutlined className="align-top" />
                  </Button>
                </Popover>
              </Badge>
              <Dropdown
                overlay={menu}
                trigger={['click']}
                placement="bottomRight"
                overlayClassName="fixed"
                arrow
              >
                {userInfo.imageUrl ? (
                  <Avatar src={userInfo.imageUrl} size="large" className="border cursor-pointer" />
                ) : (
                  <Avatar icon={<UserOutlined />} size="large" className="border cursor-pointer" />
                )}
              </Dropdown>
            </div>
          ) : (
            <div className="flex items-center space-x-5">
              <Button className="text-l text-black" type="default">
                <AuthZone>ลงชี่อเข้าใช้</AuthZone>
              </Button>

              <Button className="text-l" type="primary">
                <AuthZone noAccount={true}>ลงชื่อเข้าใช้</AuthZone>
              </Button>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}
