import request from '@/utils/request'

// 话术列表
export function getMsgList(data) {
  return request({
    url: '/api/linderList',
    data: data,
    method: 'POST'
  })
}

// 话术详情
export function getMsgDetail(id) {
    return request({
        url: '/api/linderdes',
        method: 'POST',
        data: { id }
    })
}

// 添加修改话术
export function setMessage(data) {
    return request({
        url: '/api/addoruplinder',
        method: "POST",
        data
    })
}

// 删除话术
export function delMessage(id) {
    return request({
        url: '/api/dellinder',
        method: "POST",
        data: { id }
    })
}
