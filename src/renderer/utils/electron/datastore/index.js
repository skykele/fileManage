/**       *******************    数据库DB操作           *************************               */

import Datastore from 'lowdb'
import LodashId from 'lodash-id'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'
const pkgName = require('../../../../../package.json').name
const {app} = require('@electron/remote')
const userDataPath = app.getPath('userData')
// 以同步的方式初始化lowdb读写的json文件名以及存储路径
const adapter = new FileSync(path.join(userDataPath, `/${pkgName}_lowdb.json`))

// lowdb接管该文件
const db = Datastore(adapter)
// 通过._mixin()引入lodash_id唯一id插件
db._.mixin(LodashId)

// 初始化数据
if(!db.has('configServer').value()) {
  db.set('configServer',[]).write()
}

export default db // 暴露出去

/**       *******************    配置文件操作           *************************               */

const Store = require('electron-store');

let option={
  name:"config",//文件名称,默认 config
  fileExtension:"conf",//文件后缀,默认json
  cwd:process.cwd(),//文件位置
  // encryptionKey:"aes-256-cbc" ,//对配置文件进行加密
  clearInvalidConfig:true, // 发生 SyntaxError  则清空配置,
}
export const store = new Store(option);