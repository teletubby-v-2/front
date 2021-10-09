import { Layout } from 'antd'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom'
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
  const location = useLocation()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [isAuth, setIsAuth] = useState<any>()

  useEffect(() => {
    if (blockPath.some(path => path === location.pathname)) console.log()

    getUserFromIndexDB()
      .then(value => setIsAuth(value))
      .catch(() => console.log('no user'))
  }, [location.pathname])

  if (isAuth && isAuth.length !== 0 && blockPath.some(path => path === location.pathname)) {
    if (isAuth.value?.emailVerified) {
      return <Redirect to="/home" />
    } else {
      return <Redirect to="/verifyEmail" />
    }
  }

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
