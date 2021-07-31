import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Input, Space, Avatar, Button, Image, Menu, Dropdown, Badge } from 'antd'
import { useHistory } from 'react-router'
import 'tailwindcss/tailwind.css'
import KUshare from '../../assets/svg/KUshare.svg'
import { UserOutlined, BellOutlined, LogoutOutlined } from '@ant-design/icons'
import { userInfoStore } from '../../store/user.store'
import { modalAccountStore } from '../../store/modalAccount.store'
import { logout } from '../../service/auth'
import styled from 'styled-components'
import { firebaseApp } from '../../config/firebase'
import { MenuInfo } from 'rc-menu/lib/interface'
import firebase from 'firebase'

const { Search } = Input

const Nav = styled.nav`
  background-color: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: fixed;
  display: flex;
  top: 0;
  width: 100%;
  height: 80px;
  align-items: center;
  justify-content: center;
  z-index: 50;
`

export const Navbar: React.FC = () => {
  const history = useHistory()
  const { userId, photoURL, clearAll, setAllFirebase } = userInfoStore()
  const { closeModal, openModal, toLogin, toRegister } = modalAccountStore()
  const onSearch = (value: string) => {
    value ? history.push(`${value}`) : null
  }

  const onLogo = () => {
    history.push('/Home')
  }

  const handleMenuClick = (info: MenuInfo) => {
    switch (info.key) {
      case 'login':
        toLogin()
        return openModal()
      case 'register':
        toRegister()
        return openModal()
      case 'profile':
        return history.push('/Profile')
      case 'logout':
        logout().then(() => clearAll())
        return history.push('/Home')
    }
  }

  const isLogin = () => (firebaseApp.auth().currentUser ? true : false)

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="login" hidden={isLogin()}>
        Login
      </Menu.Item>
      <Menu.Item key="register" hidden={isLogin()}>
        Signup
      </Menu.Item>
      <Menu.Item key="profile" hidden={!isLogin()}>
        Profile
      </Menu.Item>
      <Menu.Item key="logout" hidden={!isLogin()}>
        {' '}
        Logout
      </Menu.Item>
    </Menu>
  )

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setAllFirebase(user as firebase.UserInfo)
      }
    })
  }, [])

  return (
    <>
      <Nav className="text-xl">
        <img width={129} src={KUshare} onClick={onLogo} />
        <Search
          placeholder="ค้นหารายวิชา"
          onSearch={onSearch}
          size="large"
          className="max-w-xl mx-44"
        />
        <Badge count={null} className="mx-6 text-xl pb-2">
          <BellOutlined />
        </Badge>
        <Dropdown overlay={menu} trigger={['click']} placement={'bottomRight'}>
          {photoURL ? (
            <Avatar src={photoURL} size="large" />
          ) : (
            <Avatar icon={<UserOutlined />} size="large" />
          )}
        </Dropdown>
      </Nav>
    </>
  )
}
