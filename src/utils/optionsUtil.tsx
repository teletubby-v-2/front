import React from 'react'
import { Typography } from 'antd'
import kuSubject from '../constants/subjects.json'

export const options = Object.entries(kuSubject.subjects).map(([key, subject]) => ({
  value: `${key} ${subject.subjectNameTh}${
    subject.subjectNameEn ? `(${subject.subjectNameEn})` : ''
  }`,
  label: (
    <div key={`${key} ${subject.subjectNameTh}(${subject.subjectNameEn})`.toLowerCase()}>
      <Typography.Text ellipsis>{key}</Typography.Text>
      <br />
      <Typography.Text ellipsis className="text-xs">
        {subject.subjectNameTh}
      </Typography.Text>
      <br />
      {subject.subjectNameEn && (
        <Typography.Text ellipsis className="text-xs">
          {subject.subjectNameEn}
        </Typography.Text>
      )}
    </div>
  ),
  info: { id: key, ...subject },
}))
