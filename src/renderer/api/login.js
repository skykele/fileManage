import request from '@/utils/request'

// 登录方法
export function login(data) {
  return request({
    url: '/api/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}


// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}


export function message () {
  return request({
    url: '/test/message',
    method: 'get'
  })
}

export function getUserProfile (data) {
  return request({
    url: '/test/message',
    method: 'get'
  })
}


export function updateUserPwd (data) {
  return request({
    url: '/test/message',
    method: 'get'
  })
}


export function uploadAvatar (data) {
  return request({
    url: '/test/message',
    method: 'get'
  })
}

export function updateUserProfile (data) {
  return request({
    url: '/test/message',
    method: 'get'
  })
}




