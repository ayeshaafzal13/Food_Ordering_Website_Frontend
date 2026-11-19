import { useState } from "react";
import { UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  src?: string;
  alt: string;
  fallback?: string;
  className?: string;
  eager?: boolean;
};

/**
 * <img> that never shows a broken-image icon:
 * src -> fallback (bundled photo) -> coloured placeholder.
 * Parent controls the size (use an aspect-* class on the wrapper or className).
 */
const FoodImage = ({ src, alt, fallback, className, eager }: Props) => {
  const [stage, setStage] = useState<0 | 1 | 2>(src ? 0 : fallback ? 1 : 2);
  const current = stage === 0 ? src : stage === 1 ? fallback : undefined;

  if (!current) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-orange-100 to-amber-200 text-primary/60",
          className
        )}
      >
        <UtensilsCrossed className="size-8" />
      </div>
    );
  }

  return (
    <img
      key={current}
      src={current}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={cn("object-cover", className)}
      onError={() => setStage((s) => (s === 0 && fallback ? 1 : 2))}
    />
  );
};

export default FoodImage;
