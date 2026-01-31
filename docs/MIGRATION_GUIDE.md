# 🔄 前端优化迁移指南

## 📋 概览

本指南帮助你将现有组件迁移到新的优化架构。

---

## ✅ 检查清单

在开始迁移前，确保：
- [ ] 已安装所有依赖 (`npm install`)
- [ ] 了解项目结构
- [ ] 备份现有代码

---

## 🔧 迁移步骤

### 步骤 1: 替换 Alert 为 Toast

**之前：**
```typescript
const handleAction = () => {
  alert('操作成功！');
};
```

**之后：**
```typescript
import { useToast } from '@/hooks/useToast';

function MyComponent() {
  const { success } = useToast();
  
  const handleAction = () => {
    success('操作成功！');
  };
}
```

---

### 步骤 2: 使用钱包 Hook

**之前：**
```typescript
const [isConnected, setIsConnected] = useState(false);
const [address, setAddress] = useState(null);

const connectWallet = () => {
  // 手动连接逻辑
  setIsConnected(true);
  setAddress('0x...');
};
```

**之后：**
```typescript
import { useWallet } from '@/hooks/useWallet';

function MyComponent() {
  const { wallet, connect } = useWallet();
  
  // wallet.isConnected, wallet.address 自动管理
}
```

---

### 步骤 3: 添加 Loading 状态

**之前：**
```typescript
const [loading, setLoading] = useState(false);

if (loading) {
  return <div>加载中...</div>;
}
```

**之后：**
```typescript
import { Loading } from '@/components/ui/loading';

if (loading) {
  return <Loading text="加载中..." />;
}
```

---

### 步骤 4: 处理空状态

**之前：**
```typescript
if (data.length === 0) {
  return <div>暂无数据</div>;
}
```

**之后：**
```typescript
import { EmptyState } from '@/components/ui/empty-state';

if (data.length === 0) {
  return (
    <EmptyState
      title="暂无数据"
      description="还没有任何记录"
    />
  );
}
```

---

### 步骤 5: 处理错误状态

**之前：**
```typescript
if (error) {
  return <div>出错了: {error.message}</div>;
}
```

**之后：**
```typescript
import { ErrorState } from '@/components/ui/error-state';

if (error) {
  return (
    <ErrorState
      message={error.message}
      onRetry={() => refetch()}
    />
  );
}
```

---

### 步骤 6: 使用常量替换魔法数字

**之前：**
```typescript
const [leverage, setLeverage] = useState(5);
const minAmount = 10;
const fee = amount * 0.01;
```

**之后：**
```typescript
import { DEFAULT_LEVERAGE, MIN_BET_AMOUNT, PLATFORM_FEE_RATE } from '@/lib/constants';

const [leverage, setLeverage] = useState(DEFAULT_LEVERAGE);
const minAmount = MIN_BET_AMOUNT;
const fee = amount * PLATFORM_FEE_RATE;
```

---

### 步骤 7: 使用工具函数

**之前：**
```typescript
const formatted = `$${value.toFixed(2)}`;
const address = `${addr.slice(0, 4)}...${addr.slice(-4)}`;
```

**之后：**
```typescript
import { formatCurrency, formatAddress } from '@/lib/utils';

const formatted = formatCurrency(value);
const shortAddress = formatAddress(addr);
```

---

### 步骤 8: 添加类型定义

**之前：**
```typescript
const [position, setPosition] = useState({
  id: '1',
  amount: 100,
  // ...
});
```

**之后：**
```typescript
import type { Position } from '@/lib/types';

const [position, setPosition] = useState<Position>({
  id: '1',
  asset: 'AK47-Redline',
  side: 'long',
  amount: 100,
  leverage: 5,
  entryPrice: 6000,
  currentPrice: 6100,
  pnl: 83.33,
  pnlPercent: 8.33,
  timestamp: Date.now(),
});
```

---

## 🎯 完整示例：迁移一个组件

### 之前的代码

```typescript
'use client';

import { useState } from 'react';

export function OldComponent() {
  const [connected, setConnected] = useState(false);
  const [amount, setAmount] = useState(100);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async () => {
    if (!connected) {
      alert('请先连接钱包');
      return;
    }
    
    if (amount < 10) {
      alert('金额过小');
      return;
    }
    
    setLoading(true);
    try {
      // 执行操作
      alert('成功！');
    } catch (err) {
      alert('失败：' + err.message);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return <div>加载中...</div>;
  }
  
  return (
    <div>
      <button onClick={() => setConnected(!connected)}>
        {connected ? '已连接' : '连接钱包'}
      </button>
      <input 
        type="number" 
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button onClick={handleSubmit}>提交</button>
    </div>
  );
}
```

