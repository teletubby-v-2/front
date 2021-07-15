import { Alert, Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { firebaseApp } from '../config/firebase'

const Register:React.FC<{}> = () => {

  const history = useHistory()
  const [isFail, setIsFail] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string>()

  const onFinish = (value:any) => {
    if (value.password !== value.comfirmPassword) {
      setMessage("Password and comfirm password is not collabed")
      return setIsFail(true)
    }
    setIsLoading(true)
    firebaseApp.auth().createUserWithEmailAndPassword(value.email, value.password).then((userCredentail) => {
      userCredentail.user?.getIdToken().then((token) => localStorage.setItem('idToken', token))
      userCredentail.user?.updateProfile({displayName: value.username})
    }).then(() => history.push('/success'))
      .catch((error) => {
        console.log(error)
        setMessage(error.message)
        setIsFail(true)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <div className="App">
    <h1  className='text-3xl font-bold' style={{marginBottom:20}}>Register</h1>
    {isFail &&
    <Alert 
      message={message}
      type="error"
      showIcon
      style={{textAlign:'left', marginBottom:10}}/>
    }
    <Form onFinish={onFinish}>
    <Form.Item name='username' >
        <Input placeholder='username'/>
      </Form.Item >
      <Form.Item name='email' >
        <Input placeholder='Email'/>
      </Form.Item >
      <Form.Item name='password' >
        <Input.Password placeholder='password'/>
      </Form.Item>
      <Form.Item name='comfirmPassword' >
        <Input.Password placeholder='comfirm password'/>
      </Form.Item>
      <Form.Item style={{marginBottom:5}}>
        <Button type='primary' htmlType='submit' size='large' block loading={isLoading}>Register</Button>
      </Form.Item>
    </Form>
    <a href='#/login' className='text-blue-500'>already have account</a>
  </div>
  )
}

export default Register
