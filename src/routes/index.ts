import { RouteProps } from 'react-router-dom'
import { AboutUS, Home, LectureDetail, Profile, SelectProfile, FAQ } from '../pages'
import { FollowList } from '../pages/FollowList'
import { SearchResult } from '../pages/SearchResult'
import { ViewAll } from '../pages/ViewAll'

const layoutRoutes: RouteProps[] = [
  {
    exact: true,
    path: '/home',
    component: Home,
  },
  {
    exact: true,
    path: '/lecturedetail/:lectureId',
    component: LectureDetail,
  },
  {
    exact: true,
    path: '/profile',
    component: Profile,
  },
  {
    exact: true,
    path: '/faq',
    component: FAQ,
  },
  {
    path: '/viewAll/:id',
    component: ViewAll,
  },
  {
    path: '/profile/:userId',
    component: SelectProfile,
  },
  {
    path: '/follow/:userId/:type',
    component: FollowList,
  },
  {
    path: '/searchResult',
    component: SearchResult,
  },
  {
    exact: true,
    path: '/AboutUS',
    component: AboutUS,
  },
]

export default layoutRoutes
