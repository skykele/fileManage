'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
import { initWindow } from './electron/library/windowManager'
import ipcMains from './electron/library/ipcMain'
import DisableButton from './electron/config/DisableButton'
import './utils/index'

// 初始化
const Store = require('electron-store');

// 初始化
Store.initRenderer();

// 初始化-ipcMain 
ipcMains.Mainfunc()

// 解决Electron Security Warning (Node.js Integration with Remote Content) This renderer process has Nod
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
// 解决9.x跨域异常问题
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors')

function onAppReady() {
  initWindow() 
  DisableButton.Disablef12()
}
function onAppReady22() {
  initWindow()
  DisableButton.Disablef12()
}

app.isReady() ? onAppReady22() : app.on('ready', onAppReady)

// 所有平台均为所有窗口关闭就退出软件
app.on('window-all-closed', () => {
  app.quit()
})

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.removeAsDefaultProtocolClient('future-electron')
    console.log('有于框架特殊性开发环境下无法使用')
  }
} else {
  app.setAsDefaultProtocolClient('future-electron')
}

// 监听关闭
ipcMain.on('close-app', () => {
  app.quit();
})
 
// 监听最小化
ipcMain.on('window-min', event => {
  const webContent = event.sender
  const win = BrowserWindow.fromWebContents(webContent)
  win.minimize()
})

// 监听最大化
ipcMain.on('window-max', event => {
  const webContent = event.sender
  const win = BrowserWindow.fromWebContents(webContent)
  if (win.isMaximized()) {
    win.restore()
  } else {
    win.maximize()
  }
}) 