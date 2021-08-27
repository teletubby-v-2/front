import React, { useState } from 'react'
import { EditQRComponent } from '../../../../components/QRComponent/EditQRComponent'
import { QRComponent } from '../../../../components/QRComponent/QRComponent'

export const MyQR: React.FC = () => {
  const [isEdit, setEdit] = useState(false)

  return (
    <div className="bg-white shadow-md">
      {isEdit ? (
        <EditQRComponent onClose={() => setEdit(false)} />
      ) : (
        <QRComponent isMy={true} onEdit={() => setEdit(true)} />
      )}
    </div>
  )
}
