import { Button, Result } from 'antd'
import React from 'react'
import { SmileOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
const Success = () => {

  const history = useHistory()

  return (
    <Result
    icon={<SmileOutlined />}
    title="Great, we have done all the operations!"
    extra={<Button type="primary" onClick={() => history.goBack()}>Next</Button>}
    />
  )
}

export default Success
