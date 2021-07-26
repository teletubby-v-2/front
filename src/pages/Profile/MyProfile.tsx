import React, { useState } from 'react'
import EditComponent from './EditComponent'
import ProfileComponent from './ProfileComponent'

export default function MyProfile() {
  const [isEdit, setEdit] = useState(false)

  return (
    <div>
      {isEdit ? (
        <EditComponent onfin={() => setEdit(false)} />
      ) : (
        <ProfileComponent onEdit={() => setEdit(true)} />
      )}
    </div>
  )
}
