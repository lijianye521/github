# 数据库设计文档

## 概述

本文档描述了量化AI股票策略平台的数据库设计，包括主要表结构、字段定义和关系设计。

## 数据库选择

- **主数据库**: PostgreSQL - 用于存储用户数据、策略、回测记录等
- **缓存数据库**: Redis - 用于缓存股票数据、会话管理等

## 主要表结构

### 1. 用户表 (users)

| 字段名 | 类型 | 长度 | 非空 | 主键 | 说明 |
|--------|------|------|------|------|------|
| id | INTEGER | - | Y | Y | 用户ID |
| username | VARCHAR | 50 | Y | N | 用户名 |
| email | VARCHAR | 100 | Y | N | 邮箱 |
| password_hash | VARCHAR | 255 | Y | N | 密码哈希 |
| avatar_url | VARCHAR | 255 | N | N | 头像URL |
| is_active | BOOLEAN | - | Y | N | 是否激活 |
| is_vip | BOOLEAN | - | Y | N | 是否VIP |
| created_at | TIMESTAMP | - | Y | N | 创建时间 |
| updated_at | TIMESTAMP | - | Y | N | 更新时间 |

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    is_vip BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. 策略表 (strategies)

| 字段名 | 类型 | 长度 | 非空 | 主键 | 说明 |
|--------|------|------|------|------|------|
| id | INTEGER | - | Y | Y | 策略ID |
| user_id | INTEGER | - | Y | N | 用户ID |
| name | VARCHAR | 100 | Y | N | 策略名称 |
| description | TEXT | - | N | N | 策略描述 |
| code | TEXT | - | Y | N | 策略代码 |
| parameters | JSON | - | N | N | 策略参数 |
| status | VARCHAR | 20 | Y | N | 状态(draft/active/paused) |
| is_public | BOOLEAN | - | Y | N | 是否公开 |
| tags | JSON | - | N | N | 标签 |
| version | INTEGER | - | Y | N | 版本号 |
| created_at | TIMESTAMP | - | Y | N | 创建时间 |
| updated_at | TIMESTAMP | - | Y | N | 更新时间 |