### 迁移后的代码

```typescript
'use client';

import { useState } from 'react';
import { useWallet } from '@/hooks/useWallet';
import { useToast } from '@/hooks/useToast';
import { Loading } from '@/components/ui/loading';
import { Button } from '@/components/ui/button';
import { MIN_BET_AMOUNT } from '@/lib/constants';
import { formatNumber } from '@/lib/utils';

export function NewComponent() {
  const { wallet, connect, disconnect } = useWallet();
  const { success, error } = useToast();
  const [amount, setAmount] = useState(100);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async () => {
    if (!wallet.isConnected) {
      error('未连接钱包', '请先连接钱包');
      return;
    }
    
    if (amount < MIN_BET_AMOUNT) {
      error('金额过小', `最小金额为 ${MIN_BET_AMOUNT}`);
      return;
    }
    
    setLoading(true);
    try {
      // 执行操作
      success('操作成功！', `已提交 ${formatNumber(amount)} MATIC`);
    } catch (err) {
      error('操作失败', err.message);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return <Loading text="处理中..." />;
  }
  
  return (
    <div className="space-y-4">
      <Button 
        onClick={wallet.isConnected ? disconnect : connect}
        variant={wallet.isConnected ? 'secondary' : 'primary'}
      >
        {wallet.isConnected ? `已连接 (${formatNumber(wallet.balance)} MATIC)` : '连接钱包'}
      </Button>
      
      <input 
        type="number" 
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        min={MIN_BET_AMOUNT}
        className="input-base"
      />
      
      <Button 
        onClick={handleSubmit}
        disabled={!wallet.isConnected || amount < MIN_BET_AMOUNT}
        fullWidth
      >
        提交
      </Button>
    </div>
  );
}
```

---

## 📊 迁移效果对比

| 方面 | 迁移前 | 迁移后 | 改进 |
|------|--------|--------|------|
| 代码行数 | 45 行 | 48 行 | 保持简洁 |
| 类型安全 | 无 | 完整 | ✅ |
| 错误处理 | Alert | Toast | ✅ |
| 用户体验 | 基础 | 优秀 | ✅ |
| 可维护性 | 中等 | 高 | ✅ |
| 代码复用 | 低 | 高 | ✅ |

---

## 🚀 渐进式迁移策略

### 阶段 1: 基础优化（1-2小时）
1. 引入工具函数和常量
2. 添加类型定义
3. 使用 Loading 和 ErrorState 组件

### 阶段 2: Hooks 集成（2-3小时）
1. 迁移到 useWallet
2. 迁移到 useToast
3. 添加 useLocalStorage（如需要）

### 阶段 3: 深度优化（3-4小时）
1. 性能优化（useMemo, useCallback）
2. 添加更多验证逻辑
3. 改进动画和交互

---

## 💡 常见问题

### Q: 必须一次性迁移所有组件吗？
**A:** 不需要！可以渐进式迁移，新旧代码可以共存。

### Q: 迁移会影响现有功能吗？
**A:** 不会。新的 hooks 和组件是额外添加的，不会影响现有代码。

### Q: 如何处理迁移中的问题？
**A:** 参考 [快速参考指南](./OPTIMIZATION_QUICK_REFERENCE.md) 和示例代码。

---

## 📚 相关文档

- [优化总结](./FRONTEND_OPTIMIZATION.md)
- [快速参考](./OPTIMIZATION_QUICK_REFERENCE.md)
- [项目结构](./PROJECT_STRUCTURE.md)

---

## ✅ 迁移完成检查

迁移后检查以下内容：

- [ ] 所有 alert 已替换为 Toast
- [ ] 钱包逻辑使用 useWallet
- [ ] 使用常量替换魔法数字
- [ ] 添加了适当的 Loading 状态
- [ ] 添加了错误处理
- [ ] 添加了类型定义
- [ ] 代码通过 TypeScript 检查
- [ ] 功能正常运行

---

**祝迁移顺利！** 🎉
