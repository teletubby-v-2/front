import { Button, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { AuthZone } from '..'
import { firestore } from '../../config/firebase'
import { Collection } from '../../constants'
import { Comments } from '../../constants/interface/lecture.interface'
import { Reply } from './components/Reply'
import { createComment } from '../../service/lectures/comment'
import { fetchUser } from '../../utils/fetchUser'
import { CommentBox } from './components/CommentBox'
import Avatar from 'antd/lib/avatar/avatar'
import { userInfoStore } from '../../store/user.store'

export interface CommentProps {
  lectureId: string
}
interface CommentsReply extends Comments {
  reply: boolean
}
export interface CommentForm {
  message: string
}

export const CommentContainer: React.FC<CommentProps> = ({ lectureId }) => {
  const [comments, setComments] = useState<CommentsReply[]>([])
  const [form] = Form.useForm<CommentForm>()
  const [loading, setLoading] = useState(false)
  const { userInfo } = userInfoStore()

  const handleCreateComment = (value: CommentForm) => {
    const data = {
      lectureId: lectureId,
      message: value.message,
    }
    setLoading(true)
    createComment(data)
      .then(() => form.resetFields())
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    const unsubscribe = firestore
      .collection(Collection.Lectures)
      .doc(lectureId)
      .collection(Collection.Comments)
      .orderBy('createAt')
      .onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(change => {
          const data = change.doc.data()
          if (change.type === 'added') {
            console.log('New Lecture: ', data)
            fetchUser(data.userId).then(user =>
              setComments(commentMap => [
                ...commentMap,
                { ...data, id: change.doc.id, ...user, reply: false } as CommentsReply,
              ]),
            )
          }
          if (change.type === 'modified') {
            console.log('Modified Lecture: ', data)
            setComments(commentMap => {
              const index = commentMap.findIndex(comment => comment.id === change.doc.id)
              const user = {
                username: commentMap[index].username,
                photoURL: commentMap[index].photoURL,
              }
              return [
                ...commentMap.slice(0, index),
                { ...data, id: change.doc.id, ...user, reply: false } as CommentsReply,
                ...commentMap.slice(index + 1),
              ]
            })
          }
          if (change.type === 'removed') {
            console.log('Removed Lecture: ', data)
            setComments(commentMap => commentMap.filter(comment => comment.id !== change.doc.id))
          }
        })
      })
    return () => unsubscribe()
  }, [lectureId])

  return (
    <div>
      <AuthZone>
        <Form form={form} layout="horizontal" onFinish={handleCreateComment}>
          <div className="flex space-x-2">
            <Avatar src={userInfo.imageUrl} size="large" />
            <Form.Item name="message" className="flex-grow">
              <Input placeholder="เขียนความคิดเห็น..." size="large" />
            </Form.Item>
            <Form.Item shouldUpdate>
              {() => (
                <Button
                  loading={loading}
                  size="large"
                  type="primary"
                  htmlType="submit"
                  disabled={!form.isFieldsTouched(true) || !form.getFieldValue('message')?.length}
                >
                  โพสต์
                </Button>
              )}
            </Form.Item>
          </div>
        </Form>
      </AuthZone>
      {comments.map((comment, index) => (
        <CommentBox comment={comment} key={index} isParent>
          {<Reply id={lectureId} commentId={comment.id as string} />}
        </CommentBox>
      ))}
    </div>
  )
}
