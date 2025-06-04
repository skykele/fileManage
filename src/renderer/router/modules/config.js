/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const configRouter =  {
    path: '/config',
    component: Layout,
    meta: { title: '配置', icon: 'skill' },
    order: 2,
    roles: ['admin'],
    children: [
      {
        path: 'server',
        name: 'Server',
        component: () => import('@/views/config/server/index'),
        meta: { title: '远程', icon: 'server' }
      }
      ,{
        path: 'active',
        name: 'Active',
        component: () => import('@/views/config/server/active'),
        meta: { title: '激活', icon: 'log' }
      }
      ,{
        path: 'log',
        name: 'Log',
        component: () => import('@/views/config/log/index'),
        meta: { title: '日志', icon: 'log' }
      }
      ,{
        path: 'about/version',
        name: 'AboutVersion',
        component: () => import('@/views/config/about/version'),
        meta: { title: '版本', icon: 'time' }
      }
      ,{
        path: 'about',
        name: 'About',
        component: () => import('@/views/config/about/index'),
        meta: { title: '关于', icon: 'star' }
      }
    ]
  }

export default configRouter
