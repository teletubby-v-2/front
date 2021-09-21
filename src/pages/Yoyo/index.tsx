import { Breadcrumb, Button, Card, Dropdown, Menu, message } from 'antd'
import Meta from 'antd/lib/card/Meta'
import React, { useEffect, useState } from 'react'
import { firestore } from '../../config/firebase'
import { CreateLectureDTO, UpdateLectureDTO } from '../../constants/dto/lecture.dto'
import { createLecture, deleteLecture, updateLecture } from '../../service/lectures'
import { fetchUser } from '../../utils/fetchUser'
import { convertTimestampToTime } from '../../utils/time'
import { description, img, lectureTitle } from './dummy/index.dummy'
import { DownOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { CreateLectureForm } from '../../components/CreateLectureForm'
import { AuthZone } from '../../components'
interface LectureUser extends CreateLectureDTO {
  username?: string
}

const Yoyo: React.FC = () => {
  const [count, setCount] = useState(0)
  const [lectureMayo, setLectureMayo] = useState<LectureUser[]>([])
  const history = useHistory()

  const testCreateLecture = () => {
    const data: CreateLectureDTO = {
      imageUrl: [img[count % 5]],
      subjectId: 'พาสาไทย',
      lectureTitle: lectureTitle[count % 7],
      description: description[count % 6],
      isMid: true,
      isFinal: false,
      tags: ['ไทยๆ'],
    }
    setCount(count + 1)
    createLecture(data)
      .then(() => message.success('สร้างแล้วคับ'))
      .catch(() => message.error('สร้างไม่ได้จ้า login ด้วยอส'))
  }

  const testUpdateLecture = (id: string) => {
    const data: UpdateLectureDTO = {
      imageUrl: [img[count % 5]],
      lectureId: id,
      description: description[count % 6],
      lectureTitle: lectureTitle[count % 7],
    }
    setCount(count + 1)
    updateLecture(data)
  }

  const testDeleteLecture = (id: string) => {
    deleteLecture(id)
  }

  const handleSelectFor = (action: 'delete' | 'update', id: string) => {
    switch (action) {
      case 'delete':
        return testDeleteLecture(id)
      case 'update':
        return testUpdateLecture(id)
    }
  }

  useEffect(() => {
    const unsubscribe = firestore
      .collection('Lectures')
      .orderBy('createAt')
      .onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(change => {
          const data = change.doc.data()
          fetchUser(data.userId).then(user => {
            if (change.type === 'added') {
              console.log('New Lecture: ', data)
              setLectureMayo(lectureMap => [
                ...lectureMap,
                { ...data, lectureId: change.doc.id, username: user.username } as LectureUser,
              ])
            }
            if (change.type === 'modified') {
              console.log('Modified Lecture: ', data)
              setLectureMayo(lectureMap => {
                const index = lectureMap.findIndex(lecture => lecture.lectureId === change.doc.id)

                return [
                  ...lectureMap.slice(0, index),
                  {
                    ...data,
                    lectureId: change.doc.id,
                    username: user.username,
                  } as CreateLectureDTO,
                  ...lectureMap.slice(index + 1),
                ]
              })
            }
          })
          if (change.type === 'removed') {
            console.log('Removed Lecture: ', data)
            setLectureMayo(lectureMap =>
              lectureMap.filter(lecture => lecture.lectureId !== change.doc.id),
            )
          }
        })
      })
    return () => unsubscribe()
  }, [])

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/pong">pongUser</Link>
      </Menu.Item>
    </Menu>
  )
  return (
    <div className=" my-10 space-y-5">
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>Tester</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/yoyo">Lectures</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            go to <DownOutlined />
          </a>
        </Dropdown>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-2xl">path สำหรับ test lecture</h1>
      </div>
      <AuthZone className="flex justify-center space-x-2">
        <Button size="large" type="primary" onClick={testCreateLecture}>
          create Fast!!!!
        </Button>
        <CreateLectureForm className=" ml-10">
          <Button type="primary" size="large">
            create custom
          </Button>
        </CreateLectureForm>
      </AuthZone>
      <div></div>
      <div className="grid grid-cols-5 gap-5 container mx-auto">
        {lectureMayo.map(lecture => (
          <Card
            title={lecture.username || ''}
            key={lecture.lectureId}
            cover={<img className="h-96 object-cover" alt="cock" src={lecture.imageUrl[0]} />}
            actions={[
              <div key="2" onClick={() => history.push(`post/${lecture.lectureId}`)}>
                show all
              </div>,
              <div key="2" onClick={() => handleSelectFor('delete', lecture.lectureId || '')}>
                delete
              </div>,
              <div key="3" onClick={() => handleSelectFor('update', lecture.lectureId || '')}>
                update
              </div>,
            ]}
          >
            <Meta title={lecture?.lectureTitle} description={lecture?.description} />
            <p className="text-right mt-4 mb-2">
              {lecture.createAt?.toDate().toDateString()}
              {'    '}
              {convertTimestampToTime(lecture.createAt?.toDate() as Date)}
            </p>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Yoyo
