"use client";

import { ReactLenis } from '@studio-freight/react-lenis';
import { ReactNode } from 'react';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {/* @ts-expect-error - The children prop type in react-lenis v0.0.47 is not compatible with React 19 ReactNode in this configuration. This bypass is required for the production build. */}
      {children}
    </ReactLenis>
  );
}
