import firebase from 'firebase'
import { firebaseApp, firestore } from '../../config/firebase'
import { CreateReviewDTO, UpdateReviewDTO } from '../../constants/dto/lecture.dto'

const lectureCollection = firestore.collection('Lectures')

function getReviewCollection(
  lectureId: string,
): firebase.firestore.CollectionReference<firebase.firestore.DocumentData> {
  return lectureCollection.doc(lectureId).collection('Review')
}

async function createReview(review: CreateReviewDTO): Promise<void> {
  const reviewCollection = getReviewCollection(review.lectureId)
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  const data: CreateReviewDTO = {
    ...review,
    createAt: timeStamp,
    updateAt: timeStamp,
    userId: firebaseApp.auth().currentUser?.uid as string,
  }
  console.log(data)
  return await reviewCollection.doc().set(data)
}

async function updateReview(review: UpdateReviewDTO): Promise<void> {
  const reviewCollection = getReviewCollection(review?.lectureId as string)
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  const data = {
    ...review,
    createAt: timeStamp,
    updateAt: timeStamp,
  }
  return await reviewCollection.doc(data.reviewId).update(data)
}

async function daleteReview(reviewId: string, lectureId: string) {
  const reviewCollection = getReviewCollection(lectureId)
  return await reviewCollection.doc(reviewId).delete()
}

export { createReview, updateReview, daleteReview }
