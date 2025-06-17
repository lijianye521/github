# 量化AI股票策略平台

## 项目概述

这是一个前后端分离的量化AI股票策略平台，参考bigQuant的设计理念，为用户提供完整的策略开发、回测和执行环境。

## 技术栈

- **前端**: Vue.js 3 + Vite + Element Plus
- **后端**: Flask + SQLAlchemy + Redis
- **数据库**: PostgreSQL (主数据库) + Redis (缓存)
- **AI集成**: DeepSeek API
- **部署**: Docker + Nginx

## 核心功能

1. **用户认证系统** - 用户注册、登录、权限管理
2. **策略编辑器** - 在线代码编辑器，支持Python策略开发
3. **策略管理** - 策略保存、版本控制、分享
4. **回测系统** - 历史数据回测，性能分析
5. **实时交易** - 策略执行，实时监控
6. **数据服务** - 股票数据获取、清洗、存储
7. **通知系统** - 调仓提醒、策略信号推送
8. **AI助手** - 集成DeepSeek，辅助策略开发

## 项目结构

```
quant-trading-platform/
├── frontend/                 # Vue.js前端
│   ├── src/
│   │   ├── components/      # 组件
│   │   │   ├── Common/      # 通用组件
│   │   │   ├── Layout/      # 布局组件
│   │   │   ├── Strategy/    # 策略相关组件
│   │   │   ├── Backtest/    # 回测组件
│   │   │   ├── Charts/      # 图表组件
│   │   │   ├── Notification/ # 通知组件
│   │   │   └── AIAssistant/ # AI助手组件
│   │   ├── views/           # 页面
│   │   ├── router/          # 路由
│   │   ├── store/           # 状态管理
│   │   ├── api/             # API接口
│   │   ├── utils/           # 工具函数
│   │   ├── assets/          # 静态资源
│   │   └── styles/          # 样式文件
│   ├── public/              # 公共文件
│   └── tests/               # 测试文件
├── backend/                  # Flask后端
│   ├── app/
│   │   ├── models/          # 数据模型
│   │   ├── api/             # API路由
│   │   │   ├── auth/        # 认证API
│   │   │   ├── strategy/    # 策略API
│   │   │   ├── backtest/    # 回测API
│   │   │   ├── data/        # 数据API
│   │   │   ├── notification/ # 通知API
│   │   │   └── ai/          # AI API
│   │   ├── services/        # 业务逻辑
│   │   ├── utils/           # 工具函数
│   │   └── config/          # 配置文件
│   ├── tests/               # 测试文件
│   ├── migrations/          # 数据库迁移
│   └── scripts/             # 脚本文件
├── docs/                     # 文档
├── deployment/               # 部署文件
└── README.md                # 项目说明
```

## 开发计划

详细的开发任务请参考 `docs/development-roadmap.md`

## 快速开始

### 前端开发

```bash
cd frontend
npm install
npm run dev
```

### 后端开发

```bash
cd backend
pip install -r requirements.txt
python app.py
```

## 贡献指南

请参考 `docs/contributing.md`

## 许可证

MIT License 