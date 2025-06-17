<template>
  <div class="register-container">
    <div class="register-card">
      <div class="register-header">
        <h1 class="title">注册账号</h1>
        <p class="subtitle">加入量化AI策略平台</p>
      </div>
      
      <el-form 
        ref="registerFormRef" 
        :model="registerForm" 
        :rules="registerRules" 
        class="register-form"
      >
        <el-form-item prop="username">
          <el-input
            v-model="registerForm.username"
            placeholder="请输入用户名"
            size="large"
            prefix-icon="User"
          />
        </el-form-item>
        
        <el-form-item prop="email">
          <el-input
            v-model="registerForm.email"
            type="email"
            placeholder="请输入邮箱"
            size="large"
            prefix-icon="Message"
          />
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input
            v-model="registerForm.password"
            type="password"
            placeholder="请输入密码"
            size="large"
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        
        <el-form-item prop="confirmPassword">
          <el-input
            v-model="registerForm.confirmPassword"
            type="password"
            placeholder="请确认密码"
            size="large"
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        
        <el-form-item>
          <el-button 
            type="primary" 
            size="large" 
            class="register-btn"
            :loading="loading"
            @click="handleRegister"
          >
            {{ loading ? '注册中...' : '注册' }}
          </el-button>
        </el-form-item>
      </el-form>
      
      <div class="login-link">
        已有账号？
        <el-link type="primary" @click="goToLogin">立即登录</el-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

const loading = ref(false)
const registerFormRef = ref(null)

const registerForm = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const registerRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '用户名长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== registerForm.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

const handleRegister = async () => {
  if (!registerFormRef.value) return
  
  try {
    const valid = await registerFormRef.value.validate()
    if (!valid) return
    
    loading.value = true
    
    // 模拟注册
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    ElMessage.success('注册成功，请登录')
    router.push('/login')
    
  } catch (error) {
    ElMessage.error('注册失败')
  } finally {
    loading.value = false
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.register-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  
  .register-header {
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
  
  .register-form {
    .el-form-item {
      margin-bottom: 20px;
    }
    
    .register-btn {
      width: 100%;
      height: 48px;
      font-size: 16px;
      border-radius: 8px;
    }
  }
  
  .login-link {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
    color: #606266;
  }
}
</style> 