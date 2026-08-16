/* eslint-disable @next/next/no-img-element */
"use client";

import { memo } from "react";

interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  /** Override default lazy loading for above-the-fold images */
  priority?: boolean;
}

function ImgBase({ alt, className, priority, draggable, ...props }: ImgProps) {
  // Note: a `loading` prop from callers is overridden by the explicit
  // attribute below — lazy/eager is driven solely by `priority`.
  return (
    <img
      alt={alt}
      className={className}
      draggable={draggable ?? false}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      {...props}
    />
  );
}

export const Img = memo(ImgBase);
