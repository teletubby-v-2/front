import { Avatar, Button, Form, Input, List, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import { AuthZone } from '../../../components'
import { firestore } from '../../../config/firebase'
import { Collection } from '../../../constants'
import { AnswersDTO } from '../../../constants/dto/lecture.dto'
import { createAnswer, deleteAnswer, updateAnswer } from '../../../service/lectures/qanda'
import { fetchUser } from '../../../utils/fetchUser'
import { dummyMessage } from '../dummy/YoyoComment.dummy'

export interface AnswerComProps {
  id: string
  qaId: string
  className?: string
}

export const AnswerCom: React.FC<AnswerComProps> = ({ id, qaId, className }) => {
  const [answer, setAnswer] = useState<AnswersDTO[]>([])
  const [count, setCount] = useState(0)
  const [form] = Form.useForm()
  // const [loading, setLoading] = useState(false)

  const testcreateAnswer = (value?: any) => {
    const data = {
      lectureId: id,
      qaId: qaId,
      message: value.message || dummyMessage[count % 7],
    }
    setCount(count + 1)
    createAnswer(data as AnswersDTO)
    form.resetFields()
  }
  const testUpdateComment = (lectureId: string, id: string) => {
    const data = {
      message: dummyMessage[count % 7],
      lectureId: lectureId,
      qaId: qaId,
      answerId: id,
    }
    setCount(count + 1)
    updateAnswer(data)
  }
  const testDeleteComment = (answer: AnswersDTO) => {
    deleteAnswer(answer)
  }
  const handleSelectFor = (action: 'delete' | 'update', lectureId = '', answer: AnswersDTO) => {
    switch (action) {
      case 'delete':
        return testDeleteComment(answer)
      case 'update':
        return testUpdateComment(lectureId, answer.answerId as string)
    }
  }

  useEffect(() => {
    const unsubscribe = firestore
      .collection(Collection.Lectures)
      .doc(id)
      .collection(Collection.QAs)
      .doc(qaId)
      .collection(Collection.Answers)
      .orderBy('createAt')
      .onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(change => {
          const data = change.doc.data()
          if (change.type === 'added') {
            console.log('New answer: ', data)
            fetchUser(data.userId).then(user =>
              setAnswer(commentMap => [
                ...commentMap,
                { ...data, answerId: change.doc.id, ...user } as AnswersDTO,
              ]),
            )
          }
          if (change.type === 'modified') {
            console.log('Modified answer: ', data)
            setAnswer(commentMap => {
              const index = commentMap.findIndex(comment => comment.answerId === change.doc.id)
              if (commentMap[index]) {
                const user = {
                  username: commentMap[index].username,
                  photoURL: commentMap[index].photoURL,
                }
                return [
                  ...commentMap.slice(0, index),
                  { ...data, answerId: change.doc.id, ...user } as AnswersDTO,
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
            setAnswer(commentMap =>
              commentMap.filter(comment => comment.answerId !== change.doc.id),
            )
          }
        })
      })
    return () => unsubscribe()
  }, [id])

  return (
    <div className={className}>
      {answer.length !== 0 && (
        <List
          size="large"
          itemLayout="horizontal"
          dataSource={answer}
          loading={!answer}
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
        <Form form={form} layout="inline" onFinish={testcreateAnswer}>
          <Form.Item name="message" className="w-96">
            <Input.TextArea placeholder="message" />
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={!form.isFieldsTouched(true) || !form.getFieldValue('message')?.length}
              >
                ans
              </Button>
            )}
          </Form.Item>
        </Form>
      </AuthZone>
    </div>
  )
}
