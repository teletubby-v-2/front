import React, { useMemo, useState } from 'react'
import { Comment, Avatar, Form, Input, Button, Menu, Dropdown, Typography } from 'antd'
import { Comments } from '../../../constants/interface/lecture.interface'
import { CaretDownFilled } from '@ant-design/icons'
import { AuthZone } from '../..'
import { createReply, deleteComment, deleteReply } from '../../../service/lectures/comment'
import { ReplyDTO } from '../../../constants/dto/lecture.dto'
import { userInfoStore } from '../../../store/user.store'
import { Link } from 'react-router-dom'
import { MenuInfo } from 'rc-menu/lib/interface'
import { MoreOutlined, DeleteOutlined } from '@ant-design/icons'
import { strInnerParagraph } from '../../../utils/strInnerParagraph'

export interface CommentBoxProps {
  comment: ReplyDTO
  showReply?: boolean
  isParent?: boolean
}
export interface CommentForm {
  message: string
}

const { Paragraph } = Typography

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
  const { userInfo } = userInfoStore()

  const handleMenuClick = (info: MenuInfo) => {
    switch (info.key) {
      case 'delete':
        if (comment.commentId) {
          return deleteReply(comment)
        }
        return deleteComment(comment.lectureId, comment.id || '')
    }
  }
  const menu = useMemo(
    () => (
      <Menu onClick={handleMenuClick} className="mr-3">
        <Menu.Item key="delete" danger icon={<DeleteOutlined />}>
          ลบ
        </Menu.Item>
      </Menu>
    ),
    [],
  )

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
        actions={
          isMain && children
            ? [
                <a key={parentComment.id || reply.id} onClick={() => setIsShowReply(!isShowReply)}>
                  <CaretDownFilled rotate={isShowReply ? 180 : 0} />
                  {isShowReply ? ' ซ่อนการตอบกลับ' : ' ดูการตอบกลับ'}
                </a>,
              ]
            : []
        }
        author={
          <>
            <Link className="font-bold" to={`/profile/${comment.userId}`}>
              {comment.username}
            </Link>
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
          <Link to={`/profile/${comment.userId}`}>
            <Avatar src={comment.photoURL} alt={comment.userId} />
          </Link>
        }
        content={
          <>
            <div className="flex">
              <Paragraph
                ellipsis={{
                  rows: 5,
                  expandable: true,
                  symbol: 'ดูเพิ่มเติม',
                }}
                className="flex-grow"
              >
                {strInnerParagraph(comment.message || '')}
              </Paragraph>
              {userInfo.userId === comment.userId && (
                <p className="-m-3">
                  <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                    <Button type="link">
                      <MoreOutlined className="text-xl text-black" />
                    </Button>
                  </Dropdown>
                </p>
              )}
            </div>
          </>
        }
      >
        {isShowReply && children && children}
        {onWrite && isShowReply && (
          <AuthZone>
            <Form form={form} onFinish={handleCreateReply}>
              <div className="flex space-x-3 ml-2">
                <Avatar src={userInfo.imageUrl} alt={userInfo.userId} />
                <Form.Item name="message" className="flex-grow mb-3">
                  <Input placeholder="ตอบกลับ" autoFocus />
                </Form.Item>
                <Form.Item shouldUpdate className="mb-0">
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
