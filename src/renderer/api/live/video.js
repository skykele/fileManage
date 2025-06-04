import request from '@/utils/request'

export function createLiveVideo(data) {
    return request({
        url: '/api/creatZb',
        method: 'POST',
        data
    })
}