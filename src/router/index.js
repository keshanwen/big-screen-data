import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('../views/map.vue')
    },
     {
      path: '/map1',
      name: 'map1',
      component: () => import('../views/map1.vue')
    },
      {
      path: '/map2',
      name: 'map2',
      component: () => import('../views/map2.vue')
    },
       {
      path: '/map3',
      name: 'map3',
      component: () => import('../views/map3.vue')
    },
    {
      path: '/map4',
      name: 'map4',
      component: () => import('../views/map4.vue')
    },
     {
      path: '/map5',
      name: 'map5',
      component: () => import('../views/map5.vue')
    },
    {
      path: '/map6',
      name: 'map6',
      component: () => import('../views/map4.vue')
    }
  ]
})

export default router
