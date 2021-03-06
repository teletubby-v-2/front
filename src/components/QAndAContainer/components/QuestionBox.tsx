import React, { useEffect, useMemo, useState } from 'react'
import { Avatar, Form, Input, Button, Divider, Menu, Dropdown } from 'antd'
import { QAndA } from '../../../constants/interface/lecture.interface'
import { AuthZone } from '../..'
import { AnswersDTO } from '../../../constants/dto/lecture.dto'
import { userInfoStore } from '../../../store/user.store'
import { createAnswer, deleteQAndA } from '../../../service/lectures/qanda'
import { firestore } from '../../../config/firebase'
import { COLLECTION } from '../../../constants'
import { fetchUser } from '../../../utils/fetchUser'
import { AnswerBox } from './Answer'
import { Link } from 'react-router-dom'
import { MoreOutlined, DeleteOutlined } from '@ant-design/icons'
import { MenuInfo } from 'rc-menu/lib/interface'
import { CommentSkeleton } from '../../MySkeleton/CommentSkeleton'

const isToday = (someDate?: Date) => {
  const today = new Date()
  if (!someDate) return false
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  )
}
export interface QuestionBoxProps {
  qAndA: QAndA
  authorId: string
  lectureId: string
}
export interface CommentForm {
  message: string
}

export const QuestionBox: React.FC<QuestionBoxProps> = ({ authorId, qAndA, lectureId }) => {
  const [form] = Form.useForm<CommentForm>()
  const [answers, setAnswers] = useState<AnswersDTO[]>([])
  const [loading, setLoading] = useState(false)
  const { userInfo } = userInfoStore()
  const [size, setSize] = useState(0)
  // const numOfChildren = React.useMemo(() => React.Children.toArray(children), [children])

  const handleMenuClick = (info: MenuInfo) => {
    switch (info.key) {
      case 'delete':
        return deleteQAndA(qAndA.lectureId, qAndA.qaId || '')
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

  useEffect(() => {
    const unsubscribe = firestore
      .collection(COLLECTION.LECTURES)
      .doc(lectureId)
      .collection(COLLECTION.QAS)
      .doc(qAndA.qaId)
      .collection(COLLECTION.ANSWERS)
      .orderBy('createAt')
      .onSnapshot(querySnapshot => {
        setSize(querySnapshot.size)
        querySnapshot.docChanges().forEach(change => {
          const data = change.doc.data()
          if (change.type === 'added') {
            fetchUser(data.userId).then(user =>
              setAnswers(commentMap => [
                ...commentMap,
                { ...data, answerId: change.doc.id, ...user } as AnswersDTO,
              ]),
            )
          }
          if (change.type === 'modified') {
            setAnswers(commentMap => {
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
            })
          }
          if (change.type === 'removed') {
            setAnswers(commentMap =>
              commentMap.filter(comment => comment.answerId !== change.doc.id),
            )
          }
        })
      })
    return () => unsubscribe()
  }, [lectureId])

  return (
    <div>
      <div className="flex space-x-2">
        <Link to={`/profile/${qAndA.userId}`} className="m-3">
          <Avatar src={qAndA.photoURL} alt={qAndA.userId} size={48} />
        </Link>
        <div className="space-y-2 mt-2 flex-grow">
          <div className="flex font-medium text-xl">
            <p className="flex-grow">{qAndA.question}</p>
            {userInfo.userId === qAndA.userId && (
              <p className="-m-3">
                <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                  <Button type="link">
                    <MoreOutlined className="text-2xl text-black" />
                  </Button>
                </Dropdown>
              </p>
            )}
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-4">
              ถามโดย
              <Link to={`/profile/${qAndA.userId}`} className="mx-1">
                {qAndA.username}
              </Link>
              เมื่อ{' '}
              {isToday(qAndA.createAt?.toDate())
                ? qAndA.createAt?.toDate().toLocaleTimeString('th-TH')
                : qAndA.createAt?.toDate().toLocaleDateString('th-TH')}
            </div>
          </div>
          {size !== 0 && (
            <>
              {' '}
              <Divider dashed />
              <div>
                <h3 className="mt-4 font-medium">{size} การตอบกลับ</h3>
              </div>
            </>
          )}
          <Divider />
          {answers.map((answer, index) => (
            <AnswerBox answer={answer} key={index} />
          ))}
          {answers && <CommentSkeleton count={size - answers.length} />}
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
