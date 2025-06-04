import auth from '@/plugins/auth'
import router, {
	constantRoutes,
	dynamicRoutes
} from '@/router'
import Layout from '@/layout/index'
import ParentView from '@/components/ParentView'
import InnerLink from '@/layout/components/InnerLink'

const routesArr = [{
		id: 1,
		pid: 0,
		order: 1,
		roles: ['admin'],
		hidden: false,
		path: '/tools',
		title: '短视频',
		name: null,
		component: '',
		image: 'https://szr.huabeiwangluo.com/icons/4.png?id=4',
		activeMenu: null
	},
	{
		id: 2,
		pid: 1,
		order: null,
		roles: null,
		hidden: false,
		path: 'calendar',
		title: '短视频列表',
		name: 'Calendar',
		component: 'tools/calendar',
		image: null,
		activeMenu: null
	},
	{
		id: 3,
		pid: 1,
		order: null,
		roles: null,
		hidden: false,
		path: 'chuangzuo',
		title: '短视频创作',
		name: 'Chuangzuo',
		component: 'tools/chuangzuo',
		image: null,
		activeMenu: null
	},
	{
		id: 4,
		pid: 0,
		order: 2,
		roles: ['admin'],
		hidden: false,
		path: '/template',
		title: 'AI创作',
		name: null,
		component: '',
		image: 'https://szr.huabeiwangluo.com/icons/8.png?id=8',
		activeMenu: null
	},
	{
		id: 5,
		pid: 4,
		roles: null,
		order: null,
		hidden: false,
		name: 'GPT',
		path: 'GPT',
		title: '文案创作',
		component: 'demo/gpt',
		image: null,
		activeMenu: null
	},
	{
		id: 6,
		pid: 0,
		order: 1,
		roles: ['admin'],
		hidden: false,
		path: '/aidraw',
		title: 'AI绘画',
		name: null,
		component: '',
		image: 'https://szr.huabeiwangluo.com/icons/2.png?id=2',
		activeMenu: null
	},
	{
		id: 7,
		pid: 6,
		order: null,
		roles: null,
		hidden: false,
		name: 'Draw',
		path: 'draw',
		title: 'AI绘画',
		component: 'aidraw/draw',
		image: null,
		activeMenu: null
	},
	{
		id: 8,
		pid: 0,
		order: 1,
		roles: ['admin'],
		hidden: false,
		path: '/live',
		title: 'AI直播',
		name: null,
		component: '',
		image: 'https://szr.huabeiwangluo.com/icons/3.png?id=3',
		activeMenu: null
	},
	{
		id: 9,
		pid: 8,
		order: null,
		roles: null,
		hidden: false,
		name: 'Video',
		path: 'video',
		title: '直播视频',
		component: 'live/video',
		image: null,
		activeMenu: null
	},
	{
		id: 10,
		pid: 8,
		order: null,
		roles: null,
		hidden: false,
		name: 'Message',
		path: 'message',
		title: '关键词回复',
		component: 'live/message',
		image: null,
		activeMenu: null
	},
	{
		id: 19,
		pid: 8,
		order: null,
		roles: null,
		hidden: false,
		name: 'VideoMessage',
		path: 'videoMessage',
		title: '视频话术',
		component: 'live/videoMessage',
		image: null,
		activeMenu: null
	},
	{
		id: 11,
		pid: 8,
		order: null,
		roles: null,
		hidden: false,
		name: 'Goods',
		path: 'goods',
		title: '商品讲解',
		component: 'live/goods',
		image: null,
		activeMenu: null
	},
	{
		id: 12,
		pid: 8,
		order: null,
		roles: null,
		hidden: false,
		name: 'Livefangan',
		path: 'livefangan',
		title: '直播方案',
		component: 'live/livefangan',
		image: null,
		activeMenu: null
	},
	{
		id: 13,
		pid: 8,
		order: null,
		roles: null,
		hidden: true,
		name: 'AddMessage',
		path: 'addMessage',
		title: '添加话术',
		component: 'live/components/addMessage',
		image: null,
		activeMenu: '/live/message'
	},
	{
		id: 13,
		pid: 8,
		order: null,
		roles: null,
		hidden: true,
		name: 'AddVideoMessage',
		path: 'addVideoMessage',
		title: '添加视频话术',
		component: 'live/components/addVideoMessage',
		image: null,
		activeMenu: '/live/videoMessage'
	},
	{
		id: 14,
		pid: 8,
		order: null,
		roles: null,
		hidden: true,
		name: 'Config',
		path: 'config',
		title: '导航列表',
		component: 'live/components/config',
		image: null,
		activeMenu: null
	},
	{
		id: 15,
		pid: 8,
		order: null,
		roles: null,
		hidden: true,
		name: 'CreateVideo',
		path: 'createVideo',
		title: '数字人',
		component: 'live/components/createVideo',
		image: null,
		activeMenu: '/live/video'
	},
	{
		id: 16,
		pid: 8,
		order: null,
		roles: null,
		hidden: true,
		name: 'LiveFangAnDetail',
		path: 'liveFangAnDetail',
		title: '直播方案详情',
		component: 'live/components/liveFangAnDetail',
		image: null,
		activeMenu: '/live/livefangan'
	},
	{
		id: 21,
		pid: 0,
		order: 1,
		roles: ['admin'],
		hidden: false,
		name: null,
		path: '/human',
		title: '人声训练',
		component: '',
		image: 'https://szr.huabeiwangluo.com/icons/5.png?id=5',
		activeMenu: null
	},{
		id: 22,
		pid: 21,
		order: null,
		roles: null,
		hidden: false,
		name: 'HumanList',
		path: '/',
		title: '人声训练',
		component: 'humanVoice/index',
		image: null,
		activeMenu: null
	},
	// {
	// 	id: 23,
	// 	pid: 21,
	// 	order: null,
	// 	roles: null,
	// 	hidden: false,
	// 	name: 'HumanDetail',
	// 	path: 'two',
	// 	title: '人声训练详情',
	// 	component: 'humanVoice/two',
	// 	image: null,
	// 	activeMenu: null
	// },
	{
		id: 17,
		pid: 0,
		order: 1,
		roles: ['admin'],
		hidden: false,
		name: null,
		path: '/setting',
		title: '设置',
		component: '',
		image: 'https://szr.huabeiwangluo.com/icons/5.png?id=5',
		activeMenu: null
	},
	{
		id: 18,
		pid: 17,
		order: null,
		roles: null,
		hidden: false,
		name: 'Setting',
		path: '/',
		title: '设置',
		component: 'setting/index',
		image: null,
		activeMenu: null
	}
]

