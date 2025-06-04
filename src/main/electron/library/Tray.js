'use strict';

const {Tray, Menu} = require('electron');
const path = require('path');
const logger = require('../services/logger').setup('Tray')
/**
 * 托盘模块
 */
module.exports = {

  /**
   * 安装
   */
  install (mainWindow) {
    logger.info('托盘安装')
    // 托盘图标
    let iconPath = path.join(__static, '/images/tray_logo.png')
    // 点击关闭，最小化到托盘
    mainWindow.on('close', (event) => {
      mainWindow.hide();
      event.preventDefault();
    });
    mainWindow.show();

    let appTray = new Tray(iconPath);
     // 托盘标题
    appTray.setToolTip('托盘');
    // 托盘菜单功能列表
    let trayMenuTemplate = [
      {label: '显示',click: function () {mainWindow.show();}},
      {label: '退出',click: function () { logger.info('托盘退出操作')}}
    ]
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
    appTray.setContextMenu(contextMenu);
  
    // 监听 显示/隐藏
    appTray.on('click', function(){
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
      }
    })
  }
}
