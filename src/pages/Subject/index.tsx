import React from 'react'
import { AddSubject, UserStep } from '../../components'

export const Subject: React.FC = () => {
  return (
    <>
      <div className="flex justify-center space-x-2 my-10">
        <UserStep current={3} />
        <AddSubject />
      </div>
    </>
  )
}
