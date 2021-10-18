import { Notification } from './../../constants/interface/notification.interface'
import { MyUser } from './../../constants/interface/myUser.interface'
import { COLLECTION } from './../../constants/index'
import firebase from 'firebase'
import { firestore } from '../../config/firebase'
import { getUser } from '../user'
import { LectureDTO } from '../../constants/dto/lecture.dto'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const notiBody: Record<string, any> = {
  lecture: (targetUsername: string, lectureTitle: string) =>
    `${targetUsername} ได้เพิ่มเลคเชอร์ใหม่"${lectureTitle}"`,
  follow: (targetUsername: string) => `${targetUsername} ได้เริ่มติดตามคุณ🎉🎉🎉`,
  question: (targetUsername: string) => `${targetUsername} มีคำถามถึงคุณ🙋🙋`,
}

async function createLectureNoti(link: string, lecture?: LectureDTO) {
  const user = (await getUser()) as MyUser
  if (user.followers.length === 0) return
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  const noti: Notification = {
    targetUserId: user.userId,
    relevantUserId: user.followers,
    type: 'lecture',
    body: notiBody['lecture'](user.userName, lecture?.lectureTitle || ''),
    link: link,
    createAt: timeStamp,
    updateAt: timeStamp,
  }
  firestore.collection(COLLECTION.NOTIFICATIONS).add(noti)
}

async function createFollowNoti(userId: string) {
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  const target = firebase.auth().currentUser
  if (target) {
    const noti: Notification = {
      targetUserId: target.uid,
      relevantUserId: [userId],
      type: 'follow',
      body: notiBody['follow'](target.displayName || target.uid),
      link: `/profile/${target.uid}`,
      createAt: timeStamp,
      updateAt: timeStamp,
    }
    firestore.collection(COLLECTION.NOTIFICATIONS).add(noti)
  }
}

async function createQaNoti(lecture: LectureDTO) {
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  const target = firebase.auth().currentUser
  if (target) {
    const noti: Notification = {
      targetUserId: target.uid,
      relevantUserId: [lecture.userId],
      type: 'question',
      body: notiBody['question'](target.displayName || target.uid),
      link: `/lectureDetail/${lecture.lectureId}#qa`,
      createAt: timeStamp,
      updateAt: timeStamp,
    }
    firestore.collection(COLLECTION.NOTIFICATIONS).add(noti)
  }
}

async function getNoti() {
  const userId = firebase.auth().currentUser?.uid
  const data: Notification[] = []
  if (userId) {
    const notiDoc = await firestore
      .collection(COLLECTION.NOTIFICATIONS)
      .where('relevantUserId', 'array-contains', userId)
      .orderBy('createAt', 'desc')
      .get()
    notiDoc.forEach(noti => data.push({ ...noti.data(), notiId: noti.id } as Notification))
  }
  return data
}

export { createFollowNoti, createLectureNoti, getNoti, createQaNoti }
