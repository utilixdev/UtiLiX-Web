'use client';

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Rocket, Flame, Cpu, Orbit, Brain, Gem, Radar, Waves, Shield, Globe, Gauge, Wand2, Layers3, Workflow,} from "lucide-react";
import { useRef, useState, useEffect } from 'react';

const PROJECTS = [
  {
    id: 1,
    title: "Clínica de Autor",
    category: "Clínicas de Autor",
    description: "Elevamos la percepción del sector salud hacia un entorno de exclusividad y confianza absoluta.",
    size: "md:col-span-1 md:row-span-1 min-h-[400px] md:h-[550px]",
    color: "from-utilix-violet/20",
    icon: <Orbit className="w-6 h-6 text-utilix-violet/40" />,
    label: "Clínica premium",
    href: "https://utilixstudio.com",
    image: "/imagenes/clinica-bg.jpg" 
  },
  {
    id: 2,
    title: "Web Corporativa",
    category: "Liderazgo Digital",
    description: "El epicentro de nuestra visión. Una plataforma diseñada para dominar el mercado con una presencia impecable.",
    size: "md:col-span-1 md:row-span-1 min-h-[400px] md:h-[550px]",
    color: "from-utilix-green/20",
    icon: <Sparkles className="w-6 h-6 text-utilix-green/40" />,
    label: "Nuestro Estándard",
    href: "https://utilix.es",
    image: "/imagenes/utilix.jpg" 
  },
  {
    id: 3,
    title: "Sistemas de automatizaciones",
    category: "Sistemas de automatizaciones",
    description: "Creación de sistemas de automatización de citas para el sector de la salud.",
    size: "md:col-span-1 md:row-span-1 min-h-[300px] md:h-[550px]",
    color: "from-utilix-violet/20",
    icon: <Workflow className="w-6 h-6 text-utilix-violet/40" />,
    label: "Automatización",
    href: "https://avoidstudio.es",
    image: "/imagenes/avoid.png" 
  },
  
];

export default function Projects() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { 
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { 
        threshold: 0.05, 
        rootMargin: "400px"
      }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [mounted]);

  const scrollToAuditoria = () => {
    const section = document.getElementById('auditoria');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!mounted) return <div className="bg-[#030303] h-[50vh]" />;

  return (
    <section
      id="proyectos"
      ref={containerRef}
      // CORRECCIÓN DE ESPACIADO: pb-32 móvil / pb-80 desktop para evitar cortes. 
      // scroll-mt-32 para que al navegar el ancla respire.
      className="relative pt-24 pb-32 md:pt-48 md:pb-80 px-6 bg-[#030303] overflow-visible z-50 scroll-mt-32"
    >
      <div className="max-w-[90rem] mx-auto w-full">
        
        {/* HEADER */}
        <div className="mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-utilix-green font-mono text-[10px] tracking-[0.6em] uppercase mb-6 block">
              Nuestra Selección
            </span>
            <h2 className="text-[clamp(1.8rem,5vw,4rem)] font-[950] leading-[0.9] tracking-tighter uppercase text-white/90 mb-4 italic">
              CASOS DE <br />
              <span className="italic font-extralight text-transparent bg-clip-text bg-gradient-to-r from-utilix-violet via-white to-utilix-green bg-[length:200%_200%] animate-[gradient-slow_8s_ease_infinite] inline-block py-2">
                ALTO IMPACTO.
              </span>
            </h2>
          </motion.div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {PROJECTS.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.href}
              target={project.href.startsWith('http') ? "_blank" : "_self"}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1, 
                ease: [0.215, 0.61, 0.355, 1] 
              }}
              className={`group relative overflow-hidden bg-[#070707] border border-white/10 rounded-2xl md:rounded-[2.5rem] ${project.size} transform-gpu`}
              style={{ 
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              <div 
                className="absolute inset-0 z-0 bg-contain bg-no-repeat bg-center opacity-80 group-hover:opacity-100 transition-all duration-[1.2s] ease-out group-hover:scale-[1.03]"
                style={{ 
                  backgroundImage: `url(${project.image})`,
                  backgroundPosition: 'center 20%',
                  transform: 'translateZ(0)'
                }}
              />

              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent opacity-90" />
              
              <div className="absolute top-8 right-8 z-20 text-white/30 group-hover:text-utilix-green transition-all duration-500">
                {project.icon}
              </div>

              <div className="absolute inset-0 z-30 flex flex-col justify-end p-8 md:p-12">
                <span className="text-utilix-green text-[9px] font-mono tracking-[0.3em] uppercase mb-3">
                  {project.label}
                </span>
                
                <h3 className="text-2xl md:text-4xl font-[950] uppercase italic text-white leading-none tracking-tighter mb-4">
                  {project.title}
                </h3>
                
                <p className="text-white/70 text-sm max-w-[280px] leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 font-light italic">
                  {project.description}
                </p>
                
                <div className="flex items-center gap-3 text-white/50 group-hover:text-white transition-colors">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Explorar Visión</span>
                  <ArrowUpRight className="w-4 h-4 text-utilix-green" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={inView ? { opacity: 1, y: 0 } : {}} 
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-32 flex justify-center px-4"
        >
          <button 
            onClick={scrollToAuditoria}
            className="hidden md:flex group relative items-center gap-8 bg-transparent px-2 py-2 pr-12 transition-all duration-500 hover:gap-12"
          >
            <div className="relative flex h-20 w-20 items-center justify-center border border-utilix-green bg-[#070707] transition-all duration-700 group-hover:rotate-90 group-hover:bg-utilix-green">
              <ArrowUpRight className="h-8 w-8 text-utilix-green transition-colors duration-500 group-hover:text-black group-hover:-rotate-90" />
              <div className="absolute -inset-2 border border-white/5 transition-all duration-700 group-hover:inset-0 group-hover:border-utilix-green/50" />
            </div>

            <div className="flex flex-col items-start">
              <span className="text-[10px] font-mono tracking-[0.5em] text-utilix-green uppercase mb-1">
                ¿Estás preparado?
              </span>
              <span className="text-4xl font-[950] text-white uppercase tracking-tighter italic text-left leading-[0.9]">
                Lleva tu negocio  <br />
                <span className="text-white/40 group-hover:text-white transition-colors duration-500">al siguiente nivel.</span>
              </span>
            </div>
          </button>

          <button 
            onClick={scrollToAuditoria}
            className="flex md:hidden flex-col items-center gap-6 w-full max-w-[320px] group"
          >
            <div className="flex h-16 w-16 items-center justify-center border border-utilix-green bg-[#070707]">
              <ArrowUpRight className="h-6 w-6 text-utilix-green" />
            </div>

            <div className="text-center">
              <span className="text-[10px] tracking-[0.3em] text-utilix-green uppercase block mb-3">
                Action_Required
              </span>
              <span className="text-2xl font-black text-white uppercase tracking-tighter leading-tight italic">
                DISEÑAR <br />
                <span className="text-utilix-green">TU AUTORIDAD</span>
              </span>
            </div>
          </button>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes gradient-slow {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
      `}</style>
    </section>
  );
}