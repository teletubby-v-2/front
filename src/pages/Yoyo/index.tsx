import { Button, Card, Skeleton } from 'antd'
import Meta from 'antd/lib/card/Meta'
import React, { useEffect, useState } from 'react'
import { firebaseApp, firestore } from '../../config/firebase'
import { CreateLectureDTO, UpdateLectureDTO } from '../../constants/dto/lecture.dto'
import { createLecture, deleteLecture, updateLecture } from '../../service/lectures'
import { fetchUser } from '../../utils/fetchUser'
import { convertTimestampToTime } from '../../utils/time'
import { description, img, lectureTitle } from './index.dummy'

interface LectureUser extends CreateLectureDTO {
  username?: string
}

const Yoyo: React.FC = () => {
  const [count, setCount] = useState(0)
  const [lectureMayo, setLectureMayo] = useState<LectureUser[]>([])

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
  }

  const testUpdateLecture = (id: string) => {
    const data: UpdateLectureDTO = {
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
      .limit(5)
      .onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(change => {
          const data = change.doc.data()
          let user = {} as {
            username: string
          }
          fetchUser(data.userId).then(u => (user = u))
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
                { ...data, lectureId: change.doc.id } as CreateLectureDTO,
                ...lectureMap.slice(index + 1),
              ]
            })
          }
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

  const getUser = (userId: string) => {
    fetchUser(userId).then(user => {
      setLectureMayo(lectureMap => {
        const index = lectureMap.findIndex(lecture => lecture.userId === userId)
        const thisUpdate = lectureMap[index]
        return [
          ...lectureMap.slice(0, index),
          { ...thisUpdate, username: user.username } as LectureUser,
          ...lectureMap.slice(index + 1),
        ]
      })
    })
  }

  return (
    <div className=" my-10 space-y-5">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-2xl">path สำหรับ test lecture</h1>
        <ul className="text-lg">
          <li>create lecture -{'>'} สร้าง lecture</li>
          <li>update -{'>'} update title กับ des</li>
          <li>delete -{'>'} ลบบบบบบบบบบบ บบบบบบ</li>
        </ul>
      </div>
      <div className="flex justify-center space-x-2">
        <Button size="large" type="primary" onClick={testCreateLecture}>
          create Lecture
        </Button>
      </div>
      <div className="grid grid-cols-5 gap-5 container mx-auto">
        {lectureMayo.map(lecture => (
          <Card
            className=""
            title={lecture.username || ''}
            key={lecture.lectureId}
            cover={<img className="h-96 object-cover" alt="cock" src={lecture.imageUrl[0]} />}
            actions={[
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
