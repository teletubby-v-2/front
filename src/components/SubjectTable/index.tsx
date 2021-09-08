/* eslint-disable react/display-name */
import { Checkbox, Table, Tag } from 'antd'
import React, { useState } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { SujectTableChild } from './components/SujectTableChild'
import { UserSubjectDTO } from '../../constants/dto/myUser.dto'
import { ColumnType } from 'antd/lib/table'
export interface SubjectTableProps {
  data: UserSubjectDTO[]
}

const columns: ColumnType<UserSubjectDTO>[] = [
  { title: 'เลือกทั้งหมด', dataIndex: 'title', key: 'title' },
  {
    title: 'active',
    dataIndex: 'isActive',
    key: 'isActive',
    align: 'center',
    render: (isActive: boolean) => {
      return isActive ? <Tag color="green">active</Tag> : <Tag color="red">inactive </Tag>
    },
    width: 100,
  },

  {
    title: '',
    key: 'operation',
    render: () => (
      <a>
        <EditOutlined />
      </a>
    ),
    width: 50,
  },
  {
    title: '',
    key: 'operation',
    render: () => (
      <a>
        <DeleteOutlined />
      </a>
    ),
    width: 50,
  },
]

export const SubjectTable: React.FC<SubjectTableProps> = ({ data }) => {
  const [selectKey, setSelectKey] = useState<string[]>([])
  const rowSelection = {
    selectKey,
    onChange: (selectedRowKeys: any[]) => setSelectKey(selectedRowKeys),
  }
  return (
    <div>
      <Table
        className="components-table-demo-nested"
        columns={columns}
        rowSelection={rowSelection}
        rowKey="title"
        expandable={{
          expandedRowRender: record => <SujectTableChild subjectId={record.subjectId} />,
        }}
        dataSource={data}
        pagination={false}
      />
    </div>
  )
}
