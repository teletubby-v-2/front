import { Avatar, Button, Card, List, Skeleton } from 'antd'
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

const YoyoReview: React.FC = () => {
  const [count, setCount] = useState(0)
  const [lecture, setLecture] = useState<CreateLectureDTO>({} as CreateLectureDTO)
  const [reviewMayo, setReviewMayo] = useState<Review[]>([])
  const [loading, setLoading] = useState(false)

  const testCreateReview = () => {
    const data = {
      lectureId: 'qrkx0ON2xXkbj3KYsgtA',
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
      const mayo = await firestore.collection('Lectures').doc('qrkx0ON2xXkbj3KYsgtA').get()
      setLecture(mayo.data() as CreateLectureDTO)
      console.log(mayo)
    }
    yoyo()
    const unsubscribe = firestore
      .collection(Collection.Lectures)
      .doc('qrkx0ON2xXkbj3KYsgtA')
      .collection(Collection.Comments)
      .orderBy('createAt')
      .onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(change => {
          setLoading(true)
          const data = change.doc.data()
          if (change.type === 'added') {
            console.log('New Lecture: ', data)
            fetchUser(data.userId).then(user =>
              setReviewMayo(commentMap => [
                ...commentMap,
                { ...data, id: change.doc.id, ...user } as Review,
              ]),
            )
          }
          if (change.type === 'modified') {
            console.log('Modified Lecture: ', data)
            setReviewMayo(commentMap => {
              const index = commentMap.findIndex(comment => comment.reviewId === change.doc.id)
              const user = {
                username: commentMap[index].username,
                photoURL: commentMap[index].photoURL,
              }
              return [
                ...commentMap.slice(0, index),
                { ...data, id: change.doc.id, ...user } as unknown as Review,
                ...commentMap.slice(index + 1),
              ]
            })
          }
          if (change.type === 'removed') {
            console.log('Removed Lecture: ', data)
            setReviewMayo(commentMap =>
              commentMap.filter(comment => comment.reviewId !== change.doc.id),
            )
          }
        })
      })
    return () => unsubscribe()
  }, [])

  return (
    <div className=" my-10 space-y-5">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-2xl">path สำหรับ test comment</h1>
        <ul className="text-lg">
          <li>create comment -{'>'} สร้าง comment</li>
        </ul>
      </div>
      <div className="flex justify-center space-x-2">
        <Button size="large" type="primary" onClick={testCreateReview}>
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
          className="demo-loadmore-list w-2/6"
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
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}

export default YoyoReview
