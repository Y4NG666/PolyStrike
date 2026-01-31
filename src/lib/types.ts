// 全局类型定义
export type Side = 'long' | 'short';
export type BetType = 'common' | 'rare' | 'legendary';
export type MarketStatus = 'open' | 'locked' | 'resolved' | 'cancelled';

export interface BettingOption {
  id: string;
  label: string;
  description: string;
  multiplier: string;
  icon: string;
  color: string;
  borderColor: string;
  legendary?: boolean;
}

export interface Position {
  id: string;
  asset: string;
  side: Side;
  amount: number;
  leverage: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  timestamp: number;
}

export interface Market {
  id: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  status: MarketStatus;
}

export interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: number;
  amount?: number;
  type?: 'bet' | 'win' | 'normal';
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: number;
  chainId: number | null;
}
