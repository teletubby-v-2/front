/* eslint-disable react/display-name */
import { Table } from 'antd'
import { ColumnType } from 'antd/lib/table'
import React, { useState } from 'react'
import { SubjectDTO } from '../../../../constants/dto/subjects.dto'
import kuSubject from '../../../../constants/subjects.json'
import { DeleteOutlined } from '@ant-design/icons'
export interface SujectTableChildProps {
  subjectId: string[]
  callback?: (id: string) => void
}

export const SubjectTableChild: React.FC<SujectTableChildProps> = ({ subjectId, callback }) => {
  const [allSubject] = useState<Record<string, SubjectDTO>>(
    kuSubject.subjects as unknown as Record<string, SubjectDTO>,
  )
  const columns = React.useMemo<ColumnType<{ subjectId: string }>[]>(
    () => [
      { dataIndex: 'subjectId', key: 'subjectId', width: 100, fixed: 'left' },
      {
        key: 'name',
        render: (_, record: { subjectId: string }) => (
          <>
            <p>{allSubject[record.subjectId].subjectNameTh}</p>
            <p>{allSubject[record.subjectId].subjectNameEn}</p>
          </>
        ),
      },
      {
        dataIndex: 'delete',
        key: 'delete',
        width: 50,
        fixed: 'right',
        render: (_, record) =>
          callback ? (
            <DeleteOutlined
              className="text-red-500"
              onClick={() => {
                callback(record.subjectId)
              }}
            />
          ) : (
            ''
          ),
      },
    ],
    [allSubject],
  )

  return (
    <Table
      size="small"
      scroll={{ y: callback ? 400 : 180 }}
      columns={columns}
      dataSource={subjectId.map(id => ({ subjectId: id }))}
      showHeader={false}
      pagination={false}
    />
  )
}
