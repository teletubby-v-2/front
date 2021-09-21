import { Collection } from './../../constants/index'
import firebase from 'firebase'
import { firebaseApp, firestore } from '../../config/firebase'
import { CreateReviewDTO, UpdateReviewDTO } from '../../constants/dto/lecture.dto'
import { Review } from '../../constants/interface/lecture.interface'

const lectureCollection = firestore.collection(Collection.Lectures)

function getReviewCollection(
  lectureId: string,
): firebase.firestore.CollectionReference<firebase.firestore.DocumentData> {
  return lectureCollection.doc(lectureId).collection(Collection.Reviews)
}

async function createReview(review: CreateReviewDTO): Promise<Review> {
  firebaseApp.auth().currentUser?.reload()
  const batch = firestore.batch()
  const reviewCollection = getReviewCollection(review.lectureId)
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  const lectureRef = lectureCollection.doc(review.lectureId)
  const lectureData = await lectureRef.get()
  batch.update(lectureRef, {
    reviewCount: lectureData.data()?.reviewCount + 1,
    sumRating: lectureData.data()?.sumRating + review.rating,
    ratingScore:
      lectureData.data()?.sumRating + review.rating / (lectureData.data()?.reviewCount + 1),
  })
  const data: CreateReviewDTO = {
    ...review,
    createAt: timeStamp,
    updateAt: timeStamp,
    userId: firebaseApp.auth().currentUser?.uid as string,
  }
  const reviewId = reviewCollection.doc().id
  batch.set(reviewCollection.doc(reviewId), data)
  batch.commit()

  return { ...data, reviewId } as Review
}

async function updateReview(review: UpdateReviewDTO): Promise<void> {
  firebaseApp.auth().currentUser?.reload()
  const batch = firestore.batch()
  const reviewCollection = getReviewCollection(review?.lectureId as string)
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
  const lectureRef = lectureCollection.doc(review.lectureId)
  const originReview = await getReviewCollection(review.lectureId).doc(review.reviewId).get()
  const lectureData = await lectureRef.get()
  if (review.rating && lectureData.exists)
    batch.update(lectureRef, {
      sumRating: lectureData.data()?.sumRating + review.rating - originReview.data()?.rating,
    })
  const id = review.reviewId
  delete review['reviewId']
  const data = {
    ...review,
    updateAt: timeStamp,
  }
  batch.update(reviewCollection.doc(id), data)
  return batch.commit()
}

async function deleteReview(review: CreateReviewDTO) {
  firebaseApp.auth().currentUser?.reload()
  const batch = firestore.batch()
  const lectureRef = lectureCollection.doc(review.lectureId)
  const lectureData = await lectureRef.get()
  batch.update(lectureRef, {
    reviewCount: lectureData.data()?.reviewCount - 1,
    sumRating: lectureData.data()?.sumRating - review.rating,
  })
  const reviewCollection = getReviewCollection(review.lectureId)
  batch.delete(reviewCollection.doc(review.reviewId))
  return batch.commit()
}

export { createReview, updateReview, deleteReview }
