import request from '@/utils/request'

export function getUserInfo() {
    return request({
        url: '/api/userInfo',
        method: 'POST'
    })
}