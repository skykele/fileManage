
const {ipcMain: ipc} = require('electron-better-ipc');
const baseApi = require('./baseApi')
  /**
 * 菜单模块
 */
 module.exports = {
	/**
	 * 安装
	 */
	install () {

		ipc.on('powerMonitor', (event,request)  => {
			
			return baseApi.powerMonitor(event,'rendererPowerMonitor')
		})

		ipc.answerRenderer('storagePath',()  => {
			return baseApi.storagePath()
		})		

		ipc.answerRenderer('getScreen', (request)  => {
			
			return baseApi.getScreen(request)
		})	
		ipc.answerRenderer('download-button', (request)  => {
			baseApi.download(request.url,request.dlProgress,request.dlCompleted)
		})	
		ipc.answerRenderer('viewPdf', (request)  => {
			baseApi.viewPdf(request)
		})	
	}
}