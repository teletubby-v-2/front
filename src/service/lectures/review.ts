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
  const batch = firestore.batch()
  const sfRef = lectureCollection.doc(review.lectureId)
  const lectureData = await sfRef.get()
  batch.update(sfRef, { reviewCount: lectureData.data()?.reviewCount + 1 })
  batch.update(sfRef, { reviewCount: lectureData.data()?.sumRating + review.rating })
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

async function daleteReview(reviewId: string, lectureId: string, review: CreateReviewDTO) {
  const batch = firestore.batch()
  const sfRef = lectureCollection.doc(review.lectureId)
  const lectureData = await sfRef.get()
  batch.update(sfRef, { reviewCount: lectureData.data()?.reviewCount - 1 })
  batch.update(sfRef, { reviewCount: lectureData.data()?.sumRating - review.rating })
  const reviewCollection = getReviewCollection(lectureId)
  return await reviewCollection.doc(reviewId).delete()
}

export { createReview, updateReview, daleteReview }
