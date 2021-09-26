import { Avatar, Button, Form, Input, Rate, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import { AuthZone } from '../../components'
import { firestore } from '../../config/firebase'
import { Collection } from '../../constants'
import { CreateReviewDTO } from '../../constants/dto/lecture.dto'
import { Review } from '../../constants/interface/lecture.interface'
import { createReview, updateReview } from '../../service/lectures/review'
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
  const [size, setSize] = useState(0)
  const [reviewData, setReviewData] = useState<Review>()
  const [edit] = useState(false)

  const handleCreateReview = (value: any) => {
    if (reviewData) {
      handleUpdateReview(value)
    }
    setLoading(true)
    const data = {
      lectureId: lectureId,
      message: value.message,
      rating: value.rating,
    }

    const cleanData = removeUndefined(data as Json) as unknown as CreateReviewDTO
    createReview(cleanData)
      .then(doc => setReviewData(doc))
      .finally(() => {
        setLoading(false)
      })
  }

  const handleUpdateReview = (value: any) => {
    const data = {
      ...reviewData,
      lectureId: lectureId,
      message: value.message,
      rating: value.rating,
    }
    updateReview(data)
  }

  useEffect(() => {
    if (userInfo.userId) {
      setLoading(true)
      firestore
        .collection(Collection.Lectures)
        .doc(lectureId)
        .collection(Collection.Reviews)
        .where('userId', '==', userInfo.userId)
        .get()
        .then(bundle => {
          bundle.forEach(doc => {
            setReviewData({ ...doc.data(), reviewId: doc.id } as Review)
          })
        })
        .finally(() => setLoading(false))
    }
  }, [userInfo.userId])

  useEffect(() => {
    const unsubscribe = firestore
      .collection(Collection.Lectures)
      .doc(lectureId)
      .collection(Collection.Reviews)
      .orderBy('createAt')
      .onSnapshot(querySnapshot => {
        setSize(querySnapshot.size)
        querySnapshot.docChanges().forEach(change => {
          const data = change.doc.data()
          if (change.type === 'added') {
            console.log('New Lecture: ', data)
            fetchUser(data.userId).then(user =>
              setReviews(reviewMap => [
                ...reviewMap,
                { ...data, reviewId: change.doc.id, ...user } as Review,
              ]),
            )
          }
          if (change.type === 'modified') {
            console.log('Modified Lecture: ', data)
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
            console.log('Removed Lecture: ', data)
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
      {reviews &&
        size - reviews.length >= 0 &&
        Array(size - reviews.length)
          .fill(Array(size - reviews.length).keys())
          .map((_, index) => <Skeleton active paragraph={{ rows: 1 }} avatar key={index} />)}
      <AuthZone>
        <div className="flex space-x-3 ml-2">
          {(edit || !reviewData) && (
            <>
              <Avatar src={userInfo.imageUrl} alt={userInfo.userId} />
              <Skeleton loading={loading}>
                <Form
                  form={form}
                  onFinish={handleCreateReview}
                  className="flex-grow"
                  initialValues={reviewData}
                >
                  <Form.Item name="message">
                    <Input.TextArea
                      placeholder="บอกคนอื่นเกี่ยวกับสรุปนี้"
                      rows={4}
                      maxLength={100}
                      showCount
                      disabled={!!reviewData}
                    />
                  </Form.Item>
                  <Form.Item name="rating" rules={[{ required: true }]}>
                    <Rate allowHalf disabled={!!reviewData} />
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
                {/* {!edit && reviewData && <Button>แก้ขายรีวิวว</Button>} */}
              </Skeleton>
            </>
          )}
        </div>
      </AuthZone>
    </>
  )
}
