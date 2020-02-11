import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
// import Home from '../views/Home.vue'
import { Notification } from 'element-ui'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: { name: 'movie-list' }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  { path: '/users/login', alias: '/login', name: 'login', component: () => import('../views/user/login.vue') },
  { path: '/users/register', alias: '/register', name: 'register', component: () => import('../views/user/register.vue') },
  {
    path: '/movies',
    component: () => import('../views/layout/movie.vue'),
    children: [
      { path: 'create', name: 'movie-create', component: () => import('../views/movie/create.vue'), meta: { auth: true } },
      { path: 'detail/:id', name: 'movie-detail', component: () => import('../views/movie/detail.vue') },
      { path: 'list', name: 'movie-list', component: () => import('../views/movie/list.vue') }
    ]
  },
  { path: '*', redirect: { name: 'movie-list' } }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((router) => router.meta.auth)) {
    if (store.state.isUserLogin) {
      next()
    } else {
      // TODO: 提示用户访问的页面需要登录
      Notification({
        title: '提示',
        type: 'warning',
        message: '请登录后再访问该页面'
      })
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      })
    }
  }
  next()
})

export default router
