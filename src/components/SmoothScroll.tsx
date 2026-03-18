'use client';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import { useEffect } from 'react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  
  // Opcional: Si necesitas controlar Lenis desde otros componentes
  const lenis = useLenis(({ scroll }) => {
    // Aquí podrías ejecutar lógica basada en el valor del scroll
  });

  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.08,        // Un poco más suave (0.1 es estándar, 0.08 es "seda")
        duration: 1.2,     // Duración optimizada para no sentir retraso
        smoothWheel: true, 
        wheelMultiplier: 1,
        touchMultiplier: 0, // TIER 1 FIX: Desactiva el suavizado en pantallas táctiles
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}