import { BrowserWindow, app, ipcMain } from 'electron'
import { platform } from "os"
const logger = require('../services/logger').setup('windowManager')
import config from '@config/index'
import {loadingURL,winURL } from '../config/StaticPath'
const menu = require('./Menu')
import { Menu } from 'electron'
const tray = require('./Tray')
// const menubar = require('./Menubar')
const remote = require('@electron/remote/main')
remote.initialize();
import { minSizeTitle } from '../../utils/config'

var loadWindow = null
export var mainWindow = null

function createMainWindow() {
  let isFrame = true  
  // 这里设置只有开发环境才注入显示开发者模式 production development
  if (process.env.NODE_ENV === 'development') {
    isFrame = true
  }
  /**
  * Initial window options
  */
  Menu.setApplicationMenu(null)
  mainWindow = new BrowserWindow({
    height: 900,
    width: 1600,
    minWidth: 1600,
    // maxWidth: 1600,
    minheight: 900,
    // maxheight: 900,
    useContentSize: true,
    resizable: false,
    show: false,
    frame: isFrame, // 是否显示边框
    // transparent: isFrame, //无框窗口透明
    titleBarStyle:  'hidden',
    webPreferences: {
      contextIsolation: false,// 设置此项为false后，才可在渲染进程中使用electron api
      nodeIntegration: true,
      enableRemoteModule:true,
      webSecurity: false,
      spellcheck: true,
      webviewTag: false,  //是否启用<webview>标签
      devTools: process.env.NODE_ENV === 'development', // 如果是开发模式可以使用devTools
      scrollBounce: process.platform === 'darwin'  // 在macos中启用橡皮动画
    }
  })

  // mainWindow.loadURL('../../../renderer/layout/components/drag.vue');

  remote.enable(mainWindow.webContents)
  // 载入菜单
  // menu.install(mainWindow)
  // tray.install(mainWindow)
  logger.info('载入页面winURL',winURL)
 
  mainWindow.loadURL(winURL)

  mainWindow.webContents.once('dom-ready', () => {
    mainWindow.setTitle(`${minSizeTitle}`)
    if(config.UseStartupChart){
      loadWindow.destroy()
    }
    mainWindow.show()
  })
  if (process.env.NODE_ENV === 'development'){
    logger.info('openDevTools  打开调试工具')
    mainWindow.webContents.openDevTools(true)
  }

  mainWindow.on('closed', () => {
    logger.info('窗口关闭closed')
    mainWindow = null
    app.quit();
  })
}

/**
 * 程序启动加载页面
 */
function loadingWindow() {
  loadWindow = new BrowserWindow({
    width: 300,
    height: 300,
    frame: false,
    backgroundColor: '#F8F8FF',
    skipTaskbar: true,
    transparent: true,
    resizable: false,
    webPreferences: { experimentalFeatures: true }
  })
  loadWindow.loadURL(loadingURL)
  loadWindow.show()
  
  setTimeout(() => {  createMainWindow()}, 1000)
  loadWindow.on('closed', () => {
    loadWindow = null
  })
}

export function initWindow() {
  if (config.UseStartupChart) {
    return loadingWindow()
  } else {
    return createMainWindow()
  }
}


// 开启直播成功
ipcMain.on('close-loading', (event) => {
  mainWindow && mainWindow.webContents.send('close-loading-done');
})

// 开启直播错误
ipcMain.on('live-loading-error', (event) => {
  mainWindow && mainWindow.webContents.send('live-loading-error-done');
})

