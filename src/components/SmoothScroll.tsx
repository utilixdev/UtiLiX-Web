'use client';

// @ts-ignore
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import { useEffect } from 'react';

export default function SmoothScroll({ children }: { children: any }) {
  
  const lenis = useLenis(({ scroll }: any) => {
    // Lógica opcional de scroll
  });

  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true, 
        wheelMultiplier: 1,
        touchMultiplier: 0,
        infinite: false,
      }}
    >
      {(Array.isArray(children) ? children : [children]) as any}
    </ReactLenis>
  );
}