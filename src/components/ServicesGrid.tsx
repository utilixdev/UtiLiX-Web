'use client';

import { useInView, motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Layout, Code, Server, Search, Wrench, Gauge } from "lucide-react";

const SERVICES = [
  { 
    id: "01", 
    title: "Identidad Visual Premium", 
    desc: "Diseño de interfaces que dictan autoridad desde el primer segundo. Creamos experiencias donde la estética de lujo se funde con una navegación impecable.", 
    icon: Layout 
  },
  { 
    id: "02", 
    title: "Experiencia de Autor", 
    desc: "Desarrollo a medida con un enfoque en la exclusividad. Creamos activos digitales únicos, refinados y optimizados para que tu marca no tenga competencia.", 
    icon: Code 
  },
  { 
    id: "03", 
    title: "Estructura de Poder", 
    desc: "Sistemas robustos que sostienen tu crecimiento sin límites. Una base tecnológica invisible que garantiza seguridad absoluta y solvencia empresarial.", 
    icon: Server 
  },
  { 
    id: "04", 
    title: "Dominio de Mercado", 
    desc: "Estrategias de posicionamiento diseñadas para que tu marca no solo sea encontrada, sino que lidere su sector y atraiga al público de mayor valor.", 
    icon: Search 
  },
  { 
    id: "05", 
    title: "Cuidado y Evolución", 
    desc: "Acompañamiento proactivo para que tu activo digital mantenga siempre su estatus. Vigilancia constante para que nada interrumpa tu autoridad.", 
    icon: Wrench 
  },
  { 
    id: "06", 
    title: "Velocidad de Élite", 
    desc: "Optimización extrema para una respuesta instantánea. La rapidez es el mayor lujo digital: eliminamos cualquier fricción entre tu marca y tu cliente.", 
    icon: Gauge 
  }
];

function ServiceCard({ service, index }: { service: any, index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-5%", once: true });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
      className="group relative py-12 md:py-20 px-10 bg-[#030303] border border-white/10 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.05)_0%,transparent_70%)]" />
      <div className="relative z-10 h-full flex flex-col">
        <div className={`mb-6 w-12 h-12 flex items-center justify-center rounded-sm border transition-all duration-700
          ${isInView ? 'bg-white/5 border-utilix-green/30 text-utilix-green' : 'bg-transparent border-white/5 text-white/20'}
          group-hover:border-utilix-green group-hover:bg-utilix-green/5 group-hover:text-utilix-green`}
        >
          <Icon size={20} strokeWidth={1} />
        </div>
        <h3 className="text-xl font-black text-white uppercase tracking-[0.1em] mb-4 leading-none transition-colors duration-300 group-hover:text-white">
          {service.title}
        </h3>
        <p className="text-white/60 text-sm leading-relaxed mb-10 font-light tracking-wide transition-colors duration-300 group-hover:text-white/80">
          {service.desc}
        </p>
        <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-6">
          <span className="text-[8px] font-mono text-white/20 tracking-[0.5em] uppercase group-hover:text-utilix-green transition-colors">
            PROTOCOL_{service.id}
          </span>
          <div className="flex gap-1.5">
            <div className={`w-[3px] h-[3px] rounded-full bg-utilix-green transition-all duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'} shadow-[0_0_8px_#00ff9d]`} />
            <div className="w-[3px] h-[3px] rounded-full bg-white/10" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesGrid() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="bg-[#030303] h-[50vh]" />;

  return (
    <section
      id="services"
      className="relative pt-0 pb-0 px-2 md:px-8 bg-[#030303] overflow-visible z-40 mt-[-35vh] md:mt-[-45vh]"
    >
      <div className="max-w-screen-2xl mx-auto w-full pt-0 pb-0">

        <div className="flex flex-col items-start mb-12 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-12 h-[1px] bg-utilix-green/30" />
            <span className="text-utilix-green font-mono text-[9px] tracking-[0.6em] uppercase">
              Ecosistema de Ejecución
            </span>
          </motion.div>

          <h2 className="text-[clamp(1.8rem,5vw,4rem)] font-[950] leading-[0.9] tracking-tighter uppercase text-white/90 mb-4 italic">
            SOLUCIONES <br/>
            <span className="italic font-extralight text-transparent bg-clip-text bg-gradient-to-r from-utilix-violet via-white to-utilix-green bg-[length:200%_200%] animate-[gradient-slow_8s_ease_infinite] py-2 inline-block">
              DE ALTA GAMA.
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl text-white/40 text-lg md:text-xl font-light leading-snug tracking-tight italic"
          >
            Diseñamos el estándar de las marcas que no aceptan el promedio. <span className="text-white">Diferenciación radical</span> en cada píxel.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-[#030303] border border-white/5 overflow-hidden rounded-3xl md:rounded-[3rem]">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes gradient-slow {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
        .animate-gradient-slow {
          animation: gradient-slow 8s ease infinite;
        }
      `}</style>
    </section>
  );
}