import React, { useEffect, useRef, useState } from 'react'
import { Rate, Checkbox, Button, Popover } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { IsBadge } from '../IsBadge'

export interface IFilter {
  isMid: boolean
  isFinal: boolean
  rating: number
}
export interface FilterBoxProps {
  initialData?: IFilter
  callback?: (filterOptions: IFilter) => void
}
const options = [
  { label: 'มิดเทอม', value: 'isMid' },
  { label: 'ไฟนอล', value: 'isFinal' },
]

export const FilterBox: React.FC<FilterBoxProps> = ({ initialData, callback }) => {
  const [term, setTerm] = useState<string[]>([])
  const [rating, setRating] = useState(0)
  const [isFilter, setIsFilter] = useState(!!Object.keys(initialData || {}).length)

  useEffect(() => {
    if (initialData?.isMid && initialData?.isFinal) {
      setTerm(['isMid', 'isFinal'])
    } else if (initialData?.isMid) {
      setTerm(['isMid'])
    } else if (initialData?.isFinal) {
      setTerm(['isFinal'])
    }
    setRating(initialData?.rating || 0)
  }, [initialData])

  const onClear = () => {
    setTerm([])
    setRating(0)
  }
  const onSubmit = () => {
    const data = {
      isMid: term.some(t => t === 'isMid'),
      isFinal: term.some(t => t === 'isFinal'),
      rating,
    }

    setIsFilter(!!(term.length || rating))
    callback && callback(data)
    ref.current?.click()
  }
  const filterBox = (
    <div className=" w-68 ">
      <div className="font-medium text-2xl text-center">ฟิลเตอร์</div>
      <div className="mt-2  grid grid-cols-4 gap-y-4 gap-x-1 items-center">
        ช่วงที่สอบ :
        <Checkbox.Group
          value={term}
          onChange={value => setTerm(value as string[])}
          options={options}
          className="col-span-3"
        />
        ดาวขั้นต่ำ :
        <Rate
          allowHalf
          value={rating}
          onChange={value => setRating(value)}
          className=" col-span-3"
        />
        <div className="col-span-3"></div>
      </div>
      <div className="text-right space-x-3">
        <Button type="default" onClick={onClear}>
          ล้าง
        </Button>
        <Button type="primary" onClick={onSubmit}>
          ค้นหา
        </Button>
      </div>
    </div>
  )
  const ref = useRef<HTMLSpanElement>(null)
  return (
    <>
      <Popover
        content={filterBox}
        trigger="click "
        placement="bottom"
        arrowContent
        destroyTooltipOnHide
      >
        <span ref={ref} className="cursor-pointer">
          <IsBadge badge={isFilter}>
            ฟิลเตอร์ <DownOutlined className="text-xs" />{' '}
          </IsBadge>
        </span>
      </Popover>
    </>
  )
}
