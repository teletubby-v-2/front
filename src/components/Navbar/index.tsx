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
  notification,
} from 'antd'
import { useHistory, useLocation, Link } from 'react-router-dom'
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
import { addnotification, readAllNoti } from '../../service/user'
import { useInfiniteQuery } from '../../hooks/useInfiniteQuery'
import { COLLECTION } from '../../constants'
import { options } from '../../utils/optionsUtil'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { TeamOutlined, DiffOutlined } from '@ant-design/icons'

const getNotiIcon = (type: string) => {
  if (type == 'follow') {
    return <TeamOutlined className="text-blue-200" />
  } else if (type == 'lecture') {
    return <DiffOutlined className="text-blue-200" />
  }
}

const switchNotiTitle = (type: string) => {
  switch (type) {
    case 'follow':
      return 'New Following!'
    case 'lecture':
      return 'New Lecture!'
    default:
      return ''
  }
}

export const Navbar: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const { userInfo, setNotificationReadCount, addNotificationReadCount } = userInfoStore()
  const [lastestId, setLastestId] = useState<string>()
  const { data, hasNext, setQuery, fetchMore, isLoading } = useInfiniteQuery<Notification>(
    firestore.collection(COLLECTION.NOTIFICATIONS).where('relevantUserId', 'array-contains', ''),
    'notiId',
  )
  const [value, setvalue] = useState('')

  useEffect(() => {
    if (lastestId && data?.[0]?.notiId && lastestId !== data[0].notiId) {
      setLastestId(data[0].notiId)
      const thisNoti = data[0]
      notification.open({
        key: thisNoti.notiId,
        message: switchNotiTitle(thisNoti.type),
        description: thisNoti.body,
        icon: getNotiIcon(thisNoti.type),
        duration: null,
        onClick: () => {
          if (!userInfo.notificationReadCount.includes(thisNoti.notiId ? thisNoti.notiId : '')) {
            addnotification(thisNoti.notiId || '').then(() =>
              addNotificationReadCount(thisNoti.notiId || ''),
            )
          }
          notification.close(thisNoti.notiId || '')
          history.push(thisNoti.link)
        },
        className: 'cursor-pointer',
      })
    } else if (!lastestId && data[0]) {
      setLastestId(data[0].notiId)
    }
  }, [data])

  useEffect(() => {
    setQuery(
      firestore
        .collection(COLLECTION.NOTIFICATIONS)
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
        return history.push('/profile')
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
    () => data.filter(noti => !userInfo.notificationReadCount?.includes(noti.notiId || ''))?.length,
    [data, userInfo.notificationReadCount],
  )

  const notiMenu = useMemo(() => {
    return (
      <>
        <div className="pb-1 flex items-center justify-between">
          <div className="py-1 text-lg">
            <BellFilled className="m-2 mr-1" />
            การแจ้งเตือน
          </div>
          <Button
            onClick={readAll}
            className="flex"
            size="small"
            disabled={userInfo?.notificationReadCount?.length === data.length}
          >
            อ่านทั้งหมด
          </Button>
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
    <div className="relative">
      <nav className="text-xl h-16 navbar">
        <div className="container mx-auto flex justify-between items-center p-3 ">
          <Link to="/home">
            <LazyLoadImage width={129} src={KUshare} className="cursor-pointer " effect="opacity" />
          </Link>
          <div className="text-center w-full space-x-2">
            <SearchOutlined className="text-xl inline-block " />
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
                    <FileAddOutlined />
                  </Button>
                </Tooltip>
              </CreateLectureForm>

              <Badge count={numNoti} offset={[-5, 7]}>
                <Popover
                  className="text-xl text-black"
                  content={notiMenu}
                  trigger={['click']}
                  placement="bottomLeft"
                  overlayClassName="w-72 fixed top-12 ml-3"
                >
                  <Button type="link" shape="circle">
                    <BellOutlined />
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
                <Avatar
                  icon={<UserOutlined />}
                  src={userInfo.imageUrl}
                  size="large"
                  className="border cursor-pointer"
                />
              </Dropdown>
            </div>
          ) : (
            <div className="flex  space-x-4">
              <Button className="text-md h-9 y-2">
                <AuthZone>เข้าสู่ระบบ</AuthZone>
              </Button>
              <Button className="text-md h-9" type="primary">
                <AuthZone noAccount={true}>ลงชื่อเข้าใช้</AuthZone>
              </Button>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}
