import { Badge, CardProps, Typography } from 'antd'
import React, { useState } from 'react'
import { SubjectDTO } from '../../constants/dto/subjects.dto'
import { Lecture } from '../../constants/interface/lecture.interface'
import kuSubject from '../../constants/subjects.json'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'
import Iframe from 'react-iframe'

export interface LectureCardProps extends CardProps {
  data?: Lecture
  className?: string
}

export const LectureCard: React.FC<LectureCardProps> = props => {
  const { data, className } = props
  const [subject] = useState<Record<string, SubjectDTO>>(kuSubject.subjects)

  return (
    <Link
      className={`cursor-pointer  ${className} ant-card-grid-hoverable border-2 border-gray-50 rounded-md`}
      to={`/lectureDetail/${data?.lectureId}`}
    >
      <Badge.Ribbon text={`${data?.viewCount} views`} placement="start" className="mt-1">
        <div className={`w-40 h-52 relative flex flex-col justify-end rounded-md overflow-hidden `}>
          {data?.isPdf ? (
            <Iframe
              url={data?.pdfUrl?.[0] || ''}
              scrolling="no"
              frameBorder={0}
              className=" w-40 h-52 absolute rounded-lg"
            >
              Browser not compatible
              <a href={data?.pdfUrl?.[0]}>follow this link instead</a>
            </Iframe>
          ) : (
            <LazyLoadImage
              src={data?.imageUrl?.[0]}
              effect="opacity"
              alt="no photo"
              className=" w-full h-52 absolute object-contain rounded-md"
              style={{
                border: '0.5px solid #e7e7e7',
              }}
            />
          )}
          <div className="flex flex-col items-end justify-end w-full h-full opacity-95 text-gray-800">
            {data?.tags.map((tag, index) => (
              <div key={index}>
                <span className="bg-white mb-1 mr-1 px-1 rounded-sm opacity-75 text-xs z-40">
                  {tag}
                </span>
              </div>
            ))}
          </div>
          <div className=" bg-black opacity-75 text-white p-1 text-xs flex flex-col justify-center">
            <div>{data?.lectureTitle}</div>
            <Typography.Text ellipsis className="text-white">
              วิชา {subject?.[data?.subjectId as string]?.subjectNameTh || ''}
            </Typography.Text>
          </div>
        </div>
      </Badge.Ribbon>
    </Link>
  )
}
