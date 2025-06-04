/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
import { sidebar4 } from '@/config'



const configRouter =  {
    path: '/tools',
    component: Layout,
    meta: { title: '短视频', icon: 'nested',image: sidebar4 },
    order: 1,
    roles: ['admin'],
    children: [
     {
        path: 'calendar',
        name: 'Calendar',
        component: () => import('@/views/tools/calendar'),
        meta: { title: '短视频列表', icon: 'date' }
      },
      {
        path: 'chuangzuo',
        name: 'Chuangzuo',
        component: () => import('@/views/tools/chuangzuo'),
        meta: { title: '短视频创作', icon: 'date' }
      }
    ]
  }

export default configRouter
