'use client';
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isBack, setIsBack] = useState(false); // Nuevo estado para el efecto "Volver"
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 400, damping: 50, mass: 0.5 };
  const lagConfig = { stiffness: 120, damping: 30, mass: 1 };

  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  const ringX = useSpring(mouseX, lagConfig);
  const ringY = useSpring(mouseY, lagConfig);

  useEffect(() => {
    setMounted(true);
    const checkDevice = () => setIsMobile(window.innerWidth < 768);
    
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest('button, a, .clickable, input, textarea');
      setIsHovering(!!clickable);
      
      // Detectamos si es el botón de volver específico
      setIsBack(!!target.closest('[data-cursor="back"]'));
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!mounted || isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999]">
      {/* 1. NÚCLEO */}
      <motion.div
        className="absolute top-0 left-0 w-1 h-1 bg-white rounded-full mix-blend-difference"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
      />

      {/* 2. RADAR - Cambia a color verde si es isBack */}
      <motion.div
        className="absolute top-0 left-0 border rounded-full"
        animate={{
          width: isHovering ? 80 : 30,
          height: isHovering ? 80 : 30,
          borderColor: isBack ? '#00ff9d' : 'rgba(255,255,255,0.2)',
          borderWidth: isBack ? '2px' : '1px',
          backgroundColor: isBack ? 'rgba(0,255,157,0.05)' : 'transparent'
        }}
        style={{ 
          x: ringX, y: ringY, 
          translateX: '-50%', translateY: '-50%',
          mixBlendMode: isBack ? 'normal' : 'difference' 
        }}
        transition={{ type: 'tween', ease: "easeOut", duration: 0.3 }}
      />

      {/* 3. ETIQUETA - Cambia el texto si es isBack */}
      <motion.div
        animate={{ 
          opacity: isHovering ? 1 : 0,
          y: isHovering ? 35 : 10
        }}
        className="absolute top-0 left-0 flex flex-col items-center"
        style={{ x: ringX, y: ringY, translateX: '-50%' }}
        transition={{ duration: 0.2 }}
      >
        <span className={`text-[7px] font-mono tracking-[0.4em] uppercase whitespace-nowrap ${isBack ? 'text-[#00ff9d] font-bold' : 'text-white'}`}>
          {isBack ? '>> RETURN_TO_CORE' : 'SELECT_STATE'}
        </span>
      </motion.div>
    </div>
  );
}