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
      component: () => import('../views/map6.vue')
    },
    {
      path: '/map7',
      name: 'map7',
      component: () => import('../views/map7.vue')
    },
    {
      path: '/map8',
      name: 'map8',
      component: () => import('../views/map8.vue')
    },
    {
      path: '/map9',
      name: 'map9',
      component: () => import('../views/map9.vue')
    },
    {
      path: '/map10',
      name: 'map10',
      component: () => import('../views/map10.vue')
    },
     {
      path: '/map11',
      name: 'map11',
      component: () => import('../views/map11.vue')
    },
    {
      path: '/map12',
      name: 'map12',
      component: () => import('../views/map12.vue')
    },
    {
      path: '/map13',
      name: 'map13',
      component: () => import('../views/map13.vue')
    }
  ]
})

export default router
