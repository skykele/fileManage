import { ipcMain, dialog } from 'electron'
import fileClass from './fileClass'

const f = new fileClass(ipcMain, dialog)
 
ipcMain.handle('select_path', f.SelectPath.bind(f))
ipcMain.handle('start', f.handleStart.bind(f))
ipcMain.on('open_file', f.handleOpenFile.bind(f))
ipcMain.handle('replace_file_once', f.handleReplaceOnce.bind(f))
ipcMain.on('replace_file_all', f.handleReplaceAll.bind(f))
ipcMain.handle('preview_text', f.handlePreviewText.bind(f))

