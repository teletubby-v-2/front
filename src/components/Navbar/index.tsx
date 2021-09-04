import React, { useState } from 'react'
import { Input, Avatar, Menu, Dropdown, Button } from 'antd'
import { useHistory } from 'react-router'
import KUshare from '../../assets/icons/KUshare.svg'
import { UserOutlined, BellOutlined, FileAddOutlined } from '@ant-design/icons'
import { userInfoStore } from '../../store/user.store'
import { logout } from '../../service/auth'
import styled from 'styled-components'
import { MenuInfo } from 'rc-menu/lib/interface'
import { firebaseApp } from '../../config/firebase'
import { AuthZone } from '..'
import { Tooltip } from 'antd'
import { CreateLectureForm } from '../CreateLectureForm'

const { Search } = Input

export const Navbar: React.FC = () => {
  const history = useHistory()
  const { userInfo } = userInfoStore()

  const onSearch = (value: string) => {
    value ? history.push(`${value}`) : null
  }

  const onClickLogo = () => {
    history.push('/home')
  }

  const onLogout = () => {
    logout()
    history.push('/home')
  }

  const handleMenuClick = (info: MenuInfo) => {
    switch (info.key) {
      case 'profile':
        return history.push('/Profile')
      case 'logout':
        return onLogout()
    }
  }

  const isLogin = () => (firebaseApp.auth().currentUser ? true : false)

  const menu = (
    <Menu onClick={handleMenuClick} className="mt-2">
      <Menu.Item key="profile" hidden={!isLogin()}>
        Profile
      </Menu.Item>
      <Menu.Item key="logout" hidden={!isLogin()}>
        Logout
      </Menu.Item>
    </Menu>
  )

  return (
    <div>
      <nav className="text-xl h-16 navbar">
        <div className="container mx-auto flex justify justify-between items-center p-3">
          <img width={129} src={KUshare} onClick={onClickLogo} className="cursor-pointer" />
          <Search
            placeholder="ค้นหารายวิชา"
            onSearch={onSearch}
            size="large"
            className="max-w-xl mx-3"
          />
          {isLogin() ? (
            <div className="flex items-center space-x-2">
              <CreateLectureForm>
                <Tooltip title="เพิ่ม lecture" placement="bottom">
                  <Button className="text-xl text-black" type="link" shape="circle">
                    <FileAddOutlined className="align-top" />
                  </Button>
                </Tooltip>
              </CreateLectureForm>

              <Tooltip title="การแจ้งเตือน" placement="bottom">
                <Button className="text-xl text-black" type="link" shape="circle">
                  <BellOutlined className="align-top" />
                </Button>
              </Tooltip>
              <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                {userInfo.imageUrl ? (
                  <Avatar src={userInfo.imageUrl} size="large" className="border cursor-pointer" />
                ) : (
                  <Avatar icon={<UserOutlined />} size="large" className="border cursor-pointer" />
                )}
              </Dropdown>
            </div>
          ) : (
            <div className="flex items-center space-x-5">
              <Button shape="round" className="text-l text-black" type="default">
                <AuthZone>ลงชี่อเข้าใช้</AuthZone>
              </Button>

              <Button shape="round" className="text-l text-black" type="primary">
                <AuthZone noAccount={true}>สมัครสมาชิก</AuthZone>
              </Button>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}
