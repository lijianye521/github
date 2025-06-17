import { defineStore } from 'pinia'
import { login, logout, getUserInfo } from '@/api/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    userInfo: {
      id: null,
      username: '',
      email: '',
      avatar_url: '',
      is_vip: false
    },
    isLoggedIn: false
  }),

  getters: {
    hasToken: (state) => !!state.token,
    isVip: (state) => state.userInfo.is_vip
  },

  actions: {
    // 登录
    async login(credentials) {
      try {
        const response = await login(credentials)
        const { token, user } = response.data
        
        this.token = token
        this.userInfo = user
        this.isLoggedIn = true
        
        localStorage.setItem('token', token)
        localStorage.setItem('userInfo', JSON.stringify(user))
        
        return response
      } catch (error) {
        throw error
      }
    },

    // 退出登录
    async logout() {
      try {
        await logout()
      } catch (error) {
        console.error('退出登录失败:', error)
      } finally {
        this.token = ''
        this.userInfo = {
          id: null,
          username: '',
          email: '',
          avatar_url: '',
          is_vip: false
        }
        this.isLoggedIn = false
        
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
      }
    },

    // 获取用户信息
    async fetchUserInfo() {
      try {
        const response = await getUserInfo()
        this.userInfo = response.data
        this.isLoggedIn = true
        
        localStorage.setItem('userInfo', JSON.stringify(response.data))
        
        return response
      } catch (error) {
        this.logout()
        throw error
      }
    },

    // 从本地存储恢复用户状态
    restoreFromStorage() {
      const token = localStorage.getItem('token')
      const userInfo = localStorage.getItem('userInfo')
      
      if (token && userInfo) {
        this.token = token
        this.userInfo = JSON.parse(userInfo)
        this.isLoggedIn = true
      }
    },

    // 更新用户信息
    updateUserInfo(newUserInfo) {
      this.userInfo = { ...this.userInfo, ...newUserInfo }
      localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
    }
  }
}) 