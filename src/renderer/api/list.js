import request from '@/utils/request'

// AI人
export function list(data) {
  return request({
    url: '/api/aipeopleList',
    method: 'post',
    data: data
  })
}
//AI背景
export function BGlist(data) {
  return request({
    url: '/api/aidrawList',
    method: 'post',
    data: data
  })
}
//自定义背景
export function ZDYBGlist(data) {
  return request({
    url: '/api/bgList',
    method: 'post',
    data: data
  })
}
//AI音色
export function YSlist(data) {
  return request({
    url: '/api/aiyinse',
    method: 'post',
    data: data
  })
}
//短视频列表
export function SPlist(data) {
  return request({
    url: '/api/dspList',
    method: 'post',
    data: data
  })
}
//删除短视频
export function doDelete(data) {
  return request({
    url: '/api/delDsp',
    method: 'post',
    data: data
  })
}
//合成音频
export function yytts(data) {
  return request({
    url: '/api/yytts',
    method: 'post',
    data: data
  })
}
//判断音频
export function lxyyts(data) {
  return request({
    url: '/api/lxyyts',
    method: 'post',
    data: data
  })
}
//音频列表
export function audioList(data) {
  return request({
    url: '/api/audioList',
    method: 'post',
    data: data
  })
}
//删除音频
export function delaudio(data) {
  return request({
    url: '/api/delaudio',
    method: 'post',
    data: data
  })
}
//
export function creatDsp(data) {
  return request({
    url: '/api/creatDsp',
    method: 'post',
    data: data
  })
}
//个人信息
export function getInfo(data) {
  return request({
    url: '/api/userInfo',
    method: 'post',
    data: data
  })
}
//创建绘画
export function draw(data) {
  return request({
    url: '/api/draw',
    method: 'post',
    data: data
  })
}
//查询绘画
export function drawResult(data) {
  return request({
    url: '/api/drawResult',
    method: 'post',
    data: data
  })
}