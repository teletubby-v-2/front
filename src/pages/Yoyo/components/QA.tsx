import { Avatar, Button, Divider, Form, Input, List, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import { AuthZone } from '../../../components'
import { firestore } from '../../../config/firebase'
import { Collection } from '../../../constants'
import { CreateQAndADTO } from '../../../constants/dto/lecture.dto'
import { QAndA } from '../../../constants/interface/lecture.interface'
import { createQAndA, deleteQAndA, updateQAndA } from '../../../service/lectures/qanda'
import { fetchUser } from '../../../utils/fetchUser'
import { dummyMessage } from '../dummy/YoyoComment.dummy'
import { AnswerCom } from './Answer'

export interface QAComProps {
  id: string
}

export const QACom: React.FC<QAComProps> = ({ id }) => {
  const [qAndA, setQAndA] = useState<QAndA[]>([])
  const [count, setCount] = useState(0)
  const [form] = Form.useForm()
  // const [loading, setLoading] = useState(false)

  const testCreateQAndA = (value?: any) => {
    const data = {
      lectureId: id,
      question: value.question || dummyMessage[count % 7],
    }
    setCount(count + 1)
    createQAndA(data as CreateQAndADTO)
    form.resetFields()
  }
  const testUpdateComment = (lectureId: string, id: string) => {
    const data = {
      question: dummyMessage[count % 7],
      lectureId: lectureId,
      qaId: id,
    }
    setCount(count + 1)
    updateQAndA(data)
  }
  const testDeleteComment = (lectureId: string, id: string) => {
    deleteQAndA(lectureId, id)
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
      .collection(Collection.QAs)
      .orderBy('createAt')
      .onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(change => {
          const data = change.doc.data()
          if (change.type === 'added') {
            console.log('New QandA: ', data)
            fetchUser(data.userId).then(user =>
              setQAndA(commentMap => [
                ...commentMap,
                { ...data, qaId: change.doc.id, ...user } as QAndA,
              ]),
            )
          }
          if (change.type === 'modified') {
            console.log('Modified QandA: ', data)
            setQAndA(commentMap => {
              const index = commentMap.findIndex(comment => comment.qaId === change.doc.id)
              const user = {
                username: commentMap[index].username,
                photoURL: commentMap[index].photoURL,
              }
              return [
                ...commentMap.slice(0, index),
                { ...data, qaId: change.doc.id, ...user } as QAndA,
                ...commentMap.slice(index + 1),
              ]
            })
          }
          if (change.type === 'removed') {
            console.log('Removed QandA: ', data)
            setQAndA(commentMap => commentMap.filter(comment => comment.qaId !== change.doc.id))
          }
        })
      })
    return () => unsubscribe()
  }, [id])

  return (
    <div>
      <AuthZone>
        <Form form={form} layout="inline" onFinish={testCreateQAndA}>
          <Form.Item name="question" rules={[{ required: true, message: '' }]} className="w-96">
            <Input.TextArea placeholder="question" />
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
                ask
              </Button>
            )}
          </Form.Item>
        </Form>
      </AuthZone>
      <List
        size="large"
        itemLayout="horizontal"
        dataSource={qAndA}
        loading={!qAndA}
        renderItem={item => (
          <>
            <List.Item
              actions={[
                <a
                  key="edit"
                  onClick={() => handleSelectFor('update', item.lectureId || '', item.qaId || '')}
                >
                  edit
                </a>,
                <a
                  key="delete"
                  onClick={() => handleSelectFor('delete', item.lectureId || '', item.qaId || '')}
                >
                  delete
                </a>,
              ]}
            >
              <Skeleton avatar title={false} loading={false} active>
                <List.Item.Meta
                  avatar={<Avatar src={item.photoURL} size="large" />}
                  title={item.username}
                  description={item.question}
                />
              </Skeleton>
            </List.Item>
            <div className="flex justify-end">
              <AnswerCom
                id={id}
                qaId={item.qaId as string}
                className="w-11/12 border-l border-black"
              />
            </div>
          </>
        )}
      />
    </div>
  )
}
