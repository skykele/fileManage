import { autoUpdater } from 'electron-updater'
const logger = require('../services/logger').setup('checkUpdate')
/**
 * -1 检查更新失败 0 正在检查更新 1 检测到新版本，准备下载 2 未检测到新版本 3 下载中 4 下载完成
 **/
class Update {
  mainWindow
  constructor() {
    autoUpdater.setFeedURL('https://ff-cloud.oss-cn-beijing.aliyuncs.com/electron/down/')
    
    // 当更新发生错误的时候触发。
    autoUpdater.on('error', (err) => {
      logger.info('更新出现错误', err.message)
      if (err.message.includes('sha512 checksum mismatch')) {
        this.Message(this.mainWindow, -1, 'sha512校验失败')
      } else {
        this.Message(this.mainWindow, -1, '错误信息请看主进程控制台')

      }
    })

    // 当开始检查更新的时候触发
    autoUpdater.on('checking-for-update', (event, arg) => {
      logger.info('开始检查更新')
      this.Message(this.mainWindow, 0)
    })

    // 发现可更新数据时
    autoUpdater.on('update-available', (event, arg) => {
      logger.info('有更新')
      this.Message(this.mainWindow, 1)
    })

    // 没有可更新数据时
    autoUpdater.on('update-not-available', (event, arg) => {
      logger.info('没有更新')
      this.Message(this.mainWindow, 2)
    })

    // 下载监听
    autoUpdater.on('download-progress', (progressObj) => {
      this.Message(this.mainWindow, 3, progressObj)
    })

    // 下载完成
    autoUpdater.on('update-downloaded', () => {
      logger.info('done')
      this.Message(this.mainWindow, 4)
    })
  }
  // 负责向渲染进程发送信息
  Message(mainWindow, type, data) {
    logger.info('发送消息')
    const senddata = {
      state: type,
      msg: data || ''
    }
    mainWindow.webContents.send('UpdateMsg', senddata)
  }



  // 执行自动更新检查
  checkUpdate(mainWindow) {
    this.mainWindow = mainWindow
    autoUpdater.checkForUpdates().catch(err => {
      // logger.error('网络连接问题', err)
    })
  }

  // 退出并安装
  quitInstall() {
    autoUpdater.quitAndInstall()
  }
}

export default Update
