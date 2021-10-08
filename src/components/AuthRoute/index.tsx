import { Layout } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { Route, RouteProps } from 'react-router-dom'
import { Footer } from '..'
import KUshare from '../../assets/icons/KUshare.svg'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const { Content, Footer: AntFooter } = Layout

const MyLayout = styled(Content)`
  background-color: #fafafa;
`

export const AuthRoute: React.FC<RouteProps> = props => {
  const { component: Component, ...rest } = props

  return (
    <Route
      {...rest}
      render={props => (
        <MyLayout className="min-h-screen flex flex-col">
          <nav className="navbar flex justify-center items-center h-16">
            <LazyLoadImage width={129} src={KUshare} effect="blur" />
          </nav>
          <div className="mt-16"></div>
          <Content className=" container mx-auto">{Component && <Component {...props} />}</Content>
          <AntFooter className="justify-self-end bg-green-500 opacity-75 ">
            <Footer />
          </AntFooter>
        </MyLayout>
      )}
    />
  )
}
