import { Button, Card, Input, message, Select } from 'antd'
import React, { useState } from 'react'
import { DiffTwoTone } from '@ant-design/icons'
import kuSubject from '../../constants/subjects.json'

export const AddSubject: React.FC = () => {
  const [subjects, setSubjects] = useState<string[]>([])
  const [currentSubject, setCurrentSubject] = useState<string>()
  const handleSelect = (value: string) => {
    setCurrentSubject(value)
  }
  const addSubject = () => {
    if (currentSubject && subjects.findIndex(subject => subject === currentSubject) === -1) {
      setSubjects(subject => [...subject, currentSubject])
      setCurrentSubject(undefined)
      message.success('เพิ่มวิชาสำเร็จ')
    } else {
      message.warning('กรุณาอย่าเพิ่มวิชาซ้ำ')
    }
  }
  const deleteSubject = (target: string) => {
    setSubjects(subjects => subjects.filter(subject => subject !== target))
    message.success('ลบวิชาสำเร็จ')
  }
  return (
    <div>
      <Card
        style={{ width: 700 }}
        title={
          <p>
            <DiffTwoTone twoToneColor="black" className="align-text-top" /> วิชาของฉัน
          </p>
        }
        extra={
          <div className="space-x-3">
            <a href="#">เลือกเป็นปัจจุบัน</a>
            <Button>ปี1 เทอม1</Button>
          </div>
        }
      >
        <div className="space-y-5">
          {subjects.map((subject, index) => (
            <div key={index} className="flex space-x-2">
              <Input className="flex-grow" disabled value={subject} />
              <Button onClick={() => deleteSubject(subject)}>ลบ</Button>
            </div>
          ))}
          <div className="flex space-x-2">
            <Select
              allowClear
              showSearch
              className="flex-grow block"
              placeholder="โปรดเลือกวิชา"
              style={{ maxWidth: 585 }}
              onChange={handleSelect}
              value={currentSubject}
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
            <Button
              type="primary"
              onClick={addSubject}
              disabled={!currentSubject || !currentSubject.length}
            >
              เพิ่ม
            </Button>
          </div>
          <div className="text-right space-x-3">
            <Button>ยกเลิก</Button>
            <Button type="primary">บันทึก</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
