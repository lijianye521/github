<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">策略详情</h1>
      <p class="page-description">查看策略详细信息</p>
    </div>
    
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ strategy.name }}</span>
          <div>
            <el-button type="primary">编辑</el-button>
            <el-button type="success">开始回测</el-button>
          </div>
        </div>
      </template>
      
      <el-descriptions :column="2" border>
        <el-descriptions-item label="策略名称">{{ strategy.name }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="getStatusType(strategy.status)">{{ strategy.status }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="收益率">{{ strategy.return_rate }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ strategy.created_at }}</el-descriptions-item>
        <el-descriptions-item label="描述" :span="2">{{ strategy.description }}</el-descriptions-item>
      </el-descriptions>
      
      <div style="margin-top: 20px;">
        <h3>策略代码</h3>
        <pre class="code-block">{{ strategy.code }}</pre>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const strategy = ref({
  name: '均线突破策略',
  status: '运行中',
  return_rate: '+12.3%',
  created_at: '2024-01-15',
  description: '基于5日和20日移动平均线的突破策略，当短期均线上穿长期均线时买入，下穿时卖出。',
  code: `# 均线突破策略
import pandas as pd
import numpy as np

def strategy_logic(data):
    data['MA5'] = data['close'].rolling(5).mean()
    data['MA20'] = data['close'].rolling(20).mean()
    
    signals = []
    for i in range(len(data)):
        if data['MA5'].iloc[i] > data['MA20'].iloc[i]:
            signals.append(1)
        else:
            signals.append(0)
    
    return signals`
})

const getStatusType = (status) => {
  const statusMap = {
    '运行中': 'success',
    '暂停': 'warning',
    '已停止': 'danger'
  }
  return statusMap[status] || 'info'
}
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.code-block {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  overflow-x: auto;
}
</style> 