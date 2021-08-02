import React, { useState } from 'react'
import styled from 'styled-components'
import { EditComponent } from './EditComponent'
import { ProfileComponent } from './ProfileComponent'

export function MyProfile() {
  const [isEdit, setEdit] = useState(false)

  return (
    <div className="w-1/5 h-screen bg-white mx-2 shadow-md">
      {isEdit ? (
        <EditComponent onfin={() => setEdit(false)} />
      ) : (
        <ProfileComponent onEdit={() => setEdit(true)} />
      )}
    </div>
  )
}
