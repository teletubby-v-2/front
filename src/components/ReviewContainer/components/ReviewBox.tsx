import React from 'react'
import { Comment, Avatar, Rate } from 'antd'
import { Review } from '../../../constants/interface/lecture.interface'
import StarFilled from '@ant-design/icons/lib/icons/StarFilled'
import { Link } from 'react-router-dom'

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
            <Link className="font-bold mr-3" to={`/profile/${review.userId}`}>
              {review.username}
            </Link>
            <Rate disabled value={review.rating} allowHalf />
          </>
        }
        avatar={
          <Link to={`/profile/${review.userId}`}>
            <Avatar src={review.photoURL} alt={review.userId} />
          </Link>
        }
        content={review.message}
      />
    </div>
  )
}
