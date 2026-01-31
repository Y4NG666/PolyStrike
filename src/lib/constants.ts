// 应用常量
export const APP_NAME = 'PolyStrike';
export const APP_VERSION = '1.0.0';

// 网络配置
export const SUPPORTED_CHAINS = {
  POLYGON: {
    id: 137,
    name: 'Polygon',
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorer: 'https://polygonscan.com',
  },
  POLYGON_MUMBAI: {
    id: 80001,
    name: 'Polygon Mumbai',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com',
    blockExplorer: 'https://mumbai.polygonscan.com',
  },
} as const;

// 默认值
export const DEFAULT_LEVERAGE = 5;
export const MIN_LEVERAGE = 1;
export const MAX_LEVERAGE = 10;
export const DEFAULT_BET_AMOUNT = 100;
export const MIN_BET_AMOUNT = 10;

// 费率
export const PLATFORM_FEE_RATE = 0.01; // 1%
export const SLIPPAGE_TOLERANCE = 0.005; // 0.5%

// UI 配置
export const MOBILE_BREAKPOINT = 640; // sm
export const TABLET_BREAKPOINT = 1024; // lg
export const DESKTOP_BREAKPOINT = 1280; // xl

// 动画配置
export const ANIMATION_DURATION = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
} as const;

export const SPRING_CONFIG = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
} as const;

// API 端点（待后端集成）
export const API_ENDPOINTS = {
  MARKETS: '/api/markets',
  POSITIONS: '/api/positions',
  ORDERS: '/api/orders',
  PRICE_FEED: '/api/prices',
  CHAT: '/api/chat',
} as const;

// WebSocket 端点
export const WS_ENDPOINTS = {
  PRICE_FEED: 'wss://api.polystrike.io/ws/prices',
  CHAT: 'wss://api.polystrike.io/ws/chat',
} as const;

// 本地存储键
export const STORAGE_KEYS = {
  WALLET_ADDRESS: 'wallet_address',
  USER_PREFERENCES: 'user_preferences',
  RECENT_MARKETS: 'recent_markets',
  THEME: 'theme',
} as const;

// 刷新间隔（毫秒）
export const REFRESH_INTERVALS = {
  PRICE: 3000, // 3秒
  POSITIONS: 5000, // 5秒
  MARKETS: 10000, // 10秒
  CHAT: 2000, // 2秒
} as const;
