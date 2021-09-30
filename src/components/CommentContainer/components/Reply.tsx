import { Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import { firestore } from '../../../config/firebase'
import { Collection } from '../../../constants'
import { ReplyDTO } from '../../../constants/dto/lecture.dto'
import { fetchUser } from '../../../utils/fetchUser'
import { CommentBox } from './CommentBox'

export interface ReplyProps {
  id: string
  commentId: string
}

export const Reply: React.FC<ReplyProps> = ({ id, commentId }) => {
  const [reply, setReply] = useState<ReplyDTO[]>([])
  const [size, setSize] = useState(0)

  useEffect(() => {
    const unsubscribe = firestore
      .collection(Collection.Lectures)
      .doc(id)
      .collection(Collection.Comments)
      .doc(commentId)
      .collection(Collection.Replies)
      .orderBy('createAt')
      .onSnapshot(querySnapshot => {
        setSize(querySnapshot.size)
        querySnapshot.docChanges().forEach(change => {
          const data = change.doc.data()
          if (change.type === 'added') {
            fetchUser(data.userId).then(user =>
              setReply(commentMap => [
                ...commentMap,
                { ...data, id: change.doc.id, ...user } as ReplyDTO,
              ]),
            )
          }
          if (change.type === 'modified') {
            setReply(commentMap => {
              const index = commentMap.findIndex(comment => comment.id === change.doc.id)
              if (commentMap[index]) {
                const user = {
                  username: commentMap[index].username,
                  photoURL: commentMap[index].photoURL,
                }
                return [
                  ...commentMap.slice(0, index),
                  { ...data, id: change.doc.id, ...user } as ReplyDTO,
                  ...commentMap.slice(index + 1),
                ]
              } else {
                return commentMap
              }
            })
          }
          if (change.type === 'removed') {
            setReply(commentMap => commentMap.filter(comment => comment.id !== change.doc.id))
          }
        })
      })
    return () => unsubscribe()
  }, [commentId, id])

  return (
    <>
      {reply && reply.map((item, index) => <CommentBox comment={item} key={index} />)}
      {reply &&
        size - reply.length > 0 &&
        Array(size - reply.length)
          .fill(Array(size - reply.length).keys())
          .map((_, index) => <Skeleton active paragraph={{ rows: 1 }} avatar key={index} />)}
    </>
  )
}
