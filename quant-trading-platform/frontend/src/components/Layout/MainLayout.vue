<template>
  <el-container class="main-layout">
    <!-- 侧边栏 -->
    <el-aside :width="isCollapsed ? '64px' : '240px'" class="layout-sidebar">
      <div class="sidebar-header">
        <div class="logo" v-if="!isCollapsed">
          <el-icon><TrendCharts /></el-icon>
          <span>量化策略平台</span>
        </div>
        <div class="logo-mini" v-else>
          <el-icon><TrendCharts /></el-icon>
        </div>
      </div>
      
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapsed"
        :unique-opened="true"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        router
        class="sidebar-menu"
      >
        <el-menu-item index="/dashboard">
          <el-icon><Odometer /></el-icon>
          <template #title>仪表板</template>
        </el-menu-item>
        
        <el-sub-menu index="strategy">
          <template #title>
            <el-icon><Document /></el-icon>
            <span>策略管理</span>
          </template>
          <el-menu-item index="/strategy">策略列表</el-menu-item>
          <el-menu-item index="/strategy/create">创建策略</el-menu-item>
        </el-sub-menu>
        
        <el-sub-menu index="backtest">
          <template #title>
            <el-icon><DataAnalysis /></el-icon>
            <span>回测分析</span>
          </template>
          <el-menu-item index="/backtest">回测列表</el-menu-item>
          <el-menu-item index="/backtest/create">创建回测</el-menu-item>
        </el-sub-menu>
        
        <el-sub-menu index="data">
          <template #title>
            <el-icon><DataBoard /></el-icon>
            <span>数据中心</span>
          </template>
          <el-menu-item index="/data/stocks">股票数据</el-menu-item>
          <el-menu-item index="/data/charts">图表分析</el-menu-item>
        </el-sub-menu>
        
        <el-menu-item index="/ai-assistant">
          <el-icon><ChatDotRound /></el-icon>
          <template #title>AI助手</template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    
    <!-- 主体区域 -->
    <el-container class="layout-main" direction="vertical">
      <!-- 头部 -->
      <el-header class="layout-header">
        <div class="header-left">
          <el-button 
            type="text" 
            @click="toggleSidebar"
            class="sidebar-toggle"
          >
            <el-icon><Expand /></el-icon>
          </el-button>
          
          <el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item 
              v-for="item in breadcrumbs" 
              :key="item.path"
              :to="item.path"
            >
              {{ item.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        
        <div class="header-right">
          <!-- 通知 -->
          <el-dropdown trigger="click" class="notification-dropdown">
            <el-badge :value="notificationCount" :hidden="notificationCount === 0">
              <el-button type="text" class="notification-btn">
                <el-icon><Bell /></el-icon>
              </el-button>
            </el-badge>
            <template #dropdown>
              <el-dropdown-menu>
                <div class="notification-header">通知中心</div>
                <el-dropdown-item 
                  v-for="notification in notifications" 
                  :key="notification.id"
                  @click="handleNotificationClick(notification)"
                >
                  <div class="notification-item">
                    <div class="notification-title">{{ notification.title }}</div>
                    <div class="notification-time">{{ notification.created_at }}</div>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <div class="notification-footer">查看全部</div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          
          <!-- 用户菜单 -->
          <el-dropdown trigger="click" class="user-dropdown-container">
            <span class="user-dropdown">
              <el-avatar :src="userStore.userInfo.avatar_url" :size="32">
                {{ userStore.userInfo.username?.charAt(0)?.toUpperCase() }}
              </el-avatar>
              <span class="username">{{ userStore.userInfo.username }}</span>
              <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="goToProfile">
                  <el-icon><User /></el-icon>
                  个人资料
                </el-dropdown-item>
                <el-dropdown-item @click="toggleDarkMode">
                  <el-icon><Moon /></el-icon>
                  {{ isDark ? '浅色模式' : '深色模式' }}
                </el-dropdown-item>
                <el-dropdown-item divided @click="handleLogout">
                  <el-icon><SwitchButton /></el-icon>
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      
      <!-- 内容区域 -->
      <el-main class="layout-content">
        <slot />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Odometer,
  Document,
  TrendCharts,
  DataAnalysis,
  DataBoard,
  ChatDotRound,
  Expand,
  Bell,
  ArrowDown,
  User,
  Moon,
  SwitchButton
} from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// 响应式数据
const isCollapsed = ref(false)
const isDark = ref(false)
const notifications = ref([])
const notificationCount = ref(0)

// 计算属性
const activeMenu = computed(() => {
  return route.path
})

const breadcrumbs = computed(() => {
  const matched = route.matched.filter(item => item.meta && item.meta.title)
  return matched.map(item => ({
    path: item.path,
    title: item.meta.title
  }))
})

// 方法
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('darkMode', isDark.value)
}

