import { Card, CardProps, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Lecture } from '../../constants/interface/lecture.interface'
import { LectureCard } from '../LectureCard'

export interface LectureContainerProps extends CardProps {
  limit?: number
  viewAll?: boolean
  data?: Lecture[]
}

const MyCard = styled(Card)`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

export const LectureContainer: React.FC<LectureContainerProps> = props => {
  const { limit, data, viewAll, className, ...restCradProps } = props

  const [loading, setLoading] = useState(true)
  const [size, setSize] = useState((limit || 8) > (data?.length || 0) ? limit || 8 : data?.length)

  useEffect(() => {
    if (data) {
      setLoading(false)
    }
  }, [data])

  useEffect(() => {
    if (viewAll) {
      setSize(data?.length)
    } else {
      setSize((limit || 8) < (data?.length || 0) ? limit || 8 : data?.length)
    }
  }, [viewAll])

  return (
    <MyCard {...restCradProps}>
      <Skeleton loading={loading} paragraph active>
        <div className="flex flex-wrap ">
          {data?.slice(0, size).map(lecture => (
            <LectureCard data={lecture} key={lecture.lectureId} className="w-36 mx-2 my-3 h-44" />
          ))}
        </div>
      </Skeleton>
    </MyCard>
  )
}
