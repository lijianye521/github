<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <div class="error-code">404</div>
      <div class="error-message">页面未找到</div>
      <div class="error-description">抱歉，您访问的页面不存在</div>
      <el-button type="primary" @click="goHome">返回首页</el-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/dashboard')
}
</script>

<style lang="scss" scoped>
.not-found-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}

.not-found-content {
  text-align: center;
  
  .error-code {
    font-size: 120px;
    font-weight: bold;
    color: #409EFF;
    margin-bottom: 20px;
  }
  
  .error-message {
    font-size: 24px;
    color: #303133;
    margin-bottom: 10px;
  }
  
  .error-description {
    font-size: 16px;
    color: #909399;
    margin-bottom: 30px;
  }
}
</style> 