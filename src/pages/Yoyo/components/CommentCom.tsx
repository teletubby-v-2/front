import { Avatar, Button, Form, Input, List, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import { AuthZone } from '../../../components'
import { firestore } from '../../../config/firebase'
import { Collection } from '../../../constants'
import { Comments } from '../../../constants/interface/lecture.interface'
import { createComment, deleteComment, updateComment } from '../../../service/lectures/comment'
import { fetchUser } from '../../../utils/fetchUser'
import { dummyMessage } from '../dummy/YoyoComment.dummy'
import { Reply } from './Reply'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
export interface CommentComProps {
  id: string
}

interface CommentsReply extends Comments {
  show: boolean
}

export const CommentCom: React.FC<CommentComProps> = ({ id }) => {
  const [comment, setComment] = useState<CommentsReply[]>([])
  const [count, setCount] = useState(0)
  const [form] = Form.useForm()
  // const [loading, setLoading] = useState(false)

  const testCreateComment = (value?: any) => {
    const data = {
      lectureId: id,
      message: value.message || dummyMessage[count % 7],
    }
    setCount(count + 1)
    createComment(data)
    form.resetFields()
  }
  const testUpdateComment = (lectureId: string, id: string) => {
    const data = {
      message: dummyMessage[count % 7],
      lectureId: lectureId,
      id: id,
    }
    setCount(count + 1)
    updateComment(data)
  }
  const testDeleteComment = (lectureId: string, id: string) => {
    deleteComment(lectureId, id)
  }
  const handleSelectFor = (action: 'delete' | 'update', lectureId = '', id: string) => {
    switch (action) {
      case 'delete':
        return testDeleteComment(lectureId, id)
      case 'update':
        return testUpdateComment(lectureId, id)
    }
  }

  useEffect(() => {
    const unsubscribe = firestore
      .collection(Collection.Lectures)
      .doc(id)
      .collection(Collection.Comments)
      .orderBy('createAt')
      .onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(change => {
          const data = change.doc.data()
          if (change.type === 'added') {
            console.log('New Lecture: ', data)
            fetchUser(data.userId).then(user =>
              setComment(commentMap => [
                ...commentMap,
                { ...data, id: change.doc.id, ...user, show: false } as CommentsReply,
              ]),
            )
          }
          if (change.type === 'modified') {
            console.log('Modified Lecture: ', data)
            setComment(commentMap => {
              const index = commentMap.findIndex(comment => comment.id === change.doc.id)
              const user = {
                username: commentMap[index].username,
                photoURL: commentMap[index].photoURL,
              }
              return [
                ...commentMap.slice(0, index),
                { ...data, id: change.doc.id, ...user, show: false } as CommentsReply,
                ...commentMap.slice(index + 1),
              ]
            })
          }
          if (change.type === 'removed') {
            console.log('Removed Lecture: ', data)
            setComment(commentMap => commentMap.filter(comment => comment.id !== change.doc.id))
          }
        })
      })
    return () => unsubscribe()
  }, [id])

  return (
    <div>
      <AuthZone>
        <Form form={form} layout="inline" onFinish={testCreateComment}>
          <Form.Item name="message" rules={[{ required: true }]} className="w-96">
            <Input.TextArea placeholder="comment" />
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
                comment
              </Button>
            )}
          </Form.Item>
        </Form>
      </AuthZone>
      <List
        size="large"
        itemLayout="horizontal"
        dataSource={comment}
        loading={!comment}
        renderItem={(item, index) => (
          <>
            <List.Item
              actions={[
                <Button
                  key="reply"
                  type="link"
                  icon={item.show ? <UpOutlined /> : <DownOutlined />}
                  onClick={() =>
                    setComment(commentMap => [
                      ...commentMap.slice(0, index),
                      { ...commentMap[index], show: !commentMap[index].show } as CommentsReply,
                      ...commentMap.slice(index + 1),
                    ])
                  }
                >
                  reply
                </Button>,
                <a
                  key="edit"
                  onClick={() => handleSelectFor('update', item.lectureId || '', item.id || '')}
                >
                  edit
                </a>,
                <a
                  key="delete"
                  onClick={() => handleSelectFor('delete', item.lectureId || '', item.id || '')}
                >
                  delete
                </a>,
              ]}
            >
              <Skeleton avatar title={false} loading={false} active>
                <List.Item.Meta
                  avatar={<Avatar src={item.photoURL} size="large" />}
                  title={item.username}
                  description={item.message}
                />
              </Skeleton>
            </List.Item>

            {item.show && (
              <div className="flex justify-end">
                <Reply id={id} commentId={item.id as string} className="w-11/12" />
              </div>
            )}
          </>
        )}
      />
    </div>
  )
}
