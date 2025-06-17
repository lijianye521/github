<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">创建策略</h1>
      <p class="page-description">创建新的量化交易策略</p>
    </div>
    
    <el-card>
      <el-form :model="strategyForm" label-width="120px">
        <el-form-item label="策略名称">
          <el-input v-model="strategyForm.name" placeholder="请输入策略名称" />
        </el-form-item>
        
        <el-form-item label="策略描述">
          <el-input 
            v-model="strategyForm.description" 
            type="textarea" 
            :rows="3"
            placeholder="请输入策略描述"
          />
        </el-form-item>
        
        <el-form-item label="策略代码">
          <div class="code-editor">
            <el-input 
              v-model="strategyForm.code" 
              type="textarea" 
              :rows="20"
              placeholder="请输入Python策略代码"
            />
          </div>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary">保存策略</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const strategyForm = ref({
  name: '',
  description: '',
  code: `# 示例策略代码
import pandas as pd
import numpy as np

def strategy_logic(data):
    """
    策略逻辑函数
    参数: data - 股票数据DataFrame
    返回: 交易信号
    """
    # 计算移动平均线
    data['MA5'] = data['close'].rolling(5).mean()
    data['MA20'] = data['close'].rolling(20).mean()
    
    # 生成交易信号
    signals = []
    for i in range(len(data)):
        if data['MA5'].iloc[i] > data['MA20'].iloc[i]:
            signals.append(1)  # 买入信号
        else:
            signals.append(0)  # 卖出信号
    
    return signals
`
})
</script>

<style lang="scss" scoped>
.code-editor {
  .el-textarea {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  }
}
</style> 