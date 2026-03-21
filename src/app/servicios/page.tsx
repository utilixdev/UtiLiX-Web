'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Palette, 
  ShoppingBag, 
  ShieldCheck, 
  Share2, 
  Zap, 
  Search, 
  ArrowUpRight,
  ChevronRight 
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const expoEase = [0.19, 1, 0.22, 1];

// --- COMPONENTE AUDITORIA FORM INTEGRADO ---
function AuditoriaForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const inputStyle = "w-full bg-transparent border-b border-white/10 py-2 text-[#00ff9d] focus:outline-none focus:border-[#00ff9d] transition-colors duration-500 placeholder:text-white/10 font-medium tracking-widest uppercase text-sm";
  const labelStyle = "block text-[9px] uppercase tracking-[0.4em] text-[#00ff9d]/70 mb-1 font-bold";
  const selectIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2300ff9d'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'loading' || status === 'success') return;
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData);
    const payload = {
      name: rawData.nombre,
      email: rawData.email,
      telefono: rawData.telefono,
      apellidos: rawData.apellidos || "",
      servicio: rawData.servicio,
      web: rawData.web || "No proporcionada",
      message: `SOLICITUD DESDE SERVICIOS: El cliente requiere "${rawData.servicio}". Web: ${rawData.web || "N/A"}.`
    };

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="auditoria" className="relative py-12 px-6 bg-[#030303] overflow-hidden scroll-mt-12">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
          <h2 className="text-[clamp(1.8rem,5vw,4rem)] font-[950] leading-[0.9] tracking-tighter uppercase text-white/90 mb-2 italic">
            Hablemos de <br />
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-white to-emerald-400 bg-[length:200%_200%] animate-[gradient_8s_ease_infinite]">tu negocio.</span>
          </h2>
          <p className="text-white/40 font-medium text-[10px] md:text-xs tracking-[0.3em] uppercase max-w-xl mx-auto leading-relaxed">
            Analizaremos tu situación actual para decirte exactamente cómo pasar al siguiente nivel.
          </p>
        </motion.div>

        <motion.form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          <div className="relative"><label className={labelStyle}>Nombre *</label><input name="nombre" type="text" placeholder="Ej: Dr. García" className={inputStyle} required /></div>
          <div className="relative"><label className={labelStyle}>Apellidos</label><input name="apellidos" type="text" placeholder="Tus apellidos" className={inputStyle} /></div>
          <div className="relative"><label className={labelStyle}>Email de contacto *</label><input name="email" type="email" placeholder="clinica@ejemplo.com" className={inputStyle} required /></div>
          <div className="relative"><label className={labelStyle}>Teléfono *</label><input name="telefono" type="tel" placeholder="600 000 000" className={inputStyle} required /></div>
          <div className="relative md:col-span-2">
            <label className={labelStyle}>¿En qué podemos ayudarte?</label>
            <select name="servicio" required className={`${inputStyle} appearance-none cursor-pointer font-bold w-full pr-10`} style={{ backgroundImage: `url("${selectIcon}")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1.2em' }}>
              <option value="" className="bg-black text-white/30 italic text-xs">Selecciona una opción</option>
              <option value="Imagen y Autoridad" className="bg-black text-white">Mejorar mi imagen y ganar autoridad</option>
              <option value="Web" className="bg-black text-white">Nueva página web (más moderna y rápida)</option>
              <option value="Plan Completo" className="bg-black text-white">Plan completo: Imagen + Web + Captación</option>
            </select>
          </div>
          <div className="relative md:col-span-2"><label className={labelStyle}>Web actual (si tienes)</label><input name="web" type="url" placeholder="www.tuclinica.com" className={inputStyle} /></div>
          <div className="md:col-span-2 pt-4 flex justify-center">
            <div className="relative group w-full md:w-auto">
              <div className={`absolute -inset-[1px] rounded-none transition duration-500 blur-[4px] ${status === 'success' ? 'bg-[#00ff9d] opacity-100' : 'bg-gradient-to-r from-purple-500 via-white to-emerald-400 opacity-20 group-hover:opacity-100 animate-[gradient_8s_ease_infinite] bg-[length:200%_200%]'}`} />
              <button type="submit" disabled={status === 'loading' || status === 'success'} className={`relative px-20 py-5 rounded-none font-black uppercase tracking-[0.5em] text-[11px] w-full md:w-auto transition-all duration-500 overflow-hidden ${status === 'success' ? 'bg-[#00ff9d] text-black' : status === 'loading' ? 'bg-white/10 text-white border border-white/20' : 'bg-white text-black'}`}>
                <span className={`relative z-10 block transition-colors duration-500 ${status === 'idle' ? 'group-hover:text-white' : ''}`}>
                  {status === 'loading' ? 'Enviando Protocolo...' : status === 'success' ? '✓ Transmisión Éxito' : status === 'error' ? 'Error - Reintentar' : 'Solicitar Auditoría'}
                </span>
                {status === 'idle' && <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.19,1,0.22,1]" />}
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

// --- HELPER COMPONENTS ---
const ScrollSection = ({ children, scrollYProgress, range }: { children: React.ReactNode, scrollYProgress: any, range: [number, number] }) => {
  const opacity = useTransform(scrollYProgress, range, [1, 0]);
  const y = useTransform(scrollYProgress, range, [0, -40]);
  const scale = useTransform(scrollYProgress, range, [1, 0.99]);
  
  return <motion.section style={{ opacity, scale, y }} className="relative w-full overflow-hidden">{children}</motion.section>;
};

export default function ServiciosPage() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ["start start", "end end"]
  });

  useEffect(() => { setMounted(true); }, []);

  const scrollToAudit = () => {
    const section = document.getElementById('auditoria');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!mounted) return <div className="bg-[#030303] min-h-screen" />;

  const services = [
    {
      sys_id: "01",
      title: "Web Corporativa & Landing Pages",
      desc: "Creación de sitios de alto impacto y landings de conversión. Rediseñamos y actualizamos tu presencia digital para situarte por encima de la competencia en Vic y Osona.",
      icon: <Palette className="w-8 h-8" />,
      tag: "SERVICE_ASSET_01"
    },
    {
      sys_id: "02",
      title: "E-commerce & Tiendas Online",
      desc: "Desarrollo de tiendas en línea, sistemas de afiliación y catálogos autogestionables. Convertimos tu catálogo en una máquina de ventas 24/7.",
      icon: <ShoppingBag className="w-8 h-8" />,
      tag: "SERVICE_ASSET_02"
    },
    {
      sys_id: "03",
      title: "Mantenimiento & Seguridad",
      desc: "Soporte técnico proactivo y actualizaciones críticas. Garantizamos que tu activo digital sea siempre seguro, rápido y esté online sin interrupciones.",
      icon: <ShieldCheck className="w-8 h-8" />,
      tag: "SERVICE_ASSET_03"
    },
    {
      sys_id: "04",
      title: "Estrategia en Redes Sociales",
      desc: "Diseño de activos visuales y redacción de contenidos estratégicos. Conectamos tu marca con tu audiencia de mayor valor en el ecosistema local.",
      icon: <Share2 className="w-8 h-8" />,
      tag: "SERVICE_ASSET_04"
    },
    {
      sys_id: "05",
      title: "Rediseño & Optimización",
      desc: "Transformamos webs obsoletas en plataformas de vanguardia. Mejoramos la velocidad y la experiencia de usuario para recuperar clientes perdidos.",
      icon: <Zap className="w-8 h-8" />,
      tag: "SERVICE_ASSET_05"
    },
    {
      sys_id: "06",
      title: "Auditoría de Conversión",
      desc: "Análisis técnico de tu flujo de ventas. Detectamos dónde se escapan tus beneficios y trazamos la hoja de ruta para solucionarlo mediante tecnología.",
      icon: <Search className="w-8 h-8" />,
      tag: "SERVICE_ASSET_06"
    }
  ];

  return (
    <div ref={containerRef} className="bg-[#030303] text-white selection:bg-utilix-green selection:text-black min-h-screen">
      <Navbar />
      <main className="relative w-full">
        
        {/* 1. HERO SERVICIOS */}
        <ScrollSection scrollYProgress={scrollYProgress} range={[0, 0.2]}>
          <div className="relative min-h-[70svh] flex flex-col justify-center px-6 pt-24 md:pt-32 pb-0">
            <div className="max-w-6xl mx-auto w-full relative z-10 text-center md:text-left">
              <motion.div 
                initial={{ opacity: 0, x: -40 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 1, ease: expoEase as any }}
                className="mb-4 inline-block"
              >
                <span className="text-utilix-green font-mono text-[10px] tracking-[0.8em] uppercase border-l border-utilix-green/30 pl-4">01 // CATÁLOGO DE ACTIVOS</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1, delay: 0.3, ease: expoEase as any }} 
                className="text-[clamp(2.2rem,8.5vw,8rem)] font-[1000] leading-[0.85] tracking-tighter uppercase text-white mb-10 md:mb-12"
              >
                SOLUCIONES <br />
                <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-utilix-violet via-white to-utilix-green bg-[length:200%_200%] animate-[gradient_slow_8s_ease_infinite]">DE ALTO IMPACTO.</span>
              </motion.h1>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: expoEase as any }}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end"
              >
                <div className="md:col-span-8">
                  <p className="text-xl md:text-2xl font-light italic text-white/40 leading-tight">
                    Especialistas en la creación y mantenimiento de ecosistemas web en <span className="text-white">Vic y toda Osona</span>. Transformamos tecnología en rentabilidad mediante herramientas de captación diseñadas para el éxito.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </ScrollSection>

        {/* 2. GRID DE SERVICIOS */}
        <section className="px-6 pb-40">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-[40px] md:rounded-[60px] overflow-hidden">
            {services.map((service, i) => (
              <ServiceCard key={i} service={service} index={i} />
            ))}
          </div>
        </section>

        {/* 3. AUDITORÍA FORM */}
        <AuditoriaForm />

      </main>
      <Footer />

      <style jsx global>{`
        @keyframes gradient-slow { 0% { background-position: 0% 50% } 50% { background-position: 100% 50% } 100% { background-position: 0% 50% } }
        @keyframes gradient { 0% { background-position: 0% 50% } 50% { background-position: 100% 50% } 100% { background-position: 0% 50% } }
        .animate-gradient-slow { animation: gradient-slow 8s ease infinite; }
        body { overflow-x: hidden; background: #030303; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}

function ServiceCard({ service, index }: { service: any, index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: expoEase as any }}
      className="bg-[#030303] p-10 md:p-16 flex flex-col justify-between group relative hover:bg-white/[0.01] transition-colors duration-700"
    >
      <div>
        <div className="flex justify-between items-start mb-12">
          <div className="text-utilix-green group-hover:scale-110 group-hover:text-utilix-violet transition-all duration-500 bg-white/5 p-4 rounded-2xl">
            {service.icon}
          </div>
          <span className="font-mono text-[9px] text-white/20 tracking-[0.3em] uppercase">
            sys_id: {service.sys_id}
          </span>
        </div>
        
        <h3 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter mb-6 group-hover:text-white transition-colors">
          {service.title}
        </h3>
        
        <p className="text-white/40 font-light leading-relaxed mb-10 text-base md:text-lg italic">
          {service.desc}
        </p>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <span className="px-4 py-1.5 border border-white/10 rounded-full font-mono text-[8px] uppercase tracking-widest text-white/30 group-hover:border-utilix-green/40 group-hover:text-utilix-green transition-all">
          {service.tag}
        </span>
        <ArrowUpRight className="text-white/10 group-hover:text-utilix-green group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" size={24} />
      </div>
    </motion.div>
  );
}