import { Button, Card, Divider, Empty, Input, message, Select, Popconfirm } from 'antd'
import React, { useState } from 'react'
import { DiffTwoTone, CheckOutlined } from '@ant-design/icons'
import kuSubject from '../../constants/subjects.json'
import { UserSubjectDTO } from '../../constants/dto/myUser.dto'
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined'
import { SubjectDTO } from '../../constants/dto/subjects.dto'
import { useHistory } from 'react-router'
import { updateUserSubject } from '../../service/user'

export const AddSubject: React.FC = () => {
  const [title, setTitle] = useState<string>()
  const [allTitle, setAllTitle] = useState<UserSubjectDTO[]>([
    {
      title: 'ตารางเริ่มต้น',
      subjectId: [],
      isActive: false,
    },
  ])
  const history = useHistory()
  const [selectTable, setSelectTable] = useState<UserSubjectDTO>(allTitle[0])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentSubject, setCurrentSubject] = useState<string>()
  const [allSubject] = useState<Record<string, SubjectDTO>>(
    kuSubject.subjects as unknown as Record<string, SubjectDTO>,
  )

  const handleSelect = (value: string) => {
    setCurrentSubject(value)
  }
  const addSubject = () => {
    const id = currentSubject?.split(' ')[0]

    if (
      currentSubject &&
      id &&
      selectTable?.subjectId.findIndex(subject => subject === id) === -1
    ) {
      setSelectTable(selectTable => {
        return {
          ...selectTable,
          subjectId: [id, ...selectTable.subjectId],
        }
      })
      setCurrentSubject(undefined)
      message.success('เพิ่มวิชาสำเร็จ')
    } else {
      setCurrentSubject(undefined)
      message.warning('กรุณาอย่าเพิ่มวิชาซ้ำ')
    }
  }
  const deleteSubject = (target: string) => {
    const id = target.split(' ')[0]
    setSelectTable(selectTable => {
      return {
        ...selectTable,
        subjectId: selectTable.subjectId.filter(subject => subject !== id),
      }
    })
    message.success('ลบวิชาสำเร็จ')
  }

  const onNameChange = (event: any) => {
    setTitle(event.target.value)
  }

  const addItem = () => {
    if (title && allTitle.findIndex(oldTitle => oldTitle.title === title) === -1) {
      setAllTitle([...allTitle, { title: title || '', subjectId: [], isActive: false }])
      setTitle(undefined)
    } else {
      if (title && title.length !== 0) {
        message.warning('กรุณาอย่าเพิ่มชื่อตารางซ้ำ')
        setTitle(undefined)
      } else {
        message.warning('กรุณากรอกชื่อตารางก่อน')
      }
    }
  }

  const onSave = () => {
    setAllTitle(allTitle => [
      ...allTitle.slice(0, currentIndex),
      selectTable,
      ...allTitle.slice(currentIndex + 1),
    ])
    message.success('บัททึกเรียบร้อย')
  }

  const onFinish = () => {
    updateUserSubject(allTitle).then(() => {
      history.push('/success')
    })
  }

  return (
    <div style={{ width: 700 }} className="space-y-4">
      <Card
        title={
          <p>
            <DiffTwoTone twoToneColor="black" className="align-text-top" /> วิชาของฉัน
          </p>
        }
        extra={
          <Select
            autoFocus
            style={{ width: 200 }}
            defaultValue={selectTable?.title}
            placeholder="เลือกตาราง"
            defaultActiveFirstOption
            onChange={value => {
              setSelectTable(allTitle[parseInt(value)])
              setCurrentIndex(parseInt(value))
            }}
            dropdownRender={menu => (
              <div>
                {menu}
                <Divider style={{ margin: '4px 0' }} />
                <div className="flex p-2">
                  <Input
                    style={{ flex: 'auto' }}
                    value={title}
                    onChange={onNameChange}
                    placeholder="เพิ่มตาราง"
                  />
                  <a
                    style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                    onClick={addItem}
                  >
                    <PlusOutlined /> เพิ่ม
                  </a>
                </div>
              </div>
            )}
          >
            {allTitle.map((item, index) => (
              <Select.Option key={index} value={index}>
                {item.title}
              </Select.Option>
            ))}
          </Select>
        }
      >
        {selectTable && (
          <Button
            onClick={() =>
              setSelectTable(selectTable => ({
                ...selectTable,
                isActive: !selectTable.isActive,
              }))
            }
            className={`cursor-pointer ${selectTable.isActive ? 'text-red-500' : ''} mb-4`}
          >
            {selectTable.isActive ? 'เอาออกจากปัจจุบัน' : 'เลือกเป็นปัจจุบัน'}
          </Button>
        )}
        <div className="flex space-x-2 mb-4">
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
                value={`${key} ${subject.subjectNameTh} ${subject.subjectNameEn}`}
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
        {selectTable ? (
          <div className="space-y-4">
            {selectTable.subjectId.map((subjectId, index) => (
              <div key={index} className="flex space-x-2">
                <Input
                  className="flex-grow"
                  disabled
                  value={`${subjectId} ${allSubject[subjectId].subjectNameTh} ${allSubject[subjectId].subjectNameEn}`}
                />
                <Button onClick={() => deleteSubject(subjectId)}>ลบ</Button>
              </div>
            ))}

            <div className="text-right space-x-3">
              <Popconfirm
                title="แน่ใจใช่ไหมที่จะยกเลิก"
                onConfirm={() => setSelectTable(allTitle[currentIndex])}
              >
                <Button>รีเซ็ต</Button>
              </Popconfirm>

              <Button type="primary" onClick={onSave}>
                บันทึกตาราง
              </Button>
            </div>
          </div>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>กรุณาเลือกตารางก่อน</Empty>
        )}
      </Card>
      <div className="space-x-2">
        <Popconfirm title="แน่ใจใช่ไหมว่า คุณกดบันทึกวิชาทั้งหมดแล้ว" onConfirm={onFinish}>
          <Button icon={<CheckOutlined className="align-text-top" />} size="large">
            ยืนยันการเลือกวิชาของฉัน
          </Button>
        </Popconfirm>
      </div>
    </div>
  )
}
