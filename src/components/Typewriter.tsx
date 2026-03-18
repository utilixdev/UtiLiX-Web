'use client';
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

export default function Typewriter({ text }: { text: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));

  useEffect(() => {
    const controls = animate(count, text.length, {
      type: "tween",
      duration: 2.5, // Velocidad optimizada para lectura premium
      ease: "linear",
      delay: 0.8,
    });
    return controls.stop;
  }, [text.length, count]);

  return (
    /* whitespace-pre-wrap es vital para que respete espacios sin saltos extraños */
    <span className="relative inline text-left whitespace-pre-wrap break-words">
      <motion.span className="inline">{displayText}</motion.span>
      
      {/* CURSOR TIER 1: Usamos inline-block con vertical-align para que no salte */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ 
          repeat: Infinity, 
          duration: 0.8,
          // SOLUCIÓN AL ERROR: Eliminamos steps(2) y usamos tiempos definidos
          // 0 a 0.5 (opaco), 0.5 a 1 (invisible). Esto crea el parpadeo seco.
          times: [0, 0.5, 0.51, 1],
          ease: "linear"
        }}
        className="inline-block w-[2px] h-[0.9em] bg-utilix-green ml-1 translate-y-[10%] shadow-[0_0_10px_#10B981]"
        style={{ verticalAlign: 'middle' }}
      />
      
      {/* Shadow Text: Truco invisible para reservar el espacio y evitar que el Hero "baile" */}
      <span className="opacity-0 pointer-events-none absolute left-0 top-0 -z-10 select-none">
        {text}
      </span>
    </span>
  );
}