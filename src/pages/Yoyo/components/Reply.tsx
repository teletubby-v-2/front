import { Avatar, Button, Form, Input, List, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import { AuthZone } from '../../../components'
import { firestore } from '../../../config/firebase'
import { Collection } from '../../../constants'
import { ReplyDTO } from '../../../constants/dto/lecture.dto'
import { createReply, deleteReply, updateReply } from '../../../service/lectures/comment'
import { fetchUser } from '../../../utils/fetchUser'
import { dummyMessage } from '../dummy/YoyoComment.dummy'

export interface ReplyProps {
  id: string
  commentId: string
  className?: string
}

export const Reply: React.FC<ReplyProps> = ({ id, commentId, className }) => {
  const [reply, setReply] = useState<ReplyDTO[]>([])
  const [count, setCount] = useState(0)
  const [form] = Form.useForm()
  // const [loading, setLoading] = useState(false)

  const testcreateReply = (value?: any) => {
    const data = {
      lectureId: id,
      commentId: commentId,
      message: value.message || dummyMessage[count % 7],
    }
    setCount(count + 1)
    createReply(data as ReplyDTO)
    form.resetFields()
  }
  const testUpdateComment = (lectureId: string, id: string) => {
    const data = {
      message: dummyMessage[count % 7],
      lectureId: lectureId,
      commentId: commentId,
      replyId: id,
    }
    setCount(count + 1)
    updateReply(data)
  }
  const testDeleteComment = (answer: ReplyDTO) => {
    deleteReply(answer)
  }
  const handleSelectFor = (action: 'delete' | 'update', lectureId = '', answer: ReplyDTO) => {
    switch (action) {
      case 'delete':
        return testDeleteComment(answer)
      case 'update':
        return testUpdateComment(lectureId, answer.replyId as string)
    }
  }

  useEffect(() => {
    const unsubscribe = firestore
      .collection(Collection.Lectures)
      .doc(id)
      .collection(Collection.Comments)
      .doc(commentId)
      .collection(Collection.Replies)
      .orderBy('createAt')
      .onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(change => {
          const data = change.doc.data()
          if (change.type === 'added') {
            console.log('New answer: ', data)
            fetchUser(data.userId).then(user =>
              setReply(commentMap => [
                ...commentMap,
                { ...data, replyId: change.doc.id, ...user } as ReplyDTO,
              ]),
            )
          }
          if (change.type === 'modified') {
            console.log('Modified answer: ', data)
            setReply(commentMap => {
              const index = commentMap.findIndex(comment => comment.replyId === change.doc.id)
              if (commentMap[index]) {
                const user = {
                  username: commentMap[index].username,
                  photoURL: commentMap[index].photoURL,
                }
                return [
                  ...commentMap.slice(0, index),
                  { ...data, replyId: change.doc.id, ...user } as ReplyDTO,
                  ...commentMap.slice(index + 1),
                ]
              } else {
                return commentMap
              }
              // console.log(commentMap[index])
            })
          }
          if (change.type === 'removed') {
            console.log('Removed answer: ', data)
            setReply(commentMap => commentMap.filter(comment => comment.replyId !== change.doc.id))
          }
        })
      })
    return () => unsubscribe()
  }, [commentId, id])

  return (
    <div className={className}>
      {console.log(reply)}
      {reply.length !== 0 && (
        <List
          size="large"
          itemLayout="horizontal"
          dataSource={reply}
          loading={!reply}
          renderItem={item => (
            <List.Item
              actions={[
                <a key="edit" onClick={() => handleSelectFor('update', item.lectureId || '', item)}>
                  edit
                </a>,
                <a
                  key="delete"
                  onClick={() => handleSelectFor('delete', item.lectureId || '', item)}
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
          )}
        />
      )}
      <AuthZone>
        <Form form={form} layout="inline" onFinish={testcreateReply}>
          <Form.Item
            name="message"
            rules={[{ required: true, message: '' }]}
            hasFeedback={false}
            className="w-3/4"
          >
            <Input.TextArea placeholder="reply" />
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
                reply
              </Button>
            )}
          </Form.Item>
        </Form>
      </AuthZone>
    </div>
  )
}
