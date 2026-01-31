# 🎯 PolyStrike 前端优化 - 快速使用指南

## 🚀 新增功能速查

### 1. 钱包管理 (`useWallet`)

```typescript
import { useWallet } from '@/hooks/useWallet';

function MyComponent() {
  const { wallet, isLoading, error, connect, disconnect } = useWallet();
  
  // 钱包状态
  wallet.isConnected  // 是否已连接
  wallet.address      // 钱包地址
  wallet.balance      // 余额
  wallet.chainId      // 链 ID
  
  // 操作
  await connect();    // 连接钱包
  disconnect();       // 断开连接
}
```

---

### 2. 通知系统 (`useToast`)

```typescript
import { useToast } from '@/hooks/useToast';

function MyComponent() {
  const { success, error, info } = useToast();
  
  // 显示通知
  success('标题', '消息内容');
  error('错误标题', '错误详情');
  info('提示', '信息内容');
}
```

---

### 3. 本地存储 (`useLocalStorage`)

```typescript
import { useLocalStorage } from '@/hooks/useLocalStorage';

function MyComponent() {
  const [value, setValue] = useLocalStorage('key', defaultValue);
  
  // 使用方式与 useState 相同
  setValue(newValue);
  setValue(prev => prev + 1);
}
```

---

### 4. 防抖 (`useDebounce`)

```typescript
import { useDebounce } from '@/hooks/useDebounce';
import { useState } from 'react';

function SearchInput() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  
  // debouncedSearch 会在 500ms 后更新
  useEffect(() => {
    // 使用 debouncedSearch 进行搜索
  }, [debouncedSearch]);
}
```

---

### 5. UI 组件

#### Loading
```typescript
import { Loading } from '@/components/ui/loading';

<Loading />
<Loading size="lg" text="加载中..." />
<Loading fullScreen />
```

#### ErrorState
```typescript
import { ErrorState } from '@/components/ui/error-state';

<ErrorState 
  message="加载失败"
  onRetry={() => refetch()}
/>
```

#### EmptyState
```typescript
import { EmptyState } from '@/components/ui/empty-state';

<EmptyState
  title="暂无数据"
  description="还没有任何记录"
  action={<Button>创建第一个</Button>}
/>
```

#### Toast
```typescript
import { Toast, ToastContainer } from '@/components/ui/toast';

<ToastContainer>
  {toasts.map(toast => (
    <Toast key={toast.id} {...toast} onClose={() => remove(toast.id)} />
  ))}
</ToastContainer>
```

---

### 6. 工具函数

```typescript
import { 
  formatNumber, 
  formatCurrency,
  formatPercent,
  formatAddress,
  formatTimestamp,
  calculatePnL,
  truncateText,
  isValidAddress,
  generateId,
  sleep,
} from '@/lib/utils';

// 数字格式化
formatNumber(1234567)           // "1,234,567"
formatNumber(1234567, true)     // "1.2M" (紧凑模式)

// 货币格式化
formatCurrency(123.45)          // "$123.45"
formatCurrency(123.45, 'EUR')   // "€123.45"

// 百分比格式化
formatPercent(12.34)            // "+12.34%"
formatPercent(-5.67)            // "-5.67%"

// 地址格式化
formatAddress('0x1234...abcd')  // "0x1234...abcd"

// 时间格式化
formatTimestamp(Date.now())     // "Jan 31, 2026, 10:30 AM"

// 盈亏计算
calculatePnL(100, 110, 1000, 5, 'long')
// { pnl: 500, pnlPercent: 50 }

// 文本截断
truncateText('很长的文本...', 10)  // "很长的文本..."

// 地址验证
isValidAddress('0x...')         // true/false

// 生成 ID
generateId()                    // "1706678400000-abc123def"

// 异步延迟
await sleep(1000);              // 延迟 1 秒
```

---

### 7. 常量配置

```typescript
import {
  APP_NAME,
  SUPPORTED_CHAINS,
  DEFAULT_LEVERAGE,
  MIN_BET_AMOUNT,
  PLATFORM_FEE_RATE,
  ANIMATION_DURATION,
  API_ENDPOINTS,
  STORAGE_KEYS,
} from '@/lib/constants';

// 使用示例
console.log(APP_NAME);                    // "PolyStrike"
console.log(SUPPORTED_CHAINS.POLYGON.id); // 137
console.log(DEFAULT_LEVERAGE);            // 5
console.log(PLATFORM_FEE_RATE);           // 0.01 (1%)
```

---

### 8. 类型定义

```typescript
import type {
  Side,
  BetType,
  MarketStatus,
  Position,
  Market,
  ChatMessage,
  WalletState,
} from '@/lib/types';

// 使用类型
const position: Position = {
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
};
```

---

## 🎨 样式类名速查

### 卡片
```tsx
className="card"              // 基础卡片
className="card-elevated"     // 带阴影的卡片
```

### 按钮
```tsx
className="btn-primary"       // 主要按钮样式
```

### 输入框
```tsx
className="input-base"        // 基础输入框样式
```

---

## 📦 导入路径

```typescript
// Hooks
import { useWallet, useToast, useLocalStorage, useDebounce } from '@/hooks';

// UI 组件
import { Button, Loading, ErrorState, EmptyState, Toast } from '@/components/ui';

// 布局组件
import { Navbar } from '@/components/layout/navbar';
import { Sidebar } from '@/components/layout/sidebar';

// 工具函数
import { formatNumber, cn } from '@/lib/utils';

// 常量
import { APP_NAME, DEFAULT_LEVERAGE } from '@/lib/constants';

// 类型
import type { Position, Market } from '@/lib/types';
```

---

## 🔥 最佳实践

### 1. 组件中使用钱包
```typescript
function MyComponent() {
  const { wallet } = useWallet();
  
  if (!wallet.isConnected) {
    return <div>请先连接钱包</div>;
  }
  
  return <div>余额: {formatNumber(wallet.balance)}</div>;
}
```

### 2. 错误处理
```typescript
function MyComponent() {
  const { error } = useToast();
  const [loading, setLoading] = useState(false);
  
  const handleAction = async () => {
    setLoading(true);
    try {
      await someAction();
    } catch (err) {
      error('操作失败', err.message);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) return <Loading />;
}
```

### 3. 表单验证
```typescript
function TradeForm() {
  const { wallet } = useWallet();
  const { error } = useToast();
  const [amount, setAmount] = useState(100);
  
  const handleSubmit = () => {
    if (!wallet.isConnected) {
      error('未连接钱包');
      return;
    }
    
    if (amount < MIN_BET_AMOUNT) {
      error('金额过小', `最小金额为 ${MIN_BET_AMOUNT}`);
      return;
    }
    
    if (amount > wallet.balance) {
      error('余额不足');
      return;
    }
    
    // 提交表单
  };
}
```

---

## 💡 提示

- ✅ 所有 hooks 都经过 TypeScript 类型检查
- ✅ 所有组件都支持响应式设计
- ✅ 所有工具函数都包含错误处理
- ✅ 所有常量都集中管理，易于修改

---

## 📚 完整文档

详细文档请查看：
- [完整优化报告](./FRONTEND_OPTIMIZATION.md)
- [项目结构](./PROJECT_STRUCTURE.md)
- [快速开始](./QUICKSTART.md)
