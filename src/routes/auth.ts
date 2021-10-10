import { RouteProps } from 'react-router-dom'
import {
  Login,
  Register,
  ForgotPassword,
  LinkAccount,
  VerifyEmail,
  Success,
  Subject,
} from '../pages'
import { UserInfo } from '../pages/UserInfo'

const authRoutes: RouteProps[] = [
  {
    exact: true,
    path: '/login',
    component: Login,
  },
  {
    exact: true,
    path: '/forgotpassword',
    component: ForgotPassword,
  },
  {
    exact: true,
    path: '/forgotpassword',
    component: ForgotPassword,
  },
  {
    exact: true,
    path: '/forgotpassword',
    component: ForgotPassword,
  },
  {
    exact: true,
    path: '/verifyEmail',
    component: VerifyEmail,
  },
  {
    exact: true,
    path: '/register',
    component: Register,
  },

  {
    exact: true,
    path: '/success',
    component: Success,
  },
  {
    exact: true,
    path: '/subject',
    component: Subject,
  },
  {
    exact: true,
    path: '/createUser',
    component: UserInfo,
  },
  {
    exact: true,
    path: '/forgotpassword',
    component: ForgotPassword,
  },
  {
    exact: true,
    path: '/linkAccount',
    component: LinkAccount,
  },
]

export default authRoutes
