import { Loader2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Spinner({ className, size = 24 }: { className?: string; size?: number }) {
  return <Loader2 className={cn("animate-spin text-primary", className)} size={size} />;
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[400px] w-full">
      <Spinner size={40} />
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse rounded-md bg-surface-container-high", className)} />
  );
}
