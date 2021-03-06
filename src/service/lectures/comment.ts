import { COLLECTION } from './../../constants/index'
import firebase from 'firebase'
import { firebaseApp, firestore } from '../../config/firebase'
import { CreateCommentDTO, ReplyDTO, UpdateCommentDTO } from '../../constants/dto/lecture.dto'

const lectureCollection = firestore.collection('Lectures')

function getCommentCollection(
  lectureId: string,
): firebase.firestore.CollectionReference<firebase.firestore.DocumentData> {
  return lectureCollection.doc(lectureId).collection(COLLECTION.COMMENT)
}

function getReplyCollection(
  lectureId: string,
  id: string,
): firebase.firestore.CollectionReference<firebase.firestore.DocumentData> {
  const comment = getCommentCollection(lectureId)
  return comment.doc(id).collection(COLLECTION.REPILES)
}

async function createComment(comment: CreateCommentDTO): Promise<void> {
  firebaseApp.auth().currentUser?.reload()
  const batch = firestore.batch()
  const commentCollection = getCommentCollection(comment.lectureId)
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  const data: CreateCommentDTO = {
    ...comment,
    createAt: timeStamp,
    updateAt: timeStamp,
    userId: firebaseApp.auth().currentUser?.uid as string,
  }
  batch.set(commentCollection.doc(), data)
  return batch.commit()
}

async function updateComment(comment: UpdateCommentDTO): Promise<void> {
  const commentCollection = getCommentCollection(comment?.lectureId as string)
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  const id = comment.id
  const data = {
    ...comment,
    updateAt: timeStamp,
  }
  delete data['id']
  return await commentCollection.doc(id).update(data)
}

async function deleteComment(lectureId: string, id: string) {
  const commentCollection = getCommentCollection(lectureId)
  return await commentCollection.doc(id).delete()
}

async function createReply(reply: ReplyDTO): Promise<void> {
  firebaseApp.auth().currentUser?.reload()
  const batch = firestore.batch()
  const replyCollection = getReplyCollection(reply.lectureId, reply.commentId || '')
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  const data: ReplyDTO = {
    ...reply,
    createAt: timeStamp,
    updateAt: timeStamp,
    userId: firebaseApp.auth().currentUser?.uid as string,
  }
  batch.set(replyCollection.doc(), data)
  return batch.commit()
}

async function updateReply(reply: ReplyDTO): Promise<void> {
  const replyCollection = getReplyCollection(reply.lectureId, reply.commentId || '')
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  const id = reply.id
  const data = {
    ...reply,
    updateAt: timeStamp,
  }
  delete data['id']
  return await replyCollection.doc(id).update(data)
}

async function deleteReply(reply: ReplyDTO) {
  const replyCollection = getReplyCollection(reply.lectureId, reply.commentId || '')
  return await replyCollection.doc(reply.id).delete()
}

export { createComment, updateComment, deleteComment, createReply, updateReply, deleteReply }
