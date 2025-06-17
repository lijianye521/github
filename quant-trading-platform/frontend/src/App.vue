<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/store/user'
import MainLayout from '@/components/Layout/MainLayout.vue'

const route = useRoute()
const userStore = useUserStore()

// 是否隐藏主布局
const hideLayout = computed(() => {
  return route.meta?.hideLayout || false
})

// 应用初始化
onMounted(() => {
  // 从本地存储恢复用户状态
  userStore.restoreFromStorage()
  
  // 如果有token，获取用户信息
  if (userStore.hasToken) {
    userStore.fetchUserInfo().catch(() => {
      // 获取用户信息失败，可能token已过期
      userStore.logout()
    })
  }
})
</script>

<template>
  <div class="app-container">
    <!-- 主布局 -->
    <MainLayout v-if="!hideLayout">
      <router-view />
    </MainLayout>
    
    <!-- 无布局页面(如登录页) -->
    <router-view v-else />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.app-container {
  height: 100vh;
  width: 100vw;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
               'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 
               'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
}
</style>
