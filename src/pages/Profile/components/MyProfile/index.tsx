import React, { useState } from 'react'
import { EditComponent } from './EditComponent'
import { ProfileComponent } from './ProfileComponent'

export const MyProfile: React.FC = () => {
  const [isEdit, setEdit] = useState(false)

  return (
    <div className="bg-white shadow-md">
      {isEdit ? (
        <EditComponent onClose={() => setEdit(false)} />
      ) : (
        <ProfileComponent onEdit={() => setEdit(true)} />
      )}
    </div>
  )
}
