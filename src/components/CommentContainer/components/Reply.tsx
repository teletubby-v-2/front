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
            console.log('New comment reply: ', data, 'in', commentId)
            fetchUser(data.userId).then(user =>
              setReply(commentMap => [
                ...commentMap,
                { ...data, replyId: change.doc.id, ...user } as ReplyDTO,
              ]),
            )
          }
          if (change.type === 'modified') {
            console.log('Modified comment reply: ', data, 'in', commentId)
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
            console.log('Removed comment reply: ', data, 'in', commentId)
            setReply(commentMap => commentMap.filter(comment => comment.replyId !== change.doc.id))
          }
        })
      })
    return () => unsubscribe()
  }, [commentId, id])

  return (
    <>
      {reply.length !== 0 && reply.map((item, index) => <CommentBox comment={item} key={index} />)}
    </>
  )
}
