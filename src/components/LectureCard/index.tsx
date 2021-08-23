import { Card, CardProps } from 'antd'
import React from 'react'
import { Lecture } from '../../constants/interface/lecture.interface'

export interface LectureCardProps extends CardProps {
  data?: Lecture
  className?: string
}

const { Meta } = Card

export const LectureCard: React.FC<LectureCardProps> = props => {
  const { data, className, ...restCrardProps } = props

  return (
    <Card
      hoverable
      //TODO: รอ design ทำ card-lecture ให้ final ก่อน
      // cover={<img alt="example" src={data?.imagesUrl? data.imagesUrl[0]:''}/>}
      className={className}
      {...restCrardProps}
    >
      <Meta title={data?.lectureTitle} description={data?.subjectId} />
    </Card>
  )
}
