import { Tabs } from 'antd'
import React from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { CommentContainer, QAndAContainer, ReviewContainer } from '../../../../components'

export interface LectureDetailCommentProps {
  authorId: string
  lectureId: string
}
export const LectureDetailComment: React.FC<LectureDetailCommentProps> = ({
  authorId,
  lectureId,
}) => {
  const history = useHistory()
  if (history.location.hash.length == 0) {
    return <Redirect to={`${history.location.pathname}#review`} />
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
          <ReviewContainer lectureId={lectureId} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="ความคิดเห็น" key="#comment">
          <CommentContainer lectureId={lectureId} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={`ถาม-ตอบ`} key="#qa">
          <QAndAContainer lectureId={lectureId} authorId={authorId} />
        </Tabs.TabPane>
        {}
      </Tabs>
    </div>
  )
}
