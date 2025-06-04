import request from '@/utils/request'

// 创建直播方案
export function createLive(data) {
    return request({
        url: '/api/addlivestre',
        method: "POST",
        data
    })
}

// 直播方案添加讲解
export function addLiveExplain(data) {
    return request({
        url: '/api/addliveelpan',
        method: "POST",
        data
    })
}

// 删除直播方案讲解
export function delLiveExplain(data) {
    return request({
        url: '/api/delliveelpan',
        method: "POST",
        data
    })
}

// 直播方案讲解列表
export function getLiveExplainList(data) {
    return request({
        url: '/api/liveelpanList',
        method: "POST",
        data
    })
}

// 直播方案列表
export function getLiveFangAnList(data) {
    return request({
        url: '/api/liveList',
        method: "POST",
        data
    })
}

// 删除直播方案
export function delLiveFangAn(data) {
    return request({
        url: '/api/dellive',
        method: "POST",
        data
    })
}

// 直播方案重命名
export function liveFangAnRename(data) {
    return request({
        url: '/api/updateLive',
        method: "POST",
        data
    })
}

// 添加点赞/关注/送礼配置
export function addLikeGGive(data) {
    return request({
        url: '/api/welcomeConfig',
        method: "POST",
        data
    })
}

// 点赞/关注/送礼配置列表
export function getLikeGGiveList(data) {
    return request({
        url: '/api/welcomeList',
        method: "POST",
        data
    })
}

// 删除音频配置
export function delLikeGGive(data) {
    return request({
        url: '/api/delwecome',
        method: "POST",
        data
    })
}

// 策略配置
export function globalSave(data) {
    return request({
        url: '/api/strategy',
        method: "POST",
        data
    })
}

// 策略配置详情
export function globalDetail(live_id) {
    return request({
        url: '/api/delitstrategy',
        method: "POST",
        data: { live_id }
    })
}

// 获取直播链接
export function liveUrl(live_id) {
    return request({
        url: '/api/zblj',
        method: "POST",
        data: { live_id }
    })
}
