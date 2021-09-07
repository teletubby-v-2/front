import { Breadcrumb, Card, Dropdown, Menu, Rate, Skeleton, Image } from 'antd'
import { Meta } from 'antd/lib/list/Item'
import React, { useEffect, useState } from 'react'
import { firestore } from '../../config/firebase'
import { CreateLectureDTO } from '../../constants/dto/lecture.dto'
import { convertTimestampToTime } from '../../utils/time'
import { DownOutlined } from '@ant-design/icons'
import { Redirect, useHistory, useParams } from 'react-router'
import { LectureDetailComment } from '../LectureDetail/components/LectueDetailComment'
// import CommentCom from './components/comment'

const LectureDetail: React.FC = () => {
  const [lecture, setLecture] = useState<CreateLectureDTO>({} as CreateLectureDTO)
  const { lectureId } = useParams<{ lectureId: string }>()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setLoading(true)
    const yoyo = async () => {
      const mayo = await firestore.collection('Lectures').doc(lectureId).get()
      setLecture({ ...mayo.data(), lectureId: mayo.id } as CreateLectureDTO)
    }
    yoyo().then(() => setLoading(false))
  }, [lectureId])

  const menu = (
    <Menu>
      <Menu.Item>
        <a target="" rel="noopener noreferrer" href="/yoyo">
          Lectures
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="" rel="noopener noreferrer" href="/pong">
          pongUser
        </a>
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <div className=" my-10 space-y-5">
        {history.location.hash.length == 0 && (
          <Redirect to={`${history.location.pathname}#comment`} />
        )}
        <div>
          <Breadcrumb>
            <Breadcrumb.Item>Tester</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/yoyo">Lectures</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href={`/lectureDetail/${lectureId}`}>{lectureId}</a>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              go to <DownOutlined />
            </a>
          </Dropdown>
        </div>

        <div className="flex flex-col items-center">
          <h1 className="font-bold text-2xl">path สำหรับ test comment</h1>
          <ul className="text-lg">
            <li>create comment -{'>'} สร้าง comment</li>
          </ul>
        </div>

        <div className="flex justify-center">
          <Skeleton loading={loading} paragraph={{ rows: 10 }} active className="flex-1">
            <Card
              className="flex-1"
              key={lecture?.lectureId}
              cover={
                <Image
                  preview={{ visible: false }}
                  src={lecture?.imageUrl?.[0]}
                  onClick={() => setVisible(true)}
                />
              }
              actions={[]}
            >
              <Meta title={lecture?.lectureTitle} description={lecture?.description} />
              <Rate
                disabled
                value={(lecture.sumRating || 0) / (lecture.reviewCount || 1)}
                allowHalf
              />
              <p className="text-right mt-4 mb-2">
                {lecture?.createAt?.toDate().toDateString()}
                {'    '}
                {convertTimestampToTime(lecture?.createAt?.toDate() as Date)}
              </p>
            </Card>
          </Skeleton>
          <LectureDetailComment authorId={lecture.userId as string} lectureId={lectureId} />
        </div>
      </div>
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
          {lecture?.imageUrl?.map((image, index) => (
            <Image width={200} key={index} src={image} />
          ))}
        </Image.PreviewGroup>
      </div>
    </>
  )
}

export default LectureDetail
