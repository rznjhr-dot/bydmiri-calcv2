/* eslint-disable @next/next/no-img-element */
"use client";

import { memo } from "react";

interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
}

function ImgBase({ alt, className, draggable, ...props }: ImgProps) {
  return (
    <img
      alt={alt}
      className={className}
      draggable={draggable ?? false}
      loading="lazy"
      {...props}
    />
  );
}

export const Img = memo(ImgBase);
