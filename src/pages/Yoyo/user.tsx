import { Breadcrumb, Button, Card, Dropdown, Menu } from 'antd'
import Meta from 'antd/lib/card/Meta'
import React, { useEffect, useState } from 'react'
import { firebaseApp, firestore } from '../../config/firebase'
import { CreateUserDTO, UpdateUserDTO } from '../../constants/dto/myUser.dto'
import { createUser, updateUser, deleteUser } from '../../service/user'
import { convertTimestampToTime } from '../../utils/time'
import { description, img, username } from './dummy/index.dummy'
import { DownOutlined } from '@ant-design/icons'
import { followUser, unFollowUser } from '../../service/user/follow'
import { Link } from 'react-router-dom'

const User: React.FC = () => {
  const [count, setCount] = useState(0)
  const [userProfile, setuserProfile] = useState<CreateUserDTO[]>([])

  const testCreateUser = () => {
    const data: CreateUserDTO = {
      imageUrl: 'https://image.taiwannews.com.tw/photos/2021/08/21/1629525624-612096782050a.PNG',
      email: 'polybeareie@iglu.com',
      userName: 'eiei',
    }
    setCount(count + 1)
    createUser(data)
  }

  const testFollow = () => {
    const id = '777'
    followUser(id)
  }

  const testunFollow = () => {
    const id = '777'
    unFollowUser(id)
  }

  const testUpdateUser = () => {
    const data: UpdateUserDTO = {
      imageUrl: img[count % 5],
      userName: username[count % 2],
      socialLink: {
        facebook: 'https://www.facebook.com/prayutofficial/',
      },
      donateImage: img[count % 4],
      donateDescription: username[count % 3],
      aboutMe: description[count % 6],
      bookmark: ['123'],
    }
    setCount(count + 1)
    updateUser(data)
  }

  const testDeleteUser = (id: string) => {
    deleteUser(id)
  }

  const handleSelectFor = (action: 'delete' | 'update', id: string) => {
    switch (action) {
      case 'delete':
        return testDeleteUser(id)
      case 'update':
        return testUpdateUser()
    }
  }

  useEffect(() => {
    firestore
      .collection('Users')
      .orderBy('createAt')
      .limit(5)
      .onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(change => {
          const data = change.doc.data()
          if (change.type === 'added') {
            console.log('New User: ', data)
            setuserProfile(userMap => [
              ...userMap,
              { ...data, userId: change.doc.id } as CreateUserDTO,
            ])
          }
          if (change.type === 'modified') {
            console.log('Modified user: ', data)
            setuserProfile(userMap => {
              const index = userMap.findIndex(user => user.userId === change.doc.id)

              return [
                ...userMap.slice(0, index),
                { ...data, userId: change.doc.id } as CreateUserDTO,
                ...userMap.slice(index + 1),
              ]
            })
          }
          if (change.type === 'removed') {
            console.log('Removed user: ', data)
            setuserProfile(userMap => userMap.filter(user => user.userId !== change.doc.id))
          }
        })
      })
  }, [])

  const menu = (
    <Menu>
      <Menu.Item>
        <Link target="" to="/yoyo">
          Lectures
        </Link>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className=" my-10 space-y-5">
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>Tester</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/pong">pongUser</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Dropdown overlay={menu}>
          <a onClick={e => e.preventDefault()}>
            go to <DownOutlined />
          </a>
        </Dropdown>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-2xl">path สำหรับ test user</h1>
        <ul className="text-lg">
          <li>create user -{'>'} สร้าง user</li>
          <li>update -{'>'} update title กับ des</li>
          <li>delete -{'>'} ลบบบบบบบบบบบบบบบบบ</li>
        </ul>
      </div>
      <div className="flex justify-center space-x-2">
        <Button size="large" type="primary" onClick={testCreateUser}>
          create user
        </Button>
        <Button size="large" type="primary" onClick={testFollow}>
          follow user
        </Button>
        <Button size="large" type="primary" onClick={testunFollow}>
          unfollow user
        </Button>
      </div>
      <div className="grid grid-cols-5 gap-5 container mx-auto">
        {userProfile.map(user => (
          <Card
            className=""
            key={user.userId}
            cover={<img className="h-96 object-cover" alt="cock" src={user.imageUrl} />}
            actions={[
              <div key="2" onClick={() => handleSelectFor('delete', user.userId || '')}>
                delete
              </div>,
              <div key="3" onClick={() => handleSelectFor('update', user.userId || '')}>
                update
              </div>,
            ]}
          >
            <Meta title={user?.userName} description={user?.aboutMe} />
            <p className="text-right mt-4 mb-2">
              {user.createAt?.toDate().toDateString()}
              {'    '}
              {convertTimestampToTime(user.createAt?.toDate() as Date)}
            </p>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default User
