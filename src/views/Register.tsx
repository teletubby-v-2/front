import { Alert, Button, Form, Input } from 'antd'
import { firebaseApp } from 'config/firebase'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Register = () => {

  const history = useHistory()
  const [isFail, setIsFail] = useState(false)

  const onFinish = (value:any) => {
    if (value.password !== value.comfirmPassword){
      return setIsFail(true)
    } 
    console.log('here')
    firebaseApp.auth().createUserWithEmailAndPassword(value.email, value.password).then((userCredentail) => {
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
    <h1 style={{marginBottom:20}}>Register</h1>
    {isFail &&
    <Alert 
      message="Password and comfirm password is not collabed"
      type="error"
      showIcon
      style={{textAlign:'left', marginBottom:10}}/>
    }
    <Form onFinish={onFinish}>
      <Form.Item name='email' style={{marginBottom:18}}>
        <Input placeholder='Email'/>
      </Form.Item >
      <Form.Item name='password' style={{marginBottom:18}}>
        <Input.Password placeholder='password'/>
      </Form.Item>
      <Form.Item name='comfirmPassword' style={{marginBottom:18}}>
        <Input.Password placeholder='comfirm password'/>
      </Form.Item>
      <Form.Item style={{marginBottom:5}}>
        <Button type='primary' htmlType='submit' size='large' block>Register</Button>
      </Form.Item>
    </Form>
    <a onClick={()=>{history.push('/Login')}}>already have account</a>
  </div>
  )
}

export default Register
