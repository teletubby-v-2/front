import { Layout } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { Navbar } from '../Navbar'
import { Route, RouteProps } from 'react-router-dom'

const { Content, Footer } = Layout

const MyLayout = styled(Content)`
  background-color: #fafafa;
`

export const LayoutRoute: React.FC<RouteProps> = props => {
  const { component: Component, ...rest } = props

  return (
    <Route
      {...rest}
      render={props => (
        <MyLayout className="min-h-screen flex flex-col">
          <Navbar />
          <Content className="mt-16 container mx-auto">
            {Component && <Component {...props} />}
          </Content>
          <Footer className="justify-self-end">{/* //TODO: footer commponent here */}</Footer>
        </MyLayout>
      )}
    />
  )
}
