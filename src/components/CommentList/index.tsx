import { List, Avatar, ListProps } from 'antd'
import React from 'react'
import { CommentNoReply, QAndA, Review } from '../../constants/interface/lecture.interface'
export interface CommentListProps extends ListProps<QAndA | CommentNoReply | Comment | Review> {
  dataType?: 'QAndA' | 'CommentNoReply' | 'Comment' | 'Review'
}
// TODO: ยังไม่เสร็จ
export const CommentList: React.FC<CommentListProps> = props => {
  const { dataType = 'Comment', ...rest } = props
  return (
    <List
      {...rest}
      itemLayout="horizontal"
      renderItem={(item: any) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={<a href="https://ant.design">{item.answer}</a>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
        </List.Item>
      )}
    />
  )
}
