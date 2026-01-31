import { useState, useCallback } from 'react';
import type { WalletState } from '@/lib/types';

export function useWallet() {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: 0,
    chainId: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 模拟钱包连接（实际应该调用 Web3 Provider）
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setWallet({
        isConnected: true,
        address: '0x1234567890abcdef1234567890abcdef12345678',
        balance: 1450.25,
        chainId: 137, // Polygon Mainnet
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : '连接失败');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setWallet({
      isConnected: false,
      address: null,
      balance: 0,
      chainId: null,
    });
  }, []);

  return {
    wallet,
    isLoading,
    error,
    connect,
    disconnect,
  };
}
