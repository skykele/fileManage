import Vue from 'vue'

const { ipcRenderer } = window.require('electron');
import Element from 'element-ui'
import './assets/styles/element-variables.scss'

import '@/assets/styles/index.scss' // global css
import '@/assets/styles/future.scss' // future css
import App from './App'
import store from './store'
import router from './router'
import directive from './directive' // directive
import plugins from './plugins' // plugins
import './error'
import '@/assets/iconfont/iconfont.css'
import setBar from '@/mixins' // mixis 混入，判断是否显示二级导航

import './assets/icons' // icon
import './permission' // permission control

import { parseTime, resetForm, addDateRange, handleTree } from "@/utils/future";
// 拖拽补丁
import Patch_Overlay from '@/components/patch-overlay/patch-overlay.js'
// 分页组件
import Pagination from "@/components/Pagination";
// 自定义表格工具组件
import RightToolbar from "@/components/RightToolbar"
// 文件上传组件
import FileUpload from "@/components/FileUpload"
// 图片上传组件
import ImageUpload from "@/components/ImageUpload"
// 图片预览组件
import ImagePreview from "@/components/ImagePreview"
// 字典标签组件
import DictTag from '@/components/DictTag'
// 头部标签组件
import VueMeta from 'vue-meta'
// 虚拟滚动
import UmyUI from 'umy-ui'
import 'umy-ui/lib/theme-chalk/index.css'

Vue.use(UmyUI)

// 全局方法挂载
const {ipcRenderer: ipc} = require('electron-better-ipc');
Vue.prototype.$ipc = ipc
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.$ipcRenderer = ipcRenderer

Vue.prototype.handleTree = handleTree

// 全局组件挂载
Vue.component('DictTag', DictTag)
Vue.component('Pagination', Pagination)
Vue.component('RightToolbar', RightToolbar)

Vue.component('FileUpload', FileUpload)
Vue.component('ImageUpload', ImageUpload)
Vue.component('ImagePreview', ImagePreview)

Vue.use(Patch_Overlay)
Vue.use(directive)
Vue.use(plugins)
Vue.use(VueMeta)
Vue.use(setBar)

if (!process.env.IS_WEB) {
  if (!require('../../config').IsUseSysTitle) {
    require('@/assets/electron/custom-title.scss')
  }
}


// 引入 i18n 语言包
import VueI18n from 'vue-i18n'
import loadLanguage from "./i18n"
const languages = loadLanguage()
// 创建 i18n
Vue.use(VueI18n) // 新版本必须要这个，不知道为什么
const i18n = new VueI18n({
  locale: 'zh-CN', // 设置默认语言
  messages: languages, // 设置语言包
});
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

Vue.use(Element, {
  size: localStorage.getItem('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})

