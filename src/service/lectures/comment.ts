import firebase from 'firebase'
import { firebaseApp, firestore } from '../../config/firebase'
import { CreateCommentDTO, UpdateCommentDTO } from '../../constants/dto/lecture.dto'

const lectureCollection = firestore.collection('Lectures')

function getCommentCollection(
  lectureId: string,
): firebase.firestore.CollectionReference<firebase.firestore.DocumentData> {
  return lectureCollection.doc(lectureId).collection('Comments')
}

async function createComment(comment: CreateCommentDTO, canReply = false): Promise<void> {
  const commentCollection = getCommentCollection(comment.lectureId)
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  const data: CreateCommentDTO = {
    ...comment,
    createAt: timeStamp,
    updateAt: timeStamp,
    userId: firebaseApp.auth().currentUser?.uid as string,
    canReply: canReply,
    reply: [],
  }
  console.log(data)
  return await commentCollection.doc().set(data)
}

async function updateComment(comment: UpdateCommentDTO): Promise<void> {
  const commentCollection = getCommentCollection(comment?.lectureId as string)
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  const data = {
    ...comment,
    createAt: timeStamp,
    updateAt: timeStamp,
  }
  return await commentCollection.doc(data.lectureId).update(data)
}

async function deleteComment(id: string, lectureId: string) {
  const commentCollection = getCommentCollection(lectureId)
  return await commentCollection.doc(id).delete()
}

export { createComment, updateComment, deleteComment }
