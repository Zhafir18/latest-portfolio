import { createRouter, createWebHistory } from 'vue-router'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/work',
      component: () => import('../views/WorkView.vue'),
    },
    {
      path: '/work/:slug',
      component: () => import('../views/WorkDetailView.vue'),
    },
    {
      path: '/stack',
      component: () => import('../views/StackView.vue'),
    },
    {
      path: '/contact',
      component: () => import('../views/ContactView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

// Refresh ScrollTrigger after each navigation so new-page triggers register correctly
router.afterEach(() => {
  setTimeout(() => ScrollTrigger.refresh(), 50)
})

export default router
