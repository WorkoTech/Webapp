import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
import Call from '@/views/Call/Call'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'workspace',
      component: DashboardLayout,
      children: [
        {
          path: '/editor/:id',
          name: 'editor',
          component: () => import(/* webpackChunkName: "views" */ './views/Editor/Editor.vue')
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import(/* webpackChunkName: "views" */ './views/Dashboard.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import(/* webpackChunkName: "views" */ './views/Profile/UserProfile.vue')
        },
        {
          path: '/workspace',
          name: 'workspaces',
          component: () => import(/* webpackChunkName: "views" */ './views/Workspace/List.vue')
        },
        {
          path: '/workspace/:id',
          name: 'workspace',
          component: () => import(/* webpackChunkName: "views" */ './views/Workspace/Detail.vue')
        },
        {
          path: '/billing',
          name: 'billing',
          component: () => import(/* webpackChunkName: "views" */ './views/Billing/Billing.vue')
        }
      ]
    },
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "views" */ './views/Authentication/Login.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import(/* webpackChunkName: "views" */ './views/Authentication/Register.vue')
        },
        {
          path: '/logout',
          name: 'logout',
          component: () => import(/* webpackChunkName: "views" */ './views/Authentication/Logout.vue')
        },
        {
          path: '/plans',
          name: 'plans',
          component: () => import(/* webpackChunkName: "views"*/ './views/Billing/Plans.vue')
        }
      ]
    },
    {
      path: '/call',
      component: Call
    }
  ]
})
