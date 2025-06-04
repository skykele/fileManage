
const {app,dialog, webContents, shell, BrowserWindow, BrowserView,  Notification, powerMonitor, screen, nativeTheme} = require('electron');
const {download} = require('electron-dl')
const {ipcMain: ipc} = require('electron-better-ipc');
const PDFWindow = require('electron-pdf-window')
const userDataPath = app.getPath('userData')
const logger = require('../services/logger').setup('baseApi')


exports.storagePath = function () {
	logger.info('当前用户数据路径：',userDataPath)
    return userDataPath
}

exports.powerMonitor = function (event,onRenderer) {
	logger.info('接受请求。。。。。。。。。',onRenderer)
    powerMonitor.on('on-ac', (e) => {
        let data = { type: 'on-ac', msg: '接入了电源'}
				logger.info('接受请求。。。。。。。。。on-ac',onRenderer)
				event.sender.send(onRenderer, data)
    });
  
      powerMonitor.on('on-battery', (e) => {
        let data = {type: 'on-battery', msg: '使用电池中'}
				logger.info('接受请求。。。。。。。。。on-battery',onRenderer)
				event.sender.send(onRenderer, data)
      });
  
      powerMonitor.on('lock-screen', (e) => {
        let data = { type: 'lock-screen', msg: '锁屏了'}
				logger.info('接受请求。。。。。。。。。lock-screen',onRenderer)
				event.sender.send(onRenderer, data)
      });
  
      powerMonitor.on('unlock-screen', (e) => {
        let data = { type: 'unlock-screen', msg: '解锁了'}
				logger.info('接受请求。。。。。。。。。unlock-screen',onRenderer)
				event.sender.send(onRenderer, data)
      });
  
      return true
}
/**
   * 获取屏幕信息
   */
 exports.getScreen = function  (arg) {
	let data = [];
	let res = {};
	if (arg == 0) {
		let res = screen.getCursorScreenPoint();
		data = [
			{
				title: '横坐标',
				desc: res.x
			},
			{
				title: '纵坐标',
				desc: res.y
			},
		]
		
		return data;
	}
	if (arg == 1) {
		res = screen.getPrimaryDisplay();
	}
	if (arg == 2) {
		let resArr = screen.getAllDisplays();
		// 数组，只取一个吧
		res = resArr[0];
	}
	// console.log('[electron] [ipc] [example] [getScreen] res:', res);
	data = [
		{
			title: '分辨率',
			desc: res.bounds.width + ' x ' + res.bounds.height
		},
		{
			title: '单色显示器',
			desc: res.monochrome ? '是' : '否'
		},
		{
			title: '色深',
			desc: res. colorDepth
		},
		{
			title: '色域',
			desc: res.colorSpace
		},
		{
			title: 'scaleFactor',
			desc: res.scaleFactor
		},
		{
			title: '加速器',
			desc: res.accelerometerSupport
		},
		{
			title: '触控',
			desc: res.touchSupport == 'unknown' ? '不支持' : '支持'
		},
	]

	return data;
}  

/**
 * 文件下载
 * @param {主窗口} BrowserWindow 
 * @param {下载链接} url 
 */
exports.download = function(url,dlProgress,dlCompleted){
	const win = BrowserWindow.getFocusedWindow();
	download(win, url,	{
		openFolderWhenDone: true,
		onStarted: item => {
			logger.info('开始下载: ',item.getFilename())
		},
		onProgress: item => {
			// logger.info('文件总大小',item.totalBytes,'当前下载进度 ',item.transferredBytes,(item.percent * 100).toFixed(0))
			ipc.callFocusedRenderer(dlProgress, item);
		},
		onTotalProgress: item => {

		},
		onCancel: () => {

		},
		onCompleted: item  => {
			// logger.info('下载完成 ',item)
			ipc.callFocusedRenderer(dlCompleted, item);
		}
	})
}

exports.viewPdf = function(url){
	logger.info('pdf预览: ',url)
	const win = new PDFWindow({width: 800,height: 600})
	win.loadURL('http://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf')
}