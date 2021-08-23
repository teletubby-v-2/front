import { Collection } from './../../constants/index'
import firebase from 'firebase'
import { firebaseApp, firestore } from '../../config/firebase'
import { CreateReviewDTO, UpdateReviewDTO } from '../../constants/dto/lecture.dto'

const lectureCollection = firestore.collection(Collection.Lectures)

function getReviewCollection(
  lectureId: string,
): firebase.firestore.CollectionReference<firebase.firestore.DocumentData> {
  return lectureCollection.doc(lectureId).collection(Collection.Reviews)
}

async function createReview(review: CreateReviewDTO): Promise<void> {
  const reviewCollection = getReviewCollection(review.lectureId)
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  const lectureRef = lectureCollection.doc(review.lectureId)
  const lectureData = await lectureRef.get()
  lectureRef.update({
    reviewCount: lectureData.data()?.reviewCount + 1,
    sumRating: lectureData.data()?.sumRating + review.rating,
  })
  const data: CreateReviewDTO = {
    ...review,
    createAt: timeStamp,
    updateAt: timeStamp,
    userId: firebaseApp.auth().currentUser?.uid as string,
  }
  return await reviewCollection.doc().set(data)
}

async function updateReview(review: UpdateReviewDTO): Promise<void> {
  const reviewCollection = getReviewCollection(review?.lectureId as string)
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  const lectureRef = lectureCollection.doc(review.lectureId)
  const originReview = await getReviewCollection(review.lectureId).doc(review.reviewId).get()
  const lectureData = await lectureRef.get()
  if (review.rating && lectureData.exists)
    lectureRef.update({
      sumRating: lectureData.data()?.sumRating + review.rating - originReview.data()?.rating,
    })
  const id = review.reviewId
  delete review['reviewId']
  const data = {
    ...review,
    updateAt: timeStamp,
  }
  return await reviewCollection.doc(id).update(data)
}

async function deleteReview(review: CreateReviewDTO) {
  const lectureRef = lectureCollection.doc(review.lectureId)
  const lectureData = await lectureRef.get()
  lectureRef.update({
    reviewCount: lectureData.data()?.reviewCount - 1,
    sumRating: lectureData.data()?.sumRating - review.rating,
  })
  const reviewCollection = getReviewCollection(review.lectureId)
  return await reviewCollection.doc(review.reviewId).delete()
}

export { createReview, updateReview, deleteReview }
