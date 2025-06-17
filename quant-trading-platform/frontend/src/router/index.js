import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: { hideLayout: true }
    },
    {
      path: '/register',
      name: 'register', 
      component: () => import('@/views/Register.vue'),
      meta: { hideLayout: true }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/Dashboard.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/strategy',
      name: 'strategy',
      component: () => import('@/views/Strategy/StrategyList.vue'),
      meta: { requiresAuth: false },
      children: [
        {
          path: 'create',
          name: 'strategyCreate',
          component: () => import('@/views/Strategy/StrategyCreate.vue')
        },
        {
          path: 'edit/:id',
          name: 'strategyEdit',
          component: () => import('@/views/Strategy/StrategyEdit.vue')
        },
        {
          path: 'detail/:id',
          name: 'strategyDetail',
          component: () => import('@/views/Strategy/StrategyDetail.vue')
        }
      ]
    },
    {
      path: '/strategy/create',
      name: 'strategyCreatePage',
      component: () => import('@/views/Strategy/StrategyCreate.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/strategy/edit/:id',
      name: 'strategyEditPage',
      component: () => import('@/views/Strategy/StrategyEdit.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/strategy/detail/:id',
      name: 'strategyDetailPage',
      component: () => import('@/views/Strategy/StrategyDetail.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/backtest',
      name: 'backtest',
      component: () => import('@/views/Backtest/BacktestList.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/backtest/create',
      name: 'backtestCreate',
      component: () => import('@/views/Backtest/BacktestCreate.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/backtest/result/:id',
      name: 'backtestResult',
      component: () => import('@/views/Backtest/BacktestResult.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/data/stocks',
      name: 'stockData',
      component: () => import('@/views/Data/StockData.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/data/charts',
      name: 'charts',
      component: () => import('@/views/Data/Charts.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/ai-assistant',
      name: 'aiAssistant',
      component: () => import('@/views/AIAssistant.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/Profile.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/NotFound.vue')
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  // 临时注释掉认证检查，便于测试
  // if (to.meta.requiresAuth && !token) {
  //   next('/login')
  // } else if ((to.name === 'login' || to.name === 'register') && token) {
  //   next('/dashboard')
  // } else {
  //   next()
  // }
  
  next() // 临时放行所有路由
})

export default router 