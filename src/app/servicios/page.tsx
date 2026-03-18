'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Palette, 
  Code2, 
  Database, 
  Search, 
  ShieldCheck, 
  Zap, 
  ArrowUpRight 
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ServiciosPage() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Configuración de Scroll para desvanecer el Hero
  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ["start start", "end end"]
  });

  const opacityHeader = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scaleHeader = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="bg-[#030303] min-h-screen" />;

  const services = [
    {
      sys_id: "01",
      title: "Diseño UI/UX",
      desc: "Interfaces de alta gama diseñadas para ser claras, accesibles y estéticamente impecables. Creamos sistemas de diseño que proyectan la autoridad de tu marca.",
      icon: <Palette className="w-8 h-8" />,
      tag: "Visual_Identity"
    },
    {
      sys_id: "02",
      title: "Front-End Pro",
      desc: "Arquitecturas escalables con Next.js y React. No solo creamos webs; construimos experiencias fluidas optimizadas para superar cualquier estándar de velocidad.",
      icon: <Code2 className="w-8 h-8" />,
      tag: "Core_Vitals_Max"
    },
    {
      sys_id: "03",
      title: "Back-End",
      desc: "El motor invisible de tu proyecto. APIs seguras y bases de datos diseñadas para soportar el crecimiento y garantizar un rendimiento extremo bajo cualquier carga.",
      icon: <Database className="w-8 h-8" />,
      tag: "Data_Architecture"
    },
    {
      sys_id: "04",
      title: "SEO Técnico",
      desc: "Estrategias de indexación avanzada y arquitectura semántica. Posicionamos tu activo digital donde el mercado busca la excelencia.",
      icon: <Search className="w-8 h-8" />,
      tag: "Market_Authority"
    },
    {
      sys_id: "05",
      title: "Mantenimiento",
      desc: "Seguridad proactiva y monitorización constante. Tu infraestructura digital protegida y actualizada para que nunca dejes de operar.",
      icon: <ShieldCheck className="w-8 h-8" />,
      tag: "Full_Protection"
    },
    {
      sys_id: "06",
      title: "Rendimiento",
      desc: "Reducción extrema de tiempos de carga. Optimizamos cada asset y CDN para que la respuesta de tu plataforma sea instantánea.",
      icon: <Zap className="w-8 h-8" />,
      tag: "Zero_Latency"
    }
  ];

  return (
    <div ref={containerRef} className="bg-[#030303] text-white selection:bg-utilix-green selection:text-black">
      <Navbar />
      
      <main>
        {/* HERO SECTION CON FADE SCROLL */}
        <motion.section 
          style={{ opacity: opacityHeader, scale: scaleHeader }}
          className="pt-40 md:pt-60 pb-20 px-6"
        >
          <div className="max-w-7xl mx-auto text-center">
            <span className="text-utilix-green font-mono text-[10px] tracking-[1em] uppercase block mb-8">
              Full-Stack_Solutions_v2
            </span>
            <h1 className="text-[clamp(2.5rem,9vw,8rem)] font-[1000] italic uppercase leading-[0.85] tracking-tighter mb-12">
              SERVICIOS <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-utilix-violet via-white/90 to-utilix-green">
                END-TO-END.
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-white/40 font-light italic max-w-3xl mx-auto leading-relaxed">
              Ingeniería de software y diseño de interfaces de alta gama. <br className="hidden md:block" />
              Construimos <span className="text-white">activos digitales</span> que proyectan autoridad y escalan sin fricciones.
            </p>
          </div>
        </motion.section>

        {/* GRID DE SERVICIOS - 100% RESPONSIVE */}
        <section className="px-6 pb-40">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-[40px] md:rounded-[60px] overflow-hidden">
            {services.map((service, i) => (
              <ServiceCard key={i} service={service} index={i} />
            ))}
          </div>
        </section>

        {/* CIERRE DE SECCIÓN */}
        <section className="py-20 px-6 text-center border-t border-white/5">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-8">
              PROYECTOS EXTRAORDINARIOS <br /> <span className="text-white/20">PARA MARCAS ÚNICAS.</span>
            </h2>
            <button className="bg-white text-black px-10 py-5 rounded-full font-black uppercase tracking-[0.3em] text-[11px] hover:bg-utilix-green transition-all duration-500">
              Solicitar_Consultoría
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Sub-componente para manejar el Fade-In individual de cada card al aparecer
function ServiceCard({ service, index }: { service: any, index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1 }}
      className="bg-[#030303] p-10 md:p-16 flex flex-col justify-between group relative hover:bg-white/[0.01] transition-colors duration-700"
    >
      <div>
        <div className="flex justify-between items-start mb-12">
          <div className="text-utilix-green group-hover:scale-110 transition-transform duration-500 bg-white/5 p-4 rounded-2xl">
            {service.icon}
          </div>
          <span className="font-mono text-[9px] text-white/20 tracking-[0.3em] uppercase">
            sys_id: {service.sys_id}
          </span>
        </div>
        
        <h3 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter mb-6 group-hover:text-utilix-violet transition-colors">
          {service.title}
        </h3>
        
        <p className="text-white/40 font-light leading-relaxed mb-10 text-base md:text-lg">
          {service.desc}
        </p>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <span className="px-4 py-1.5 border border-white/10 rounded-full font-mono text-[8px] uppercase tracking-widest text-white/30 group-hover:border-utilix-green/40 group-hover:text-utilix-green transition-all">
          {service.tag}
        </span>
        <ArrowUpRight className="text-white/10 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" size={24} />
      </div>
    </motion.div>
  );
}