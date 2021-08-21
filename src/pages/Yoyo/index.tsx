import { Button, Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { LectureCard } from '../../components/LectureCard'
import { firestore } from '../../config/firebase'
import { CreateLectureDTO, UpdateLectureDTO } from '../../constants/dto/lecture.dto'
import { createLecture, deleteLecture, updateLecture } from '../../service/lectures'

const Yoyo: React.FC = () => {
  const testCreateLecture = () => {
    const data: CreateLectureDTO = {
      lectureId: '01204341',
      imageUrl: [
        'https://firebasestorage.googleapis.com/v0/b/teletubby-v2.appspot.com/o/images%2F063765081738.589000000chaiporn.png?alt=media&token=5fe70b87-0aa2-4371-8f71-ff06f0b59f0e',
      ],
      subjectId: 'พาสาไทย',
      lectureTitle: 'This is thai lecture',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi laudantium iste, ut exercitationem obcaecati amet, accusamus dolores repudiandae quidem alias sed. Cum sunt corrupti dolore debitis sapiente voluptates veniam consequuntur.',
      isMid: true,
      isFinal: false,
      tags: ['ไทยๆ'],
    }
    createLecture(data)
  }

  const testUpdateLecture = () => {
    const data: UpdateLectureDTO = {
      lectureId: select,
      description: 'หิวแดกข้าว',
      lectureTitle: 'หิวววววววววว',
    }
    updateLecture(data)
  }

  const testDeleteLecture = () => {
    deleteLecture(select)
  }

  const [lectureMayo, setLectureMayo] = useState<CreateLectureDTO[]>([])
  const [select, setSelect] = useState<string>('')

  useEffect(() => {
    firestore.collection('Lectures').onSnapshot(querySnapshot => {
      querySnapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          console.log('New Lecture: ', change.doc.data())
          setLectureMayo(lectureMap => [
            ...lectureMap,
            { ...change.doc.data(), lectureId: change.doc.id } as CreateLectureDTO,
          ])
        }
        if (change.type === 'modified') {
          console.log('Modified Lecture: ', change.doc.data())
          setLectureMayo(lectureMap => {
            const index = lectureMap.findIndex(lecture => lecture.lectureId === change.doc.id)

            return [
              ...lectureMap.slice(0, index),
              { ...change.doc.data(), lectureId: change.doc.id } as CreateLectureDTO,
              ...lectureMap.slice(index + 1),
            ]
          })
        }
        if (change.type === 'removed') {
          console.log('Removed Lecture: ', change.doc.data())
          setLectureMayo(lectureMap =>
            lectureMap.filter(lecture => lecture.lectureId !== change.doc.id),
          )
        }
      })
    })
  }, [])

  return (
    <div className="mt-20">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-2xl">path สำหรับ test lecture</h1>
        <ul className="text-lg">
          <br />
          <li>create lecture -{'>'} สร้าง lecture</li>
          <li>update lecture -{'>'} กด select เลือก lecture แล้วกดเพื่อ update</li>
          <li>delete lecture -{'>'} กดเหมือน update อะแต่ลบ</li>
          <br />
        </ul>
      </div>
      <div className="flex justify-center space-x-5 flex-wrap">
        {lectureMayo.map(lecture => (
          <Card
            className="w-96 h-96 flex flex-col items-center justify-center mb-4"
            key={lecture.lectureId}
          >
            <h2 className="text-center">{lecture.lectureTitle}</h2>
            <h2>{lecture.description}</h2>
            {lecture.imageUrl.map((pic, index) => (
              <img className="h-40" src={pic} alt="รูป" key={index} />
            ))}
            <Button onClick={() => setSelect(lecture.lectureId || '')}>select</Button>
          </Card>
        ))}
      </div>

      <div className="flex justify-center space-x-2 mt-20">
        <Button type="primary" onClick={testCreateLecture}>
          create Lecture
        </Button>

        <Button type="primary" onClick={testUpdateLecture}>
          update Lecture
        </Button>

        <Button type="primary" onClick={testDeleteLecture}>
          delete Lecture
        </Button>
      </div>
    </div>
  )
}

export default Yoyo
