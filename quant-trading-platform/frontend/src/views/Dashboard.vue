<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">仪表板</h1>
      <p class="page-description">欢迎来到量化AI股票策略平台</p>
    </div>
    
    <!-- 概览卡片 -->
    <el-row :gutter="16" class="overview-cards">
      <el-col :xs="24" :sm="12" :md="6" :lg="6">
        <div class="overview-card">
          <div class="card-icon primary">
            <el-icon><Document /></el-icon>
          </div>
          <div class="card-content">
            <div class="card-title">我的策略</div>
            <div class="card-value">{{ stats.strategyCount }}</div>
          </div>
        </div>
      </el-col>
      
      <el-col :xs="24" :sm="12" :md="6" :lg="6">
        <div class="overview-card">
          <div class="card-icon success">
            <el-icon><TrendCharts /></el-icon>
          </div>
          <div class="card-content">
            <div class="card-title">回测次数</div>
            <div class="card-value">{{ stats.backtestCount }}</div>
          </div>
        </div>
      </el-col>
      
      <el-col :xs="24" :sm="12" :md="6" :lg="6">
        <div class="overview-card">
          <div class="card-icon warning">
            <el-icon><Medal /></el-icon>
          </div>
          <div class="card-content">
            <div class="card-title">最佳收益</div>
            <div class="card-value">{{ stats.bestReturn }}%</div>
          </div>
        </div>
      </el-col>
      
      <el-col :xs="24" :sm="12" :md="6" :lg="6">
        <div class="overview-card">
          <div class="card-icon danger">
            <el-icon><Bell /></el-icon>
          </div>
          <div class="card-content">
            <div class="card-title">今日信号</div>
            <div class="card-value">{{ stats.todaySignals }}</div>
          </div>
        </div>
      </el-col>
    </el-row>
    
    <!-- 主要内容区域 -->
    <el-row :gutter="16" class="main-content-area">
      <!-- 左侧内容 -->
      <el-col :xs="24" :lg="16" :xl="17">
        <!-- 收益曲线图 -->
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>收益曲线</span>
              <el-button type="primary" size="small">查看详情</el-button>
            </div>
          </template>
          <div class="chart-container" ref="chartContainer"></div>
        </el-card>
        
        <!-- 最近策略 -->
        <el-card class="strategy-card">
          <template #header>
            <div class="card-header">
              <span>最近策略</span>
              <el-button type="primary" size="small" @click="goToStrategy">管理策略</el-button>
            </div>
          </template>
          <el-table :data="recentStrategies" stripe size="small">
            <el-table-column prop="name" label="策略名称" min-width="120" />
            <el-table-column prop="status" label="状态" width="80">
              <template #default="{ row }">
                <el-tag :type="getStatusType(row.status)" size="small">{{ row.status }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="return_rate" label="收益率" width="90" />
            <el-table-column prop="updated_at" label="更新时间" width="140" />
            <el-table-column label="操作" width="120" align="center">
              <template #default="{ row }">
                <div class="table-actions">
                  <el-button type="text" size="small" @click="viewStrategy(row)">查看</el-button>
                  <el-button type="text" size="small" @click="editStrategy(row)">编辑</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      
      <!-- 右侧边栏 -->
      <el-col :xs="24" :lg="8" :xl="7">
        <!-- 快速操作 -->
        <el-card class="quick-actions">
          <template #header>
            <span>快速操作</span>
          </template>
          <div class="action-buttons">
            <el-button type="primary" class="action-btn" @click="createStrategy">
              <el-icon><Plus /></el-icon>
              创建策略
            </el-button>
            <el-button type="success" class="action-btn" @click="createBacktest">
              <el-icon><DataAnalysis /></el-icon>
              开始回测
            </el-button>
            <el-button type="info" class="action-btn" @click="openAI">
              <el-icon><ChatDotRound /></el-icon>
              AI助手
            </el-button>
            <el-button type="warning" class="action-btn" @click="viewData">
              <el-icon><TrendCharts /></el-icon>
              查看数据
            </el-button>
          </div>
        </el-card>
        
        <!-- 最新通知 -->
        <el-card class="notifications-card">
          <template #header>
            <span>最新通知</span>
          </template>
          <div class="notification-list">
            <div 
              v-for="notification in notifications" 
              :key="notification.id"
              class="notification-item"
            >
              <div class="notification-content">
                <div class="notification-title">{{ notification.title }}</div>
                <div class="notification-time">{{ notification.time }}</div>
              </div>
              <el-icon class="notification-icon"><Bell /></el-icon>
            </div>
            <div v-if="notifications.length === 0" class="no-notifications">
              暂无新通知
            </div>
          </div>
        </el-card>
        
        <!-- 市场概况 -->
        <el-card class="market-overview">
          <template #header>
            <span>市场概况</span>
          </template>
          <div class="market-indices">
            <div class="index-item" v-for="index in marketIndices" :key="index.name">
              <div class="index-name">{{ index.name }}</div>
              <div class="index-value" :class="index.change >= 0 ? 'positive' : 'negative'">
                {{ index.value }}
                <span class="change">{{ index.change >= 0 ? '+' : '' }}{{ index.change }}%</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Document, 
  TrendCharts, 
  Medal, 
  Bell, 
  Plus, 
  DataAnalysis, 
  ChatDotRound 
} from '@element-plus/icons-vue'
import * as echarts from 'echarts'

