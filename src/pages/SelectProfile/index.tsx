import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Profile } from '..'
import { OtherProfile } from '..'
import ScrollToTop from '../../components/ScrollToTop'
import { userInfoStore } from '../../store/user.store'

export const SelectProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>()
  const { userInfo } = userInfoStore()
  const [isMy, setisMy] = useState(false)
  useEffect(() => {
    if (userId == userInfo.userId) {
      setisMy(true)
    }
  }, [userId, userInfo.userId])
  return (
    <>
      <ScrollToTop />
      {isMy ? <Profile /> : <OtherProfile />}
    </>
  )
}
