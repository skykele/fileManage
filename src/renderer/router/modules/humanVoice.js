/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
import { sidebar2 } from '@/config'

const configRouter =  {
    path: '/humanVoice',
    component: Layout,
    meta: { title: '人声训练', icon: 'nested', image: sidebar2 },
    order: 1,
    roles: ['admin'],
    children: [
     {
        path: 'training',
        name: 'Training',
        component: () => import('@/views/humanVoice/index'),
        meta: { title: '人声训练', icon: 'date' }
      },
	  {
	     path: 'two',
	     name: 'HumanDetail',
	     component: () => import('@/views/humanVoice/two'),
	     meta: { title: '人声训练', icon: 'date' }
	   }
    ]
  }

export default configRouter