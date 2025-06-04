/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
import { sidebar3 } from '@/config'



const configRouter =  {
    path: '/live',
    component: Layout,
    meta: { title: 'AI直播', icon: 'nested',image: sidebar3 },
    order: 1,
    roles: ['admin'],
    children: [
     {
        path: 'video',
        name: 'Video',
        component: () => import('@/views/live/video'),
        meta: { title: '直播视频', icon: 'date' }
      },
      {
        path: 'message',
        name: 'Message',
        component: () => import('@/views/live/message'),
        meta: { title: '关键词回复', icon: 'date' }
      },
      {
        path: 'videoMessage',
        name: 'VideoMessage',
        component: () => import('@/views/live/videoMessage'),
        meta: { title: '视频话术', icon: 'date' }
      },
      {
        path: 'goods',
        name: 'Goods',
        component: () => import('@/views/live/goods'),
        meta: { title: '商品讲解', icon: 'date' }
      },
      {
        path: 'livefangan',
        name: 'Livefangan',
        component: () => import('@/views/live/livefangan'),
        meta: { title: '直播方案', icon: 'date' }
      },
      {
        path: 'addMessage',
        name: 'AddMessage',
        hidden: true,
        component: () => import('@/views/live/components/addMessage'),
        meta: { title: '添加话术', icon: 'date', activeMenu: '/live/message' }
      },
      {
        path: 'addVideoMessage',
        name: 'AddVideoMessage',
        hidden: true,
        component: () => import('@/views/live/components/addVideoMessage'),
        meta: { title: '添加视频话术', icon: 'date', activeMenu: '/live/videoMessage' }
      },
      {
        path: 'config',
        name: 'Config',
        hidden: true,
        component: () => import('@/views/live/components/config'),
        meta: { title: '导航列表', icon: 'date' }
      },
      {
        path: 'createVideo',
        name: 'CreateVideo',
        hidden: true,
        component: () => import('@/views/live/components/createVideo'),
        meta: { title: '数字人', icon: 'date', activeMenu: '/live/video' }
      },
      {
        path: 'liveFangAnDetail',
        name: 'LiveFangAnDetail',
        hidden: true,
        component: () => import('@/views/live/components/liveFangAnDetail'),
        meta: { title: '直播方案详情', icon: 'date', activeMenu: '/live/livefangan' }
      }
    ]
  }

export default configRouter
