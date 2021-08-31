import { Badge, Card, CardProps, Typography } from 'antd'
import React, { useState } from 'react'
import { SubjectDTO } from '../../constants/dto/subjects.dto'
import { Lecture } from '../../constants/interface/lecture.interface'
import kuSubject from '../../constants/subjects.json'
export interface LectureCardProps extends CardProps {
  data?: Lecture
  className?: string
}

const { Meta } = Card

export const LectureCard: React.FC<LectureCardProps> = props => {
  const { data, className } = props

  const [subject] = useState<Record<string, SubjectDTO>>(kuSubject.subjects)

  return (
    <Badge.Ribbon text={`${data?.viewCount} views`} placement="start" className="mt-1">
      <div
        className={`border-2 w-40 h-52 bg-cover flex flex-col justify-end ${className}`}
        style={{ backgroundImage: `url(${data?.imageUrl[0]})` }}
      >
        <div className=" bg-black h-9 opacity-75 text-white px-1 text-xs flex flex-col justify-center">
          <p>{data?.lectureTitle}</p>
          <Typography.Text ellipsis className="text-white">
            วิชา{' '}
            {subject[data?.subjectId as string] && subject[data?.subjectId as string].subjectNameEn}
          </Typography.Text>
        </div>
      </div>

      {/* <Card
        //TODO: รอ design ทำ card-lecture ให้ final ก่อน
        bordered
        hoverable
        cover={<img alt="example" src={data?.imageUrl ? data.imageUrl[0] : ''} />}
        className={` border-4 border-red-500 ${className}`}
        {...restCrardProps}
      >
        <Meta title={data?.lectureTitle} description={data?.subjectId} />
      </Card> */}
    </Badge.Ribbon>
  )
}
