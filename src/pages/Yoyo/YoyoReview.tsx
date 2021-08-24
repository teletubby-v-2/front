import { Avatar, Breadcrumb, Button, Card, Dropdown, List, Menu, Skeleton } from 'antd'
import { Meta } from 'antd/lib/list/Item'
import React, { useEffect, useState } from 'react'
import { firestore } from '../../config/firebase'
import { Collection } from '../../constants'
import { CreateLectureDTO, CreateReviewDTO } from '../../constants/dto/lecture.dto'
import { Review } from '../../constants/interface/lecture.interface'
import { createReview, deleteReview, updateReview } from '../../service/lectures/review'
import { fetchUser } from '../../utils/fetchUser'
import { convertTimestampToTime } from '../../utils/time'
import { dummyMessage, dummyReview } from './YoyoReview.dummy'
import { Rate } from 'antd'
import { DownOutlined } from '@ant-design/icons'

const YoyoReview: React.FC = () => {
  const [count, setCount] = useState(0)
  const [lecture, setLecture] = useState<CreateLectureDTO>({} as CreateLectureDTO)
  const [reviewMayo, setReviewMayo] = useState<Review[]>([])
  const [loading, setLoading] = useState(false)

  const testCreateReview = () => {
    const data = {
      lectureId: 'pug',
      message: dummyMessage[count % 7],
      rating: dummyReview[count % 6],
    }
    setCount(count + 1)
    createReview(data)
  }
  const testUpdateReview = (lectureId: string, reviewId: string) => {
    const data = {
      message: dummyMessage[count % 7],
      lectureId: lectureId,
      reviewId: reviewId,
      rating: 5,
    }
    setCount(count + 1)
    updateReview(data)
  }
  const testDeleteReview = (review: CreateReviewDTO) => {
    deleteReview(review)
  }

  const handleSelectFor = (action: 'delete' | 'update', review: CreateReviewDTO) => {
    switch (action) {
      case 'delete':
        return testDeleteReview(review)
      case 'update':
        if (review.reviewId) return testUpdateReview(review.lectureId, review.reviewId)
    }
  }

  useEffect(() => {
    setLoading(false)
  }, [reviewMayo])

  useEffect(() => {
    const yoyo = async () => {
      const mayo = await firestore.collection('Lectures').doc('pug').get()
      setLecture(mayo.data() as CreateLectureDTO)
      console.log(mayo)
    }
    yoyo()
    const unsubscribe = firestore
      .collection(Collection.Lectures)
      .doc('pug')
      .collection(Collection.Reviews)
      .orderBy('createAt')
      .onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(change => {
          setLoading(true)
          const data = change.doc.data()
          if (change.type === 'added') {
            // console.log('New Lecture: ', data)
            fetchUser(data.userId).then(user =>
              setReviewMayo(reviewMap => [
                ...reviewMap,
                { ...data, reviewId: change.doc.id, ...user } as Review,
              ]),
            )
          }
          if (change.type === 'modified') {
            // console.log('Modified Lecture: ', data)
            setReviewMayo(reviewMap => {
              const index = reviewMap.findIndex(review => review.reviewId === change.doc.id)
              const user = {
                username: reviewMap[index].username,
                photoURL: reviewMap[index].photoURL,
              }
              return [
                ...reviewMap.slice(0, index),
                { ...data, reviewId: change.doc.id, ...user } as unknown as Review,
                ...reviewMap.slice(index + 1),
              ]
            })
          }
          if (change.type === 'removed') {
            // console.log('Removed Lecture: ', data)
            setReviewMayo(reviewMap =>
              reviewMap.filter(review => review.reviewId !== change.doc.id),
            )
          }
        })
      })
    return () => unsubscribe()
  }, [])

  const menu = (
    <Menu>
      <Menu.Item>
        <a target="" rel="noopener noreferrer" href="https://localhost:3000/yoyo">
          yoyoLectures
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="" rel="noopener noreferrer" href="https://localhost:3000/yoyoComment">
          yoyoComments
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
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>Tester</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="https://localhost:3000/yoyoReview">yoyoReview</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            go to <DownOutlined />
          </a>
        </Dropdown>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-2xl">path สำหรับ test review</h1>
        <ul className="text-lg">
          <li>create review -{'>'} สร้าง review</li>
        </ul>
      </div>
      <div className="flex justify-center space-x-2">
        <Button size="large" type="primary" onClick={testCreateReview}>
          create review
        </Button>
        <Button
          size="large"
          type="primary"
          onClick={() => {
            firestore.collection(Collection.Lectures).doc('pug').update({
              reviewCount: 0,
              sumRating: 0,
            })
          }}
        >
          set zero
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
          <Rate disabled value={(lecture.sumRating || 0) / (lecture.reviewCount || 1)} allowHalf />
          <p>
            {lecture.reviewCount}
            {'    '}
            {lecture.sumRating}
            {'    '}
            NOT REAL TIME
          </p>
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
          dataSource={reviewMayo}
          renderItem={item => (
            <List.Item
              actions={[
                <a key="edit" onClick={() => handleSelectFor('update', item)}>
                  edit
                </a>,
                <a key="delete" onClick={() => handleSelectFor('delete', item)}>
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
                <Rate disabled defaultValue={item.rating} allowHalf />
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}

export default YoyoReview
