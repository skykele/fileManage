/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
import { sidebar2 } from '@/config'

const configRouter =  {
    path: '/aidraw',
    component: Layout,
    meta: { title: 'AI绘画', icon: 'nested',image: sidebar2 },
    order: 1,
    roles: ['admin'],
    children: [
     {
        path: 'draw',
        name: 'Draw',
        component: () => import('@/views/aidraw/draw'),
        meta: { title: 'AI绘画', icon: 'date' }
      }
    ]
  }

export default configRouter