import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { FollowCard } from '../../components/FollowCard'
import ScrollToTop from '../../components/ScrollToTop'
import { getUserDetial } from '../../service/user'

export const FollowList: React.FC = () => {
  const { userId, type } = useParams<{ userId: string; type: string }>()
  const [list, setList] = useState<string[]>([])
  const [text, settext] = useState<React.ReactNode>('')

  useEffect(() => {
    getUserDetial(userId).then(data => {
      if (type == 'following') {
        setList(data.following)
        settext(
          <p className="text-center text-2xl ">
            <span className="font-semibold">{data.userName}</span> กำลังติดตาม
          </p>,
        )
      } else if (type == 'followers') {
        setList(data.followers)
        settext(
          <p className="text-center text-2xl ">
            ผู้ที่กำลังติดตาม
            <span className="font-semibold">{data.userName}</span>
          </p>,
        )
      }
    })
  }, [userId])

  return (
    <div className="mt-10">
      <ScrollToTop />
      {text}{' '}
      <div className="flex justify-center flex-wrap ">
        {list.map(userId => (
          <FollowCard userId={userId} key={userId} className="m-4" />
        ))}
      </div>
    </div>
  )
}
