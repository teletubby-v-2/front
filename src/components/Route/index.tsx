import { Layout } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { Navbar } from '../Navbar'
import { Route, RouteProps } from 'react-router-dom'
import { Footer } from '..'

const { Content, Footer: AntFooter } = Layout

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
          <AntFooter className="justify-self-end bg-green-400 opacity-75">
            <Footer />
          </AntFooter>
        </MyLayout>
      )}
    />
  )
}
