import { type LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 rounded-2xl bg-cmc-gray flex items-center justify-center mb-4">
        <Icon size={32} className="text-cmc-mid" />
      </div>
      <h3 className="text-lg font-bold text-cmc-text mb-1">{title}</h3>
      {description && <p className="text-sm text-cmc-text-light text-center max-w-sm mb-4">{description}</p>}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="btn-press px-5 py-2.5 bg-cmc-lime text-white font-bold rounded-xl hover:bg-cmc-lime/80 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
