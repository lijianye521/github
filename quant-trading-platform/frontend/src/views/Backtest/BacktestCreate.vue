<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">创建回测</h1>
      <p class="page-description">配置新的策略回测任务</p>
    </div>
    
    <el-card>
      <el-form :model="backtestForm" label-width="120px">
        <el-form-item label="回测名称">
          <el-input v-model="backtestForm.name" placeholder="请输入回测名称" />
        </el-form-item>
        
        <el-form-item label="选择策略">
          <el-select v-model="backtestForm.strategy_id" placeholder="请选择策略">
            <el-option 
              v-for="strategy in strategies" 
              :key="strategy.id"
              :label="strategy.name"
              :value="strategy.id"
            />
          </el-select>
        </el-form-item>
        
        <el-form-item label="回测时间">
          <el-date-picker
            v-model="backtestForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        
        <el-form-item label="初始资金">
          <el-input-number 
            v-model="backtestForm.initial_capital" 
            :min="10000"
            :max="10000000"
            :step="10000"
          />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary">开始回测</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const backtestForm = ref({
  name: '',
  strategy_id: null,
  dateRange: null,
  initial_capital: 100000
})

const strategies = ref([
  { id: 1, name: '均线突破策略' },
  { id: 2, name: 'RSI反转策略' },
  { id: 3, name: '布林带策略' }
])
</script> 