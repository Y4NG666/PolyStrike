'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { useToast } from '@/hooks/useToast';
import {
  DEFAULT_LEVERAGE,
  MIN_LEVERAGE,
  MAX_LEVERAGE,
  MIN_BET_AMOUNT,
  PLATFORM_FEE_RATE,
} from '@/lib/constants';
import { formatNumber } from '@/lib/utils';
import type { Side } from '@/lib/types';

export function TradePanel() {
  const { wallet } = useWallet();
  const { success, error: showError } = useToast();
  
  const [direction, setDirection] = useState<Side>('long');
  const [amount, setAmount] = useState(100);
  const [leverage, setLeverage] = useState(DEFAULT_LEVERAGE);

  // 计算交易信息
  const tradeInfo = useMemo(() => {
    const marginRequired = amount / leverage;
    const positionSize = amount * leverage;
    const fee = amount * PLATFORM_FEE_RATE;
    // 简化的清算价格计算（实际应根据标的价格计算）
    const liquidationPrice = direction === 'long' ? 5600 : 6400;

    return {
      marginRequired,
      positionSize,
      fee,
      liquidationPrice,
    };
  }, [amount, leverage, direction]);

  const handlePlaceTrade = () => {
    if (!wallet.isConnected) {
      showError('未连接钱包', '请先连接钱包再进行交易');
      return;
    }

    if (amount < MIN_BET_AMOUNT) {
      showError('金额过小', `最小下单金额为 ${MIN_BET_AMOUNT} MATIC`);
      return;
    }

    if (amount > wallet.balance) {
      showError('余额不足', '您的余额不足以完成此交易');
      return;
    }

    success(
      '下单成功！',
      `${direction === 'long' ? '看多' : '看空'} ${formatNumber(amount)} MATIC (${leverage}x)`
    );
  };

  const handleQuickAmount = (percentage: number) => {
    if (!wallet.isConnected) {
      setAmount(percentage === 100 ? 1000 : percentage * 10);
    } else {
      const calculatedAmount = (wallet.balance * percentage) / 100;
      setAmount(Math.max(MIN_BET_AMOUNT, Math.floor(calculatedAmount)));
    }
  };

  return (
    <div className="card-elevated p-4 sm:p-6 h-full space-y-6">
      {/* Direction selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          交易方向 (Direction)
        </label>
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setDirection('long')}
            className={`rounded-lg p-4 font-semibold transition-all border-2 ${
              direction === 'long'
                ? 'bg-profit/20 border-profit text-profit'
                : 'border-border-subtle text-gray-400 hover:border-profit/50'
            }`}
            aria-pressed={direction === 'long'}
          >
            <TrendingUp className="h-5 w-5 mx-auto mb-2" />
            看多 (LONG)
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setDirection('short')}
            className={`rounded-lg p-4 font-semibold transition-all border-2 ${
              direction === 'short'
                ? 'bg-loss/20 border-loss text-loss'
                : 'border-border-subtle text-gray-400 hover:border-loss/50'
            }`}
            aria-pressed={direction === 'short'}
          >
            <TrendingDown className="h-5 w-5 mx-auto mb-2" />
            看空 (SHORT)
          </motion.button>
        </div>
      </div>

      {/* Amount input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            下单金额 (Amount)
          </label>
          {wallet.isConnected && (
            <span className="text-xs text-gray-500">
              余额: {formatNumber(wallet.balance, true)} MATIC
            </span>
          )}
        </div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
          min={MIN_BET_AMOUNT}
          max={wallet.isConnected ? wallet.balance : undefined}
          className="input-base text-lg font-bold"
          placeholder="100"
        />

        {/* Quick buttons */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: '25%', value: 25 },
            { label: '50%', value: 50 },
            { label: 'Max', value: 100 },
          ].map(({ label, value }) => (
            <button
              key={label}
              onClick={() => handleQuickAmount(value)}
              className="px-3 py-1.5 rounded-lg border border-border-subtle text-xs font-semibold text-gray-400 hover:text-polygon hover:border-polygon/50 transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Leverage */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            杠杆 (Leverage)
          </label>
          <span className="text-lg font-bold text-polygon">{leverage}x</span>
        </div>
        <input
          type="range"
          min={MIN_LEVERAGE}
          max={MAX_LEVERAGE}
          step="1"
          value={leverage}
          onChange={(e) => setLeverage(Number(e.target.value))}
          className="w-full cursor-pointer accent-polygon"
          aria-label="Leverage slider"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>{MIN_LEVERAGE}x</span>
          <span>{MAX_LEVERAGE}x</span>
        </div>
      </div>

      {/* Trade summary */}
      <div className="border-t border-border-subtle pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">保证金 (Margin):</span>
          <span className="font-semibold">
            {formatNumber(tradeInfo.marginRequired, true)} MATIC
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">仓位价值 (Position):</span>
          <span className="font-semibold">
            {formatNumber(tradeInfo.positionSize, true)} MATIC
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">手续费 (Fee):</span>
          <span className="font-semibold">
            {formatNumber(tradeInfo.fee, true)} MATIC
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">清算价格 (Liq. Price):</span>
          <span className="font-semibold text-loss">
            ${formatNumber(tradeInfo.liquidationPrice)}
          </span>
        </div>
      </div>

      {/* Place trade button */}
      <Button
        onClick={handlePlaceTrade}
        variant={direction === 'long' ? 'success' : 'danger'}
        fullWidth
        className="text-lg py-6 font-bold"
        disabled={!wallet.isConnected || amount < MIN_BET_AMOUNT}
      >
        {!wallet.isConnected
          ? '请先连接钱包'
          : direction === 'long'
          ? '开多 (LONG)'
          : '开空 (SHORT)'}
      </Button>

      {/* Risk warning */}
      <div className="bg-loss/10 border border-loss/30 rounded-lg p-3 text-xs text-loss/80">
        ⚠️ 杠杆交易有风险，可能导致亏损超过本金，请谨慎操作。
      </div>
    </div>
  );
}
