'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Plus, Layers, Cpu, Terminal } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ProyectosPage() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll para el Hero
  const { scrollYProgress: heroScroll } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ["start start", "end start"]
  });

  const opacityHeader = useTransform(heroScroll, [0, 0.4], [1, 0]);
  const scaleHeader = useTransform(heroScroll, [0, 0.4], [1, 0.9]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="bg-[#030303] min-h-screen" />;

  const projects = [
    { title: "KRYPTOS_CORE", category: "Fintech_Arch", year: "2024", tech: "React/Go", img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2070" },
    { title: "VOGUE_SYSTEM", category: "E-Commerce", year: "2024", tech: "Next/Shopify", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070" },
    { title: "NEBULA_AI", category: "SaaS", year: "2023", tech: "Python/LLM", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070" },
    { title: "URBAN_LABS", category: "Architecture", year: "2023", tech: "WebGL/Three.js", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070" }
  ];

  return (
    <div ref={containerRef} className="bg-[#030303] text-white selection:bg-utilix-green">
      <Navbar />
      
      <main>
        {/* HERO SECTION */}
        <motion.section 
          style={{ opacity: opacityHeader, scale: scaleHeader }}
          className="pt-40 md:pt-60 pb-20 px-6 md:px-20"
        >
          <div className="max-w-7xl mx-auto text-center md:text-left">
            <span className="text-utilix-violet font-mono text-[10px] tracking-[1em] uppercase block mb-8">
              Selected_Work_Archive_v1.2
            </span>
            <h1 className="text-6xl md:text-[clamp(4rem,10vw,9rem)] font-[1000] italic uppercase leading-[0.85] tracking-tighter mb-10">
              PROYECTOS <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-utilix-violet via-white to-utilix-green">
                DE AUTORIDAD.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/30 font-light italic max-w-2xl leading-relaxed">
              Cada entrega es un activo de alto rendimiento diseñado para <span className="text-white">dominar su categoría</span> mediante ingeniería de autor.
            </p>
          </div>
        </motion.section>

        {/* LISTADO DE PROYECTOS CON EFECTO GLOBAL */}
        <section className="px-6 md:px-20 pb-40 relative">
          <div className="max-w-7xl mx-auto space-y-24 md:space-y-40">
            {projects.map((p, i) => (
              <ProjectItem key={i} project={p} index={i} />
            ))}
            
            <motion.button 
              whileHover={{ scale: 1.01, backgroundColor: "rgba(0, 255, 145, 0.02)" }}
              className="w-full py-12 border border-dashed border-white/10 rounded-[40px] text-white/20 hover:text-utilix-green hover:border-utilix-green/40 transition-all font-mono uppercase tracking-[0.5em] text-[10px] flex items-center justify-center gap-4 group"
            >
              <Plus size={14} className="group-hover:rotate-90 transition-transform duration-500" /> 
              Cargar_Más_Proyectos_del_Archivo
            </motion.button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ProjectItem({ project, index }: any) {
  const itemRef = useRef<HTMLDivElement>(null);

  // Creamos un scroll tracking individual para cada tarjeta
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"] // Controla la entrada y salida
  });

  // Efecto de desvanecimiento: 
  // 0 -> 0.2 (Aparece), 0.2 -> 0.8 (Visible), 0.8 -> 1 (Desaparece)
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  return (
    <motion.div 
      ref={itemRef}
      style={{ opacity, scale, y }}
      className="group relative bg-white/[0.01] border border-white/5 rounded-[40px] md:rounded-[60px] overflow-hidden flex flex-col lg:grid lg:grid-cols-12 gap-8 p-6 md:p-10 hover:border-utilix-green/20 transition-all duration-700"
    >
      {/* INFORMACIÓN DEL PROYECTO */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-12 relative z-10">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-white/5 rounded-md border border-white/10">
               <span className="text-utilix-green font-mono text-[10px]">[{project.year}]</span>
            </div>
            <div className="flex items-center gap-2 text-white/20 font-mono text-[9px] uppercase tracking-widest">
              <Terminal size={10} /> {project.tech}
            </div>
          </div>
          
          <h3 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter group-hover:text-utilix-green transition-colors duration-500 leading-[0.9]">
            {project.title}
          </h3>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-[1px] bg-utilix-violet" />
            <p className="text-white/40 font-light italic uppercase tracking-[0.2em] text-[10px]">
              {project.category}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <button className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.4em] text-white/30 group-hover:text-white transition-all">
            <Layers size={14} className="text-utilix-violet animate-pulse" /> 
            Ver_Documentación_Técnica
          </button>
          <div className="flex gap-1 h-1 w-24">
            <div className="h-full w-1/3 bg-white/5 group-hover:bg-utilix-green/40 transition-colors" />
            <div className="h-full w-1/3 bg-white/5 group-hover:bg-utilix-green/20 transition-colors delay-75" />
            <div className="h-full w-1/3 bg-white/5 group-hover:bg-utilix-green/10 transition-colors delay-150" />
          </div>
        </div>
      </div>

      {/* VISUALIZADOR TÉCNICO */}
      <div className="lg:col-span-7 relative h-80 md:h-[500px] rounded-[30px] md:rounded-[50px] overflow-hidden group/img">
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
          style={{ backgroundImage: `url(${project.img})` }} 
        />
        <div className="absolute inset-0 bg-[#030303]/50 group-hover:bg-[#030303]/10 transition-all duration-700" />
        
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 mix-blend-overlay" />
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-utilix-green to-transparent shadow-[0_0_20px_rgba(0,255,145,0.8)] animate-scan z-20" />
          <div className="absolute inset-y-0 left-0 w-[1px] bg-utilix-green/30 shadow-[0_0_15px_rgba(0,255,145,0.3)]" />
        </div>

        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-black/80 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full flex items-center gap-4 translate-y-20 group-hover:translate-y-0 transition-transform duration-700">
           <div className="relative">
             <div className="w-2 h-2 rounded-full bg-utilix-green" />
             <div className="absolute inset-0 w-2 h-2 rounded-full bg-utilix-green animate-ping opacity-75" />
           </div>
           <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/70">
             System_Status: <span className="text-utilix-green">Optimized</span>
           </span>
        </div>

        <div className="absolute top-6 right-6 md:top-10 md:right-10 opacity-0 group-hover:opacity-100 translate-x-10 group-hover:translate-x-0 transition-all duration-500">
          <div className="w-14 h-14 rounded-full bg-utilix-green text-black flex items-center justify-center shadow-2xl">
            <ArrowUpRight size={24} />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { top: -5%; }
          100% { top: 105%; }
        }
        .animate-scan {
          animation: scan 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </motion.div>
  );
}