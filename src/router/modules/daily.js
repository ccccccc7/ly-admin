import Home from '@/components/Home'

const dailyRouter = {
  path: '/daily',
  meta: {
    title: '日常记录',
    icon: 'el-icon-sunny'
  },
  component: Home,
  name: 'Daily',
  children: [
    {
      path: '/security',
      component: () => import('@/views/daily/Index'),
      name: 'SecurityIndex',
      meta: {title: '数据汇总'}
    },{
      path: '/replay',
      component: () => import('@/views/daily/replay/list'),
      name: 'ReplayList',
      meta: {title: '每日复盘'}
    }, {
      path: '/replay/add',
      component: () => import('@/views/daily/replay/add'),
      name: 'AddReplay',
      meta: {title: '新增复盘'},
      hidden: true
    }, {
      path: '/replay/edit/:id(\\d+)',
      component: () => import('@/views/daily/replay/edit'),
      name: 'EditReplay',
      meta: {title: '编辑复盘'},
      hidden: true
    }, {
      path: '/replay/:id(\\d+)',
      component: () => import('@/views/daily/replay/detail'),
      name: 'ReplayDetail',
      meta: {title: '复盘详情'},
      hidden: true
    }
  ]
}

export default dailyRouter


