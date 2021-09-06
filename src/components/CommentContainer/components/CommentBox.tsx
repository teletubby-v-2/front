import React, { useState } from 'react'
import { Comment, Avatar, Form, Input, Button } from 'antd'
import { Comments } from '../../../constants/interface/lecture.interface'
import { CaretDownFilled } from '@ant-design/icons'
import { AuthZone } from '../..'
import { createReply } from '../../../service/lectures/comment'
import { ReplyDTO } from '../../../constants/dto/lecture.dto'

export interface CommentBoxProps {
  comment: Comments | ReplyDTO
  showReply?: boolean
  isParent?: boolean
}
export interface CommentForm {
  message: string
}

export const CommentBox: React.FC<CommentBoxProps> = ({
  children,
  comment,
  showReply = false,
  isParent: isMain = false,
}) => {
  const [isShowReply, setIsShowReply] = useState(showReply)
  const [onWrite, setOnWrite] = useState(false)
  const [form] = Form.useForm<CommentForm>()
  const [loading, setLoading] = useState(false)
  const [parentComment] = useState(comment as Comments)
  const [reply] = useState(comment as ReplyDTO)

  // const numOfChildren = React.useMemo(() => React.Children.toArray(children), [children])

  const handleCreateReply = (value: CommentForm) => {
    setLoading(true)
    const data = {
      lectureId: parentComment.lectureId,
      commentId: parentComment.id,
      message: value.message,
    }
    createReply(data as ReplyDTO)
      .then(() => {
        form.resetFields()
        setOnWrite(false)
      })
      .finally(() => setLoading(false))
  }

  return (
    <div>
      {' '}
      <Comment
        className="p-0"
        actions={
          isMain && children
            ? [
                <a
                  key={parentComment.id || reply.replyId}
                  onClick={() => setIsShowReply(!isShowReply)}
                >
                  <CaretDownFilled rotate={isShowReply ? 180 : 0} />
                  {isShowReply ? ' ซ่อนการตอบกลับ' : ' ดูการตอบกลับ'}
                </a>,
              ]
            : []
        }
        author={
          <>
            <a className="font-bold" href={`/profile/${comment.userId}`}>
              {comment.username}
            </a>
            {isMain && (
              <a
                className="ml-3 text-blue-500 "
                onClick={() => {
                  setOnWrite(true)
                  setIsShowReply(true)
                }}
              >
                ตอบกลับ
              </a>
            )}
          </>
        }
        avatar={
          <a href={`/profile/${comment.userId}`}>
            <Avatar src={comment.photoURL} alt={comment.userId} size="large" />
          </a>
        }
        content={comment.message}
      >
        {isShowReply && children && children}
        {onWrite && isShowReply && (
          <AuthZone>
            <Form form={form} onFinish={handleCreateReply}>
              <div className="flex space-x-3">
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
      </Comment>
    </div>
  )
}
