import { Skeleton } from 'antd'
import React from 'react'

export interface LectureSkeletonProps {
  loading: boolean
}

export const LectureSkeleton: React.FC<LectureSkeletonProps> = ({ loading, children }) => {
  return (
    <>
      {loading ? (
        <div className="space-y-10">
          <Skeleton avatar paragraph={{ rows: 1 }} active />
          <div>
            {Array(20)
              .fill(0)
              .map((_, index) => (
                <Skeleton.Button active size="large" block key={index} />
              ))}
          </div>
          <div>
            {Array(2)
              .fill(0)
              .map((_, index) => (
                <Skeleton.Button active size="large" block key={index} />
              ))}
          </div>
          <div>
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <Skeleton.Button active size="large" block key={index} />
              ))}
          </div>
        </div>
      ) : (
        children
      )}
    </>
  )
}
