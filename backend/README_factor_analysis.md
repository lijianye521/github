# 股票因子分析工具使用说明

## 1. 简介

本工具用于分析股票因子与未来收益之间的关系，基于 Alphalens 框架，能够计算因子 IC 值、分析因子稳定性、构建多因子模型等。

## 2. 环境安装

### 方法一：使用安装脚本（推荐）

```bash
# 进入 backend 目录
cd backend

# 运行安装脚本
python install_factor_libs.py
```

### 方法二：手动安装依赖

```bash
# 安装核心数据处理包
pip install pandas numpy scipy statsmodels matplotlib seaborn plotly openpyxl xlrd

# 安装因子分析包
pip install alphalens-reloaded pyfolio-reloaded empyrical-reloaded

# 安装 Jupyter 环境
pip install jupyter notebook jupyterlab ipykernel
```

## 3. 数据准备

### Excel 文件格式要求

1. 将您的 Excel 文件放在 `backend/data/` 目录下
2. Excel 文件格式要求：
   - 第一列：股票代码
   - 第二列：时间
   - 后续列：各种因子数据

示例：

| 股票代码 | 时间 | 前收盘价 | 收盘价 | 最高价 | 最低价 | 成交额 | 成交笔数 | 涨跌 | RSI相对强弱指标 | ... |
|---------|------|---------|-------|-------|-------|-------|---------|-----|--------------|-----|
| 000001.SZ | 2023-01-01 | 10.5 | 10.6 | 10.8 | 10.3 | 5000000 | 500 | 0.1 | 55.3 | ... |
| 000002.SZ | 2023-01-01 | 8.2 | 8.4 | 8.5 | 8.1 | 3000000 | 300 | 0.2 | 60.1 | ... |
| ... | ... | ... | ... | ... | ... | ... | ... | ... | ... | ... |

## 4. 使用方法

### 启动 Jupyter Notebook

```bash
# 进入 backend 目录
cd backend

# 启动 Jupyter Notebook
jupyter notebook
```

### 打开示例笔记本

1. 在 Jupyter 界面中打开 `factor_analysis_example.ipynb` 文件
2. 修改 `excel_file_path` 变量，指向您的 Excel 文件
3. 运行所有单元格

## 5. 分析结果解释

### IC 值（信息系数）

IC 是衡量因子预测能力的关键指标：

- **|IC| > 0.05**：优秀因子，预测能力强
- **0.02 < |IC| < 0.05**：良好因子，有一定预测能力
- **|IC| < 0.02**：一般因子，预测能力较弱

### 因子稳定性

- **方向一致**：不同周期（1日、5日、10日）的 IC 符号相同，表示因子稳定性好
- **方向不一致**：不同周期的 IC 符号不同，表示因子稳定性差

### 分位数收益

- 如果高分位收益率显著高于低分位，表示因子具有良好的区分能力
- 多空组合收益 = 最高分位收益 - 最低分位收益

## 6. 常见问题

### 1. 安装依赖失败

```bash
# 尝试升级 pip
pip install --upgrade pip

# 尝试使用国内镜像
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple alphalens-reloaded
```

### 2. 数据格式错误

- 确保 Excel 文件格式正确，第一列为股票代码，第二列为时间
- 确保数值列不包含非数值内容
- 检查是否有大量缺失值

### 3. 因子 IC 都很低

- 尝试更长的时间周期数据
- 尝试不同的因子组合
- 考虑因子中性化处理

## 7. 自定义分析

如需进行更复杂的因子分析，可以修改 `factor_analysis_example.ipynb` 文件：

1. 添加自定义因子计算
2. 修改因子标准化方法
3. 调整多因子模型权重
4. 添加行业中性化处理
5. 实现更复杂的回测逻辑

## 8. 联系与支持

如有问题，请联系项目维护者。 