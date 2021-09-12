import { Card, Rate, Skeleton, Image, Tooltip, Avatar, message, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { firestore } from '../../config/firebase'
import { LectureDTO } from '../../constants/dto/lecture.dto'
import { Redirect, useHistory, useParams } from 'react-router'
import { LectureDetailComment } from '../LectureDetail/components/LectueDetailComment'
import { Collection } from '../../constants'
import { BookOutlined, ShareAltOutlined, BookFilled } from '@ant-design/icons'
import no_image from '../../assets/images/no_image.jpg'
import { MyUserDTO } from '../../constants/dto/myUser.dto'
import { userInfoStore } from '../../store/user.store'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

import { addUserBookmark, deleteUserBookmark } from '../../service/user'

const LectureDetail: React.FC = () => {
  const { userInfo, addBookmark, removeBookmark } = userInfoStore()
  const history = useHistory()
  const [lecture, setLecture] = useState<LectureDTO>({} as LectureDTO)
  const { lectureId } = useParams<{ lectureId: string }>()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<MyUserDTO>()
  const [count, setCount] = useState(0)

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
        message.success('คัดลอกลงคลิปบอร์ด')
      })
      .catch(function () {
        message.error('errrrrrrrrrrrrrrrrr')
      })
  }

  const handleAddBookmark = () => {
    addUserBookmark(lectureId, userInfo.bookmark)
      .then(() => {
        addBookmark(lectureId)
        message.success('เพิ่มบุ๊คมาร์คสำเร็จ')
      })
      .catch(() => message.error('เพิ่มบุ๊คมาร์คไม่สำเร็จ'))
  }
  const handleDeleteBookmark = () => {
    deleteUserBookmark(lectureId, userInfo.bookmark)
      .then(() => {
        removeBookmark(lectureId)
        message.success('ลบบุ๊คมาร์คสำเร็จ')
      })
      .catch(() => message.error('ลบบุ๊คมาร์คไม่สำเร็จ'))
  }

  return (
    <div className="my-10 flex space-x-10 w-full">
      {history.location.hash.length == 0 && <Redirect to={`${history.location.pathname}#review`} />}
      <Skeleton loading={loading} paragraph={{ rows: 10 }} active className="flex-grow">
        <div className="flex-grow">
          <div>
            <div className="flex text-xl space-x-3 ">
              <div className="flex-grow font-bold text-3xl">{lecture.lectureTitle}</div>
              <Tooltip title="บุ๊คมาร์ค" className=" text-green-400">
                {userInfo.bookmark.findIndex(id => id === lectureId) !== -1 ? (
                  <BookFilled onClick={handleDeleteBookmark} />
                ) : (
                  <BookOutlined onClick={handleAddBookmark} />
                )}
              </Tooltip>
              <Tooltip title="แชร์">
                <ShareAltOutlined className="text-green-400 " onClick={copy} />
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
          <div className="flex justify-center my-5 relative">
            <Image
              style={{ height: 600 }}
              className="object-center object-cover"
              src={lecture?.imageUrl?.[count]}
            />
            <Button
              shape="circle"
              className="absolute top-1/2  right-3 -translate-y-1/2	"
              onClick={() => setCount((count + 1) % lecture.imageUrl.length)}
              disabled={!lecture.imageUrl?.length}
              icon={<RightOutlined className="align-middle" />}
            />

            <Button
              shape="circle"
              className="absolute top-1/2 left-3 -translate-y-1/2	"
              onClick={() =>
                setCount((count - 1 + lecture.imageUrl.length) % lecture.imageUrl.length)
              }
              disabled={!lecture.imageUrl?.length}
              icon={<LeftOutlined className="align-middle" />}
            />
          </div>

          {lecture.description && (
            <Card title="คำอธิบาย" className="shadow-1 rounded-sm">
              {lecture.description}
            </Card>
          )}

          <div className=" my-10 space-y-5 shadow-1 bg-white p-2 rounded-sm">
            <div className="flex justify-center">
              <LectureDetailComment authorId={lecture.userId as string} lectureId={lectureId} />
            </div>
          </div>
        </div>
      </Skeleton>

      <div>
        <div className=" w-80 bg-white shadow-1 rounded-sm flex text-center py-8 flex-col items-center space-y-4 px-3">
          <div>
            <div className="font-bold text-xl">สนับสนุน</div>
            <div className="text-lg">{user?.userName}</div>
          </div>
          {user?.donateImage ? (
            <Avatar src={user?.donateImage} shape="square" size={200} />
          ) : (
            <Avatar src={no_image} shape="square" className="w-52 h-52  my-3" />
          )}
          <div>{user?.donateDescription}</div>
        </div>
      </div>
    </div>
  )
}

export default LectureDetail
