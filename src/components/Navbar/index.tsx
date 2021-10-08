import React, { useEffect, useMemo, useState } from 'react'
import {
  Avatar,
  Menu,
  Dropdown,
  Button,
  Tooltip,
  Badge,
  Empty,
  Popover,
  Divider,
  AutoComplete,
  Input,
  Modal,
} from 'antd'
import { useHistory, useLocation } from 'react-router'
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
import { firebaseApp, firestore } from '../../config/firebase'
import { AuthZone } from '..'
import { CreateLectureForm } from '../CreateLectureForm'
import { NotiMenuItem } from '../NotiMenu'
import { Notification } from '../../constants/interface/notification.interface'
import { readAllNoti } from '../../service/user'
import { useInfiniteQuery } from '../../hooks/useInfiniteQuery'
import { Collection } from '../../constants'
import { options } from '../../utils/optionsUtil'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export const Navbar: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const { userInfo, setNotificationReadCount } = userInfoStore()
  const { data, hasNext, setQuery, fetchMore, isLoading } = useInfiniteQuery<Notification>(
    firestore.collection(Collection.Notifications).where('relevantUserId', 'array-contains', ''),
    'notiId',
  )
  const [value, setvalue] = useState('')

  useEffect(() => {
    setQuery(
      firestore
        .collection(Collection.Notifications)
        .where('relevantUserId', 'array-contains', userInfo.userId)
        .orderBy('createAt', 'desc'),
    )
  }, [userInfo.userId])

  const onSelect = (value: string) => {
    if (value) {
      setvalue('')
      history.push('/viewAll/' + value)
    }
  }

  const onClickLogo = () => {
    history.push('/home')
  }

  const onLogout = () => {
    logout()
    history.push('/login')
  }

  useEffect(() => {
    if (location.pathname !== '/searchResult') {
      setvalue('')
    }
  }, [location])

  const handleMenuClick = (info: MenuInfo) => {
    switch (info.key) {
      case 'profile':
        return history.push('/Profile')
      case 'logout':
        return Modal.warning({
          title: 'ออกจากระบบ',
          content: 'คุณแน่ใจใช่ไหมว่าจะออกจากระบบ',
          autoFocusButton: 'cancel',
          onOk: onLogout,
          closable: true,
          okCancel: true,
          maskClosable: true,
        })
    }
  }

  const menu = useMemo(
    () => (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="profile" icon={<UserOutlined />}>
          โปรไฟล์
        </Menu.Item>
        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          ออกจากระบบ
        </Menu.Item>
      </Menu>
    ),
    [],
  )

  const readAll = () => {
    readAllNoti(data).then(idList => {
      // const unionId = new Set([...userInfo.notificationReadCount, ...idList])
      setNotificationReadCount([...userInfo.notificationReadCount, ...idList])
    })
  }

  const numNoti = useMemo(
    () => data.filter(noti => !userInfo.notificationReadCount.includes(noti.notiId || '')).length,
    [data, userInfo.notificationReadCount],
  )

  const notiMenu = useMemo(() => {
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
              disabled={userInfo.notificationReadCount.length === data.length}
            >
              อ่านทั้งหมด
            </Button>
          </div>
        </div>
        <div className="overflow-y-scroll max-h-96">
          {data.length !== 0 ? (
            <>
              {data.map(notiInfo => {
                if (notiInfo.notiId) {
                  return (
                    <NotiMenuItem
                      notiId={notiInfo.notiId}
                      type={notiInfo.type}
                      body={notiInfo.body}
                      link={notiInfo.link}
                      key={notiInfo.notiId}
                    />
                  )
                }
              })}
              {hasNext && (
                <Button loading={isLoading} onClick={fetchMore} block type="dashed">
                  ดูเพิ่มเติม
                </Button>
              )}
            </>
          ) : (
            <>
              <Divider className="mt-1 mb-2" />
              <Empty description="ไม่มีการแจ้งเตือน" />
            </>
          )}
        </div>
      </>
    )
  }, [data, isLoading, hasNext])

  return (
    <div>
      <nav className="text-xl h-16 navbar">
        <div className="container mx-auto flex justify-between items-center p-3 ">
          <LazyLoadImage
            width={129}
            src={KUshare}
            onClick={onClickLogo}
            className="cursor-pointer "
            effect="blur"
          />
          <div className="text-center w-full space-x-2">
            <SearchOutlined className="text-xl" />
            <AutoComplete
              options={options}
              value={value}
              onSelect={onSelect}
              onChange={e => setvalue(e)}
              allowClear
              autoClearSearchValue
              onFocus={e => (e.target as HTMLInputElement).select()}
              filterOption={(inputValue, option) => {
                const node = option?.label?.valueOf() as JSX.Element
                return !!node.key?.toString().includes(inputValue.toLowerCase())
              }}
              dropdownClassName="fixed"
              className="max-w-3xl w-4/6 text-left"
            >
              <Input
                type="text"
                placeholder="ค้นหารายวิชา"
                size="large"
                onKeyDown={e => {
                  if (e.code === 'Enter') {
                    history.push(`/searchResult?search=${(e.target as HTMLInputElement).value}`)
                  }
                }}
              />
            </AutoComplete>
          </div>
          {firebaseApp.auth().currentUser ? (
            <div className="flex items-center space-x-5">
              <CreateLectureForm>
                <Tooltip title="เพิ่มสรุป" placement="bottom">
                  <Button className="text-xl text-black" type="link" shape="circle">
                    <FileAddOutlined className="align-top" />
                  </Button>
                </Tooltip>
              </CreateLectureForm>

              <Badge count={numNoti}>
                <Popover
                  className="text-xl text-black"
                  content={notiMenu}
                  trigger={['click']}
                  placement="bottomLeft"
                  overlayClassName="w-72 fixed top-12 ml-3"
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
