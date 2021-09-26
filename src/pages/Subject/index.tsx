import DiffTwoTone from '@ant-design/icons/lib/icons/DiffTwoTone'
import { Button, Card } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { UserStep } from '../../components'
import { SubjectTable } from '../../components/SubjectTable'
import { AddSubject } from '../../components/SubjectTable/components/AddSubject'
import { PlusOutlined, CheckOutlined } from '@ant-design/icons'
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
        <Button onClick={() => history.push('/success')}>
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
