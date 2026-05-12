import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  children?: ReactNode;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction, children }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center rounded-lg border-2 border-dashed border-outline-variant bg-surface-container-lowest/50">
      <div className="h-12 w-12 rounded-full bg-primary-container/10 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="font-h3 text-h3 text-on-surface mb-2">{title}</h3>
      <p className="text-body-sm text-on-surface-variant max-w-sm mb-6">{description}</p>
      
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary">
          {actionLabel}
        </Button>
      )}
      {children}
    </div>
  );
}
