/* eslint-disable react/display-name */
import { Table } from 'antd'
import React, { useState } from 'react'
import { SubjectDTO } from '../../../../constants/dto/subjects.dto'
import kuSubject from '../../../../constants/subjects.json'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

export interface SujectTableChildProps {
  subjectId: string[]
}

export const SujectTableChild: React.FC<SujectTableChildProps> = ({ subjectId }) => {
  const [allSubject] = useState<Record<string, SubjectDTO>>(
    kuSubject.subjects as unknown as Record<string, SubjectDTO>,
  )
  const columns = React.useMemo(
    () => [
      { title: 'เลือกทั้งหมด', dataIndex: 'subjectId', key: 'subjectId', width: 100 },
      {
        title: '',
        key: 'thaiName',
        render: (record: { subjectId: string }) => allSubject[record.subjectId].subjectNameTh,
      },
      {
        title: '',

        key: 'engName',
        render: (record: { subjectId: string }) => allSubject[record.subjectId].subjectNameEn,
      },
    ],
    [allSubject],
  )

  return (
    <Table
      columns={columns}
      dataSource={subjectId.map(id => ({ subjectId: id }))}
      showHeader={false}
      pagination={false}
    />
  )
}
