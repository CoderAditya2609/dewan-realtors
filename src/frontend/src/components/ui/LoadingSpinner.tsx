import { Loader2 } from "lucide-react";
import { motion } from "motion/react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullPage?: boolean;
}

const SIZE_MAP = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-10 h-10",
};

export function LoadingSpinner({
  size = "md",
  text,
  fullPage = false,
}: LoadingSpinnerProps) {
  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <Loader2 className={`${SIZE_MAP[size]} text-accent animate-spin`} />
      {text && (
        <p className="text-sm text-muted-foreground animate-pulse">{text}</p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
        data-ocid="loading-spinner-fullpage"
      >
        {spinner}
      </motion.div>
    );
  }

  return (
    <div
      className="flex items-center justify-center py-12"
      data-ocid="loading-spinner"
    >
      {spinner}
    </div>
  );
}

export function PropertyCardSkeleton() {
  return (
    <div className="card-glass rounded-xl overflow-hidden border border-border/30 animate-pulse">
      <div className="aspect-[4/3] bg-muted" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-1/2" />
        <div className="flex gap-4">
          <div className="h-3 bg-muted rounded w-16" />
          <div className="h-3 bg-muted rounded w-16" />
          <div className="h-3 bg-muted rounded w-20 ml-auto" />
        </div>
        <div className="h-9 bg-muted rounded-lg" />
      </div>
    </div>
  );
}
