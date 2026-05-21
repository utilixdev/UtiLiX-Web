'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function Filosofia() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ["start end", "end start"],
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 60, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 40 });

  const lightX = useTransform(springX, (v) => v * 12);
  const lightY = useTransform(springY, (v) => v * 12);

  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 120, 
    damping: 40,
  });

  const opacityStack = useTransform(smoothProgress, [0.1, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scaleStack = useTransform(smoothProgress, [0.7, 1], [1, 0.85]); 
  const yStack = useTransform(smoothProgress, [0.7, 1], [0, -150]); 
  const rotateXStack = useTransform(smoothProgress, [0.7, 1], [0, -10]);

  const scaleYLine = useTransform(smoothProgress, [0.2, 0.6], [0, 1]);

  useEffect(() => {
    if (isMobile || !mounted) return;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 40);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 40);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, isMobile, mounted]);

  const expoEase = [0.19, 1, 0.22, 1];

  if (!mounted) return null;

  return (
    <section
      ref={containerRef}
      id="philosophy"
      className="relative bg-[#030303] overflow-hidden border-none py-12 md:py-32"
      style={{ perspective: "1200px" }}
    >
      {!isMobile && (
        <motion.div
          style={{ x: lightX, y: lightY, willChange: 'transform' }}
          className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(139,92,246,0.03)_0%,transparent_70%)] rounded-full pointer-events-none z-0"
        />
      )}

      <motion.div
        style={{ 
          opacity: opacityStack, 
          scale: scaleStack,
          y: yStack,
          rotateX: rotateXStack,
          willChange: 'transform, opacity' 
        }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12" 
      >
        <div className="mb-12 flex items-center gap-4 justify-center md:justify-start">
          <div className="h-[1px] w-12 bg-utilix-green/30 hidden md:block" />
          <span className="text-utilix-green/60 font-mono text-[10px] tracking-[0.6em] uppercase">
          La diferencia está en el resultado
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          <div className="lg:col-span-8 flex flex-col justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.2, ease: expoEase as any }}
              className="text-[clamp(1.8rem,5vw,4rem)] font-[950] leading-[0.9] tracking-tighter uppercase text-white/90 mb-4 italic"
            >
              <span className="block mb-6">No diseñamos una web solo para que quede bonita.</span>
              <span className="relative inline-block italic font-light text-transparent bg-clip-text bg-gradient-to-r from-utilix-violet via-white to-utilix-green bg-[length:200%_200%] animate-[gradient-slow_8s_ease_infinite] pb-1">
                Diseñamos tu sitio web con un único objetivo: que tu teléfono no pare de sonar.
              </span>
            </motion.h2>

            <div className="mt-8 md:mt-16 space-y-10 max-w-2xl">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.1, ease: expoEase as any }}
                className="text-lg md:text-xl text-white/50 font-light leading-relaxed"
              >
                Hay dos tipos de presencia digital: <strong className="text-white font-medium"> LA QUE EXISTE Y LA QUE VENDE. </strong> 
                La mayoría de negocios tienen la primera. Una web que está, que se ve, pero que no genera nada.
                Nosotros trabajamos para aquellos que ya entienden que su imagen online es una decisión de negocio, no de diseño. Que saben que perder un cliente sale más caro que invertir en una web que los convierta.
                
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2, ease: expoEase as any }}
                className="text-lg md:text-xl text-white/50 font-light leading-relaxed"
              >
                No trabajamos con plantillas. <strong className="text-white font-medium uppercase"> Diseñamos tu negocio para que se vea, se entienda y genere clientes. </strong> <br/><br/>Si quieres construir algo así, HABLAMOS.
              </motion.p>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="h-full relative p-8 md:p-12 border border-white/5 bg-white/[0.01] backdrop-blur-sm flex flex-col justify-between">
              <motion.div
                style={{ scaleY: scaleYLine, originY: 0 }}
                className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-utilix-violet via-utilix-green to-transparent"
              />
              
              <div>
                <h4 className="text-utilix-green font-mono text-[10px] tracking-widest uppercase mb-12 opacity-60">
                  Valores de Marca
                </h4>
                
                <ul className="space-y-10 text-xs md:text-[13px] tracking-[0.2em] uppercase text-white/70 font-light">
                  <li className="flex items-start gap-4 group">
                    <span className="text-utilix-violet font-black group-hover:text-utilix-green transition-colors">01</span>
                    <div className="space-y-2">
                      <span className="block text-white font-medium">Primera impresión | </span>
                      <span className="block text-[11px] text-white/30 lowercase font-mono tracking-normal"> Primera impresión que no se recupera. </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <span className="text-utilix-violet font-black group-hover:text-utilix-green transition-colors">02</span>
                    <div className="space-y-2">
                      <span className="block text-white font-medium">8 segundos | </span>
                      <span className="block text-[11px] text-white/30 lowercase font-mono tracking-normal"> Tu cliente decide en 8 segundos. Diseñamos para ganar esos 8 segundos. </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <span className="text-utilix-violet font-black group-hover:text-utilix-green transition-colors">03</span>
                    <div className="space-y-2">
                      <span className="block text-white font-medium"> Irrepetible | </span>
                      <span className="block text-[11px] text-white/30 lowercase font-mono tracking-normal"> Una web que tu competencia no puede copiar porque está construida sobre tu negocio real.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <span className="text-utilix-violet font-black group-hover:text-utilix-green transition-colors">04</span>
                    <div className="space-y-2">
                      <span className="block text-white font-medium">Sin comparación posible | </span>
                      <span className="block text-[11px] text-white/30 lowercase font-mono tracking-normal"> Cuando alguien compare tu web con la de tu competidor, no debería haber comparación. </span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-12 pt-8 border-t border-white/5">
                <span className="text-[9px] font-mono text-utilix-green/40 uppercase tracking-widest">
                  Status: Liderazgo Digital
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-24 md:pt-40 pb-0 text-center relative overflow-hidden">
          <span className="text-[clamp(1.5rem,8vw,8rem)] font-black text-white/[0.02] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none uppercase whitespace-nowrap">
            MARCAS DE ÉXITO
          </span>
          <motion.p 
            className="relative z-10 text-utilix-green/80 font-mono text-[11px] tracking-[0.8em] md:tracking-[1em] uppercase"
          >
            Haz que tu negocio crezca | Destaca más en Google. 
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}