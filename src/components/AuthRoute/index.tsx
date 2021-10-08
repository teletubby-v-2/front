import { Layout } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { Route, RouteProps, useLocation } from 'react-router-dom'
import { Footer } from '..'
import KUshare from '../../assets/icons/KUshare.svg'
import { SvgUrl } from '../../constants'

const { Content, Footer: AntFooter } = Layout

const MyLayout = styled(Content)`
  background-color: #fafafa;
`

export const AuthRoute: React.FC<RouteProps> = props => {
  const { component: Component, ...rest } = props
  const location = useLocation()

  return (
    <Route
      {...rest}
      render={props => (
        <MyLayout className="min-h-screen flex flex-col">
          <nav className="navbar flex justify-center h-16">
            <img width={129} src={KUshare} />
          </nav>
          <div className="mt-16"></div>
          {location.pathname === '/home' && <img src={SvgUrl.Home} alt="ku logo" />}
          <Content className=" container mx-auto">{Component && <Component {...props} />}</Content>
          <AntFooter className="justify-self-end bg-green-500 opacity-75 ">
            <Footer />
          </AntFooter>
        </MyLayout>
      )}
    />
  )
}
