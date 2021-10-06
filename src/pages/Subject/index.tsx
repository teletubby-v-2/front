import DiffTwoTone from '@ant-design/icons/lib/icons/DiffTwoTone'
import { Button, Card, Modal, Tooltip } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { UserStep } from '../../components'
import { SubjectTable } from '../../components/SubjectTable'
import { AddSubject } from '../../components/SubjectTable/components/AddSubject'
import { PlusOutlined, CheckOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { userInfoStore } from '../../store/user.store'
import { useHistory } from 'react-router'
const MyCard = styled(Card)`
  &.ant-card .ant-card-body {
    padding: 4px;
  }
`

export const Subject: React.FC = () => {
  const { userInfo } = userInfoStore()
  const history = useHistory()

  return (
    <div className="flex justify-center space-x-2 my-10">
      <UserStep current={3} />
      <div style={{ width: 700 }} className="space-y-4">
        <MyCard
          title={
            <>
              <DiffTwoTone twoToneColor="black" className="align-text-top" /> วิชาของฉัน
              <Tooltip
                title={
                  <div className="text-center">
                    จัดตารางเพื่อคัดกรอง
                    <br />
                    เฉพาะวิชาที่เราสนใจ
                  </div>
                }
              >
                <QuestionCircleOutlined className="mb-1 text-gray-500 cursor-pointer  ml-2 text-sm" />
              </Tooltip>
            </>
          }
          className="shadow-1"
        >
          <SubjectTable
            showHeader={false}
            footer={() => (
              <AddSubject>
                <Button type="dashed" block icon={<PlusOutlined />}>
                  เพิ่มตาราง
                </Button>
              </AddSubject>
            )}
          />
        </MyCard>
        <Button
          onClick={() => {
            if (userInfo.userSubject.length === 0) {
              Modal.warning({
                title: 'ข้ามการเพิ่มวิชาของฉัน',
                content: (
                  <>
                    คุณแน่ใจใช่ไหมว่าจะข้ามการเพิ่มวิชาของฉัน
                    <br />
                    คุณอาจพลาดการค้นหาวิชาที่คุณสนใจ
                  </>
                ),
                autoFocusButton: 'cancel',
                onOk: () => history.push('/success'),
                closable: true,
                okCancel: true,
                maskClosable: true,
              })
            } else {
              history.push('/success')
            }
          }}
        >
          {userInfo.userSubject.length === 0 ? (
            'ข้ามการเพิ่มวิชาของฉัน'
          ) : (
            <>
              <CheckOutlined /> ยืนยันการเพิ่มตาราง
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
