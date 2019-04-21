import Home from '@/components/Home'

const dailyRouter = {
  path: '/',
  meta: {
    title: '日常记录',
    icon: 'el-icon-tickets'
  },
  component: Home,
  name: 'Daily',
  children: [
    {
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
    }
  ]
}

export default dailyRouter


