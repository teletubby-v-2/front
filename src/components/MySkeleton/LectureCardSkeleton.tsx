import { Skeleton } from 'antd'
import React from 'react'

export interface LectureCardSkeletonProps {
  count: number
}

export const LectureCardSkeleton: React.FC<LectureCardSkeletonProps> = ({ count }) => {
  if (count < 0) return null
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <Skeleton.Avatar
            active
            size={160}
            shape="square"
            className="mx-auto"
            key={index}
            style={{ height: '208px', borderRadius: 4 }}
          />
        ))}
    </>
  )
}
