/* eslint-disable react/display-name */
import { Empty, Popconfirm, Table, Tag } from 'antd'
import React, { useMemo } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { SubjectTableChild } from './components/SujectTableChild'
import { UserSubjectDTO } from '../../constants/dto/myUser.dto'
import { ColumnType, TableProps } from 'antd/lib/table'
import { userInfoStore } from '../../store/user.store'
import { AddSubject } from './components/AddSubject'
import { updateUserSubject } from '../../service/user'
export interface SubjectTableProps extends TableProps<UserSubjectDTO> {}

export const SubjectTable: React.FC<SubjectTableProps> = ({ ...rest }) => {
  const { userInfo, setUserSubject } = userInfoStore()
  const removeUserSubject = (name: string) => {
    const newUserSubject = userInfo.userSubject.filter(table => table.title !== name)
    updateUserSubject(newUserSubject).then(() => setUserSubject(newUserSubject))
  }

  const columns = useMemo<ColumnType<UserSubjectDTO>[]>(
    () => [
      {
        title: 'เลือกทั้งหมด',
        dataIndex: 'title',
        key: 'title',
        sorter: (a, b) => a.title.localeCompare(b.title),
      },
      {
        title: '',
        dataIndex: 'isActive',
        key: 'isActive',
        align: 'center',
        render: (isActive: boolean) => {
          return isActive ? <Tag color="green">ใช้งาน</Tag> : <Tag color="red">ไม่ใช้งาน</Tag>
        },
        sorter: (a, b) => {
          if (a.isActive) return -1
          if (b.isActive) return 1
          return 0
        },
        showSorterTooltip: { title: 'เรียงการใช้งาน' },
        width: 100,
      },

      {
        title: '',
        key: 'operation',
        render: (_, record) => (
          <AddSubject initialValues={record}>
            <a>
              <EditOutlined />
            </a>
          </AddSubject>
        ),
        width: 50,
      },
      {
        title: '',
        key: 'operation',
        render: (_, record) => (
          <Popconfirm
            title="แน่ใจใช่ไหมที่จะลบตาราง"
            onConfirm={() => removeUserSubject(record.title)}
          >
            <DeleteOutlined className="cursor-pointer text-red-500" />
          </Popconfirm>
        ),
        width: 50,
      },
    ],
    [userInfo.userSubject],
  )

  return (
    <Table
      columns={columns}
      locale={{
        emptyText: (
          <Empty
            description={
              <>
                <p>ไม่มีตาราง</p>
              </>
            }
          />
        ),
      }}
      rowKey="title"
      expandable={{
        expandedRowRender: record => (
          <div className="flex justify-center ">
            <SubjectTableChild subjectId={record.subjectId} />,
          </div>
        ),
      }}
      dataSource={userInfo.userSubject}
      pagination={false}
      {...rest}
    />
  )
}
