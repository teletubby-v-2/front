import { Skeleton } from 'antd'
import React from 'react'

export interface LectureSkeletonProps {
  loading: boolean
}

const skeletonStyle = (position?: 'start' | 'end') => {
  switch (position) {
    case 'start':
      return {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }
    case 'end':
      return {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      }
    default:
      return { borderRadius: 0 }
  }
}

export const LectureSkeleton: React.FC<LectureSkeletonProps> = ({ loading, children }) => {
  return (
    <>
      {loading ? (
        <div className="space-y-10">
          <Skeleton avatar paragraph={{ rows: 1 }} active />
          <div>
            <Skeleton.Button active size="large" block />
            {Array(18)
              .fill(0)
              .map((_, index) => (
                <Skeleton.Button
                  active
                  size="large"
                  block
                  key={index}
                  style={
                    index === 0
                      ? skeletonStyle('start')
                      : index === 17
                      ? skeletonStyle('end')
                      : skeletonStyle()
                  }
                />
              ))}
            <Skeleton.Button active size="large" block />
          </div>
          <div>
            {Array(2)
              .fill(0)
              .map((_, index) => (
                <Skeleton.Button
                  active
                  size="large"
                  block
                  key={index}
                  style={
                    index === 0
                      ? skeletonStyle('start')
                      : index === 2
                      ? skeletonStyle('end')
                      : skeletonStyle()
                  }
                />
              ))}
          </div>
          <div>
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <Skeleton.Button
                  active
                  size="large"
                  block
                  key={index}
                  style={
                    index === 0
                      ? skeletonStyle('start')
                      : index === 4
                      ? skeletonStyle('end')
                      : skeletonStyle()
                  }
                />
              ))}
          </div>
        </div>
      ) : (
        children
      )}
    </>
  )
}
