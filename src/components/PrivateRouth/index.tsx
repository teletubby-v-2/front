import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { firebaseApp } from '../../config/firebase'
import { modalAccountStore } from '../../store/modalAccount.store'
import { userInfoStore } from '../../store/user.store'

export const PrivatRoute: React.FC<RouteProps> = ({ component, ...rest }: any) => {
  const { openModal, toLogin } = modalAccountStore()
  const { userId } = userInfoStore()

  const NotLogin = () => {
    toLogin()
    openModal()
    return <Redirect to="/Home" />
  }
  const routeComponent = (props: any) =>
    userId ? React.createElement(component, props) : NotLogin()

  return <Route {...rest} render={routeComponent} />
}
