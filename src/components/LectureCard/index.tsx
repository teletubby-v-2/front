import { Badge, CardProps, Typography } from 'antd'
import React, { useState } from 'react'
import { SubjectDTO } from '../../constants/dto/subjects.dto'
import { Lecture } from '../../constants/interface/lecture.interface'
import kuSubject from '../../constants/subjects.json'
import { useHistory } from 'react-router'
export interface LectureCardProps extends CardProps {
  data?: Lecture
  className?: string
}

export const LectureCard: React.FC<LectureCardProps> = props => {
  const { data, className } = props
  const [subject] = useState<Record<string, SubjectDTO>>(kuSubject.subjects)
  const history = useHistory()

  return (
    <div
      className={`cursor-pointer  ${className} ant-card-grid-hoverable border-2 border-gray-500`}
      onClick={() => history.push(`post/${data?.lectureId}`)}
    >
      <Badge.Ribbon text={`${data?.viewCount} views`} placement="start" className="mt-1">
        <div className={`border-2 w-40 h-52 relative bg-contain flex flex-col justify-end `}>
          <img
            src={data?.imageUrl?.[0]}
            alt="no photo"
            className=" w-40 h-52 absolute object-contain "
            style={{
              border: '0.5px solid #e7e7e7',
            }}
          />
          <div className="flex flex-col items-end justify-end w-full h-full">
            {data?.tags.map((tag, index) => (
              <div key={index}>
                <span className="bg-white mb-1 mr-1 px-1 rounded-sm opacity-75 text-xs z-20">
                  {tag}
                </span>
              </div>
            ))}
          </div>
          <div className=" bg-black h-9 opacity-75 text-white p-1 text-xs flex flex-col justify-center">
            <p>{data?.lectureTitle}</p>
            <Typography.Text ellipsis className="text-white">
              วิชา{' '}
              {subject[data?.subjectId as string] &&
                subject[data?.subjectId as string].subjectNameEn}
            </Typography.Text>
          </div>
        </div>
      </Badge.Ribbon>
    </div>
  )
}
