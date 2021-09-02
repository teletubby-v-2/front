import React from 'react'
import { Input, Avatar, Menu, Dropdown, Button } from 'antd'
import { useHistory } from 'react-router'
import KUshare from '../../assets/icons/KUshare.svg'
import { UserOutlined, BellOutlined } from '@ant-design/icons'
import { userInfoStore } from '../../store/user.store'
import { logout } from '../../service/auth'
import styled from 'styled-components'
import { MenuInfo } from 'rc-menu/lib/interface'
import { firebaseApp } from '../../config/firebase'
import { AuthZone } from '..'

const { Search } = Input

const Nav = styled.nav`
  background-color: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 50;
`

export const Navbar: React.FC = () => {
  const history = useHistory()
  const { userInfo } = userInfoStore()

  const onSearch = (value: string) => {
    value ? history.push(`${value}`) : null
  }

  const onClickLogo = () => {
    history.push('/Home')
  }

  const handleMenuClick = (info: MenuInfo) => {
    switch (info.key) {
      case 'profile':
        return history.push('/Profile')
      case 'logout':
        return logout()
      // return history.push('/home')
      case 'login':
        return console.log(112)
    }
  }

  const isLogin = () => (firebaseApp.auth().currentUser ? true : false)

  const menu = (
    <Menu onClick={handleMenuClick} className="mt-2">
      <Menu.Item key="login" hidden={isLogin()}>
        <AuthZone>Sign In</AuthZone>
      </Menu.Item>
      <Menu.Item key="register" hidden={isLogin()}>
        <AuthZone noAccount={true}>Sign Up</AuthZone>
      </Menu.Item>
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
      <Nav className="text-xl">
        <div className="container mx-auto flex justify justify-between items-center p-3">
          <img width={129} src={KUshare} onClick={onClickLogo} className="cursor-pointer" />
          <Search
            placeholder="ค้นหารายวิชา"
            onSearch={onSearch}
            size="large"
            className="max-w-xl mx-3"
          />
          <div className="flex items-center">
            <Button className="text-xl text-black" type="link">
              <BellOutlined className="align-top" />
            </Button>
            <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
              {userInfo.imageUrl ? (
                <Avatar src={userInfo.imageUrl} size="large" className="border cursor-pointer" />
              ) : (
                <Avatar icon={<UserOutlined />} size="large" className="border cursor-pointer" />
              )}
            </Dropdown>
          </div>
        </div>
      </Nav>
    </div>
  )
}
