import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Input, Space, Avatar, Button, Image, Menu, Dropdown, Badge } from 'antd'
import { useHistory } from 'react-router'
import 'tailwindcss/tailwind.css'
import KUshare from '../../assets/svg/KUshare.svg'
import { UserOutlined, BellOutlined, LogoutOutlined } from '@ant-design/icons'
import { userInfoStore } from '../../store/user.store'
import { modalAccountStore } from '../../store/modalAccount.store'
import { logout } from '../../service/auth'

const { Search } = Input

const Navbar: React.FC = () => {
  const history = useHistory()
  const { userId, photoURL, clearAll } = userInfoStore()
  const { closeModal, openModal, toLogin, toRegister } = modalAccountStore()
  const onSearch = (value: string) => {
    value ? history.push(`/item/${value}`) : null
  }

  const onLogo = () => {
    history.push('/Home')
  }

  const login = () => {
    toLogin()
    openModal()
  }

  const register = () => {
    toRegister()
    openModal()
  }

  const logoutToHome = () => {
    logout()
    clearAll()
    history.push('/home')
  }

  const isLogin = () => (userId ? true : false)

  const menu = (
    <Menu className="mt-4">
      <Menu.Item onClick={login} hidden={isLogin()}>
        Login
      </Menu.Item>
      <Menu.Item onClick={register} hidden={isLogin()}>
        Signup
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          history.push('/Profile')
        }}
        hidden={!isLogin()}
      >
        Profile
      </Menu.Item>
      <Menu.Item onClick={logoutToHome} hidden={!isLogin()}>
        {' '}
        <LogoutOutlined />
        Logout
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <nav className="fixed flex top-0 w-full h-20 text-xl items-center justify-center bg-gray-200 z-50">
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
      </nav>
    </>
  )
}

export default Navbar
