<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">股票数据</h1>
      <p class="page-description">查看和管理股票数据</p>
    </div>
    
    <el-card>
      <template #header>
        <div class="card-header">
          <span>股票列表</span>
          <el-input 
            v-model="searchKeyword" 
            placeholder="搜索股票代码或名称"
            style="width: 300px"
            prefix-icon="Search"
          />
        </div>
      </template>
      
      <el-table :data="filteredStocks" stripe>
        <el-table-column prop="symbol" label="股票代码" width="120" />
        <el-table-column prop="name" label="股票名称" />
        <el-table-column prop="price" label="当前价格" width="100" />
        <el-table-column prop="change" label="涨跌额" width="100">
          <template #default="{ row }">
            <span :class="row.change >= 0 ? 'positive' : 'negative'">
              {{ row.change >= 0 ? '+' : '' }}{{ row.change }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="change_percent" label="涨跌幅" width="100">
          <template #default="{ row }">
            <span :class="row.change_percent >= 0 ? 'positive' : 'negative'">
              {{ row.change_percent >= 0 ? '+' : '' }}{{ row.change_percent }}%
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="volume" label="成交量" />
        <el-table-column label="操作" width="150">
          <template #default="{ row }">
            <el-button type="text" size="small">查看详情</el-button>
            <el-button type="text" size="small">添加关注</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchKeyword = ref('')

const stocks = ref([
  { symbol: '000001', name: '平安银行', price: 12.34, change: 0.23, change_percent: 1.89, volume: '123万' },
  { symbol: '000002', name: '万科A', price: 18.67, change: -0.45, change_percent: -2.35, volume: '89万' },
  { symbol: '600000', name: '浦发银行', price: 8.92, change: 0.12, change_percent: 1.36, volume: '156万' },
  { symbol: '600036', name: '招商银行', price: 34.56, change: -0.78, change_percent: -2.21, volume: '201万' },
  { symbol: '000858', name: '五粮液', price: 156.78, change: 2.34, change_percent: 1.52, volume: '78万' }
])

const filteredStocks = computed(() => {
  if (!searchKeyword.value) return stocks.value
  
  return stocks.value.filter(stock => 
    stock.symbol.includes(searchKeyword.value) || 
    stock.name.includes(searchKeyword.value)
  )
})
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.positive {
  color: #67C23A;
}

.negative {
  color: #F56C6C;
}
</style> 