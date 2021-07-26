import React, { useEffect } from 'react'
import Login from './pages/Login'
import { HashRouter, Redirect, Route, Switch, useHistory } from 'react-router-dom'
import Register from './pages/Register'
import Success from './pages/Success'
import ForgotPassword from './pages/ForgotPassword'
import LinkAccount from './pages/LinkAccount'
import { firebaseApp } from './config/firebase'
import { modalAccountStore } from './store/modalAccount.store'
import { Button } from 'antd'
import { AccountManage } from './components/AccountManage'

const App: React.FC<{}> = () => {
  const { openModal } = modalAccountStore()

  const checkIsUser = () => {
    if (!firebaseApp.auth().currentUser) {
      openModal()
    }
  }

  return (
    <>
      <HashRouter>
        <AccountManage />
        <div onClick={checkIsUser} style={{ minHeight: '100vh' }}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/success" component={Success} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route exact path="/linkAccount" component={LinkAccount} />
          </Switch>
        </div>
      </HashRouter>
    </>
  )
}

export default App
