import React, { useMemo, useState } from 'react'
import { Comment, Avatar, Rate, Dropdown, Menu, Button, Form, Input } from 'antd'
import { Review } from '../../../constants/interface/lecture.interface'
import { MoreOutlined } from '@ant-design/icons'
import { userInfoStore } from '../../../store/user.store'
import { MenuInfo } from 'rc-menu/lib/interface'
import { deleteReview, updateReview } from '../../../service/lectures/review'

export interface ReviewBoxProps {
  review: Review
}
export interface CommentForm {
  message: string
}

export const ReviewBox: React.FC<ReviewBoxProps> = ({ review }) => {
  const { userInfo } = userInfoStore()
  const [form] = Form.useForm()
  const [edit, setEdit] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleMenuClick = (info: MenuInfo) => {
    switch (info.key) {
      case 'edit':
        return setEdit(true)
      case 'delete':
        return deleteReview(review)
    }
  }
  const handleUpdateReview = (value: any) => {
    setLoading(true)
    const data = {
      ...value,
      lectureId: review.lectureId,
      reviewId: review.reviewId,
    }
    updateReview(data)
      .then(() => setEdit(false))
      .finally(() => setLoading(false))
  }
  const menu = useMemo(
    () => (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="edit">แก้ไข</Menu.Item>
        <Menu.Item key="delete" danger>
          ลบ
        </Menu.Item>
      </Menu>
    ),
    [],
  )

  return (
    <div>
      <Comment
        author={
          <>
            <a className="font-bold mr-3" href={`/profile/${review.userId}`}>
              {review.username}
            </a>
            <Rate disabled value={review.rating} allowHalf className={edit ? 'hidden' : ''} />
          </>
        }
        avatar={
          <a href={`/profile/${review.userId}`}>
            <Avatar src={review.photoURL} alt={review.userId} />
          </a>
        }
        content={
          !edit ? (
            <div className="flex">
              <p className="flex-grow">{review.message}</p>
              {userInfo.userId === review.userId && (
                <p className="-m-3">
                  <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                    <Button type="link">
                      <MoreOutlined className="text-xl text-black" />
                    </Button>
                  </Dropdown>
                </p>
              )}
            </div>
          ) : (
            <Form form={form} onFinish={handleUpdateReview} initialValues={review}>
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
                  <>
                    <Button onClick={() => setEdit(false)} htmlType="button" className="mr-4">
                      ยกเลิก
                    </Button>
                    <Button
                      loading={loading}
                      type="primary"
                      htmlType="submit"
                      disabled={!form.getFieldValue('rating')}
                    >
                      แก้ไขรีวิว
                    </Button>
                  </>
                )}
              </Form.Item>
            </Form>
          )
        }
      />
    </div>
  )
}
