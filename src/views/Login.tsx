import { Alert, Button, Form, Input } from 'antd'
import { firebaseApp } from 'config/firebase'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Login = () => {

  const history = useHistory()
  const [isFail, setIsFail] = useState(false)

  const onFinish = (value:any) => {
    firebaseApp.auth().signInWithEmailAndPassword(value.email, value.password).then((userCredentail) => {
      console.log(userCredentail)
      history.push('/success')
    }).catch((error) => {
        console.log(error)
        setIsFail(true)
      } 
    )
  }

  return (
    <div className="App">
    <h1 style={{marginBottom:20}}>Login</h1>
    {isFail &&
    <Alert 
      message="Error"
      description="Email or password is not correct"
      type="error"
      showIcon/>
    }
    <Form onFinish={onFinish}>
      <Form.Item name='email'>
        <Input placeholder='Email'/>
      </Form.Item>
      <Form.Item name='password'>
        <Input.Password placeholder='password'/>
      </Form.Item>
      <Form.Item style={{marginBottom:5}}>
        <Button type='primary' htmlType='submit' size='large' block>login</Button>
      </Form.Item>
    </Form>
    <a onClick={()=>{history.push('register')}}>no account</a>
  </div>
  )
}

export default Login