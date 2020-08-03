import Vue from 'vue'
import VueResource from 'vue-resource'
import Router from 'vue-router'
import Home from '@/components/Home'
import Index from '@/components/Index'
import UserList from '@/components/user/List'
import dailyRouter from './modules/daily'

Vue.use(Router)
Vue.use(VueResource)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      iconCls: 'el-icon-menu',
      redirect: 'index',
      meta: {
        title: '首页'
      },
      hidden: true,
      children: [
        {path: '/index', component: Index, name: '首页'}
      ]
    }, {
      path: '/',
      name: 'User',
      meta: {
        title: '用户管理',
        icon: 'el-icon-setting',
      },
      component: Home,
      children: [
        {
          path: '/user/list',
          component: UserList,
          name: 'UserList',
          meta: {
            title: '用户列表'
          }
        }
      ]
    },
    dailyRouter
    }, {
      path: '/security',
      name: '梭哈',
      component: Home,
      menuShow: true,
      iconCls: 'el-icon-sunny',
      redirect: '/security/index',
      children: [{
          path: '/security/index',
          name: '数据汇总',
          component: () => import('@/views/security/Home')
      }]
    }
  ]
})


router.beforeEach((to, from, next) => {
  console.log(to)
  next()
});

export default router
