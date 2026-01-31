'use client';

import { AlertTriangle } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = '出错了',
  message,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 p-8 text-center',
        className
      )}
    >
      <div className="rounded-full bg-loss/10 p-4">
        <AlertTriangle className="h-8 w-8 text-loss" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="text-sm text-gray-400 max-w-md">{message}</p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} variant="secondary" size="sm">
          重试
        </Button>
      )}
    </div>
  );
}
