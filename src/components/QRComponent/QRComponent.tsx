import React from 'react'
import { Button, Divider } from 'antd'
import { MyUser } from '../../constants/interface/myUser.interface'
import no_image from '../../assets/images/no_image.jpg'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export interface ProfileComponentProps {
  onEdit?: () => void
  isMy: boolean
  Info: MyUser
}

export const QRComponent: React.FC<ProfileComponentProps> = ({ onEdit, isMy, Info }) => {
  return (
    <>
      <Divider>
        <div className="text-xl">ช่องทางสนับสนุน</div>
      </Divider>
      <div className="flex flex-col items-center w-full">
        {Info.donateImage ? (
          <LazyLoadImage
            src={Info.donateImage}
            alt="QR"
            className="my-3 w-52 h-52 object-contain"
            effect="blur"
          />
        ) : (
          <LazyLoadImage src={no_image} alt="noimage" className="w-52 h-52  my-3" effect="blur" />
        )}
        {Info.donateDescription || Info.donateImage ? (
          <p className="text-center">{Info.donateDescription || ''}</p>
        ) : (
          <p className="text-center">เจ้าของสรุปยังไม่ได้ใส่ช่องทางในการสนับสนุน </p>
        )}
      </div>
      {isMy && (
        <div className="text-center">
          <Button className="w-1/2 mx-auto mt-5" onClick={onEdit}>
            แก้ไข
          </Button>
        </div>
      )}
    </>
  )
}
