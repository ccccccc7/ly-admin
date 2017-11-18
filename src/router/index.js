import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Index from '@/components/Index'
import UserList from '@/components/user/list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home,
      redirect: '/index',
      menuShow: true,
      iconCls: 'el-icon-menu',
      leaf: true,
      children: [
        {path: '/index', component: Index, name: '首页', menuShow: true}
      ]
    },{
      path: '/user',
      name: '用户管理',
      menuShow: true,
      iconCls: 'el-icon-setting',
      children: [
        {path: '/list', component: UserList,name: '用户列表',menuShow:true }
      ]
    }
  ]
})
