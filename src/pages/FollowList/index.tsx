import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { FollowCard } from '../../components/FollowCard'
import { firestore } from '../../config/firebase'
import { Collection } from '../../constants'
import { MyUser } from '../../constants/interface/myUser.interface'
import { userInfoStore } from '../../store/user.store'
import { fetchUser } from '../../utils/fetchUser'

export const FollowList: React.FC = () => {
  const { userId } = useParams<{ userId: string }>()
  const [info, setInfo] = useState({} as MyUser)
  const minRow = 3
  //todo:GetuserData
  useEffect(() => {
    firestore
      .collection(Collection.Users)
      .doc(userId)
      .get()
      .then(doc => {
        if (doc.exists) {
          setInfo({ ...doc.data(), userId: doc.id } as MyUser)
        }
      })
  }, [userId])

  return (
    <div className="mt-10">
      <div className="text-center text-2xl mb-10">{info.userName} กำลังติดตาม</div>
      <div className={`grid gap-y-10 md:grid-cols-4 row-${minRow}-card `}>
        {info.following?.map(userId => (
          <FollowCard userId={userId} key={userId} className="mx-auto border-2 border-gray-500" />
        ))}
      </div>
    </div>
  )
}
