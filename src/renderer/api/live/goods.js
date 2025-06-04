import request from '@/utils/request'

// 添加讲解
export function addJiangjie(data) {
  return request({
    url: '/api/addExplan',
    data: data,
    method: 'POST'
  })
}

// 讲解列表
export function getJiangjieList(data) {
    return request({
        url: '/api/explanList',
        method: 'POST',
        data
    })
}

// 添加讲解视频
export function addVideo(data) {
    return request({
        url: '/api/addexpanVideo',
        method: "POST",
        data
    })
}

// 讲解视频列表
export function getVideoList(data) {
    return request({
        url: '/api/expanvideoList',
        method: "POST",
        data
    })
}

// 删除讲解视频
export function delVideo(data) {
    return request({
        url: '/api/delexplanvideo',
        method: "POST",
        data
    })
}

// 讲解添加话术
export function addJiangjieHuaShu(data) {
    return request({
        url: '/api/addelpanInter',
        method: "POST",
        data
    })
}

// 讲解话术列表
export function getHuashuList(data) {
    return request({
        url: '/api/elpaninterList',
        method: "POST",
        data
    })
}

// 删除讲解互动话术
export function delJjHuashu(data) {
    return request({
        url: '/api/delelpaninter',
        method: "POST",
        data
    })
}

// 删除讲解
export function delJiangjie(data) {
    return request({
        url: '/api/delexpan',
        method: "POST",
        data
    })
}

// 添加/修改视频互动话术
export function addVideoHuaShu(data) {
    return request({
        url: '/api/addInterLive',
        method: "POST",
        data
    })
}

// 视频话术列表
export function videoHuaShuList(data) {
    return request({
        url: '/api/interLiveList',
        method: "POST",
        data
    })
}

// 删除视频话术
export function delVideoHuaShu(data) {
    return request({
        url: '/api/dellinderlive',
        method: "POST",
        data
    })
}

// 视频话术详情
export function videoHuashuDetail(data) {
    return request({
        url: '/api/linderlive',
        method: "POST",
        data
    })
}

// 视频互动配置保存
export function videoPeizhiSave(data) {
    return request({
        url: '/api/strategylive',
        method: "POST",
        data
    })
}

// 视频互动配置详情
export function videoPeizhiDetail(id) {
    return request({
        url: '/api/delitstrategylive',
        method: "POST",
        data: { live_id: id }
    })
}


// 视频互动配置详情
export function getDanmuk(data) {
    return request({
        url: 'api/getDanmuk',
        method: "POST",
        data
    })
}
