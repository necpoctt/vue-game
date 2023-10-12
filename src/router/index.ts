import { createRouter, createWebHistory } from 'vue-router';

export const constantRoutes = [

  {
    path: '/',
    component: () => import('@/views/freeWheelGame.vue'),
  },
];

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

/**
 * 重置路由
 */
export function resetRouter() {
  router.replace({ path: '/login' });
  location.reload();
}

export default router;
