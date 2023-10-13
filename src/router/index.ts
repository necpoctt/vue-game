import { createRouter, createWebHistory } from 'vue-router';

export const constantRoutes = [

  {
    path: '/',
    component: () => import('@/views/freeWheelGame.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,

  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
