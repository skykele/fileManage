const electronLog = require('electron-log');
const config = require('../../config');

// class Log {
//   constructor () {
//     if (typeof Log.instance === 'object') {
//       return Log.instance;
//     }

//     let logConfig = config.get('log');
//     //日志位置 C:\Users\用户\AppData\Roaming\future-electron\
//     electronLog.transports.file.level    = logConfig.level;
//     electronLog.transports.file.fileName = logConfig.fileName;
//     electronLog.transports.file.format   = logConfig.format;
//     electronLog.transports.file.maxSize  = logConfig.maxSize;
//     Log.instance = electronLog;
//     return Log.instance;
//   }
// }

    let logConfig = config.get('log');
    //日志位置 C:\Users\用户\AppData\Roaming\future-electron\
    electronLog.transports.file.level    = logConfig.level;
    electronLog.transports.file.fileName = logConfig.fileName;
    electronLog.transports.file.format   = logConfig.format;
    electronLog.transports.file.maxSize  = logConfig.maxSize;

/**
 * 安装模块
 */
exports.setup = function (name) {
  console.log('[electron-lib-logger] [setup]');
  return electronLog.scope(name);
}
