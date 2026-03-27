'use client';

import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Typewriter from "./Typewriter";
import Particles from "./Particles";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 40, damping: 30 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 120, 
    damping: 40,
  });

  const opacityScroll = useTransform(smoothProgress, [0, 0.8, 1], [1, 1, 0]);
  const scaleScroll = useTransform(smoothProgress, [0, 0.9], [1, 0.9]);
  const yScroll = useTransform(smoothProgress, [0, 1], [0, -150]); 
  const rotateXScroll = useTransform(smoothProgress, [0, 1], [0, -10]);

  const layer1X = useTransform(springX, v => v * 1.5);
  const layer1Y = useTransform(springY, v => v * 1.5);
  const layer2X = useTransform(springX, v => v * -1);
  const layer2Y = useTransform(springY, v => v * -1);
  const layer3X = useTransform(springX, v => v * 0.5);
  const layer3Y = useTransform(springY, v => v * 0.5);

  useEffect(() => {
    setMounted(true); 
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 40);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 40);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return <div className="min-h-screen bg-[#030303]" />;

  const expoEase = [0.19, 1, 0.22, 1];
  const descriptionText = "Diseñamos presencias digitales para negocios que quieren ser la referencia de su sector — no una opción más en Google.";

  return (
    <section 
      ref={containerRef}
      className="relative w-full flex items-start justify-center bg-[#030303] overflow-hidden m-0 p-0"
      style={{ perspective: "1200px", minHeight: '100vh' }}
    >
      <motion.div 
        style={{ opacity: opacityScroll }} 
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        <video
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover opacity-25 grayscale contrast-125 scale-110 object-center"
          src="/videos/hero-bg.mp4" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#030303]" />
      </motion.div>

      <Particles />

      <div className="absolute inset-0 pointer-events-none z-10">
        <motion.div style={{ x: layer1X, y: layer1Y }} className="absolute top-0 -left-1/4 w-[55vw] h-[55vw] bg-utilix-violet/10 rounded-full blur-[160px]" />
        <motion.div style={{ x: layer2X, y: layer2Y }} className="absolute bottom-0 -right-1/4 w-[45vw] h-[45vw] bg-utilix-green/10 rounded-full blur-[140px]" />
        <motion.div style={{ x: layer3X, y: layer3Y }} className="absolute top-[40%] left-[35%] w-[30vw] h-[30vw] bg-white/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ 
          opacity: opacityScroll, 
          scale: scaleScroll, 
          y: yScroll,
          rotateX: rotateXScroll,
          willChange: 'transform, opacity'
        }}
        className="relative z-30 flex flex-col items-center text-center w-full pt-32 md:pt-28"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 md:mb-12"
        >
          <span className="text-utilix-green/60 font-mono text-[9px] md:text-[11px] tracking-[0.8em] uppercase border-x border-white/10 px-6 py-1">
            Autoridad Visual | Diseños Premium 
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: expoEase as any }}
          className="text-[clamp(2.2rem,8.5vw,8rem)] font-[1000] leading-[0.9] md:leading-[0.82] tracking-tighter uppercase text-white mb-10 md:mb-14" 
        >
         
          Tu web actual le está costando <br />
          <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-utilix-violet via-white to-utilix-green bg-[length:200%_200%] animate-[gradient-slow_8s_ease_infinite]">
            clientes a tu negocio.
          </span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid grid-cols-1 max-w-4xl mb-12 md:mb-16"
        >
          <div className="col-start-1 row-start-1 opacity-0 pointer-events-none select-none">
            <p className="text-sm md:text-lg leading-relaxed font-light tracking-widest uppercase px-4">
              {descriptionText}
            </p>
          </div>
          <div className="col-start-1 row-start-1 text-sm md:text-lg text-white/60 leading-relaxed font-light tracking-widest uppercase px-4">
            <Typewriter text={descriptionText} />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="relative group"
        >
          <div className="absolute -inset-[1px] bg-gradient-to-r from-utilix-violet via-white to-utilix-green rounded-none opacity-40 group-hover:opacity-100 blur-[2px] group-hover:blur-[4px] transition duration-500 animate-[gradient-slow_8s_ease_infinite] bg-[length:200%_200%]"></div>
          
          <motion.a
            href="#auditoria"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            className="relative flex items-center justify-center bg-black text-white px-10 md:px-16 py-6 md:py-7 rounded-none font-black uppercase tracking-[0.5em] text-[10px] md:text-[13px] overflow-hidden transition-all"
          >
            <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
              Quiero ver dónde estoy perdiendo clientes
            </span>
            <motion.div
              variants={{ hover: { y: 0 } }}
              initial={{ y: "101%" }}
              className="absolute inset-0 bg-white"
              transition={{ ease: expoEase as any, duration: 0.6 }}
            />
          </motion.a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.5 }}
          className="mt-16 md:mt-24 mb-10 flex items-center gap-4 md:gap-6"
        >
          <span className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.3em]">Posicionamiento</span>
          <div className="h-4 w-[1px] bg-white/30" />
          <span className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.3em]">Impacto Visual</span>
          <div className="h-4 w-[1px] bg-white/30" />
          <span className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.3em]">Diferenciación</span>
        </motion.div>
      </motion.div>
    </section>
  );
}