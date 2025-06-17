<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">编辑策略</h1>
      <p class="page-description">编辑现有的量化交易策略</p>
    </div>
    
    <el-card>
      <el-form :model="strategyForm" label-width="120px">
        <el-form-item label="策略名称">
          <el-input v-model="strategyForm.name" />
        </el-form-item>
        
        <el-form-item label="策略描述">
          <el-input 
            v-model="strategyForm.description" 
            type="textarea" 
            :rows="3"
          />
        </el-form-item>
        
        <el-form-item label="策略代码">
          <div class="code-editor">
            <el-input 
              v-model="strategyForm.code" 
              type="textarea" 
              :rows="20"
            />
          </div>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary">保存修改</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const strategyForm = ref({
  name: '均线突破策略',
  description: '基于移动平均线的突破策略',
  code: '# 策略代码\nprint("Hello Strategy")'
})
</script>

<style lang="scss" scoped>
.code-editor {
  .el-textarea {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  }
}
</style> 