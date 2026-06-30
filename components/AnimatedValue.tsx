"use client";

import { useEffect, useState } from "react";

export function AnimatedValue({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 900;
    const start = performance.now();

    const frame = (time: number) => {
      const progress = Math.min(1, (time - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    };

    const animationId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animationId);
  }, [value]);

  return (
    <span className="number-tabular">
      ￥{displayValue.toLocaleString("zh-CN")}
    </span>
  );
}
