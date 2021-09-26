import {
  Button,
  Input,
  Select,
  Popconfirm,
  Tag,
  Form,
  FormProps,
  Space,
  Checkbox,
  Modal,
} from 'antd'
import React, { useEffect, useState } from 'react'
import kuSubject from '../../../../constants/subjects.json'
import { UserSubjectDTO } from '../../../../constants/dto/myUser.dto'
import { userInfoStore } from '../../../../store/user.store'
import { useModal } from '../../../../hooks/useModal'
import { updateUserSubject } from '../../../../service/user'
import { SubjectTableChild } from '../SujectTableChild'

export interface AddSubjectProps extends FormProps<UserSubjectDTO> {
  initialValues?: UserSubjectDTO
}

export const AddSubject: React.FC<AddSubjectProps> = props => {
  const { initialValues = { isActive: true } as UserSubjectDTO, children, ...rest } = props
  const { setUserSubject, userInfo } = userInfoStore()
  const [form] = Form.useForm<UserSubjectDTO>()
  const [currentSubject, setCurrentSubject] = useState<string[]>(initialValues.subjectId || [])
  const { show, toggleModal } = useModal()
  const handleSelect = (value: string[]) => {
    setCurrentSubject(value)
  }

  const onFinish = (value: UserSubjectDTO) => {
    const newValue = {
      ...value,
      subjectId: value.subjectId.map(id => id.split(' ')[0]),
    }
    let newUserSubject = userInfo.userSubject
    if (initialValues.title) {
      const index = userInfo.userSubject.findIndex(table => table.title === initialValues.title)
      newUserSubject = [
        ...userInfo.userSubject.slice(0, index),
        newValue,
        ...userInfo.userSubject.slice(index + 1),
      ]
    } else {
      newUserSubject = [...userInfo.userSubject, newValue]
    }
    updateUserSubject(newUserSubject).then(() => {
      setUserSubject(newUserSubject)
    })
    resetAll()
  }

  const resetAll = () => {
    form.resetFields()
    setCurrentSubject([])
    toggleModal()
  }

  useEffect(() => {
    if (show) {
      form.setFieldsValue(initialValues)
      setCurrentSubject(initialValues.subjectId || [])
    }
  }, [show])

  return (
    <>
      <span onClick={toggleModal} className="cursor-pointer">
        {children}
      </span>
      <Modal
        maskClosable={false}
        visible={show}
        width={750}
        footer={false}
        title="เพิ่มตาราง"
        className="top-10"
        onCancel={resetAll}
      >
        <Form form={form} onFinish={onFinish} initialValues={initialValues} {...rest}>
          <Form.Item label="ชื่อตาราง">
            <Space>
              <Form.Item
                name="title"
                rules={[
                  {
                    validator: (_, value) =>
                      userInfo.userSubject.some(table => table.title === value) &&
                      value !== initialValues.title
                        ? Promise.reject('กรุณาอย่าเลือกชื่อตารางซ้ำ')
                        : Promise.resolve(),
                  },
                  { required: true },
                ]}
                noStyle
              >
                <Input />
              </Form.Item>
              <Form.Item name="isActive" valuePropName="checked" noStyle>
                <Checkbox />
              </Form.Item>
              active
            </Space>
          </Form.Item>
          <Form.Item label="เลือกวิชา">
            <div className="flex space-x-3">
              <Form.Item name="subjectId" className="mb-0 flex-grow" rules={[{ required: true }]}>
                <Select
                  showSearch
                  mode="multiple"
                  maxTagCount="responsive"
                  placeholder="โปรดเลือกวิชา"
                  showArrow
                  onChange={handleSelect}
                  value={currentSubject}
                  tagRender={({ value, closable, onClose }) => {
                    const text: string = value as string
                    return (
                      <Tag closable={closable} onClose={onClose}>
                        {text.split(' ')[0]}
                      </Tag>
                    )
                  }}
                >
                  {Object.entries(kuSubject.subjects).map(([key, subject]) => (
                    <Select.Option
                      key={key}
                      value={`${key} ${subject.subjectNameTh} ${subject.subjectNameEn}`}
                    >
                      <div className="my-1 text-sm">
                        <div>{key}</div>
                        <div>{subject.subjectNameTh}</div>
                        <div>{subject.subjectNameEn}</div>
                      </div>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Button
                onClick={() => {
                  form.setFieldsValue({ subjectId: [] })
                  setCurrentSubject([])
                }}
              >
                รีเซ็ต
              </Button>
            </div>
          </Form.Item>
          <div style={{ minHeight: 200 }}>
            <SubjectTableChild
              subjectId={currentSubject.map(subject => subject.split(' ')[0])}
              callback={id => {
                form.setFieldsValue({
                  subjectId: form
                    .getFieldValue('subjectId')
                    .filter((subId: string) => subId.split(' ')[0] !== id),
                })
                setCurrentSubject(currentSubject =>
                  currentSubject.filter(sujectId => sujectId.split(' ')[0] !== id),
                )
              }}
            />
          </div>
          <div className="text-right space-x-3 mt-6">
            <Popconfirm title="แน่ใจใช่ไหมที่จะยกเลิก" onConfirm={resetAll}>
              <Button htmlType="button">ยกเลิก</Button>
            </Popconfirm>
            <Form.Item noStyle>
              <Button type="primary" htmlType="submit">
                บันทึกตาราง
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  )
}
