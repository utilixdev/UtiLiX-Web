'use client';
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001
  });

  const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  
  // CORRECCIÓN: Usamos useTransform para invertir el scale y que el brillo no se deforme
  // En lugar de: 1 / scaleX
  const glowScaleInverse = useTransform(scaleX, (latest) => latest > 0 ? 1 / latest : 1);

  return (
    <motion.div
      style={{ 
        scaleX, 
        opacity,
        transformOrigin: "left" 
      }}
      className="fixed bottom-0 left-0 right-0 h-[2px] md:h-[3px] z-[120] pointer-events-none"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-utilix-violet via-utilix-green to-white" />
      
      <motion.div 
        className="absolute right-0 top-1/2 -translate-y-1/2 h-[10px] w-[40px] bg-utilix-green blur-[8px] opacity-60"
        style={{ scaleX: glowScaleInverse }} 
      />

      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/20" />
    </motion.div>
  );
}