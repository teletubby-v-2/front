import { Skeleton } from 'antd'
import React from 'react'

export interface FollowCardSkeletonProps {
  loading: boolean
}

export const FollowCardSkeleton: React.FC<FollowCardSkeletonProps> = ({ loading, children }) => {
  return (
    <>
      {loading ? (
        <>
          <div className="flex flex-col justify-end w-full h-full space-y-2">
            <div className="mx-5">
              <Skeleton title={false} paragraph={{ rows: 2 }} className="h-14" loading active />
            </div>
            <div className="flex justify-center">
              <Skeleton.Avatar size={100} active />
            </div>
            <div className="h-10" />
          </div>
          <div className="absolute bottom-0 w-full p-5 right-0">
            <Skeleton.Button block active />
          </div>
        </>
      ) : (
        <>{children}</>
      )}
    </>
  )
}
