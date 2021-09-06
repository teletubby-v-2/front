import React from 'react'
import { Comment, Avatar, Rate } from 'antd'
import { Review } from '../../../constants/interface/lecture.interface'

export interface ReviewBoxProps {
  review: Review
}
export interface CommentForm {
  message: string
}

export const ReviewBox: React.FC<ReviewBoxProps> = ({ review }) => {
  return (
    <div>
      {' '}
      <Comment
        author={
          <>
            <a className="font-bold mr-3" href={`/profile/${review.userId}`}>
              {review.username}
            </a>
            <Rate disabled value={review.rating} allowHalf />
          </>
        }
        avatar={
          <a href={`/profile/${review.userId}`}>
            <Avatar src={review.photoURL} alt={review.userId} size="large" />
          </a>
        }
        content={review.message}
      />
    </div>
  )
}
