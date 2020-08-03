import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Index from '@/components/Index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home,
      iconCls: 'el-icon-menu',
      redirect: 'index',
      leaf: true, //根节点
      children: [
        {path: '/index', component: Index, name: '首页', hidden: true}
      ]
    }, {
      path: '/user',
      name: '用户管理',
      component: Home,
      iconCls: 'el-icon-setting',
      redirect:'list',
      children: [
        {path: '/user/list', component: () => import('@/components/user/List'), name: '用户列表'}
      ]
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
