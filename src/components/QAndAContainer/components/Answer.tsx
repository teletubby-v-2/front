import React from 'react'
import { Comment, Avatar } from 'antd'
import { AnswersDTO } from '../../../constants/dto/lecture.dto'

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
            <a className="font-bold mr-3" href={`/profile/${answer.userId}`}>
              {answer.username}
            </a>
          </>
        }
        avatar={
          <a href={`/profile/${answer.userId}`}>
            <Avatar src={answer.photoURL} alt={answer.userId} size="large" />
          </a>
        }
        content={answer.message}
      />
    </div>
  )
}
