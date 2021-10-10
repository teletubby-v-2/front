import { Divider, Skeleton } from 'antd'
import React from 'react'

export interface ProfileSkeletonProps {
  loading: boolean
}

export const ProfileSkeleton: React.FC<ProfileSkeletonProps> = ({ loading, children }) => {
  return (
    <>
      {loading ? (
        <>
          <div className="flex flex-col justify-end w-full h-full space-y-4">
            <div className="mx-5">
              <Skeleton.Button block active />
            </div>
            <div className="flex justify-center">
              <Skeleton.Avatar size={200} active />
            </div>
            <Skeleton.Button block active />
          </div>
          <Divider>
            <p className="text-gray-400 mb-0">ลิงก์โซเชียล</p>
          </Divider>
          <div>
            <Skeleton title={false} paragraph={{ rows: 3 }} className="h-10" loading active />
          </div>
        </>
      ) : (
        <>{children}</>
      )}
    </>
  )
}
