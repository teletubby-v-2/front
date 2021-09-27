import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { FollowCard } from '../../components/FollowCard'
import { getUserDetial } from '../../service/user'

export const FollowList = () => {
  const { userId, type } = useParams<{ userId: string; type: string }>()
  const [list, setList] = useState<string[]>([])
  const [text, settext] = useState<string>('')
  const minRow = 3

  //todo:GetuserData

  useEffect(() => {
    getUserDetial(userId).then(data => {
      if (type == 'following') {
        setList(data.following)
        settext(data.userName + ' กำลังติดตาม')
      } else if (type == 'followers') {
        setList(data.followers)
        settext(' ผู้ที่กำลังติดตาม ' + data.userName)
      }
    })
  }, [userId])

  return (
    <div className="mt-10">
      <div className="text-center text-2xl mb-10">{text}</div>
      <div className={`grid gap-y-10 md:grid-cols-4 row-${minRow}-card `}>
        {list.map(userId => (
          <FollowCard userId={userId} key={userId} className="mx-auto border-2 border-gray-500" />
        ))}
      </div>
    </div>
  )
}
