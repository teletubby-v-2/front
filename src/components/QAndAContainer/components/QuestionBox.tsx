import React, { useState } from 'react'
import { Comment, Avatar, Form, Input, Button, Divider } from 'antd'
import { QAndA } from '../../../constants/interface/lecture.interface'
import { AuthZone } from '../..'
import { AnswersDTO } from '../../../constants/dto/lecture.dto'
import { userInfoStore } from '../../../store/user.store'
import { createAnswer } from '../../../service/lectures/qanda'

export interface QuestionBoxProps {
  qAndA: QAndA
  authorId: string
}
export interface CommentForm {
  message: string
}

export const QuestionBox: React.FC<QuestionBoxProps> = ({ children, authorId, qAndA }) => {
  const [form] = Form.useForm<CommentForm>()
  const [loading, setLoading] = useState(false)
  const { userInfo } = userInfoStore()
  // const numOfChildren = React.useMemo(() => React.Children.toArray(children), [children])

  const handleCreateReply = (value: CommentForm) => {
    setLoading(true)
    const data = {
      lectureId: qAndA.lectureId,
      qaId: qAndA.qaId,
      message: value.message,
    }
    createAnswer(data as AnswersDTO)
      .then(() => {
        form.resetFields()
      })
      .finally(() => setLoading(false))
  }

  return (
    <div>
      <div className="flex space-x-2">
        <a href={`/profile/${qAndA.userId}`} className="m-3">
          <Avatar src={qAndA.photoURL} alt={qAndA.userId} size={60} />
        </a>
        <div className="space-y-2 mt-2 flex-grow">
          <div className="font-bold text-xl">{qAndA.question}</div>
          <div>
            <div className="text-sm text-gray-500 mb-6">
              ถามโดย
              <a href={`/profile/${qAndA.userId}`} className="mx-1">
                {qAndA.username}
              </a>
              เมื่อ {qAndA.createAt?.toDate().toDateString()}
            </div>
          </div>
          <hr className="border-dashed " />
          <div>
            <h3 className="mt-4 font-bold">...การตอบกลับ</h3>
          </div>
          <Divider />
          {children && children}
          {authorId === userInfo.userId && (
            <AuthZone>
              <Form form={form} onFinish={handleCreateReply}>
                <div className="flex space-x-3 ml-2">
                  <Avatar src={userInfo.imageUrl} alt={userInfo.userId} />
                  <Form.Item name="message" className="flex-grow">
                    <Input placeholder="ตอบกลับ" autoFocus />
                  </Form.Item>
                  <Form.Item shouldUpdate>
                    {() => (
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        disabled={
                          !form.isFieldsTouched(true) || !form.getFieldValue('message')?.length
                        }
                      >
                        ตอบกลับ
                      </Button>
                    )}
                  </Form.Item>
                </div>
              </Form>
            </AuthZone>
          )}
        </div>
      </div>
    </div>
  )
}
