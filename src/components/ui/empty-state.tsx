'use client';

import { Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 p-12 text-center',
        className
      )}
    >
      <div className="rounded-full bg-bg-secondary p-4">
        {icon || <Inbox className="h-8 w-8 text-gray-500" />}
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        {description && (
          <p className="text-sm text-gray-400 max-w-md">{description}</p>
        )}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