const goToProfile = () => {
  router.push('/profile')
}

const handleLogout = async () => {
  try {
    await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    await userStore.logout()
    ElMessage.success('退出登录成功')
    router.push('/login')
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('退出登录失败')
    }
  }
}

const handleNotificationClick = (notification) => {
  console.log('点击通知:', notification)
}

const loadNotifications = async () => {
  try {
    notifications.value = []
    notificationCount.value = 0
  } catch (error) {
    console.error('加载通知失败:', error)
  }
}

// 生命周期
onMounted(() => {
  const savedDarkMode = localStorage.getItem('darkMode')
  if (savedDarkMode === 'true') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
  
  loadNotifications()
})
</script>

<style lang="scss" scoped>
/* === 主布局容器 === */
.main-layout {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

/* === 侧边栏样式 === */
.layout-sidebar {
  background-color: #304156;
  transition: width 0.3s ease;
  overflow: hidden;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  flex-shrink: 0;
}

.sidebar-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #434343;
}

.logo {
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
}

.logo .el-icon {
  font-size: 24px;
  margin-right: 8px;
  color: #409EFF;
}

.logo-mini {
  color: #409EFF;
  font-size: 24px;
}

.sidebar-menu {
  border-right: none;
  height: calc(100vh - 60px);
}

/* === 主体区域样式 === */
.layout-main {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

/* === 头部样式 === */
.layout-header {
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 60px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
}

.header-right {
  display: flex;
  align-items: center;
}

.sidebar-toggle {
  margin-right: 20px;
  font-size: 18px;
  color: #606266;
  border: none;
  background: none;
  cursor: pointer;
  padding: 8px;
  transition: color 0.3s ease;
}

.sidebar-toggle:hover {
  color: #409EFF;
}

.breadcrumb {
  margin-left: 0;
}

.notification-dropdown {
  margin-right: 20px;
}

.notification-btn {
  font-size: 18px;
  padding: 8px;
  color: #606266;
  border: none;
  background: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

.notification-btn:hover {
  color: #409EFF;
}

.user-dropdown {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.user-dropdown:hover {
  background-color: #f5f7fa;
}

.username {
  margin: 0 8px;
  font-size: 14px;
  color: #606266;
}

/* === 内容区域样式 === */
.layout-content {
  background: #f0f2f5;
  padding: 0;
  overflow: auto;
  flex: 1;
  width: 100%;
}

/* === 通知相关样式 === */
.notification-header {
  padding: 10px 16px;
  font-weight: bold;
  border-bottom: 1px solid #e4e7ed;
}

.notification-title {
  font-size: 14px;
  margin-bottom: 4px;
}

.notification-time {
  font-size: 12px;
  color: #909399;
}

.notification-footer {
  text-align: center;
  color: #409eff;
  font-size: 14px;
}

/* === 暗色主题 === */
html.dark .layout-header {
  background: #1e1e1e;
  border-bottom-color: #4c4d4f;
  color: #e5eaf3;
}

html.dark .layout-content {
  background: #141414;
}

html.dark .user-dropdown:hover {
  background-color: #2d2d2d;
}

/* === Element Plus 组件样式重写 === */
:deep(.el-container) {
  height: 100%;
  width: 100%;
}

:deep(.el-aside) {
  height: 100vh;
}

:deep(.el-header) {
  padding: 0;
  width: 100%;
}

:deep(.el-main) {
  padding: 0;
  width: 100%;
  overflow: auto;
}

:deep(.el-menu) {
  border-right: none;
}

:deep(.el-button) {
  border: none;
  background: none;
}

:deep(.el-button:hover) {
  background: none;
}

:deep(.el-button:focus) {
  background: none;
}
</style> 