import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Input, Space, Avatar, Button, Image, Menu, Dropdown, Badge } from 'antd'
import { useHistory } from 'react-router'
import 'tailwindcss/tailwind.css'
import KUshare from '../../assets/svg/KUshare.svg'
import { UserOutlined, BellOutlined } from '@ant-design/icons'
import { userInfoStore } from '../../store/user.store'

const { Search } = Input

const Navbar: React.FC = () => {
  const history = useHistory()
  const photoURL = userInfoStore(state => state.photoURL)

  const onSearch = (value: string) => {
    value ? history.push(`/item/${value}`) : null
  }

  const onLogo = () => {
    history.push('/home')
  }

  const menu = (
    <Menu>
      <Menu.Item>Login</Menu.Item>
      <Menu.Item>Register</Menu.Item>
      <Menu.Item>Profile</Menu.Item>
      <Menu.Item>Logout</Menu.Item>
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
        <Dropdown overlay={menu}>
          {photoURL ? <Avatar src={photoURL} /> : <Avatar icon={<UserOutlined />} />}
        </Dropdown>
      </nav>
    </>
  )
}

export default Navbar
