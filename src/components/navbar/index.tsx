import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Input, Space, Avatar, Button, Image, Menu, Dropdown } from 'antd'
import { useHistory } from 'react-router'
import 'tailwindcss/tailwind.css'
import KUshare from '../../assets/svg/KUshare.svg'
import { UserOutlined } from '@ant-design/icons'

const { Search } = Input

const Navbar: React.FC = () => {
  const history = useHistory()

  const onSearch = (value: string) => {
    history.push(`/item/${value}`)
  }

  const menu = (
    <Menu>
      <Menu.Item>Login</Menu.Item>
      <Menu.Item>Register</Menu.Item>
    </Menu>
  )

  return (
    <>
      <nav className="flex top-0 sticky h-20 text-xl items-center justify-center bg-gray-200">
        <img width={129} src={KUshare} />
        <Search
          placeholder="ค้นหารายวิชา"
          onSearch={onSearch}
          size="large"
          className="max-w-xl mx-44"
        />
        <Dropdown overlay={menu}>
          <Avatar icon={<UserOutlined />} />
        </Dropdown>
      </nav>
    </>
  )
}

export default Navbar
