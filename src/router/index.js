import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Index from '@/components/Index'
import UserList from '@/components/user/List'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home,
      menuShow: true,
      iconCls: 'el-icon-menu',
      redirect: 'index',
      leaf: true, //只有一个节点
      children: [
        {path: '/index', component: Index, name: '首页', menuShow: false}
      ]
    }, {
      path: '/',
      name: '用户管理',
      menuShow: true,
      component: Home,
      iconCls: 'el-icon-setting',
      children: [
        {path: '/user/list', component: UserList, name: '用户列表', menuShow: true}
      ]
    }
  ]
})
