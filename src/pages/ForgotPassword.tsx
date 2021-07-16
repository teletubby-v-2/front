import { render } from '@testing-library/react'
import { Button, Form, Input } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

export const ForgotPassword: React.FC<{}> = () => {
  return (
    <div className="App grid gap-y-4">
      <h1 className="text-3xl font-bold ">Forgot your password?</h1>
      <Form layout="vertical" >
        <Form.Item name="email" label="Email address">
          <Input placeholder="Email"></Input>
        </Form.Item>
        <Form.Item className="m-1">
          <Button type="primary" htmlType="submit" size="middle" block>
            Reset password!
          </Button>
        </Form.Item>
        <Link to="/login" className="flex justify-end mb-2 text-blue-500 text-xs mr-1">
          Back to Sign in
        </Link>
      </Form>
    </div>
  )
}
