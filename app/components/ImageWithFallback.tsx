'use client';

import Image from 'next/image';
import React from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackSrc?: string; // Optional fallback source
  className?: string;
  fill?: boolean;
  sizes?: string;
  style?: React.CSSProperties;
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc = "/gouda.png", // Default fallback if not provided
  className,
  ...rest
}: ImageWithFallbackProps) {
  return (
    <Image
      src={src || fallbackSrc} // Use original src or fallback if src is empty
      alt={alt}
      className={className}
      onError={(e) => {
        // This event handler requires the component to be a Client Component
        e.currentTarget.src = fallbackSrc;
        e.currentTarget.srcset = fallbackSrc;
      }}
      {...rest} // Pass through other props like fill, sizes, style
    />
  );
}