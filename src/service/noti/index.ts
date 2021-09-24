import { Notification } from './../../constants/interface/notification.interface'
import { MyUser } from './../../constants/interface/myUser.interface'
import { Collection } from './../../constants/index'
import firebase from 'firebase'
import { firestore } from '../../config/firebase'
import { getUser } from '../user'

const notiBody: Record<string, (targetUsername: string) => string> = {
  lecture: (targetUsername: string) => `${targetUsername} ได้เพิ่มเลคเชอร์ใหม่`,
  follow: (targetUsername: string) => `${targetUsername} ได้เริ่มติดตามคุณ`,
}

async function createLectureNoti(link: string) {
  const user = (await getUser()) as MyUser
  if (user.followers.length === 0) return
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  const noti: Notification = {
    targetUserId: user.userId,
    relevantUserId: user.followers,
    type: 'lecture',
    body: notiBody['lecture'](user.userName),
    link: link,
    createAt: timeStamp,
    updateAt: timeStamp,
  }
  firestore.collection(Collection.Notifications).add(noti)
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
      link: `/profile/${userId}`,
      createAt: timeStamp,
      updateAt: timeStamp,
    }
    firestore.collection(Collection.Notifications).add(noti)
  }
}

async function getNoti() {
  const userId = firebase.auth().currentUser?.uid
  const data: Notification[] = []
  if (userId) {
    const notiDoc = await firestore
      .collection(Collection.Notifications)
      .where('relevantUserId', 'array-contains', userId)
      .get()
    notiDoc.forEach(noti => data.push({ ...noti.data(), notiId: noti.id } as Notification))
  }
  return data
}

export { createFollowNoti, createLectureNoti, getNoti }
