import Vue from 'vue'
import VueResource from 'vue-resource'
import Router from 'vue-router'
import Home from '@/components/Home'
import Index from '@/components/Index'
import UserList from '@/components/user/List'
import DailyList from '@/components/daily/List'
import CostList from '@/components/daily/Cost'
import NewsList from '@/components/daily/News'

Vue.use(Router)
Vue.use(VueResource)

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
    }, {
      path: '/',
      name: '日常记录',
      menuShow: true,
      component: Home,
      iconCls: 'el-icon-tickets',
      children: [
        {path: '/daily/list', component: DailyList, name: '事件流水', menuShow: true},
        {path: '/daily/cost', component: CostList, name: '日常收支', menuShow: true},
        {path: '/daily/news', component: NewsList, name: '新闻', menuShow: true}
      ]
    }
  ]
})
