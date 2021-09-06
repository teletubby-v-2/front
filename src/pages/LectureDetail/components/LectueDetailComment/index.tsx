import { Tabs } from 'antd'
import React from 'react'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import { CommentContainer, QAndAContainer, ReviewContainer } from '../../../../components'

export interface LectureDetailCommentProps {
  authorId: string
}
// TODO: รอ component เข้ามาใส่ใน TabPane
export const LectureDetailComment: React.FC<LectureDetailCommentProps> = ({ authorId }) => {
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
          <QAndAContainer lectureId={id} authorId={authorId} />
        </Tabs.TabPane>
        {}
      </Tabs>
    </div>
  )
}
