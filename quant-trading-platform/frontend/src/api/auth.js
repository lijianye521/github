import request from './request'

// 用户登录
export const login = (data) => {
  return request({
    url: '/auth/login',
    method: 'POST',
    data
  })
}

// 用户注册
export const register = (data) => {
  return request({
    url: '/auth/register',
    method: 'POST',
    data
  })
}

// 用户退出登录
export const logout = () => {
  return request({
    url: '/auth/logout',
    method: 'POST'
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    url: '/auth/user',
    method: 'GET'
  })
}

// 更新用户信息
export const updateUserInfo = (data) => {
  return request({
    url: '/auth/user',
    method: 'PUT',
    data
  })
}

// 修改密码
export const changePassword = (data) => {
  return request({
    url: '/auth/change-password',
    method: 'POST',
    data
  })
}

// 忘记密码
export const forgotPassword = (data) => {
  return request({
    url: '/auth/forgot-password',
    method: 'POST',
    data
  })
}

// 重置密码
export const resetPassword = (data) => {
  return request({
    url: '/auth/reset-password',
    method: 'POST',
    data
  })
} 