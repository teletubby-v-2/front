import { Avatar, Button, Form, Input, List, Rate, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import { AuthZone } from '../../components'
import { firestore } from '../../config/firebase'
import { Collection } from '../../constants'
import { CreateReviewDTO } from '../../constants/dto/lecture.dto'
import { Review } from '../../constants/interface/lecture.interface'
import { createReview } from '../../service/lectures/review'
import { userInfoStore } from '../../store/user.store'
import { fetchUser } from '../../utils/fetchUser'
import { Json, removeUndefined } from '../../utils/object'
import { ReviewBox } from './components/ReviewBox'

export interface ReviewContainerProps {
  lectureId: string
}

export const ReviewContainer: React.FC<ReviewContainerProps> = ({ lectureId }) => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { userInfo } = userInfoStore()
  const handleCreateReview = (value?: any) => {
    setLoading(true)
    const data = {
      lectureId: lectureId,
      message: value.message,
      rating: value.rating,
    }

    const cleanData = removeUndefined(data as Json) as unknown as CreateReviewDTO
    createReview(cleanData)
      .then(() => form.resetFields())
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    const unsubscribe = firestore
      .collection(Collection.Lectures)
      .doc(lectureId)
      .collection(Collection.Reviews)
      .orderBy('createAt')
      .onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(change => {
          const data = change.doc.data()
          if (change.type === 'added') {
            // console.log('New Lecture: ', data)
            fetchUser(data.userId).then(user =>
              setReviews(reviewMap => [
                ...reviewMap,
                { ...data, reviewId: change.doc.id, ...user } as Review,
              ]),
            )
          }
          if (change.type === 'modified') {
            // console.log('Modified Lecture: ', data)
            setReviews(reviewMap => {
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
            setReviews(reviewMap => reviewMap.filter(review => review.reviewId !== change.doc.id))
          }
        })
      })
    return () => unsubscribe()
  }, [lectureId])

  return (
    <>
      {reviews.map((review, index) => (
        <ReviewBox review={review} key={index} />
      ))}
      <AuthZone>
        <div className="flex space-x-3 ml-2">
          <Avatar src={userInfo.imageUrl} alt={userInfo.userId} />
          <Form form={form} onFinish={handleCreateReview} className="flex-grow">
            <Form.Item name="message">
              <Input.TextArea
                placeholder="บอกคนอื่นเกี่ยวกับสรุปนี้"
                rows={4}
                maxLength={100}
                showCount
              />
            </Form.Item>
            <Form.Item name="rating" rules={[{ required: true }]}>
              <Rate allowHalf />
            </Form.Item>
            <Form.Item shouldUpdate className="text-right">
              {() => (
                <Button
                  loading={loading}
                  type="primary"
                  htmlType="submit"
                  disabled={!form.getFieldValue('rating')}
                >
                  โพสต์
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      </AuthZone>
    </>
  )
}