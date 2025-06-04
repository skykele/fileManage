const { shell } = require('electron')
const fs = require('fs/promises')
const pathModule = require('path')

class fileClass {
    constructor(ipcMain, dialog) {
        this.readAccept = [
            'png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp', 'svg', 'ico',
            'mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a',
            'mp4', 'avi', 'mkv', 'mov', 'webm', 'flv', '3gp',
            'zip', 'rar', '7z', 'tar', 'gz', 'bz2',
            'exe', 'dll', 'so', 'bin', 'apk', 'app', 'msi', 'dmg',
            'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'pdf',
            'class', 'o', 'obj', 'pyc', 'pyo',
            'db', 'sqlite', 'sqlite3', 'mdb', 'accdb',
            'ttf', 'otf', 'woff', 'woff2',
            'iso', 'img', 'swf'
        ]
        this.systemSuffix = [
            'sys', 'tmp', 'log', 'bak', 'lock', 'cache', 'pid', 'dll',
            'exe', 'bat', 'cmd', 'msi', 'ini', 'lnk', 'drv', 'com',
            'sh', 'conf', 'service', 'so', 'dylib'
        ]

        this.ipcMain = ipcMain
        this.dialog = dialog
        this.handleReset()
    }

    handleReset() {
        this.option = {}
        this.filterFile = []
        this.filter = []
        this.appoint = []
        this.filename = []
        this.filesname = []
        this.filecontent = null
        this.progressContext = { processed: 0, total: 0 }
    }

    parseList(flag, value, fallback = []) {
        return flag ? (value?.split(',') || fallback) : []
    }

    // 查找进度
    sendProgress(ipcSender, filePath) {
        const { processed, total } = this.progressContext
        if (ipcSender && total > 0) {
            ipcSender.send('scan-progress', {
                processed,
                total,
                percent: Math.min(Math.round(processed / total * 100), 100),
                filePath
            })
        }
    }

    // 开始查找
    async handleStart(e, options) {
        this.handleReset()
        this.option = options.option || {}
        const { path, option } = options

        this.filterFile = this.parseList(option.fileed, option.file)
        this.filter = this.parseList(option.filtered, option.filter, []).concat(option.filtered ? this.systemSuffix : [])
        this.appoint = this.parseList(option.appointed, option.appoint)
        this.filename = this.parseList(option.filenamed, option.filename)
        this.filesname = this.parseList(option.filesnamed, option.filesname)

        try {
            if (option.filecontented) {
                if (option.regular) {
                    let flags = ''
                    if (option.size) flags += 'i'
                    if (option.global) flags += 'g'
                    if (option.multiline) flags += 'm'
                    if (option.dotAll) flags += 's'
                    if (option.unicode) flags += 'u'
                    this.filecontent = new RegExp(option.filecontent, flags)
                } else {
                    this.filecontent = option.filecontent
                }
            }
        } catch (err) {
            return { data: [], err, code: 400 }
        }

        const result = await this.handleFilterFile(path, e.sender, option.filecontented, option.regular)
        return { data: result, code: 200 }
    }

    async handleFilterFile(currentPath, ipcSender, filecontented, regular) {
        const result = []
        let files

        try {
            files = await fs.readdir(currentPath)
        } catch (err) {
            console.warn(`读取目录失败: ${currentPath}`, err)
            return result
        }

        for (const name of files) {
            const filePath = pathModule.join(currentPath, name)
            let stat
            try {
                stat = await fs.stat(filePath)
            } catch (err) {
                console.warn(`读取文件状态失败: ${filePath}`, err)
                continue
            }

            this.progressContext.total++

            if (stat.isDirectory()) {
                if (this.filterFile.includes(name)) continue
                // 暂时不改指定文件夹
                // if (this.filesname.length > 0 && !this.filesname.includes(name)) continue
                const children = await this.handleFilterFile(filePath, ipcSender, filecontented, regular)
                if (children.length > 0) {
                    result.push({ name, path: filePath, type: 'directory', children })
                }
            } else {
                this.progressContext.processed++
                this.sendProgress(ipcSender, filePath)

                const ext = pathModule.extname(name).slice(1)
                if (this.filter.includes(ext)) continue
                if (this.appoint.length > 0 && !this.appoint.includes(ext)) continue
                if (this.filename.length > 0 && !this.filename.includes(pathModule.basename(name, pathModule.extname(name)))) continue
                if (filecontented && this.readAccept.includes(ext)) continue

                if (filecontented) {
                    const state = await this.verifyContent(filePath, this.filecontent, regular)
                    if (state.code === 200) {
                        result.push({ name, num: state.num, data: state.data, path: filePath, type: 'file', state: 0 })
                    }
                } else {
                    result.push({ name, path: filePath, type: 'file' })
                }
            }
        }
        return result
    }

    async verifyContent(filePath, filecontent, regular) {
        try {
            const data = await fs.readFile(filePath, 'utf8')
            const match = regular ? data.match(filecontent) : data.match(new RegExp(filecontent, 'g'))
            if (match) {
                return { num: match.length, data: match, code: 200 }
            }
        } catch (err) {
            console.warn(`读取失败: ${filePath}`, err)
        }
        return { code: 400 }
    }

    // 打开文件夹或文件
    handleOpenFile(e, { path, type }) {
        const safePath = path.replaceAll('/', '\\')
        if (type === 'file') shell.showItemInFolder(safePath)
        else shell.openPath(safePath)
    }

    async handleReplaceOnce(e, row, option, multiple = false) {
        try {
            const content = await fs.readFile(row.path, 'utf8')
            let updatedContent = content

            if (option.isReplace) {
                updatedContent = content.replaceAll(row.data[0], option.to ? option.to : '')
            } else {
                const regex = option.isReg ? new RegExp(option.form, 'g') : null
                row.data.forEach(item => {
                    const target = option.isReg ? regex : option.form
                    updatedContent = updatedContent.replace(item, item.replace(target, option.to))
                })
            }

            await fs.writeFile(row.path, updatedContent, 'utf8')
            const msg = { code: 200, data: row }
            if (multiple) e.sender.send('replace-progress', msg)
            else return msg
        } catch (err) {
            const msg = { code: 400, err, data: row }
            if (multiple) e.sender.send('replace-progress', msg)
            else return msg
        }
    }

    async handleReplaceAll(e, node, option) {
        if (!node.children) return

        for (const child of node.children) {
            if (child.state === 2) continue
            if (child.type === 'file') {
                await this.handleReplaceOnce(e, child, option, true)
            } else {
                await this.handleReplaceAll(e, child, option)
            }
            const time = Math.floor(Math.random() * (150 - 100 + 1)) + 100
            await new Promise(resolve => setTimeout(resolve, time))
        }
    }

    async SelectPath() {
        const result = await this.dialog.showOpenDialog({
            title: '请选择路径',
            properties: ['openDirectory']
        })
        return result.canceled ? null : { path: result.filePaths[0] }
    }

    handlePreviewText(e, path) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await fs.readFile(path, 'utf8')
                resolve({ code: 200, data })
            } catch (err) {
                resolve({ code: 400, err })
            }
        })
    }
}

export default fileClass