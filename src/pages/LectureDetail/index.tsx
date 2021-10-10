import { Card, Rate, Tooltip, Avatar, message, Tag, PageHeader } from 'antd'
import React, { useEffect, useState } from 'react'
import { LectureDTO } from '../../constants/dto/lecture.dto'
import { Redirect, useHistory, useParams } from 'react-router'
import { LectureDetailComment } from '../LectureDetail/components/LectueDetailComment'
import {} from '../../constants'
import { BookOutlined, ShareAltOutlined, BookFilled } from '@ant-design/icons'
import no_image from '../../assets/images/no_image.jpg'
import { MyUserDTO } from '../../constants/dto/myUser.dto'
import { userInfoStore } from '../../store/user.store'
import kuSubject from '../../constants/subjects.json'
import { addUserBookmark, deleteUserBookmark, getUserDetial } from '../../service/user'
import { getLectureDetail } from '../../service/lectures/getLecture'
import { SubjectDTO } from '../../constants/dto/subjects.dto'
import { Link } from 'react-router-dom'
import ScrollToTop from '../../components/ScrollToTop'
import { ImageCarousel } from '../../components/ImageCarousel'
import { LectureSkeleton } from '../../components/MySkeleton/LectureSkeleton'

const getTag = (lecture: LectureDTO) => {
  const tags = []
  if (lecture.isMid) {
    tags.push(
      <Tag color="green" key="mid">
        มิดเทอม
      </Tag>,
    )
  }
  if (lecture.isMid) {
    tags.push(
      <Tag color="cyan" key="final">
        ไฟนอล
      </Tag>,
    )
  }
  return tags
}

export const LectureDetail: React.FC = () => {
  const { userInfo, addBookmark, removeBookmark } = userInfoStore()
  const history = useHistory()
  const [lecture, setLecture] = useState<LectureDTO>({} as LectureDTO)
  const { lectureId } = useParams<{ lectureId: string }>()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<MyUserDTO>()
  const [subject] = useState<Record<string, SubjectDTO>>(kuSubject.subjects)

  useEffect(() => {
    setLoading(true)
    getLectureDetail(lectureId)
      .then(data => {
        if (!data.userId) {
          throw Error()
        }
        setLecture(data)
      })
      .catch(() => history.replace('/not_found'))
  }, [lectureId])

  useEffect(() => {
    if (lecture.userId) {
      getUserDetial(lecture.userId)
        .then(data => {
          setUser(data)
        })
        .catch(() => history.replace('/Not_found'))
        .finally(() => setLoading(false))
    }
  }, [lecture])

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

  if (history.location.hash.length == 0) {
    return <Redirect to={`${history.location.pathname}#review`} />
  }
  return (
    <div className="mx-5 my-10 flex space-x-3 lg:space-x-10 w-full">
      <ScrollToTop />
      <div className="flex-grow">
        <LectureSkeleton loading={loading}>
          <div>
            <div className="flex-grow">
              <div>
                <PageHeader
                  onBack={() => history.goBack()}
                  title={<div className="text-2xl">{lecture.lectureTitle}</div>}
                  tags={getTag(lecture)}
                  extra={[
                    <Tooltip title="บุ๊คมาร์ค" className=" text-green-400 text-xl" key="bookmark">
                      {userInfo.bookmark.findIndex(id => id === lectureId) !== -1 ? (
                        <BookFilled onClick={handleDeleteBookmark} />
                      ) : (
                        <BookOutlined onClick={handleAddBookmark} />
                      )}
                    </Tooltip>,
                    <Tooltip title="แชร์" key="share" className="text-green-400 text-xl">
                      <ShareAltOutlined onClick={copy} />
                    </Tooltip>,
                  ]}
                ></PageHeader>
              </div>
              <div className="flex mt-2 ">
                <div className=" space-x-3 flex-grow">
                  <span>{lecture.subjectId}</span>
                  <span>{subject?.[lecture?.subjectId as string]?.subjectNameTh || ''}</span>
                </div>
                {lecture.tags?.map((tag, index) => (
                  <Tag key={index} color="blue">
                    {tag}
                  </Tag>
                ))}
              </div>
              <div className="flex w-full space-x-3 items-center my-4">
                <div className="flex-grow space-x-3">
                  <Link to={`/profile/${user?.userId}`}>
                    <Avatar src={user?.imageUrl} />
                  </Link>
                  <span>โพสต์โดย</span>
                  <Link to={`/profile/${user?.userId}`}>{user?.userName}</Link> · เข้าชม{' '}
                  {lecture.viewCount} ครั้ง
                </div>
                <Rate value={lecture.sumRating / lecture.reviewCount} disabled allowHalf />
                <div>{lecture.reviewCount} ผู้ให้คะแนน</div>
              </div>
              {lecture.isPdf ? (
                <embed
                  src={lecture.pdfUrl?.[0]}
                  type="application/pdf"
                  className="mb-3 rounded"
                  style={{ width: '100%', height: 800 }}
                />
              ) : (
                <ImageCarousel
                  images={lecture?.imageUrl?.map((url, index) => ({ id: index, url }))}
                />
              )}

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
          </div>
        </LectureSkeleton>
      </div>

      <div>
        <Card className="w-40 lg:w-80 shadow-1 flex text-center flex-col items-center ">
          <div>
            <div className="font-bold text-xl">สนับสนุน</div>
            <div className="text-lg">{user?.userName}</div>
          </div>
          <Avatar src={user?.donateImage || no_image} shape="square" size={200} />
          <div>{user?.donateDescription}</div>
        </Card>
      </div>
    </div>
  )
}
