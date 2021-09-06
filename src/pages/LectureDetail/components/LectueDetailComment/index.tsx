import { Tabs } from 'antd'
import React from 'react'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import { CommentContainer } from '../../../../components'
import { dummyLectures } from '../../../../constants/dummyData/lecture.dummy'
import { QACom } from '../../../Yoyo/components/QA'
import { ReviewCom } from '../../../Yoyo/components/Review'
const { TabPane } = Tabs

// TODO: รอ component เข้ามาใส่ใน TabPane
export const LectureDetailComment: React.FC = () => {
  const dummyLecture = dummyLectures[0]
  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  if (history.location.hash.length == 0) {
    return <Redirect to={`${history.location.pathname}#comment`} />
  }

  return (
    <div className="ml-3 flex flex-1">
      <Tabs
        onChange={key => {
          history.replace(`${history.location.pathname}${key}`)
        }}
        activeKey={history.location.hash}
        className="w-full"
      >
        <Tabs.TabPane tab="รีวิว" key="#review">
          <ReviewCom id={id} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="ความคิดเห็น" key="#comment">
          <CommentContainer lectureId={id} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={`ถาม-ตอบ`} key="#qa">
          <QACom id={id} />
        </Tabs.TabPane>
        {}
      </Tabs>
    </div>
  )
}
