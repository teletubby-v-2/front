import { Tabs } from 'antd'
import React from 'react'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import { CommentContainer, ReviewContainer } from '../../../../components'
import { QACom } from '../../../Yoyo/components/QA'

// TODO: รอ component เข้ามาใส่ใน TabPane
export const LectureDetailComment: React.FC = () => {
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
          <ReviewContainer lectureId={id} />
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
