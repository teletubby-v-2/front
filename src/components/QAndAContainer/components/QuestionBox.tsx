import React, { useEffect, useState } from 'react'
import { Comment, Avatar, Form, Input, Button, Divider, Skeleton } from 'antd'
import { QAndA } from '../../../constants/interface/lecture.interface'
import { AuthZone } from '../..'
import { AnswersDTO } from '../../../constants/dto/lecture.dto'
import { userInfoStore } from '../../../store/user.store'
import { createAnswer } from '../../../service/lectures/qanda'
import { firestore } from '../../../config/firebase'
import { Collection } from '../../../constants'
import { fetchUser } from '../../../utils/fetchUser'
import { AnswerBox } from './Answer'

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

  const isToday = (someDate?: Date) => {
    const today = new Date()
    if (!someDate) return false
    return (
      someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
    )
  }

  useEffect(() => {
    const unsubscribe = firestore
      .collection(Collection.Lectures)
      .doc(lectureId)
      .collection(Collection.QAs)
      .doc(qAndA.qaId)
      .collection(Collection.Answers)
      .orderBy('createAt')
      .onSnapshot(querySnapshot => {
        setSize(querySnapshot.size)
        querySnapshot.docChanges().forEach(change => {
          const data = change.doc.data()
          if (change.type === 'added') {
            console.log('New answer: ', data)
            fetchUser(data.userId).then(user =>
              setAnswers(commentMap => [
                ...commentMap,
                { ...data, answerId: change.doc.id, ...user } as AnswersDTO,
              ]),
            )
          }
          if (change.type === 'modified') {
            console.log('Modified answer: ', data)
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
            console.log('Removed answer: ', data)
            console.log(answers)
            setAnswers(commentMap =>
              commentMap.filter(comment => {
                console.log(comment.answerId, change.doc.id)

                return comment.answerId !== change.doc.id
              }),
            )
          }
        })
      })
    return () => unsubscribe()
  }, [lectureId])

  return (
    <div>
      <div className="flex space-x-2">
        <a href={`/profile/${qAndA.userId}`} className="m-3">
          <Avatar src={qAndA.photoURL} alt={qAndA.userId} size={48} />
        </a>
        <div className="space-y-2 mt-2 flex-grow">
          <div className="font-bold text-xl">{qAndA.question}</div>
          <div>
            <div className="text-sm text-gray-500 mb-4">
              ถามโดย
              <a href={`/profile/${qAndA.userId}`} className="mx-1">
                {qAndA.username}
              </a>
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
                <h3 className="mt-4 font-bold">{size} การตอบกลับ</h3>
              </div>
            </>
          )}
          <Divider />
          {answers.map((answer, index) => (
            <AnswerBox answer={answer} key={index} />
          ))}
          {answers &&
            Array(size - answers.length)
              .fill(Array(size - answers.length).keys())
              .map((_, index) => <Skeleton active paragraph={{ rows: 1 }} avatar key={index} />)}
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
