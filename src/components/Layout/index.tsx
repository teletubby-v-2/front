import { Layout } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { Navbar } from '../Navbar'

const { Content, Footer } = Layout

const MyContent = styled(Content)`
  background-color: #fafafa;
`

export const MyLayout: React.FC = props => {
  return (
    <Layout className="min-h-screen">
      <Navbar />
      <MyContent className="pt-20">{props.children}</MyContent>
      <Footer>{/* //TODO: footer commponent here */}</Footer>
    </Layout>
  )
}
