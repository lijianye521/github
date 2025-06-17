<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1 class="title">量化AI策略平台</h1>
        <p class="subtitle">专业的量化交易策略开发平台</p>
      </div>
      
      <el-form 
        ref="loginFormRef" 
        :model="loginForm" 
        :rules="loginRules" 
        class="login-form"
        @keyup.enter="handleLogin"
      >
        <el-form-item prop="email">
          <el-input
            v-model="loginForm.email"
            type="email"
            placeholder="请输入邮箱"
            size="large"
            prefix-icon="Message"
          />
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            size="large"
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        
        <el-form-item>
          <div class="form-options">
            <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        
        <el-form-item>
          <el-button 
            type="primary" 
            size="large" 
            class="login-btn"
            :loading="loading"
            @click="handleLogin"
          >
            {{ loading ? '登录中...' : '登录' }}
          </el-button>
        </el-form-item>
      </el-form>
      
      <div class="register-link">
        还没有账号？
        <el-link type="primary" @click="goToRegister">立即注册</el-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()

// 响应式数据
const loading = ref(false)
const loginFormRef = ref(null)

const loginForm = reactive({
  email: 'demo@example.com',
  password: '123456',
  remember: false
})

const loginRules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ]
}

// 方法
const handleLogin = async () => {
  if (!loginFormRef.value) return
  
  try {
    const valid = await loginFormRef.value.validate()
    if (!valid) return
    
    loading.value = true
    
    // 模拟登录（实际项目中会调用API）
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 模拟登录成功的数据
    const mockLoginData = {
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: 1,
        username: 'demo用户',
        email: loginForm.email,
        avatar_url: '',
        is_vip: false
      }
    }
    
    // 调用store的登录方法
    userStore.token = mockLoginData.token
    userStore.userInfo = mockLoginData.user
    userStore.isLoggedIn = true
    
    localStorage.setItem('token', mockLoginData.token)
    localStorage.setItem('userInfo', JSON.stringify(mockLoginData.user))
    
    ElMessage.success('登录成功')
    router.push('/dashboard')
    
  } catch (error) {
    ElMessage.error(error.message || '登录失败')
  } finally {
    loading.value = false
  }
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  
  .login-header {
    text-align: center;
    margin-bottom: 30px;
    
    .title {
      font-size: 28px;
      font-weight: bold;
      color: #303133;
      margin-bottom: 8px;
    }
    
    .subtitle {
      font-size: 14px;
      color: #909399;
      margin: 0;
    }
  }
  
  .login-form {
    .el-form-item {
      margin-bottom: 20px;
    }
    
    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    
    .login-btn {
      width: 100%;
      height: 48px;
      font-size: 16px;
      border-radius: 8px;
    }
  }
  
  .register-link {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
    color: #606266;
  }
}

@media (max-width: 480px) {
  .login-card {
    padding: 30px 20px;
    margin: 20px;
  }
}
</style> 