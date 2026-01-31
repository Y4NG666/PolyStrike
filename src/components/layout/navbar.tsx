'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Zap, Menu, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn, formatAddress, formatNumber } from '@/lib/utils';
import { useWallet } from '@/hooks/useWallet';
import { APP_NAME } from '@/lib/constants';

const NAV_ITEMS = [
  { label: '交易', href: '/trade' },
  { label: '直播', href: '/live' },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { wallet, isLoading, connect, disconnect } = useWallet();

  const handleWalletClick = async () => {
    if (wallet.isConnected) {
      disconnect();
    } else {
      await connect();
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-bg-primary/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2 font-bold text-xl group"
          aria-label={`${APP_NAME} Home`}
        >
          <div className="rounded-lg bg-gradient-to-br from-polygon to-purple-rare p-1.5 group-hover:scale-110 transition-transform">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="hidden sm:inline">{APP_NAME}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-1" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative px-4 py-2 font-semibold transition-colors',
                  isActive ? 'text-polygon' : 'text-gray-400 hover:text-white'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-polygon to-transparent" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            onClick={handleWalletClick}
            variant={wallet.isConnected ? 'secondary' : 'primary'}
            size="sm"
            className="whitespace-nowrap text-xs sm:text-base"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="hidden sm:inline">连接中...</span>
              </>
            ) : wallet.isConnected ? (
              <>
                <div className="h-2 w-2 rounded-full bg-profit animate-pulse" />
                <span className="hidden sm:inline">
                  {formatNumber(wallet.balance, true)} MATIC
                </span>
                <span className="sm:hidden">
                  {wallet.address ? formatAddress(wallet.address) : ''}
                </span>
              </>
            ) : (
              'Connect Wallet'
            )}
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="sm:hidden p-2 rounded-lg hover:bg-bg-secondary/50 transition-colors"
            aria-label="Toggle mobile menu"
            aria-expanded={showMobileMenu}
          >
            {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="sm:hidden border-t border-border-subtle bg-bg-secondary/50 animate-in slide-in-from-top">
          <nav className="flex flex-col p-4 gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setShowMobileMenu(false)}
                  className={cn(
                    'px-4 py-2 rounded-lg font-semibold transition-colors',
                    isActive
                      ? 'bg-polygon/20 text-polygon'
                      : 'text-gray-400 hover:text-white hover:bg-bg-primary/50'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
