import { login, logout, getInfo } from '@/api/login'
import { getUserInfo } from '@/api/index'
import { getToken, setToken, removeToken,getType,removeType,setType } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    type:getType(),
    name: '',
    avatar: '',
    roles: [],
    permissions: [],
    isLive: false,
    userInfo: {},
    logo: null,
    logoName: null
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_ISLIVE: (state, flag) => {
      state.isLive = flag
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_LOGO: (state, logo) => {
      state.logo = logo
    },
    SET_LOGONAME: (state, logoName) => {
      state.logoName = logoName
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then((res)=>{
          setToken(res.data.shop_token)
          setType(res.data.type)
          commit('SET_TOKEN', '*:*:*')
          resolve(res)
        }).catch((err)=>{
          reject(err)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
         // 获取用户信息
        getUserInfo().then(result => {
          commit('SET_USERINFO', result.data)
          commit('SET_LOGO', result.data.logo)
          commit('SET_LOGONAME', result.data.web_name)
        })
        const user = {userName: '花无缺',avatar: ''}
        const avatar = user.avatar === '' ? require('@/assets/images/avatar3.gif') : user.avatar
        const roles = ['admin']
        const res = {data: {
          user: user,roles: roles
        }}
        if (res.data.roles && res.data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          commit('SET_ROLES', res.data.roles)
          commit('SET_PERMISSIONS', res.data.permissions)
        } else {
          commit('SET_ROLES', ['ROLE_DEFAULT'])
        }
        commit('SET_NAME', user.userName)
        commit('SET_AVATAR', avatar)
        resolve(res)
      })
    },

    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_PERMISSIONS', [])
        removeToken()
        removeType()
        resolve()
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    SetIsLive({ commit }, flag) {
      commit('SET_ISLIVE', flag)
    }
  }
}

export default user
