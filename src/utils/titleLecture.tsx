import { HomeFilled, HighlightOutlined, BookOutlined, DiffTwoTone } from '@ant-design/icons'
import React from 'react'

export const containerTitle = {
  myLecture: (
    <>
      <DiffTwoTone twoToneColor="black" className="align-text-top" /> วิชาของฉัน
    </>
  ),
  all: (
    <>
      <HighlightOutlined /> สรุปล่าสุด
    </>
  ),
  ownLecture: (
    <>
      <HomeFilled className="mb-1" /> สรุปของฉัน
    </>
  ),
  bookmark: (
    <>
      <BookOutlined /> บุ๊คมาร์ค
    </>
  ),
}
