import React from 'react'
import { Button, Result } from 'antd'
import { Link, useHistory } from 'react-router-dom'

export const NotFound: React.FC = () => {
  const history = useHistory()
  return (
    <div className="mx-auto">
      <Result
        status="404"
        title="404"
        subTitle="หน้าที่คุณต้องการหาไม่มีอยู่"
        extra={
          <>
            <a onClick={() => history.go(-2)}>
              <Button>ย้อนกลับ</Button>
            </a>
            <Link to="/login">
              <Button type="primary">กลับไปหน้าแรก</Button>
            </Link>
          </>
        }
      />
    </div>
  )
}
