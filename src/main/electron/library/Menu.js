// 这里是定义菜单的地方，详情请查看 https://electronjs.org/docs/api/menu

const {dialog, Menu,shell} = require('electron');
const os = require('os')
const join = require('path').join
const openAboutWindow = require('about-window').default
const contextMenu = require('electron-context-menu');
const version = require('../../../../package.json').version
const menuconfig = [
  {
    label: '设置',
    submenu: [
      {label: '快速重启', accelerator: 'F5',role: 'reload'},
      {label: '退出',accelerator: 'CmdOrCtrl+F4', role: 'close'}
    ]
  }
  ,{
    label: '帮助',
    submenu: [
      {label: '文档', click: () =>  function () {info()} },
      {label: '关于', click: () => about()}
    ]
  }
]

contextMenu({
	prepend: (defaultActions, parameters, browserWindow) => [
		{
			label: '图片',
			// Only show it when right-clicking images
			visible: parameters.mediaType === 'image'
		},
		{
			label: '搜索一下 “{selection}”',
			// Only show it when right-clicking text
			visible: parameters.selectionText.trim().length > 0,
			click: () => {
				shell.openExternal(`https://baidu.com/search?q=${encodeURIComponent(parameters.selectionText)}`);
			}
		}
	]
});

/**
 * 菜单模块
 */
 module.exports = {
  /**
   * 安装
   */
  install () {
    // 这里设置只有开发环境才注入显示开发者模式
    // if (process.env.NODE_ENV === 'development') {  
    //   menuconfig.push({label: '开发者设置', submenu: [{ label: '切换到开发者模式', accelerator: 'CmdOrCtrl+I', role: 'toggledevtools'}]})
    // }
    // 载入菜单
    // const menu = Menu.buildFromTemplate(menuconfig)
    // Menu.setApplicationMenu(menu)
  }
 }

function info () {
  dialog.showMessageBox({
    title: '关于',
    type: 'info',
    message: 'Future-Electron框架',
    detail: `版本信息：${version}\n引擎版本：${process.versions.v8}\n当前系统：${os.type()} ${os.arch()} ${os.release()}`,
    noLink: true,
    buttons: ['查看github', '确定']
  })
}

function about(){
  return openAboutWindow({
    icon_path: join(__static, '/icon.png'),
    copyright: 'Copyright (c) 2022 future',
    use_version_info: true,
    package_json_dir: __dirname,
    open_devtools: process.env.NODE_ENV !== 'production',
    description: `版本信息：${version}\n引擎版本：${process.versions.v8}\n当前系统：${os.type()} ${os.arch()} ${os.release()}`
  })
}