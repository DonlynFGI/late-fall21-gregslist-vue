import { authGuard } from '@bcwdev/auth0provider-client'
import { createRouter, createWebHashHistory } from 'vue-router'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/cars',
    name: 'Cars',
    component: loadPage('CarsPage')
  },
  {
    path: '/cars/:id',
    name: 'CarDetails',
    component: loadPage('CarDetailsPage')
  },
  {
    path: '/houses',
    name: 'Houses',
    component: loadPage('HousesPage')
  },
  {
    path: '/houses/:id',
    name: 'HouseDetails',
    component: loadPage('HouseDetailsPage')
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: loadPage('JobsPage')
  },
  {
    path: '/jobs/:id',
    name: 'JobDetails',
    component: loadPage('JobDetailsPage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
