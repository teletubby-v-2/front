import { Avatar, Button, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { AuthZone } from '../../components'
import { firestore } from '../../config/firebase'
import { Collection } from '../../constants'
import { CreateQAndADTO } from '../../constants/dto/lecture.dto'
import { QAndA } from '../../constants/interface/lecture.interface'
import { createQAndA } from '../../service/lectures/qanda'
import { userInfoStore } from '../../store/user.store'
import { fetchUser } from '../../utils/fetchUser'
import { CommentSkeleton } from '../MySkeleton/CommentSkeleton'
import { QuestionBox } from './components/QuestionBox'

export interface QAndAContainerProps {
  lectureId: string
  authorId: string
}

export const QAndAContainer: React.FC<QAndAContainerProps> = ({ lectureId, authorId }) => {
  const [qAndAs, setQAndAs] = useState<QAndA[]>([])
  const [form] = Form.useForm()
  const { userInfo } = userInfoStore()
  const [loading, setLoading] = useState(false)
  const [size, setSize] = useState(0)

  const handleCreateQAndA = ({ question = '' }) => {
    setLoading(true)
    const data = {
      lectureId: lectureId,
      question: question,
    }
    createQAndA(data as CreateQAndADTO)
      .then(() => form.resetFields())
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    const unsubscribe = firestore
      .collection(Collection.Lectures)
      .doc(lectureId)
      .collection(Collection.QAs)
      .orderBy('createAt')
      .onSnapshot(querySnapshot => {
        setSize(querySnapshot.size)
        querySnapshot.docChanges().forEach(change => {
          const data = change.doc.data()
          if (change.type === 'added') {
            fetchUser(data.userId).then(user =>
              setQAndAs(commentMap => [
                ...commentMap,
                { ...data, qaId: change.doc.id, ...user } as QAndA,
              ]),
            )
          }
          if (change.type === 'modified') {
            setQAndAs(commentMap => {
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
            setQAndAs(commentMap => commentMap.filter(comment => comment.qaId !== change.doc.id))
          }
        })
      })
    return () => unsubscribe()
  }, [lectureId])

  return (
    <div>
      {qAndAs.map((qAndA, index) => (
        <QuestionBox qAndA={qAndA} key={index} authorId={authorId} lectureId={lectureId} />
      ))}
      {qAndAs && size - qAndAs.length > 0 && <CommentSkeleton count={size - qAndAs.length} />}
      {authorId !== userInfo.userId && (
        <AuthZone>
          <Form form={form} layout="horizontal" onFinish={handleCreateQAndA}>
            <div className="flex space-x-2 ml-2">
              <Avatar src={userInfo.imageUrl} size="large" alt={userInfo.userId} />
              <Form.Item name="question" className="flex-grow">
                <Input placeholder="ตั้งคำถาม" size="large" />
              </Form.Item>
              <Form.Item shouldUpdate>
                {() => (
                  <Button
                    loading={loading}
                    size="large"
                    type="primary"
                    htmlType="submit"
                    disabled={
                      !form.isFieldsTouched(true) || !form.getFieldValue('question')?.length
                    }
                  >
                    ถาม
                  </Button>
                )}
              </Form.Item>
            </div>
          </Form>
        </AuthZone>
      )}
    </div>
  )
}
