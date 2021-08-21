import { Button, Card, Skeleton } from 'antd'
import Meta from 'antd/lib/card/Meta'
import React, { useEffect, useState } from 'react'
import { firestore } from '../../config/firebase'
import { CreateLectureDTO, UpdateLectureDTO } from '../../constants/dto/lecture.dto'
import { createLecture, deleteLecture, updateLecture } from '../../service/lectures'
import { convertTimestampToTime } from '../../utils/time'

const Yoyo: React.FC = () => {
  const testCreateLecture = () => {
    const img = [
      'https://firebasestorage.googleapis.com/v0/b/teletubby-v2.appspot.com/o/images%2F063765080734.889000000%E0%B8%9F%E0%B9%89%E0%B8%B2%E0%B8%8A%E0%B8%B2%E0%B8%A2%20%E0%B8%AA%E0%B8%B9%E0%B8%97.jpg?alt=media&token=a8b8f907-9ee9-400a-abce-1bfbf31eea6d',
      'https://cdn.discordapp.com/attachments/867750800193224725/867750850927001630/unknown.png',
      'https://firebasestorage.googleapis.com/v0/b/teletubby-v2.appspot.com/o/images%2F063765076948.626000000image0.gif?alt=media&token=503299cc-bc0c-4f68-b438-3548daa06d9a',
      'https://firebasestorage.googleapis.com/v0/b/teletubby-v2.appspot.com/o/images%2F063765080973.657000000duke.png?alt=media&token=2f3dc116-c9c7-4d6f-927f-2845ea7a138d',
      'https://firebasestorage.googleapis.com/v0/b/teletubby-v2.appspot.com/o/images%2F063765081936.101000000pug-dance.gif?alt=media&token=305837c4-b80c-44f9-a2e6-ff275663e43a',
    ]
    const data: CreateLectureDTO = {
      lectureId: '01204341',
      imageUrl: [img[count]],
      subjectId: 'พาสาไทย',
      lectureTitle: 'This is thai lecture',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi laudantium iste, ut exercitationem obcaecati amet, accusamus dolores repudiandae quidem alias sed. Cum sunt corrupti dolore debitis sapiente voluptates veniam consequuntur.',
      isMid: true,
      isFinal: false,
      tags: ['ไทยๆ'],
    }
    setCount((count + 1) % 5)
    createLecture(data)
  }

  const testUpdateLecture = () => {
    const data: UpdateLectureDTO = {
      lectureId: select,
      description:
        'หิวแดกข้าว ทำงานตอนตีสามโคตรหิวเลยโว้ยยยยย หิวแบบหิวเหี้ยๆ ละร้านมันปิด กูสั่งไม่ได้อสสสส หิววว ไอเหี้ยตู่ไมไม่เอาวัคซีนเข้ามา อส Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi laudantium iste, dolore debitis sapiente voluptates veniam consequuntur. ',
      lectureTitle: 'หิวววววววววว',
    }
    updateLecture(data)
  }

  const testDeleteLecture = () => {
    deleteLecture(select)
  }

  const [count, setCount] = useState(0)
  const [lectureMayo, setLectureMayo] = useState<CreateLectureDTO[]>([])
  const [select, setSelect] = useState<string>('')

  useEffect(() => {
    firestore
      .collection('Lectures')
      .orderBy('createAt')
      .limit(5)
      .onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            console.log('New Lecture: ', change.doc.data())
            setLectureMayo(lectureMap => [
              { ...change.doc.data(), lectureId: change.doc.id } as CreateLectureDTO,
              ...lectureMap,
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
    <div className=" my-10 space-y-5">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-2xl">path สำหรับ test lecture</h1>
        <ul className="text-lg">
          <li>create lecture -{'>'} สร้าง lecture</li>
          <li>update lecture -{'>'} กด select เลือก lecture แล้วกดเพื่อ update</li>
          <li>delete lecture -{'>'} กดเหมือน update อะแต่ลบ</li>
        </ul>
      </div>
      <div className="flex justify-center space-x-2">
        <Button size="large" type="primary" onClick={testCreateLecture}>
          create Lecture
        </Button>

        <Button size="large" type="primary" onClick={testUpdateLecture}>
          update Lecture
        </Button>

        <Button size="large" type="primary" onClick={testDeleteLecture}>
          delete Lecture
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 sm:grid-cols-3 gap-5 container mx-auto">
        {lectureMayo.map(lecture => (
          <Card
            className=""
            key={lecture.lectureId}
            cover={<img className="h-96 object-cover" alt="cock" src={lecture.imageUrl[0]} />}
            actions={[
              <div key="1" onClick={() => setSelect(lecture.lectureId || '')}>
                select
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
