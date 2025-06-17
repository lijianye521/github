<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">回测结果</h1>
      <p class="page-description">查看策略回测分析结果</p>
    </div>
    
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <template #header>
            <span>{{ backtest.name }} - 回测结果</span>
          </template>
          
          <el-descriptions :column="3" border>
            <el-descriptions-item label="策略名称">{{ backtest.strategy_name }}</el-descriptions-item>
            <el-descriptions-item label="总收益率">{{ backtest.total_return }}</el-descriptions-item>
            <el-descriptions-item label="夏普比率">{{ backtest.sharpe_ratio }}</el-descriptions-item>
            <el-descriptions-item label="最大回撤">{{ backtest.max_drawdown }}</el-descriptions-item>
            <el-descriptions-item label="胜率">{{ backtest.win_rate }}</el-descriptions-item>
            <el-descriptions-item label="交易次数">{{ backtest.trade_count }}</el-descriptions-item>
          </el-descriptions>
          
          <div class="chart-container" style="margin-top: 20px;">
            <h3>收益曲线</h3>
            <div ref="chartContainer" style="height: 400px;"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'

const backtest = ref({
  name: '均线策略回测1',
  strategy_name: '均线突破策略',
  total_return: '+15.6%',
  sharpe_ratio: '1.23',
  max_drawdown: '-5.2%',
  win_rate: '62.5%',
  trade_count: '48'
})

const chartContainer = ref(null)

const initChart = () => {
  if (!chartContainer.value) return
  
  const chart = echarts.init(chartContainer.value)
  
  const option = {
    title: {
      text: '策略收益曲线'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06']
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
        data: [0, 3.2, 7.8, 12.1, 8.9, 15.6],
        itemStyle: {
          color: '#409EFF'
        }
      },
      {
        name: '基准收益',
        type: 'line',
        data: [0, 1.5, 3.2, 4.8, 6.1, 7.3],
        itemStyle: {
          color: '#67C23A'
        }
      }
    ]
  }
  
  chart.setOption(option)
}

onMounted(() => {
  nextTick(() => {
    initChart()
  })
})
</script> 