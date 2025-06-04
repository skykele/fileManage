import request from '@/utils/request'

export function getChat(data) {
  return request({
    url: '/api/wacz',
    data: data,
    method: 'post'
  })
}




