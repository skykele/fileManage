

const TokenKey = 'Admin-Token'

export function getToken () {

  return  localStorage.getItem(TokenKey)
}

export function setToken (token) {

  return  localStorage.setItem(TokenKey,token)
}

export function removeToken () {

  return localStorage.removeItem(TokenKey)
}
export function getType () {

  return  localStorage.getItem('type')
}
export function removeType () {

  return  localStorage.removeItem('type')
}
export function setType (type) {

  return  localStorage.setItem('type',type)
}