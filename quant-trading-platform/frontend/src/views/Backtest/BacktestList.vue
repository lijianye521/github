<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">回测管理</h1>
      <p class="page-description">管理您的策略回测记录</p>
    </div>
    
    <el-card>
      <template #header>
        <div class="card-header">
          <span>回测列表</span>
          <el-button type="primary" @click="createBacktest">新建回测</el-button>
        </div>
      </template>
      
      <el-table :data="backtests" stripe>
        <el-table-column prop="name" label="回测名称" />
        <el-table-column prop="strategy_name" label="策略名称" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="total_return" label="总收益率" />
        <el-table-column prop="created_at" label="创建时间" />
        <el-table-column label="操作" width="150">
          <template #default="{ row }">
            <el-button type="text" size="small">查看结果</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const backtests = ref([
  { id: 1, name: '均线策略回测1', strategy_name: '均线突破策略', status: '已完成', total_return: '+15.6%', created_at: '2024-01-15' },
  { id: 2, name: 'RSI策略回测1', strategy_name: 'RSI反转策略', status: '运行中', total_return: '--', created_at: '2024-01-14' },
  { id: 3, name: '布林带策略回测1', strategy_name: '布林带策略', status: '已完成', total_return: '-2.1%', created_at: '2024-01-14' }
])

const getStatusType = (status) => {
  const statusMap = {
    '已完成': 'success',
    '运行中': 'warning',
    '失败': 'danger'
  }
  return statusMap[status] || 'info'
}

const createBacktest = () => {
  router.push('/backtest/create')
}
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style> 