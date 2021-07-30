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
import styled from 'styled-components'

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
  const { userId, photoURL, clearAll } = userInfoStore()
  const { closeModal, openModal, toLogin, toRegister } = modalAccountStore()
  const onSearch = (value: string) => {
    value ? history.push(`${value}`) : null
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
