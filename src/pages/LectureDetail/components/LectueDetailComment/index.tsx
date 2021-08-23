import { Tabs } from 'antd'
import React from 'react'
import { dummyLectures } from '../../../../constants/dummyData/lecture.dummy'
const { TabPane } = Tabs
// TODO: รอ component เข้ามาใส่ใน TabPane
export const LectureDetailComment: React.FC = () => {
  const dummyLecture = dummyLectures[0]
  return (
    <div>
      <Tabs>
        <TabPane tab={`Review (${dummyLecture})`} key="1">
          Content of tab 1
        </TabPane>
        <TabPane tab={`Comment (${dummyLecture})`} key="2">
          Content of tab 2
        </TabPane>
        <TabPane tab={`Question & Answer (${dummyLecture})`} key="3">
          Content of tab 3
        </TabPane>
      </Tabs>
    </div>
  )
}
