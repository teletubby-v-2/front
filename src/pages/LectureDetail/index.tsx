import { Card, Rate, Skeleton, Image, Tooltip, Avatar, Col, message } from 'antd'
import { Meta } from 'antd/lib/list/Item'
import React, { useEffect, useState } from 'react'
import { firestore } from '../../config/firebase'
import { LectureDTO } from '../../constants/dto/lecture.dto'
import { convertTimestampToTime } from '../../utils/time'
import { Redirect, useHistory, useParams } from 'react-router'
import { LectureDetailComment } from '../LectureDetail/components/LectueDetailComment'
import { Collection } from '../../constants'
import {
  BookOutlined,
  MoreOutlined,
  EditOutlined,
  BookFilled,
  DeleteOutlined,
  CloudUploadOutlined,
} from '@ant-design/icons'
import firebase from 'firebase'
import { MyUserDTO } from '../../constants/dto/myUser.dto'

const LectureDetail: React.FC = () => {
  const [lecture, setLecture] = useState<LectureDTO>({} as LectureDTO)
  const { lectureId } = useParams<{ lectureId: string }>()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [user, setUser] = useState<MyUserDTO>()

  useEffect(() => {
    setLoading(true)
    const getLecture = async () => {
      const bundle = await firestore.collection(Collection.Lectures).doc(lectureId).get()
      const data = {
        ...bundle.data(),
        lectureId: bundle.id,
      } as LectureDTO
      const bundleUser = await firestore.collection(Collection.Users).doc(data.userId).get()

      setLecture(data)
      setUser({ ...bundleUser.data(), userId: data.userId } as MyUserDTO)
    }

    getLecture().then(() => setLoading(false))
  }, [lectureId])

  const copy = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(function () {
        message.success('copy to clipboard')
      })
      .catch(function () {
        message.error('errrrrrrrrrrrrrrrrr')
      })
  }

  return (
    <div className="my-10 flex space-x-10">
      <Skeleton loading={loading} paragraph={{ rows: 10 }} active>
        <div>
          <div>
            <div className="flex w-full text-xl space-x-3 ">
              <div className="flex-grow font-bold text-3xl">{lecture.lectureTitle}</div>
              <Tooltip title="บุ๊คมาร์ค" className=" text-blue-500">
                <BookOutlined />
              </Tooltip>
              <Tooltip title="แชร์">
                <CloudUploadOutlined className="text-blue-500 " onClick={copy} />
              </Tooltip>
            </div>
          </div>

          <div className="flex w-full space-x-3 items-center my-4">
            <a href={`/profile/${user?.userId}`}>
              <Avatar src={user?.imageUrl} />
            </a>
            <div>โพสต์โดย</div>
            <a href={`/profile/${user?.userId}`}>{user?.userName}</a>
            <div>·</div>
            <div className="flex-grow">เข้าชม {lecture.viewCount} ครั้ง</div>
            <Rate value={lecture.sumRating / lecture.reviewCount} disabled />
            <div>{lecture.reviewCount} ratings</div>
          </div>

          {/* //todo: แบงค์ชินทำต่อ */}
          <div className="flex justify-center my-5">
            <Image
              style={{ height: 600 }}
              preview={{ visible: false }}
              src={lecture?.imageUrl?.[0]}
              onClick={() => setVisible(true)}
            />
          </div>

          <div>
            <Card title="คำอธิบาย" className="shadow-1 rounded-sm">
              {lecture.description}
            </Card>
          </div>

          <div className=" my-10 space-y-5 shadow-1 bg-white p-2 rounded-sm">
            {history.location.hash.length == 0 && (
              <Redirect to={`${history.location.pathname}#review`} />
            )}
            <div className="flex justify-center">
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
        </div>
      </Skeleton>

      <div>
        <div className=" w-80 bg-white shadow-1 rounded-sm flex text-center py-8 flex-col items-center space-y-4 px-3">
          <div>
            <div className="font-bold text-xl">สนับสนุน</div>
            <div className="text-lg">{user?.userName}</div>
          </div>
          <Avatar src={user?.donateImage} shape="square" size={200} />
          <div>{user?.donateDescription}</div>
        </div>
      </div>
    </div>
  )
}

export default LectureDetail
