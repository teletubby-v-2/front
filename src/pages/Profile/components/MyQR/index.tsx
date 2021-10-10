import React, { useState } from 'react'
import { EditQRComponent } from '../../../../components/QRComponent/EditQRComponent'
import { QRComponent } from '../../../../components/QRComponent/QRComponent'
import { userInfoStore } from '../../../../store/user.store'

export const MyQR: React.FC = () => {
  const [isEdit, setEdit] = useState(false)
  const { userInfo } = userInfoStore()

  if (isEdit) return <EditQRComponent onClose={() => setEdit(false)} />
  return <QRComponent isMy={true} onEdit={() => setEdit(true)} Info={userInfo} />
}