// 创建树形数据函数
function createTree(arr, pid) {
	let tree = []
	arr.forEach(e => {
		if (pid == e.pid) {
			e.children = createTree(arr, e.id)
			tree.push(e)
		}
	})
	return tree
}


// 生成路由
function filterAsyncRoutes(routes) {
	const res = []
	for (let i = 0; i < routes.length; i++) {
		console.log(routes[i].component === '' ? '没有' : `${routes[i].title} -- @/views/${routes[i].component}.vue`);
		res.push({
			path: routes[i].path,
			order: routes[i].order || null,
			component: routes[i].component === '' ? Layout : (resolve) => require([
				`@/views/${routes[i].component}.vue`
			], resolve),
			name: routes[i].name || '',
			hidden: routes[i].hidden,
			roles: routes[i].roles || null,
			meta: {
				title: routes[i].title || '',
				activeMenu: routes[i].activeMenu || '',
				image: routes[i].image || '',
			},
			children: routes[i].children && routes[i].children.length ? filterAsyncRoutes(routes[i].children) :
				[]
		})
	}
	return res
}


const permission = {
	state: {
		routes: [],
		addRoutes: [],
		defaultRoutes: [],
		topbarRouters: [],
		sidebarRouters: [],
		showSideBar: true,
	},
	mutations: {
		SET_ROUTES: (state, routes) => {
			state.addRoutes = routes
			state.routes = constantRoutes.concat(routes)
		},
		SET_DEFAULT_ROUTES: (state, routes) => {
			state.defaultRoutes = constantRoutes.concat(routes)
		},
		SET_TOPBAR_ROUTES: (state, routes) => {
			state.topbarRouters = routes
		},
		SET_SIDEBAR_ROUTERS: (state, routes) => {
			state.sidebarRouters = routes
		},
		SET_SHOW_SIDEBAR: (state, flag) => {
			state.showSideBar = flag
		}
	},
	actions: {
		// 生成路由
		GenerateRoutes({
			commit
		}) {
			return new Promise(resolve => {
				const routesList = createTree(routesArr, 0)
				const routes = filterAsyncRoutes(routesList)
				// console.log(aa);

				// 向后端请求路由数据
				let res = {
					data: []
				}
				const sdata = JSON.parse(JSON.stringify(res.data))
				const rdata = JSON.parse(JSON.stringify(res.data))
				const sidebarRoutes = filterAsyncRouter(sdata)

				const rewriteRoutes = filterAsyncRouter(rdata, false, true)
				const asyncRoutes = filterDynamicRoutes(routes);

				rewriteRoutes.push({
					path: '*',
					redirect: '/404',
					hidden: true
				})

				router.addRoutes(asyncRoutes)
				commit('SET_ROUTES', rewriteRoutes)
				// 普通侧边菜单
				commit('SET_SIDEBAR_ROUTERS', constantRoutes.concat(sidebarRoutes))
				commit('SET_DEFAULT_ROUTES', sidebarRoutes)
				// topbar模式
				commit('SET_TOPBAR_ROUTES', constantRoutes.concat(asyncRoutes))
				asyncRoutes.push({
					path: '*',
					redirect: '/404',
					hidden: true
				})
				resolve(asyncRoutes)
			})
		},
		// 是否显示二级菜单
		changeShowSidebar({
			commit
		}, flag) {
			commit('SET_SHOW_SIDEBAR', flag)
		}
	}
}

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
	return asyncRouterMap.filter(route => {
		if (type && route.children) {
			route.children = filterChildren(route.children)
		}
		if (route.component) {
			// Layout ParentView 组件特殊处理
			if (route.component === 'Layout') {
				route.component = Layout
			} else if (route.component === 'ParentView') {
				route.component = ParentView
			} else if (route.component === 'InnerLink') {
				route.component = InnerLink
			} else {
				// route.component = loadView(route.component)
			}
		}
		if (route.children != null && route.children && route.children.length) {
			route.children = filterAsyncRouter(route.children, route, type)
		} else {
			delete route['children']
			delete route['redirect']
		}
		return true
	})
}

function filterChildren(childrenMap, lastRouter = false) {
	var children = []
	childrenMap.forEach((el, index) => {
		if (el.children && el.children.length) {
			if (el.component === 'ParentView' && !lastRouter) {
				el.children.forEach(c => {
					c.path = el.path + '/' + c.path
					if (c.children && c.children.length) {
						children = children.concat(filterChildren(c.children, c))
						return
					}
					children.push(c)
				})
				return
			}
		}
		if (lastRouter) {
			el.path = lastRouter.path + '/' + el.path
		}
		children = children.concat(el)
	})
	return children
}

// 动态路由遍历，验证是否具备权限
export function filterDynamicRoutes(routes) {
	const res = []
	routes.forEach(route => {
		if (route.permissions) {
			if (auth.hasPermiOr(route.permissions)) {
				res.push(route)
			}
		} else if (route.roles) {
			if (auth.hasRoleOr(route.roles)) {
				res.push(route)
			}
		}
	})

	return res
}

export const loadView = (view) => {

	if (process.env.NODE_ENV === 'development') {
		return (resolve) => require([`@/views/${view}`], resolve)
	} else {
		// 使用 import 实现生产环境的路由懒加载
		return () => import(`@/views/${view}`)
	}
}

export default permission