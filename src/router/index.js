import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: '登录',
      component: () => import('../views/LoginAndRegister.vue')
    },
    {
      path: '/',
      component: () => import('@/views/Layout.vue'),
      redirect: '/ucenter/about',
      children: [
        {
          path: '/ucenter',
          name: '用户中心',
          children: [
            {
              name: '个人信息',
              path: 'about',
              component: () => import('../views/ucenter/About.vue')
            },
            {
              name: '申请成为管理员',
              path: 'apply',
              component: () => import('../views/ucenter/Apply.vue')
            },
            {
              name: '修改密码',
              path: 'modifyPassword',
              component: () => import('../views/ucenter/ModifyPassword.vue')
            }
          ]
        },
        {
          path: '/spectrum',
          name: '光谱处理与分析',
          component: () => import('../views/spectrum/spectrum.vue')
        },
        {
          path: '/model',
          name: '建模分析',
          component: () => import('../views/model/ModelAnalysis.vue')
        },
        {
          path: '/package',
          name: '收藏夹',
          children: [
            {
              name: '我的算法',
              path: 'algorithm',
              component: () => import('../views/package/MyAlgorithm.vue')
            },
            {
              name: '我的光谱',
              path: 'spectrum',
              component: () => import('../views/package/MySpectrum.vue')
            },
            {
              name: '回收站',
              path: 'recycle',
              component: () => import('../views/package/MyRecycle.vue')
            }
          ]
        },
        {
          path: '/userAdmin',
          name: '用户管理',
          component: () => import('../views/admin/UserAdmin.vue')
        },
        {
          path: '/specLibAdmin',
          name: '标准库管理',
          component: () => import('../views/admin/SpecLibAdmin.vue')
        },
        {
          path: '/algoLibAdmin',
          name: '算法库管理',
          component: () => import('../views/admin/AlgoLibAdmin.vue')
        },
        {
          path: '/auditAdmin',
          name: '审核管理',
          component: () => import('../views/admin/AuditAdmin.vue')
        },
        {
          path: '/logAdmin',
          name: '日志管理',
          component: () => import('../views/admin/LogAdmin.vue')
        },
        {
          path: '/typeAdmin',
          name: '类型管理',
          component: () => import('../views/admin/TypeAdmin.vue')
        },
        {
          path: '/dataAdmin',
          name: '备份管理',
          component: () => import('../views/admin/DataAdmin.vue')
        },
      ]
    }
  ]
})

export default router
