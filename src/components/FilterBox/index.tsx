import React, { useRef, useState } from 'react'
import { Select, Rate, Checkbox, Button, Popover } from 'antd'
import kuSubject from '../../constants/subjects.json'
import { DownOutlined } from '@ant-design/icons'
export interface FilterBoxProps {
  isSubject?: boolean
}

export const FilterBox: React.FC<FilterBoxProps> = ({ isSubject = false }) => {
  const options = [
    { label: 'มิดเทอม', value: 'midterm' },
    { label: 'ไฟนอล', value: 'final' },
  ]
  const [subject, setSubject] = useState('')
  const [term, setTerm] = useState<string[]>([])
  const [rating, setRating] = useState(0)
  const onClear = () => {
    setSubject('')
    setTerm([])
    setRating(0)
  }
  const onSubmit = () => {
    ref.current?.click()
  }
  const filterBox = (
    <div className=" w-80">
      <div className="font-bold text-2xl text-center">ฟิลเตอร์</div>
      <div className="mt-2  grid grid-cols-5 gap-y-3 ">
        {isSubject && (
          <>
            <div>ชื่อวิชา:</div>
            <Select
              value={subject}
              onChange={value => setSubject(value)}
              showSearch
              placeholder="Please Select"
              optionFilterProp="children"
              className="block col-span-4"
            >
              {Object.entries(kuSubject.subjects).map(([key, subject]) => (
                <Select.Option
                  key={key}
                  value={`${key} ${subject.subjectNameTh}${subject.subjectNameEn}`}
                >
                  {key} {subject.subjectNameTh} {subject.subjectNameEn}
                </Select.Option>
              ))}
            </Select>
          </>
        )}
        เทอม:
        <Checkbox.Group
          value={term}
          onChange={value => setTerm(value as string[])}
          options={options}
          className="col-span-4"
        />
        Rating:
        <Rate
          allowHalf
          value={rating}
          onChange={value => setRating(value)}
          className=" col-span-4"
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
  const ref = useRef<HTMLAnchorElement>(null)
  return (
    <>
      <Popover
        content={filterBox}
        trigger="click "
        placement="bottom"
        arrowContent
        destroyTooltipOnHide
      >
        <a ref={ref}>
          ฟิลเตอร์ <DownOutlined className="align-middle text-xs" />{' '}
        </a>
      </Popover>
    </>
  )
}
