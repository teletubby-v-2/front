import { Skeleton } from 'antd'
import React from 'react'

export interface CommentSkeletonProps {
  count: number
}

export const CommentSkeleton: React.FC<CommentSkeletonProps> = ({ count }) => {
  if (count <= 0) {
    return null
  }

  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <Skeleton active paragraph={{ rows: 1 }} avatar key={index} />
        ))}
    </>
  )
}
