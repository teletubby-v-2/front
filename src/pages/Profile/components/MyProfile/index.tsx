import React, { useState } from 'react'
import { EditComponent } from '../../../../components/ProfileComponent/EditComponent'
import { ProfileComponent } from '../../../../components/ProfileComponent/ProfileComponent'
import { userInfoStore } from '../../../../store/user.store'

export const MyProfile: React.FC = () => {
  const [isEdit, setEdit] = useState(false)
  const { userInfo } = userInfoStore()

  return (
    <>
      {isEdit ? (
        <EditComponent onClose={() => setEdit(false)} />
      ) : (
        <ProfileComponent isMy={true} onEdit={() => setEdit(true)} info={userInfo} />
      )}
    </>
  )
}
