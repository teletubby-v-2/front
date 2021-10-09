import React from 'react'
import {
  HomeFilled,
  HighlightOutlined,
  BookOutlined,
  DiffTwoTone,
  QuestionCircleOutlined,
} from '@ant-design/icons'
import { Tooltip } from 'antd'

export const containerTitle = {
  mySubject: (
    <>
      <DiffTwoTone twoToneColor="black" /> วิชาของฉัน
      <Tooltip title={<div className="text-center">สรุปที่มีวิชาตรงกับที่เราสนใจ</div>}>
        <QuestionCircleOutlined className=" text-gray-500 cursor-pointer  ml-2 text-sm" />
      </Tooltip>
    </>
  ),
  all: (
    <>
      <HighlightOutlined /> สรุปล่าสุด
    </>
  ),
  ownLecture: (
    <>
      <HomeFilled /> สรุปของฉัน
    </>
  ),
  bookmark: (
    <>
      <BookOutlined /> บุ๊คมาร์ค
    </>
  ),
}
