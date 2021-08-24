import { Breadcrumb, Card, Dropdown, Menu, Rate, Tabs } from 'antd'
import { Meta } from 'antd/lib/list/Item'
import React, { useEffect, useState } from 'react'
import { firestore } from '../../config/firebase'
import { CreateLectureDTO } from '../../constants/dto/lecture.dto'
import { convertTimestampToTime } from '../../utils/time'
import { DownOutlined } from '@ant-design/icons'
import { Redirect, useHistory, useParams } from 'react-router'
import { ReviewCom } from './components/Review'
import { CommentCom } from './components/CommentCom'
import { Link } from 'react-router-dom'
import { CreateLectureForm } from '../../components/CreateLectureForm'

// import CommentCom from './components/comment'

const Post: React.FC = () => {
  const [lecture, setLecture] = useState<CreateLectureDTO>({} as CreateLectureDTO)
  // const [loading, setLoading] = useState(false)
  const { id } = useParams<{ id: string }>()
  const history = useHistory()

  // useEffect(() => {
  //   setLoading(false)
  // }, [commentMayo])

  useEffect(() => {
    const yoyo = async () => {
      const mayo = await firestore.collection('Lectures').doc(id).get()
      setLecture({ ...mayo.data(), lectureId: mayo.id } as CreateLectureDTO)
      // console.log(mayo)
    }
    yoyo()
  }, [id])

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/yoyo">Lectures</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="pong">pongUser</Link>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className=" my-10 space-y-5">
      {history.location.hash.length == 0 && (
        <Redirect to={`${history.location.pathname}#comment`} />
      )}
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>Tester</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/yoyo">Lectures</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href={`/post/${id}`}>{id}</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            go to <DownOutlined />
          </a>
        </Dropdown>
      </div>

      <div className="flex flex-col items-center">
        <h1 className="font-bold text-2xl">path สำหรับ test comment, review, QandA bra bra bra</h1>
      </div>

      <div className="flex justify-center">
        <Card
          title={<CreateLectureForm className="text-right block" label="edit" initData={lecture} />}
          className="w-2/7"
          key={lecture?.lectureId}
          cover={
            <img
              className="object-cover"
              alt="cock"
              src={lecture.imageUrl ? lecture?.imageUrl[0] : ''}
            />
          }
          actions={[]}
        >
          <Meta title={lecture?.lectureTitle} description={lecture?.description} />
          <Rate disabled value={(lecture.sumRating || 0) / (lecture.reviewCount || 1)} allowHalf />
          <p className="text-right mt-4 mb-2">
            {lecture?.createAt?.toDate().toDateString()}
            {'    '}
            {convertTimestampToTime(lecture?.createAt?.toDate() as Date)}
          </p>
        </Card>
        <Tabs
          onChange={key => {
            history.push(`${history.location.pathname}${key}`)
          }}
          activeKey={history.location.hash}
          className="w-3/6 ml-3"
        >
          {console.log(history.location.hash)}
          <Tabs.TabPane tab="comment" key="#comment">
            <CommentCom id={id} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="review" key="#review">
            <ReviewCom id={id} />
          </Tabs.TabPane>
          {/* <Tabs.TabPane tab="qa" key="#qa">
            //TODO QA
          </Tabs.TabPane> */}
        </Tabs>
      </div>
    </div>
  )
}

export default Post
