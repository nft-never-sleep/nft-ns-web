import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Collectible from "../views/Collectible.vue"
import Recent from "../views/Recent.vue"
import Browse from "../views/Browse.vue"
const routes = [
  { path: '/', name: '', redirect: { name: 'Home' } },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: { path: '/home/browse' },
    children: [
      {
        path: "browse",
        component: () => import(/* webpackChunkName: "browse" */ '../views/Browse.vue')
      }, {
        path: "collectible",
        component: () => import(/* webpackChunkName: "collectible" */ '../views/Collectible.vue')
      }, {
        path: "recent",
        component: () => import(/* webpackChunkName: "recent" */ '../views/Recent.vue')
      },
      {
        path: "test",
        component: () => import(/* webpackChunkName: "recent" */ '../views/test.vue')
      },
    ]
  },
  {
    path: "/detail/:token_id",
    name: "Detail",
    component: () => import(/* webpackChunkName: "detail" */ '../views/Detail.vue'),
  },
  {
    path: "/search",
    name: "Search",
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue'),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
