import { Button, Image, InputNumber } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import DoubleRightOutlined from '@ant-design/icons/lib/icons/DoubleRightOutlined'
export type ImageType = { id: number; url: string }

export interface ImageCarouselProps {
  images?: ImageType[]
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images = [] }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState<ImageType>()
  const carouselItemsRef = useRef<HTMLDivElement[] | null[]>([])
  const [value, setValue] = useState<number>(1)

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

  useEffect(() => {
    const newIdx = value - 1
    console.log(newIdx)

    if (newIdx >= 0 && newIdx < images.length) {
      handleSelectedImageChange(newIdx)
    }
  }, [value])

  return (
    <div className="carousel-container flex border mb-10 space-x-3">
      <div className="w-1/4 flex flex-col shadow-1 p-2">
        <Button block onClick={handleLeftClick}>
          <DoubleRightOutlined rotate={-90} />
        </Button>
        <div className="flex-grow overflow-y-auto h-full">
          {images &&
            images.map((image, idx) => (
              <div key={image.id} className="py-2">
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
        <Button block onClick={handleRightClick}>
          <DoubleRightOutlined rotate={90} />
        </Button>
      </div>
      <div className="w-3/4 flex justify-center items-center shadow-1 relative ">
        <div className="absolute z-40 bottom-4 right-4 ">
          <InputNumber
            value={value}
            min={0}
            max={images.length + 1}
            onChange={value => {
              if (value !== images.length + 1 && value !== 0) setValue(value)
            }}
            className="w-40"
            step={-1}
            addonBefore="หน้า"
            addonAfter={`จาก ${images.length}`}
          />
        </div>
        <Image
          className="selected-image bg-white h-full p-1"
          src={selectedImage?.url}
          style={{ height: 700 }}
        />
      </div>
    </div>
  )
}
