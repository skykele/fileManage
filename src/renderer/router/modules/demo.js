/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
import { sidebar8 } from '@/config'



const demoRouter = {
    path: '/template',
    component: Layout,
    meta: { title: 'AI创作', icon: 'example',image: sidebar8 },
    order: 2,
    roles: ['admin'],
    children: [
      {
        path: 'GPT',
        name: 'GPT',
        component: () => import('@/views/demo/gpt'),
        meta: { title: '文案创作', icon: 'example' }
      },
      // {
      //   path: 'demo',
      //   name: 'Demo',
      //   component: () => import('@/views/demo/index'),
      //   meta: { title: '例子', icon: 'example' }
      // }
      // ,{
      //   path: 'advanced',
      //   name: 'Advanced',
      //   component: () => import('@/views/demo/advanced'),
      //   meta: { title: '高级示例', icon: 'example' }
      // }
      // ,{
      //   path: 'device',
      //   name: 'Device',
      //   component: () => import('@/views/demo/device'),
      //   meta: { title: '设备', icon: 'logininfor' }
      // }
      // ,{
      //   path: 'excel',
      //   name: 'Excel',
      //   component: () => import('@/views/demo/excel'),
      //   meta: { title: 'Excel', icon: 'logininfor' }
      // }
      // ,{
      //   path: 'brower',
      //   name: 'Brower',
      //   component: () => import('@/views/demo/brower'),
      //   meta: { title: 'brower', icon: 'online' }
      // }      
    ]
  }

export default demoRouter