const router = useRouter()

// 响应式数据
const stats = ref({
  strategyCount: 5,
  backtestCount: 23,
  bestReturn: 15.6,
  todaySignals: 3
})

const recentStrategies = ref([
  {
    id: 1,
    name: '均线突破策略',
    status: '运行中',
    return_rate: '+12.3%',
    updated_at: '2024-01-15 10:30'
  },
  {
    id: 2,
    name: 'RSI反转策略',
    status: '暂停',
    return_rate: '+8.7%',
    updated_at: '2024-01-14 16:45'
  },
  {
    id: 3,
    name: '布林带策略',
    status: '运行中',
    return_rate: '-2.1%',
    updated_at: '2024-01-14 09:20'
  }
])

const notifications = ref([
  {
    id: 1,
    title: '策略"均线突破"触发买入信号',
    time: '5分钟前'
  },
  {
    id: 2,
    title: '回测任务已完成',
    time: '1小时前'
  },
  {
    id: 3,
    title: '系统维护通知',
    time: '2小时前'
  }
])

const marketIndices = ref([
  { name: '上证指数', value: '3245.67', change: 1.23 },
  { name: '深证成指', value: '11234.56', change: -0.45 },
  { name: '创业板指', value: '2456.78', change: 2.15 },
  { name: '恒生指数', value: '23456.78', change: -1.02 }
])

const chartContainer = ref(null)

// 方法
const getStatusType = (status) => {
  const statusMap = {
    '运行中': 'success',
    '暂停': 'warning',
    '已停止': 'danger',
    '草稿': 'info'
  }
  return statusMap[status] || 'info'
}

const createStrategy = () => {
  router.push('/strategy/create')
}

const createBacktest = () => {
  router.push('/backtest/create')
}

const openAI = () => {
  router.push('/ai-assistant')
}

const viewData = () => {
  router.push('/data/stocks')
}

const goToStrategy = () => {
  router.push('/strategy')
}

const viewStrategy = (strategy) => {
  router.push(`/strategy/detail/${strategy.id}`)
}

const editStrategy = (strategy) => {
  router.push(`/strategy/edit/${strategy.id}`)
}

const initChart = () => {
  if (!chartContainer.value) return
  
  const chart = echarts.init(chartContainer.value)
  
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['策略收益', '基准收益'],
      top: 10
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}%'
      }
    },
    series: [
      {
        name: '策略收益',
        type: 'line',
        smooth: true,
        data: [2.3, 5.6, 8.2, 12.1, 15.6, 18.9, 16.4, 19.2, 22.1, 18.7, 21.3, 24.6],
        itemStyle: {
          color: '#409EFF'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(64, 158, 255, 0.3)' },
            { offset: 1, color: 'rgba(64, 158, 255, 0.1)' }
          ])
        }
      },
      {
        name: '基准收益',
        type: 'line',
        smooth: true,
        data: [1.2, 2.8, 4.1, 5.9, 7.2, 8.8, 7.9, 9.1, 10.3, 8.9, 10.1, 11.4],
        itemStyle: {
          color: '#67C23A'
        }
      }
    ],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '15%',
      containLabel: true
    }
  }
  
  chart.setOption(option)
  
  // 响应式
  window.addEventListener('resize', () => {
    chart.resize()
  })
}

// 生命周期
onMounted(() => {
  nextTick(() => {
    initChart()
  })
})
</script>

<style lang="scss" scoped>
/* === 页面容器 === */
.page-container {
  padding: 16px;
  min-height: 100%;
  width: 100vw;
  max-width: 100vw;
  margin: 0;
  box-sizing: border-box;
  overflow-x: hidden;
}

/* === 页面头部 === */
.page-header {
  margin-bottom: 16px;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 2px;
}

.page-description {
  color: var(--text-regular);
  font-size: 13px;
}

/* === 概览卡片 === */
.overview-cards {
  margin-bottom: 16px;
}

.overview-card {
  background: #fff;
  border-radius: 6px;
  padding: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  height: 64px;
  margin-bottom: 8px;
  transition: all 0.3s ease;
}

.overview-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transform: translateY(-1px);
}

.card-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  flex-shrink: 0;
}

.card-icon .el-icon {
  font-size: 18px;
  color: #fff;
}

