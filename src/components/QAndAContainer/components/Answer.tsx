import React, { useMemo } from 'react'
import { Comment, Avatar, Menu, Dropdown, Button, Typography } from 'antd'
import { AnswersDTO } from '../../../constants/dto/lecture.dto'
import { Link } from 'react-router-dom'
import { MoreOutlined, DeleteOutlined } from '@ant-design/icons'
import { MenuInfo } from 'rc-menu/lib/interface'
import { deleteAnswer } from '../../../service/lectures/qanda'
import { userInfoStore } from '../../../store/user.store'
import { strInnerParagraph } from '../../../utils/strInnerParagraph'
export interface AnswerBoxProps {
  answer: AnswersDTO
}
export interface CommentForm {
  message: string
}

const { Paragraph } = Typography

export const AnswerBox: React.FC<AnswerBoxProps> = ({ answer }) => {
  const { userInfo } = userInfoStore()
  const handleMenuClick = (info: MenuInfo) => {
    switch (info.key) {
      case 'delete':
        return deleteAnswer(answer)
    }
  }
  const menu = useMemo(
    () => (
      <Menu onClick={handleMenuClick} className="mr-3">
        <Menu.Item key="delete" danger icon={<DeleteOutlined />}>
          ลบ
        </Menu.Item>
      </Menu>
    ),
    [],
  )

  return (
    <div>
      <Comment
        author={
          <>
            <Link className="font-bold mr-3" to={`/profile/${answer.userId}`}>
              {answer.username}
            </Link>
          </>
        }
        avatar={
          <Link className="font-bold mr-3" to={`/profile/${answer.userId}`}>
            <Avatar src={answer.photoURL} alt={answer.userId} />
          </Link>
        }
        content={
          <div className="flex">
            <Paragraph
              ellipsis={{
                rows: 5,
                expandable: true,
                symbol: 'ดูเพิ่มเติม',
              }}
              className="flex-grow"
            >
              {strInnerParagraph(answer.message || '')}
            </Paragraph>
            <p className="flex-grow">{answer.message}</p>
            {userInfo.userId === answer.userId && (
              <p className="-m-3">
                <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                  <Button type="link">
                    <MoreOutlined className="text-xl text-black" />
                  </Button>
                </Dropdown>
              </p>
            )}
          </div>
        }
      />
    </div>
  )
}
