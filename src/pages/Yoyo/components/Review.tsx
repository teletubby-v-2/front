import { Avatar, Button, Form, Input, List, Rate, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import { firestore } from '../../../config/firebase'
import { Collection } from '../../../constants'
import { CreateReviewDTO } from '../../../constants/dto/lecture.dto'
import { Review } from '../../../constants/interface/lecture.interface'
import { createReview, deleteReview, updateReview } from '../../../service/lectures/review'
import { fetchUser } from '../../../utils/fetchUser'
import { dummyMessage } from '../dummy/YoyoComment.dummy'
import { dummyReview } from '../dummy/YoyoReview.dummy'

export interface ReviewComProps {
  id: string
}

export const ReviewCom: React.FC<ReviewComProps> = ({ id }) => {
  const [count, setCount] = useState(0)
  const [review, setReview] = useState<Review[]>([])
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const testCreateReview = (value?: any) => {
    const data = {
      lectureId: id,
      message: value.message || dummyMessage[count % 7],
      rating: value.rating || dummyReview[count % 6],
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
  }, [review])

  useEffect(() => {
    const unsubscribe = firestore
      .collection(Collection.Lectures)
      .doc(id)
      .collection(Collection.Reviews)
      .orderBy('createAt')
      .onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(change => {
          setLoading(true)
          const data = change.doc.data()
          if (change.type === 'added') {
            // console.log('New Lecture: ', data)
            fetchUser(data.userId).then(user =>
              setReview(reviewMap => [
                ...reviewMap,
                { ...data, reviewId: change.doc.id, ...user } as Review,
              ]),
            )
          }
          if (change.type === 'modified') {
            // console.log('Modified Lecture: ', data)
            setReview(reviewMap => {
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
            setReview(reviewMap => reviewMap.filter(review => review.reviewId !== change.doc.id))
          }
        })
      })
    return () => unsubscribe()
  }, [])

  return (
    <>
      <Form form={form} layout="inline" onFinish={testCreateReview}>
        <Form.Item name="message" className="w-80">
          <Input.TextArea placeholder="comment" />
        </Form.Item>
        <Form.Item name="rating" rules={[{ required: true }]}>
          <Rate allowHalf allowClear={false} />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              review
            </Button>
          )}
        </Form.Item>
      </Form>
      <List
        className="demo-loadmore-list w-full"
        size="large"
        itemLayout="horizontal"
        dataSource={review}
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
    </>
  )
}
