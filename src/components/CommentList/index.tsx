import { List, Avatar, ListProps } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { QAndA, Review } from '../../constants/interface/lecture.interface'
export interface CommentListProps extends ListProps<QAndA | Comment | Review> {
  dataType?: 'QAndA' | 'Comment' | 'Review'
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
            title={<Link to="https://ant.design">{item.answer}</Link>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
        </List.Item>
      )}
    />
  )
}
