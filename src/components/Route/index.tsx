import { Layout } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { Navbar } from '../Navbar'
import { Route, RouteProps, useLocation } from 'react-router-dom'
import { Footer } from '..'
import { SVG_URL } from '../../constants'
import { LazyLoadImage } from 'react-lazy-load-image-component'

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
          <Navbar />
          <div className="mt-16"></div>
          {location.pathname === '/home' && (
            <LazyLoadImage
              src={SVG_URL.HOME}
              alt="ku logo"
              effect="blur"
              className=" w-screen home-icon"
            />
          )}
          <Content className=" container mx-auto h-full">
            {Component && <Component {...props} />}
          </Content>
          <div className="bg-white z-10">
            <AntFooter className="justify-self-end bg-green-400 opacity-75">
              <Footer />
            </AntFooter>
          </div>
        </MyLayout>
      )}
    />
  )
}