```sql
CREATE TABLE strategies (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    code TEXT NOT NULL,
    parameters JSON,
    status VARCHAR(20) DEFAULT 'draft',
    is_public BOOLEAN DEFAULT false,
    tags JSON,
    version INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. 回测记录表 (backtests)

| 字段名 | 类型 | 长度 | 非空 | 主键 | 说明 |
|--------|------|------|------|------|------|
| id | INTEGER | - | Y | Y | 回测ID |
| strategy_id | INTEGER | - | Y | N | 策略ID |
| user_id | INTEGER | - | Y | N | 用户ID |
| name | VARCHAR | 100 | Y | N | 回测名称 |
| start_date | DATE | - | Y | N | 开始日期 |
| end_date | DATE | - | Y | N | 结束日期 |
| initial_capital | DECIMAL | 15,2 | Y | N | 初始资金 |
| final_capital | DECIMAL | 15,2 | N | N | 最终资金 |
| total_return | DECIMAL | 10,4 | N | N | 总收益率 |
| sharpe_ratio | DECIMAL | 8,4 | N | N | 夏普比率 |
| max_drawdown | DECIMAL | 8,4 | N | N | 最大回撤 |
| win_rate | DECIMAL | 6,4 | N | N | 胜率 |
| trade_count | INTEGER | - | N | N | 交易次数 |
| status | VARCHAR | 20 | Y | N | 状态(running/completed/failed) |
| result_data | JSON | - | N | N | 详细结果数据 |
| created_at | TIMESTAMP | - | Y | N | 创建时间 |
| completed_at | TIMESTAMP | - | N | N | 完成时间 |

```sql
CREATE TABLE backtests (
    id SERIAL PRIMARY KEY,
    strategy_id INTEGER REFERENCES strategies(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    initial_capital DECIMAL(15,2) NOT NULL,
    final_capital DECIMAL(15,2),
    total_return DECIMAL(10,4),
    sharpe_ratio DECIMAL(8,4),
    max_drawdown DECIMAL(8,4),
    win_rate DECIMAL(6,4),
    trade_count INTEGER,
    status VARCHAR(20) DEFAULT 'running',
    result_data JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);
```

### 4. 股票基础信息表 (stocks)

| 字段名 | 类型 | 长度 | 非空 | 主键 | 说明 |
|--------|------|------|------|------|------|
| id | INTEGER | - | Y | Y | 股票ID |
| symbol | VARCHAR | 20 | Y | N | 股票代码 |
| name | VARCHAR | 100 | Y | N | 股票名称 |
| market | VARCHAR | 10 | Y | N | 市场(SH/SZ/HK/US) |
| industry | VARCHAR | 50 | N | N | 行业 |
| list_date | DATE | - | N | N | 上市日期 |
| is_active | BOOLEAN | - | Y | N | 是否有效 |
| created_at | TIMESTAMP | - | Y | N | 创建时间 |
| updated_at | TIMESTAMP | - | Y | N | 更新时间 |

```sql
CREATE TABLE stocks (
    id SERIAL PRIMARY KEY,
    symbol VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    market VARCHAR(10) NOT NULL,
    industry VARCHAR(50),
    list_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. 股票日线数据表 (stock_daily_data)

| 字段名 | 类型 | 长度 | 非空 | 主键 | 说明 |
|--------|------|------|------|------|------|
| id | INTEGER | - | Y | Y | 记录ID |
| stock_id | INTEGER | - | Y | N | 股票ID |
| trade_date | DATE | - | Y | N | 交易日期 |
| open | DECIMAL | 10,4 | Y | N | 开盘价 |
| high | DECIMAL | 10,4 | Y | N | 最高价 |
| low | DECIMAL | 10,4 | Y | N | 最低价 |
| close | DECIMAL | 10,4 | Y | N | 收盘价 |
| volume | BIGINT | - | Y | N | 成交量 |
| turnover | DECIMAL | 15,2 | N | N | 成交额 |
| pct_change | DECIMAL | 8,4 | N | N | 涨跌幅 |
| created_at | TIMESTAMP | - | Y | N | 创建时间 |

```sql
CREATE TABLE stock_daily_data (
    id SERIAL PRIMARY KEY,
    stock_id INTEGER REFERENCES stocks(id) ON DELETE CASCADE,
    trade_date DATE NOT NULL,
    open DECIMAL(10,4) NOT NULL,
    high DECIMAL(10,4) NOT NULL,
    low DECIMAL(10,4) NOT NULL,
    close DECIMAL(10,4) NOT NULL,
    volume BIGINT NOT NULL,
    turnover DECIMAL(15,2),
    pct_change DECIMAL(8,4),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(stock_id, trade_date)
);
```

### 6. 通知表 (notifications)

| 字段名 | 类型 | 长度 | 非空 | 主键 | 说明 |
|--------|------|------|------|------|------|
| id | INTEGER | - | Y | Y | 通知ID |
| user_id | INTEGER | - | Y | N | 用户ID |
| type | VARCHAR | 20 | Y | N | 通知类型 |
| title | VARCHAR | 200 | Y | N | 标题 |
| content | TEXT | - | Y | N | 内容 |
| is_read | BOOLEAN | - | Y | N | 是否已读 |
| created_at | TIMESTAMP | - | Y | N | 创建时间 |

```sql
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 7. AI对话记录表 (ai_conversations)

| 字段名 | 类型 | 长度 | 非空 | 主键 | 说明 |
|--------|------|------|------|------|------|
| id | INTEGER | - | Y | Y | 对话ID |
| user_id | INTEGER | - | Y | N | 用户ID |
| session_id | VARCHAR | 100 | Y | N | 会话ID |
| role | VARCHAR | 20 | Y | N | 角色(user/assistant) |
| content | TEXT | - | Y | N | 对话内容 |
| created_at | TIMESTAMP | - | Y | N | 创建时间 |

```sql
CREATE TABLE ai_conversations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    session_id VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 索引设计

```sql
-- 用户表索引
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);

-- 策略表索引
CREATE INDEX idx_strategies_user_id ON strategies(user_id);
CREATE INDEX idx_strategies_status ON strategies(status);
CREATE INDEX idx_strategies_is_public ON strategies(is_public);

-- 回测记录表索引
CREATE INDEX idx_backtests_strategy_id ON backtests(strategy_id);
CREATE INDEX idx_backtests_user_id ON backtests(user_id);
CREATE INDEX idx_backtests_status ON backtests(status);

-- 股票数据表索引
CREATE INDEX idx_stocks_symbol ON stocks(symbol);
CREATE INDEX idx_stocks_market ON stocks(market);
CREATE INDEX idx_stock_daily_data_stock_date ON stock_daily_data(stock_id, trade_date);
CREATE INDEX idx_stock_daily_data_date ON stock_daily_data(trade_date);

-- 通知表索引
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);

-- AI对话表索引
CREATE INDEX idx_ai_conversations_user_id ON ai_conversations(user_id);
CREATE INDEX idx_ai_conversations_session_id ON ai_conversations(session_id);
```

## Redis数据结构设计

### 1. 用户会话 (Session)
```
Key: session:{session_id}
Type: Hash
TTL: 7200 (2小时)
Fields:
  - user_id: 用户ID
  - username: 用户名
  - login_time: 登录时间
```

### 2. 实时股价缓存
```
Key: stock:price:{symbol}
Type: Hash
TTL: 60 (1分钟)
Fields:
  - price: 当前价格
  - change: 涨跌额
  - pct_change: 涨跌幅
  - volume: 成交量
  - update_time: 更新时间
```

### 3. 策略执行状态
```
Key: strategy:status:{strategy_id}
Type: Hash
TTL: 86400 (1天)
Fields:
  - status: 运行状态
  - last_signal: 最后信号
  - last_trade: 最后交易时间
  - position: 当前持仓
```

### 4. 回测任务队列
```
Key: backtest:queue
Type: List
存储待执行的回测任务ID
```

## 数据库配置建议

### PostgreSQL配置优化
```postgresql
# postgresql.conf
shared_buffers = 256MB
effective_cache_size = 1GB
work_mem = 4MB
maintenance_work_mem = 64MB
checkpoint_completion_target = 0.9
wal_buffers = 16MB
default_statistics_target = 100
```

### 备份策略
1. **全量备份**: 每天凌晨2点执行
2. **增量备份**: 每4小时执行一次
3. **WAL归档**: 实时归档
4. **备份保留**: 保留30天

### 监控指标
1. 数据库连接数
2. 查询响应时间
3. 磁盘使用率
4. 缓存命中率
5. 锁等待时间 