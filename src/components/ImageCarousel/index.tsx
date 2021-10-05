import { Button, Image } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import CaretUpOutlined from '@ant-design/icons/lib/icons/CaretUpOutlined'
import DoubleRightOutlined from '@ant-design/icons/lib/icons/DoubleRightOutlined'
export type ImageType = { id: number; url: string }

export interface ImageCarouselProps {
  images?: ImageType[]
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images = [] }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState<ImageType>()
  const carouselItemsRef = useRef<HTMLDivElement[] | null[]>([])

  useEffect(() => {
    if (images && images[0]) {
      carouselItemsRef.current = carouselItemsRef.current.slice(0, images.length)

      setSelectedImageIndex(0)
      setSelectedImage(images[0])
    }
  }, [images])

  const handleSelectedImageChange = (newIdx: number) => {
    if (images && images.length > 0) {
      setSelectedImage(images[newIdx])
      setSelectedImageIndex(newIdx)
      if (carouselItemsRef?.current[newIdx]) {
        carouselItemsRef?.current[newIdx]?.scrollIntoView({
          inline: 'center',
          behavior: 'smooth',
          block: 'nearest',
        })
      }
    }
  }

  const handleRightClick = () => {
    if (images && images.length > 0) {
      let newIdx = selectedImageIndex + 1
      if (newIdx >= images.length) {
        newIdx = 0
      }
      handleSelectedImageChange(newIdx)
    }
  }

  const handleLeftClick = () => {
    if (images && images.length > 0) {
      let newIdx = selectedImageIndex - 1
      if (newIdx < 0) {
        newIdx = images.length - 1
      }
      handleSelectedImageChange(newIdx)
    }
  }

  return (
    <div className="carousel-container flex border mb-10 space-x-3">
      <div className="relative w-1/4 border shadow-1">
        <div className="absolute top-2  w-full px-2 ">
          <Button block onClick={handleLeftClick}>
            <DoubleRightOutlined rotate={-90} />
          </Button>
        </div>
        <div className="carousel__images mt-10 h-full  ">
          {images &&
            images.map((image, idx) => (
              <div key={image.id} className="p-2">
                <div
                  onClick={() => handleSelectedImageChange(idx)}
                  style={{ backgroundImage: `url(${image.url})` }}
                  className={`carousel__image ${
                    selectedImageIndex === idx && 'carousel__image-selected'
                  }`}
                  key={image.id}
                  ref={el => (carouselItemsRef.current[idx] = el)}
                />
              </div>
            ))}
        </div>

        <div className="absolute bottom-1 px-2 w-full">
          <Button block onClick={handleRightClick}>
            <DoubleRightOutlined rotate={90} />
          </Button>
        </div>
      </div>
      <div className="w-3/4 flex justify-center items-center shadow-1 ">
        <Image
          className="selected-image bg-white h-full p-1"
          src={selectedImage?.url}
          style={{ height: 690 }}
        />
      </div>
    </div>
  )
}