.card-icon.primary {
  background: linear-gradient(135deg, #409EFF, #5DADE2);
}

.card-icon.success {
  background: linear-gradient(135deg, #67C23A, #85E085);
}

.card-icon.warning {
  background: linear-gradient(135deg, #E6A23C, #F4D03F);
}

.card-icon.danger {
  background: linear-gradient(135deg, #F56C6C, #F1948A);
}

.card-content {
  flex: 1;
}

.card-title {
  font-size: 11px;
  color: #909399;
  margin-bottom: 2px;
}

.card-value {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
}

/* === 主内容区域 === */
.main-content-area {
  min-height: 0;
  width: 100%;
}

/* === 图表卡片 === */
.chart-card {
  margin-bottom: 16px;
}

.chart-container {
  height: 260px;
  width: 100%;
}

/* === 策略卡片 === */
.strategy-card {
  margin-bottom: 16px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* === 表格操作按钮 === */
.table-actions {
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
}

/* === 快速操作 === */
.quick-actions {
  margin-bottom: 16px;
}

.action-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.action-btn {
  justify-content: center;
  height: 32px;
  font-size: 12px;
  padding: 0 8px;
}

.action-btn .el-icon {
  margin-right: 4px;
  font-size: 14px;
}

/* === 通知卡片 === */
.notifications-card {
  margin-bottom: 16px;
}

.notification-list {
  max-height: 160px;
  overflow-y: auto;
}

.notification-item {
  display: flex;
  align-items: flex-start;
  padding: 8px 0;
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.notification-item:hover {
  background-color: #f8f9fa;
  margin: 0 -12px;
  padding-left: 12px;
  padding-right: 12px;
  border-radius: 4px;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-title {
  font-size: 12px;
  color: #303133;
  margin-bottom: 2px;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.notification-time {
  font-size: 10px;
  color: #909399;
}

.notification-icon {
  color: #409EFF;
  font-size: 12px;
  margin-left: 6px;
  margin-top: 2px;
  flex-shrink: 0;
}

.no-notifications {
  text-align: center;
  color: #909399;
  padding: 20px 0;
  font-size: 12px;
}

/* === 市场概况 === */
.market-overview {
  margin-bottom: 16px;
}

.market-indices {
  display: grid;
  gap: 6px;
}

.index-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 8px;
  background: #f8f9fa;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.index-item:hover {
  background: #e9ecef;
}

.index-name {
  font-size: 12px;
  color: #303133;
  font-weight: 500;
}

.index-value {
  text-align: right;
  font-weight: bold;
  font-size: 12px;
}

.index-value.positive {
  color: #67C23A;
}

.index-value.negative {
  color: #F56C6C;
}

.change {
  font-size: 10px;
  margin-left: 2px;
}

/* === 响应式设计 === */
@media (min-width: 1920px) {
  .page-container {
    padding: 20px;
  }
  
  .chart-container {
    height: 300px !important;
  }
  
  .overview-card {
    height: 72px;
    padding: 16px;
  }
  
  .card-icon {
    width: 44px;
    height: 44px;
  }
  
  .action-buttons {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  
  .action-btn {
    height: 36px;
    justify-content: flex-start;
  }
}

@media (max-width: 1366px) {
  .page-container {
    padding: 12px;
  }
  
  .chart-container {
    height: 220px !important;
  }
  
  .overview-card {
    height: 56px;
    padding: 10px;
  }
  
  .card-icon {
    width: 36px;
    height: 36px;
  }
  
  .card-icon .el-icon {
    font-size: 16px;
  }
  
  .card-value {
    font-size: 16px;
  }
}

@media (max-width: 1200px) {
  .overview-cards {
    margin-bottom: 12px;
  }
  
  .overview-card {
    margin-bottom: 6px;
  }
  
  .action-buttons {
    grid-template-columns: 1fr;
    gap: 6px;
  }
  
  .action-btn {
    height: 30px;
    font-size: 11px;
  }
}

@media (max-width: 992px) {
  .page-container {
    padding: 10px;
  }
  
  .page-title {
    font-size: 18px;
  }
  
  .chart-container {
    height: 200px !important;
  }
  
  .notification-list {
    max-height: 120px;
  }
  
  .market-indices {
    gap: 4px;
  }
  
  .index-item {
    padding: 4px 6px;
  }
}

@media (max-width: 768px) {
  .page-container {
    padding: 8px;
  }
  
  .overview-card {
    height: 52px;
    padding: 8px;
  }
  
  .card-icon {
    width: 32px;
    height: 32px;
    margin-right: 8px;
  }
  
  .card-icon .el-icon {
    font-size: 14px;
  }
  
  .card-value {
    font-size: 14px;
  }
  
  .card-title {
    font-size: 10px;
  }
  
  .chart-container {
    height: 180px !important;
  }
  
  .action-buttons {
    gap: 4px;
  }
  
  .action-btn {
    height: 28px;
    font-size: 10px;
  }
}

/* === Element Plus 组件样式重写 === */
:deep(.el-row) {
  width: 100%;
  margin: 0 !important;
}

:deep(.el-col) {
  padding-left: 6px;
  padding-right: 6px;
}

:deep(.el-card) {
  width: 100%;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

:deep(.el-card__header) {
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
}

:deep(.el-card__body) {
  padding: 16px;
  width: 100%;
}

:deep(.el-table) {
  width: 100%;
  font-size: 12px;
}

:deep(.el-table th) {
  padding: 8px 0;
  font-size: 12px;
}

:deep(.el-table td) {
  padding: 6px 0;
  font-size: 12px;
}

:deep(.el-button--small) {
  padding: 4px 8px;
  font-size: 11px;
}

:deep(.el-tag--small) {
  height: 20px;
  line-height: 18px;
  font-size: 10px;
}
</style> 