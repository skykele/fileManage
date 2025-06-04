import { store } from '@/utils/electron/datastore/index'
const fs = require('fs')


export function Logger(scope){
  const Log = require('../../../main/electron/services/logger').setup(scope)
  if(!scope){
    return Log
  }
  return Log
}



/**
 * 
 * @returns 获取安装路径
 */
export function getExePath() {
    
    return process.cwd();
}



export function getBaseApi() {
    let baseApi = store.get('baseURL')
    return baseApi
}

