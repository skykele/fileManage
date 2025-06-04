'use strict';

const dayjs = require('dayjs');
const config = {
  log: {
    fileName: 'future-electron-' + dayjs().format('YYYY-MM-DD') + '.log',
    level: 'debug', // error, warn, info, verbose, debug, silly
    format: '[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}] {scope} {text}',
    maxSize: '1048576' // 1048576 (1mb) by default.

  },
  windowsOption: {

  },
  autoUpdate: {
    windows: false, // windows可以开启；macOs 需要签名验证
    macOS: false,
    linux: false,
    options: {
      provider: 'generic',
      url: 'https://www.coding.net/' // resource dir
    },
    force: false, // 强制更新
  },
  tray: {
    title: 'FE程序', // 托盘显示标题
    icon: '/asset/images/tray_logo.png' // 托盘图标
  }
}

exports.get = function (flag = '', env = 'prod') {

  if (flag in config) {
    return config[flag];
  }

  return {};
};

exports = module.exports;
