import { Layout } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { Navbar } from '../Navbar'
import { Route, RouteProps, useLocation } from 'react-router-dom'
import { Footer } from '..'
import homeIcon from '../../assets/icons/home_icon.svg'

const { Content, Footer: AntFooter } = Layout

const MyLayout = styled(Content)`
  background-color: #fafafa;
`

export const LayoutRoute: React.FC<RouteProps> = props => {
  const { component: Component, ...rest } = props
  const location = useLocation()

  return (
    <Route
      {...rest}
      render={props => (
        <MyLayout className="min-h-screen flex flex-col">
          <Navbar isHome={true} />
          <div className="mt-16"></div>
          {location.pathname === '/home' && <img src={homeIcon} alt="ku logo" />}

          <Content className=" container mx-auto">{Component && <Component {...props} />}</Content>
          <AntFooter className="justify-self-end bg-green-400 opacity-75">
            <Footer />
          </AntFooter>
        </MyLayout>
      )}
    />
  )
}

export const FirstRoute: React.FC<RouteProps> = props => {
  const { component: Component, ...rest } = props
  const location = useLocation()

  return (
    <Route
      {...rest}
      render={props => (
        <MyLayout className="min-h-screen flex flex-col">
          <Navbar isHome={false} />
          <div className="mt-16"></div>
          {location.pathname === '/home' && <img src={homeIcon} alt="ku logo" />}

          <Content className=" container mx-auto">{Component && <Component {...props} />}</Content>
        </MyLayout>
      )}
    />
  )
}
