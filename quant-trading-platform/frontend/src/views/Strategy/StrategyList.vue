<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">策略管理</h1>
      <p class="page-description">管理您的量化交易策略</p>
    </div>
    
    <el-card>
      <template #header>
        <div class="card-header">
          <span>策略列表</span>
          <el-button type="primary" @click="createStrategy">创建策略</el-button>
        </div>
      </template>
      
      <el-table :data="strategies" stripe>
        <el-table-column prop="name" label="策略名称" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="return_rate" label="收益率" />
        <el-table-column prop="created_at" label="创建时间" />
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">回测</el-button>
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

const strategies = ref([
  { id: 1, name: '均线突破策略', status: '运行中', return_rate: '+12.3%', created_at: '2024-01-15' },
  { id: 2, name: 'RSI反转策略', status: '暂停', return_rate: '+8.7%', created_at: '2024-01-14' },
  { id: 3, name: '布林带策略', status: '运行中', return_rate: '-2.1%', created_at: '2024-01-14' }
])

const getStatusType = (status) => {
  const statusMap = {
    '运行中': 'success',
    '暂停': 'warning',
    '已停止': 'danger'
  }
  return statusMap[status] || 'info'
}

const createStrategy = () => {
  router.push('/strategy/create')
}
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style> 