import { Avatar, Breadcrumb, Button, Card, Dropdown, List, Menu, Skeleton } from 'antd'
import { Meta } from 'antd/lib/list/Item'
import React, { useEffect, useState } from 'react'
import { firestore } from '../../config/firebase'
import { Collection } from '../../constants'
import { CreateLectureDTO } from '../../constants/dto/lecture.dto'
import { Comments } from '../../constants/interface/lecture.interface'
import { createComment, deleteComment, updateComment } from '../../service/lectures/comment'
import { fetchUser } from '../../utils/fetchUser'
import { convertTimestampToTime } from '../../utils/time'
import { dummyMessage } from './dummy/YoyoComment.dummy'
import { DownOutlined } from '@ant-design/icons'
import { Redirect, useHistory, useLocation, useParams } from 'react-router'

const YoyoComment: React.FC = () => {
  const [count, setCount] = useState(0)
  const [lecture, setLecture] = useState<CreateLectureDTO>({} as CreateLectureDTO)
  const [commentMayo, setCommentMayo] = useState<Comments[]>([])
  const [loading, setLoading] = useState(false)
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const history = useHistory()
  const testCreateComment = () => {
    const data = {
      lectureId: id,
      message: dummyMessage[count % 7],
      reply: [],
    }
    setCount(count + 1)
    createComment(data)
  }
  const testUpdateComment = (lectureId: string, id: string) => {
    const data = {
      message: dummyMessage[count % 7],
      lectureId: lectureId,
      id: id,
    }
    setCount(count + 1)
    updateComment(data)
  }
  const testDeleteComment = (lectureId: string, id: string) => {
    deleteComment(lectureId, id)
  }
  const handleSelectFor = (action: 'delete' | 'update', lectureId = '', id: string) => {
    switch (action) {
      case 'delete':
        return testDeleteComment(lectureId, id)
      case 'update':
        return testUpdateComment(lectureId, id)
    }
  }

  useEffect(() => {
    setLoading(false)
  }, [commentMayo])

  useEffect(() => {
    const yoyo = async () => {
      const mayo = await firestore.collection('Lectures').doc(id).get()
      setLecture(mayo.data() as CreateLectureDTO)
      // console.log(mayo)
    }
    yoyo()
    const unsubscribe = firestore
      .collection(Collection.Lectures)
      .doc(id)
      .collection(Collection.Comments)
      .orderBy('createAt')
      .onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(change => {
          setLoading(true)
          const data = change.doc.data()
          if (change.type === 'added') {
            // console.log('New Lecture: ', data)
            fetchUser(data.userId).then(user =>
              setCommentMayo(commentMap => [
                ...commentMap,
                { ...data, id: change.doc.id, ...user } as Comments,
              ]),
            )
          }
          if (change.type === 'modified') {
            // console.log('Modified Lecture: ', data)
            setCommentMayo(commentMap => {
              const index = commentMap.findIndex(comment => comment.id === change.doc.id)
              const user = {
                username: commentMap[index].username,
                photoURL: commentMap[index].photoURL,
              }
              return [
                ...commentMap.slice(0, index),
                { ...data, id: change.doc.id, ...user } as Comments,
                ...commentMap.slice(index + 1),
              ]
            })
          }
          if (change.type === 'removed') {
            // console.log('Removed Lecture: ', data)
            setCommentMayo(commentMap => commentMap.filter(comment => comment.id !== change.doc.id))
          }
        })
      })
    return () => unsubscribe()
  }, [id])

  const menu = (
    <Menu>
      <Menu.Item>
        <a target="" rel="noopener noreferrer" href="https://localhost:3000/yoyo">
          yoyoLectures
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="" rel="noopener noreferrer" href="https://localhost:3000/yoyoReview">
          yoyoReviews
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="" rel="noopener noreferrer" href="https://localhost:3000/pong">
          pongUser
        </a>
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
            <a href="https://localhost:3000/yoyoComment">yoyoComment</a>
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
      <div className="flex justify-center space-x-2">
        <Button size="large" type="primary" onClick={testCreateComment}>
          create comment
        </Button>
      </div>

      <div className="flex justify-center">
        <Card
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
          <p className="text-right mt-4 mb-2">
            {lecture?.createAt?.toDate().toDateString()}
            {'    '}
            {convertTimestampToTime(lecture?.createAt?.toDate() as Date)}
          </p>
        </Card>
        <List
          className="demo-loadmore-list w-3/6"
          size="large"
          itemLayout="horizontal"
          dataSource={commentMayo}
          renderItem={item => (
            <List.Item
              actions={[
                <a
                  key="edit"
                  onClick={() => handleSelectFor('update', item.lectureId || '', item.id || '')}
                >
                  edit
                </a>,
                <a
                  key="delete"
                  onClick={() => handleSelectFor('delete', item.lectureId || '', item.id || '')}
                >
                  delete
                </a>,
              ]}
            >
              <Skeleton avatar title={false} loading={loading} active>
                <List.Item.Meta
                  avatar={<Avatar src={item.photoURL} size="large" />}
                  title={item.username}
                  description={item.message}
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}

export default YoyoComment
