import { Layout } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { Navbar } from '../Navbar'
import { Route, RouteProps, Redirect } from 'react-router-dom'
import { modalAccountStore } from '../../store/modalAccount.store'
import { userInfoStore } from '../../store/user.store'

const { Content, Footer } = Layout

const MyContent = styled(Content)`
  background-color: #fafafa;
`

export const LayoutRoute: React.FC<RouteProps> = props => {
  const { component: Component, ...rest } = props

  return (
    <Route
      {...rest}
      render={props => (
        <Layout className="min-h-screen">
          <Navbar />
          <MyContent className="pt-20">{Component && <Component {...props} />}</MyContent>
          <Footer>{/* //TODO: footer commponent here */}</Footer>
        </Layout>
      )}
    />
  )
}

export const PrivateRoute: React.FC<RouteProps> = ({ component, ...rest }: any) => {
  const { openModal, toLogin } = modalAccountStore()
  const { userId } = userInfoStore()

  const NotLogin: React.ReactNode = () => {
    toLogin()
    openModal()
    return <Redirect to="/Home" />
  }
  const routeComponent = (props: any) => (userId ? React.createElement(component, props) : NotLogin)

  return <Route {...rest} render={routeComponent} />
}
