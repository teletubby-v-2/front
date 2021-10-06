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
      <DiffTwoTone twoToneColor="black" className="align-text-top" /> วิชาของฉัน
      <Tooltip title={<div className="text-center">สรุปที่มีวิชาตรงกับที่เราสนใจ</div>}>
        <QuestionCircleOutlined className="mb-1 text-gray-500 cursor-pointer  ml-2 text-sm" />
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
      <HomeFilled className="mb-1" /> สรุปของฉัน
    </>
  ),
  bookmark: (
    <>
      <BookOutlined /> บุ๊คมาร์ค
    </>
  ),
}
