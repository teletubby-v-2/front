import React from 'react'
import { Route, RouteProps } from 'react-router-dom'
import { firebaseApp } from '../../config/firebase'
import { modalAccountStore } from '../../store/modalAccount.store'

export const PrivatRoute: React.FC<RouteProps> = props => {
  const { component: Component, ...rest } = props

  const { openModal } = modalAccountStore()

  const checkIsUser = () => {
    if (!firebaseApp.auth().currentUser) {
      openModal()
    }
  }

  return (
    <Route
      {...rest}
      render={props => (
        <div className="min-h-screen" onClick={checkIsUser}>
          {Component && <Component {...props} />}
        </div>
      )}
    />
  )
}
