/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
import { sidebar5 } from '@/config'

const configRouter =  {
    path: '/setting',
    component: Layout,
    meta: { title: '设置', icon: 'nested',image: sidebar5 },
    order: 1,
    roles: ['admin'],
    children: [
     {
        path: '/',
        name: 'Setting',
        component: () => import('@/views/setting/index'),
        meta: { title: '设置', icon: 'date' }
      }
    ]
  }

export default configRouter
