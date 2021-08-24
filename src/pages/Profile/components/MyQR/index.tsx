import React, { useState } from 'react'
import { EditQRComponent } from './EditQRComponent'
import { QRComponent } from './QRComponent'

export const MyQR: React.FC = () => {
  const [isEdit, setEdit] = useState(false)

  return (
    <div className="bg-white shadow-md">
      {isEdit ? (
        <EditQRComponent onClose={() => setEdit(false)} />
      ) : (
        <QRComponent onEdit={() => setEdit(true)} />
      )}
    </div>
  )
}
