import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ 
  title = "Something went wrong", 
  message = "We encountered an error while loading this data. Please try again.",
  onRetry 
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center rounded-lg border border-error-container bg-error-container/20">
      <AlertTriangle className="h-10 w-10 text-error mb-4" />
      <h3 className="font-h3 text-h3 text-on-surface mb-2">{title}</h3>
      <p className="text-body-sm text-on-surface-variant max-w-md mb-6">{message}</p>
      
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="border-error text-error hover:bg-error-container/30">
          Try Again
        </Button>
      )}
    </div>
  );
}
