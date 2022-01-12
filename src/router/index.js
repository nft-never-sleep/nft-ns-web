import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Collectible from "../views/Collectible.vue"
import Recent from "../views/Recent.vue"
import Browse from "../views/Browse.vue"
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: "browse",
        // component: () => import(/* webpackChunkName: "browse" */ '../views/Browse.vue')
        component:Browse
      }, {
        path: "collectible",
        // component: () => import(/* webpackChunkName: "collectible" */ '../views/Collectible.vue')
        component:Collectible
      }, {
        path: "recent",
        // component: () => import(/* webpackChunkName: "recent" */ '../views/Recent.vue')
        component:Recent
      }
    ]
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
