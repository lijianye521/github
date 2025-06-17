<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">图表分析</h1>
      <p class="page-description">股票K线图和技术指标分析</p>
    </div>
    
    <el-card>
      <template #header>
        <div class="card-header">
          <span>股票K线图</span>
          <el-select v-model="selectedStock" placeholder="选择股票">
            <el-option 
              v-for="stock in stocks" 
              :key="stock.symbol"
              :label="`${stock.symbol} - ${stock.name}`"
              :value="stock.symbol"
            />
          </el-select>
        </div>
      </template>
      
      <div class="chart-container" ref="chartContainer" style="height: 500px;"></div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import * as echarts from 'echarts'

const selectedStock = ref('000001')

const stocks = ref([
  { symbol: '000001', name: '平安银行' },
  { symbol: '000002', name: '万科A' },
  { symbol: '600000', name: '浦发银行' },
  { symbol: '600036', name: '招商银行' }
])

const chartContainer = ref(null)
let chart = null

const initChart = () => {
  if (!chartContainer.value) return
  
  chart = echarts.init(chartContainer.value)
  updateChart()
}

const updateChart = () => {
  if (!chart) return
  
  // 模拟K线数据
  const klineData = [
    ['2024-01-01', 12.34, 12.67, 12.10, 12.45],
    ['2024-01-02', 12.45, 12.89, 12.30, 12.78],
    ['2024-01-03', 12.78, 13.02, 12.65, 12.95],
    ['2024-01-04', 12.95, 13.15, 12.80, 13.10],
    ['2024-01-05', 13.10, 13.30, 12.95, 13.20]
  ]
  
  const option = {
    title: {
      text: `${selectedStock.value} K线图`
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    xAxis: {
      type: 'category',
      data: klineData.map(item => item[0])
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'K线',
        type: 'candlestick',
        data: klineData.map(item => [item[1], item[4], item[3], item[2]]),
        itemStyle: {
          color: '#ef232a',
          color0: '#14b143',
          borderColor: '#ef232a',
          borderColor0: '#14b143'
        }
      }
    ]
  }
  
  chart.setOption(option)
}

// 监听股票选择变化
watch(selectedStock, () => {
  updateChart()
})

onMounted(() => {
  nextTick(() => {
    initChart()
  })
})
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style> 