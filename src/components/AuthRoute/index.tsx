/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout } from 'antd'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Route, RouteProps, useHistory, useLocation } from 'react-router-dom'
import { Footer } from '..'
import KUshare from '../../assets/icons/KUshare.svg'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { getUserFromIndexDB } from '../../utils/firebase'

const { Content, Footer: AntFooter } = Layout

const MyLayout = styled(Content)`
  background-color: #fafafa;
`

const blockPath = ['/login', '/register']

export const AuthRoute: React.FC<RouteProps> = props => {
  const { component: Component, ...rest } = props
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    if (blockPath.some(path => path === location.pathname))
      getUserFromIndexDB()
        .then((value: any) => {
          if (value?.value?.emailVerified) {
            return history.replace('/home')
          } else if (value) {
            return history.replace('/verifyEmail')
          }
        })
        .catch(() => console.log('no user'))
  }, [location.pathname])

  return (
    <Route
      {...rest}
      render={props => (
        <MyLayout className="min-h-screen flex flex-col">
          <nav className="navbar flex justify-center items-center h-16">
            <LazyLoadImage width={129} src={KUshare} effect="opacity" />
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
