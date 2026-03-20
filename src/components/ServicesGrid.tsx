'use client';

import { useInView, motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Layout, ShoppingBag, Wrench, Share2, MousePointer2, RefreshCcw } from "lucide-react";

const SERVICES = [
  { 
    id: "01", 
    title: "Web Corporativa & Landing Pages", 
    desc: "Creación de sitios de alto impacto y landings de conversión. Rediseñamos y actualizamos tu presencia digital para situarte por encima de la competencia.", 
    icon: Layout 
  },
  { 
    id: "02", 
    title: "E-commerce & Tiendas Online", 
    desc: "Desarrollo de tiendas en línea, sistemas de afiliación y catálogos autogestionables. Convertimos tu catálogo en una máquina de ventas 24/7.", 
    icon: ShoppingBag 
  },
  { 
    id: "03", 
    title: "Mantenimiento & Seguridad", 
    desc: "Soporte técnico proactivo y actualizaciones críticas. Garantizamos que tu activo digital sea siempre seguro, rápido y esté online.", 
    icon: Wrench 
  },
  { 
    id: "04", 
    title: "Estrategia en Redes Sociales", 
    desc: "Diseño de activos visuales y redacción de contenidos estratégicos. Conectamos tu marca con tu audiencia de mayor valor en Osona.", 
    icon: Share2 
  },
  { 
    id: "05", 
    title: "Rediseño & Optimización", 
    desc: "Transformamos webs obsoletas en plataformas de vanguardia. Mejoramos la velocidad y la experiencia de usuario para recuperar clientes perdidos.", 
    icon: RefreshCcw 
  },
  { 
    id: "06", 
    title: "Auditoría de Conversión", 
    desc: "Análisis técnico de tu flujo de ventas. Detectamos dónde se escapan tus beneficios y trazamos la hoja de ruta para solucionarlo.", 
    icon: MousePointer2 
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
      className="group relative py-12 md:py-20 px-10 bg-[#030303] border border-white/5 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_0%_0%,rgba(0,255,157,0.03)_0%,transparent_70%)]" />
      <div className="relative z-10 h-full flex flex-col">
        <div className={`mb-6 w-10 h-10 flex items-center justify-center rounded-none border transition-all duration-700
          ${isInView ? 'bg-white/5 border-utilix-green/30 text-utilix-green' : 'bg-transparent border-white/5 text-white/20'}
          group-hover:border-utilix-green group-hover:bg-utilix-green/5 group-hover:text-utilix-green`}
        >
          <Icon size={18} strokeWidth={1} />
        </div>
        <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-4 leading-none transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed mb-10 font-light tracking-wide group-hover:text-white/80 transition-colors">
          {service.desc}
        </p>
        <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-6">
          <span className="text-[7px] font-mono text-white/20 tracking-[0.5em] uppercase">
            SERVICE_ASSET_{service.id}
          </span>
          <div className="w-1 h-1 bg-utilix-green shadow-[0_0_8px_#00ff9d]" />
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
      className="relative pt-0 pb-32 px-2 md:px-8 bg-[#030303] z-40 mt-[-35vh] md:mt-[-45vh]"
    >
      <div className="max-w-screen-2xl mx-auto w-full">

        <div className="flex flex-col items-start mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-[1px] bg-utilix-green" />
            <span className="text-utilix-green font-mono text-[10px] tracking-[0.4em] uppercase">
              Catálogo de Activos Digitales
            </span>
          </motion.div>

          <h2 className="text-[clamp(2rem,6vw,4.5rem)] font-black leading-[0.85] tracking-[-0.04em] uppercase text-white mb-6">
            SOLUCIONES <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-utilix-green via-white to-utilix-violet bg-[length:200%_200%] animate-gradient-slow">
              DE ALTO IMPACTO.
            </span>
          </h2>

          <p className="max-w-2xl text-white/40 text-lg font-light leading-relaxed">
            Especialistas en la creación y mantenimiento de ecosistemas web en <span className="text-white">Vic y toda Osona</span>. Transformamos tecnología en rentabilidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-white/10 bg-[#030303]">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>

        {/* --- BOTÓN ESTILO UTILIX (CUADRADO Y AGRESIVO) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col items-center"
        >
          <div className="relative group">
            <button 
              onClick={() => {
                const contactSection = document.getElementById('auditoria');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="relative px-10 py-6 bg-utilix-green text-black font-black uppercase tracking-tighter text-xl transition-all duration-300 hover:bg-white hover:scale-[1.02] active:scale-[0.98]"
            >
              Solicitar Auditoría Gratuita Osona
              {/* Decoración geométrica en las esquinas */}
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-black/20" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-black/20" />
            </button>
            
            {/* Sombra de apoyo / Marco exterior */}
            <div className="absolute -bottom-2 -right-2 w-full h-full border border-utilix-green/30 -z-10 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
          </div>

          <span className="mt-8 font-mono text-[9px] text-white/30 tracking-[0.5em] uppercase">
            [ Análisis de rendimiento sin coste · Plazas limitadas ]
          </span>
        </motion.div>

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