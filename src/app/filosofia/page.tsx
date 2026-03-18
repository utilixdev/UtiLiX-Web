'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Cpu, Target, Eye, Boxes, ArrowUpRight, Shield, Zap, Binary } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Componente para el efecto de desaparición al hacer scroll (Parallax Inverso)
const ScrollSection = ({ children, scrollYProgress, range }: { children: React.ReactNode, scrollYProgress: any, range: [number, number] }) => {
  const opacity = useTransform(scrollYProgress, range, [1, 0]);
  const scale = useTransform(scrollYProgress, range, [1, 0.95]);
  const blur = useTransform(scrollYProgress, range, [0, 4]);
  
  return (
    <motion.section style={{ opacity, scale, filter: `blur(${blur}px)` }} className="relative w-full overflow-hidden">
      {children}
    </motion.section>
  );
};

// Revelado suave para evitar saltos en móvil
const SmoothReveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, delay, ease: [0.19, 1, 0.22, 1] }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default function FilosofiaPage() {
  const [isHydrated, setIsHydrated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: isHydrated ? containerRef : undefined,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return <div className="bg-[#030303] min-h-screen" />;

  return (
    <div ref={containerRef} className="bg-[#030303] text-white selection:bg-utilix-green selection:text-black min-h-screen">
      <Navbar />

      <main className="relative w-full">
        
        {/* 1. HERO - PEGADO AL NAVBAR */}
        <ScrollSection scrollYProgress={scrollYProgress} range={[0, 0.2]}>
          <div className="relative min-h-[85svh] flex flex-col justify-center px-6 pt-20">
            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] bg-utilix-violet/10 blur-[150px] rounded-full" />
              <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-utilix-green/5 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-6xl mx-auto w-full relative z-10 text-center md:text-left">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-8 inline-block"
              >
                <span className="text-utilix-green font-mono text-[10px] tracking-[0.8em] uppercase border-l border-utilix-green/30 pl-4">
                  Core_Manifesto_v2
                </span>
              </motion.div>
              
              <motion.h1 
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-[clamp(2.5rem,10vw,8rem)] font-[1000] leading-[0.85] tracking-tighter uppercase italic mb-10"
              >
                LA ÉTICA DEL <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-utilix-violet via-white to-utilix-green bg-[length:200%_auto] animate-gradient-slow block">
                  RENDIMIENTO.
                </span>
              </motion.h1>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
                <div className="md:col-span-8">
                  <p className="text-xl md:text-3xl font-light italic text-white/40 leading-tight">
                    En una era de ruido digital masivo, la <span className="text-white">precisión técnica</span> es el único activo que garantiza la autoridad absoluta. No diseñamos para complacer, construimos para dominar el mercado.
                  </p>
                </div>
                <div className="md:col-span-4 flex flex-col items-center md:items-end">
                  <div className="text-[10px] font-mono text-white/20 tracking-widest uppercase mb-4 text-center md:text-right">
                    [ Engineering_Standards_2026 ]<br/>
                    [ High_Impact_Software ]
                  </div>
                  <div className="h-[1px] w-20 bg-utilix-green/30 hidden md:block" />
                </div>
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* 2. THE VISION - SIN ESPACIO MUERTO */}
        <ScrollSection scrollYProgress={scrollYProgress} range={[0.2, 0.45]}>
          <div className="py-24 px-6 bg-[#050505] border-y border-white/5">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-6">
                <SmoothReveal>
                  <h2 className="text-[11px] font-black uppercase tracking-[0.6em] text-utilix-violet mb-6 flex items-center gap-4">
                    <span className="w-8 h-[1px] bg-utilix-violet/50" /> 01 // VISIÓN
                  </h2>
                  <h3 className="text-5xl md:text-7xl font-[1000] italic uppercase leading-none tracking-tighter mb-10">
                    REDUCCIÓN <br /> <span className="text-white/20">RADICAL.</span>
                  </h3>
                  <div className="space-y-6 text-lg md:text-xl text-white/60 leading-relaxed font-light italic">
                    <p>
                      Rechazamos la ornamentación vacía. Cada línea de código que escribimos debe justificar su existencia mediante un aumento medible en la <span className="text-white">velocidad de conversión</span>.
                    </p>
                    <p className="text-base text-white/30">
                      Nuestra filosofía se basa en la destilación: eliminamos la fricción tecnológica para que el mensaje de nuestros clientes impacte con la fuerza de un estándar industrial.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-10">
                    {['Performance_First', 'Zero_Legacy', 'Clean_Logic'].map(tag => (
                      <span key={tag} className="px-5 py-2 border border-white/10 rounded-full font-mono text-[9px] uppercase tracking-widest text-utilix-green/70 bg-utilix-green/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </SmoothReveal>
              </div>
              
              <div className="lg:col-span-6 relative">
                <SmoothReveal delay={0.2}>
                  <div className="relative group rounded-[40px] overflow-hidden border border-white/10 aspect-square">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 1.5 }}
                      className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964')] bg-cover bg-center grayscale contrast-125 opacity-40 group-hover:opacity-60 transition-opacity" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Binary size={100} className="text-white/5 stroke-[0.5]" />
                    </div>
                  </div>
                </SmoothReveal>
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* 3. CTA ESTRATÉGICO - PUENTE DE CONVERSIÓN */}
        <div className="py-20 px-6">
          <SmoothReveal>
            <div className="max-w-6xl mx-auto p-12 md:p-20 rounded-[50px] bg-[#080808] border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-30 transition-opacity">
                <Zap size={120} className="text-utilix-green" />
              </div>
              <div className="relative z-10 max-w-2xl">
                <h4 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-6">
                  ¿Tu infraestructura <br /> está a la altura de tu ambición?
                </h4>
                <p className="text-white/40 text-lg mb-10 font-light">
                  No permitas que una arquitectura mediocre limite tu crecimiento. Realizamos auditorías de rendimiento para proyectos que exigen la perfección.
                </p>
                <button className="group flex items-center gap-6 px-10 py-6 bg-white text-black rounded-full font-black text-[11px] uppercase tracking-[0.4em] hover:bg-utilix-green hover:text-white transition-all duration-500 shadow-2xl">
                  AUDITAR MI PROYECTO <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform duration-500" />
                </button>
              </div>
            </div>
          </SmoothReveal>
        </div>

        {/* 4. THE TRIAD - TARJETAS COMPACTAS */}
        <ScrollSection scrollYProgress={scrollYProgress} range={[0.55, 0.85]}>
          <div className="py-24 px-6 bg-gradient-to-b from-transparent to-[#050505]">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { 
                    icon: <Cpu size={32} />, 
                    title: "Rigurosidad", 
                    color: "text-utilix-violet", 
                    desc: "La latencia es el enemigo de la autoridad. Implementamos arquitecturas de carga ultra-rápida donde cada milisegundo está optimizado para la retención del usuario." 
                  },
                  { 
                    icon: <Eye size={32} />, 
                    title: "Vanguardia", 
                    color: "text-utilix-green", 
                    desc: "Diseño cinematográfico aplicado a interfaces comerciales. Creamos una narrativa visual que posiciona tu marca en el 1% del mercado global." 
                  },
                  { 
                    icon: <Target size={32} />, 
                    title: "Resultados", 
                    color: "text-white", 
                    desc: "La tecnología es un medio, no un fin. Cada línea de código está subordinada al retorno de inversión y a la solidez técnica a largo plazo." 
                  }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                    className="p-10 md:p-14 rounded-[50px] bg-white/[0.02] border border-white/5 hover:border-utilix-green/20 hover:bg-white/[0.04] transition-all duration-500"
                  >
                    <div className={`${item.color} mb-10 group-hover:scale-110 transition-transform`}>{item.icon}</div>
                    <h4 className="text-3xl font-[1000] italic uppercase mb-6 tracking-tighter">{item.title}</h4>
                    <p className="text-white/40 text-sm md:text-base leading-relaxed font-light">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* 5. FINAL CTA */}
        <ScrollSection scrollYProgress={scrollYProgress} range={[0.85, 1]}>
          <div className="py-32 md:py-48 px-6 text-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] bg-utilix-green/5 blur-[150px] rounded-full -z-10" />
            <SmoothReveal>
              <h2 className="text-6xl md:text-[10rem] font-[1000] italic uppercase tracking-tighter leading-[0.85] mb-16">
                ¿LISTO PARA <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-utilix-green to-white">DOMINAR?</span>
              </h2>
              <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                <button className="w-full md:w-auto px-16 py-8 bg-white text-black font-black text-[12px] uppercase tracking-[0.5em] rounded-full hover:bg-utilix-green hover:text-white transition-all duration-500 shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                  INICIAR_DIAGNÓSTICO
                </button>
                <button className="text-[11px] font-mono text-white/30 hover:text-white uppercase tracking-[0.8em] transition-colors border-b border-white/10 pb-2">
                  Ver_Casos_Estudio
                </button>
              </div>
            </SmoothReveal>
          </div>
        </ScrollSection>
      </main>

      <Footer />

      <style jsx global>{`
        @keyframes gradient-slow {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
        .animate-gradient-slow {
          animation: gradient-slow 8s ease infinite;
        }
        body { overflow-x: hidden; background: #030303; }
      `}</style>
    </div>
  );
}