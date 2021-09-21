import React from 'react'
import { Comment, Avatar } from 'antd'
import { AnswersDTO } from '../../../constants/dto/lecture.dto'
import { Link } from 'react-router-dom'

export interface AnswerBoxProps {
  answer: AnswersDTO
}
export interface CommentForm {
  message: string
}

export const AnswerBox: React.FC<AnswerBoxProps> = ({ answer }) => {
  return (
    <div>
      {' '}
      <Comment
        author={
          <>
            <Link className="font-bold mr-3" to={`/profile/${answer.userId}`}>
              {answer.username}
            </Link>
          </>
        }
        avatar={
          <Link className="font-bold mr-3" to={`/profile/${answer.userId}`}>
            <Avatar src={answer.photoURL} alt={answer.userId} />
          </Link>
        }
        content={answer.message}
      />
    </div>
  )
}
