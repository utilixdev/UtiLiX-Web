'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowUpRight, 
  Plus, 
  Layers, 
  Terminal, 
  Zap, 
  Target, 
  Cpu, 
  Eye 
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
      message: `SOLICITUD DESDE PROYECTOS: Interés en replicar resultados. Servicio: ${rawData.servicio}.`
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
    <section id="auditoria" className="relative py-24 px-6 bg-[#030303] overflow-hidden scroll-mt-12">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-[clamp(1.8rem,5vw,4rem)] font-[950] leading-[0.9] tracking-tighter uppercase text-white/90 mb-4 italic">
            ¿QUIERES ESTOS <br />
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-white to-emerald-400 bg-[length:200%_200%] animate-[gradient_8s_ease_infinite]">RESULTADOS?</span>
          </h2>
          <p className="text-white/40 font-medium text-[10px] md:text-xs tracking-[0.3em] uppercase max-w-xl mx-auto leading-relaxed">
            Analicemos tu caso para implementar una infraestructura de alto rendimiento en tu negocio.
          </p>
        </motion.div>

        <motion.form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          <div className="relative"><label className={labelStyle}>Tu Nombre *</label><input name="nombre" type="text" placeholder="Nombre completo" className={inputStyle} required /></div>
          <div className="relative"><label className={labelStyle}>Apellidos</label><input name="apellidos" type="text" placeholder="Tus apellidos" className={inputStyle} /></div>
          <div className="relative"><label className={labelStyle}>Email corporativo *</label><input name="email" type="email" placeholder="empresa@tuweb.com" className={inputStyle} required /></div>
          <div className="relative"><label className={labelStyle}>Teléfono *</label><input name="telefono" type="tel" placeholder="600 000 000" className={inputStyle} required /></div>
          <div className="relative md:col-span-2">
            <label className={labelStyle}>Objetivo principal</label>
            <select name="servicio" required className={`${inputStyle} appearance-none cursor-pointer font-bold w-full pr-10`} style={{ backgroundImage: `url("${selectIcon}")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1.2em' }}>
              <option value="" className="bg-black text-white/30 italic text-xs">Selecciona un objetivo</option>
              <option value="Conversión" className="bg-black text-white">Escalar ventas y conversión</option>
              <option value="Imagen" className="bg-black text-white">Autoridad de marca y Status</option>
              <option value="Sistema" className="bg-black text-white">Digitalización total del negocio</option>
            </select>
          </div>
          <div className="relative md:col-span-2"><label className={labelStyle}>Tu web actual</label><input name="web" type="url" placeholder="www.tuweb.com" className={inputStyle} /></div>
          <div className="md:col-span-2 pt-8 flex justify-center">
            <div className="relative group w-full md:w-auto">
              <div className={`absolute -inset-[1px] rounded-none transition duration-500 blur-[4px] ${status === 'success' ? 'bg-[#00ff9d] opacity-100' : 'bg-gradient-to-r from-purple-500 via-white to-emerald-400 opacity-20 group-hover:opacity-100 animate-[gradient_8s_ease_infinite] bg-[length:200%_200%]'}`} />
              <button type="submit" disabled={status === 'loading' || status === 'success'} className={`relative px-20 py-6 rounded-none font-black uppercase tracking-[0.5em] text-[11px] w-full md:w-auto transition-all duration-500 overflow-hidden ${status === 'success' ? 'bg-[#00ff9d] text-black' : status === 'loading' ? 'bg-white/10 text-white border border-white/20' : 'bg-white text-black'}`}>
                <span className={`relative z-10 block transition-colors duration-500 ${status === 'idle' ? 'group-hover:text-white' : ''}`}>
                  {status === 'loading' ? 'Procesando Datos...' : status === 'success' ? '✓ Recibido' : status === 'error' ? 'Error - Reintentar' : 'Solicitar Información'}
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

// --- PÁGINA DE PROYECTOS ---
export default function ProyectosPage() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: mounted ? containerRef : undefined, offset: ["start start", "end end"] });

  useEffect(() => { setMounted(true); }, []);

  const scrollToAudit = () => {
    const section = document.getElementById('auditoria');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!mounted) return <div className="bg-[#030303] min-h-screen" />;

  const projects = [
    { title: "KRYPTOS_CORE", category: "Ventas Automatizadas", year: "2024", tech: "React/Go", img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2070", impact: "Incremento del 40% en conversión" },
    { title: "VOGUE_SYSTEM", category: "Tienda de Alto Rendimiento", year: "2024", tech: "Next/Shopify", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070", impact: "Optimización de carga a < 1s" },
    { title: "NEBULA_AI", category: "Automatización de Procesos", year: "2023", tech: "Python/LLM", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070", impact: "Reducción de costes operativos" },
    { title: "URBAN_LABS", category: "Experiencia de Marca", year: "2023", tech: "WebGL/Three.js", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070", impact: "Liderazgo en mercado local" }
  ];

  return (
    <div ref={containerRef} className="bg-[#030303] text-white selection:bg-[#00ff9d] selection:text-black min-h-screen">
      <Navbar />
      <main className="relative w-full">
        
        {/* 1. HERO PROYECTOS */}
        <ScrollSection scrollYProgress={scrollYProgress} range={[0, 0.2]}>
          <div className="relative min-h-[85svh] flex flex-col justify-center px-6 pt-24 md:pt-32 pb-0">
            <div className="max-w-6xl mx-auto w-full relative z-10 text-center md:text-left">
              <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: expoEase as any }} className="mb-6 inline-block">
                <span className="text-[#00ff9d] font-mono text-[10px] tracking-[0.8em] uppercase border-l border-[#00ff9d]/30 pl-4">03 // CASOS DE ÉXITO</span>
              </motion.div>
              
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease: expoEase as any }} className="text-[clamp(2.5rem,9vw,9rem)] font-[1000] leading-[0.85] tracking-tighter uppercase text-white mb-10 md:mb-12">
                RESULTADOS <br />
                <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-white to-[#00ff9d] bg-[length:200%_200%] animate-[gradient_slow_8s_ease_infinite]">QUE SE NOTAN.</span>
              </motion.h1>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6, ease: expoEase as any }} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                <div className="md:col-span-8">
                  <p className="text-xl md:text-2xl font-light italic text-white/40 leading-tight">
                    No diseñamos por estética, diseñamos para que <span className="text-white">domines tu mercado</span>. Proyectos reales que resuelven problemas reales de negocio mediante ingeniería de autor.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </ScrollSection>

        {/* 2. LISTADO DE PROYECTOS */}
        <section className="px-6 pb-20 relative">
          <div className="max-w-7xl mx-auto space-y-24 md:space-y-40">
            {projects.map((p, i) => (
              <ProjectItem key={i} project={p} index={i} />
            ))}
            
            <motion.button 
              whileHover={{ scale: 1.01, backgroundColor: "rgba(0, 255, 145, 0.02)" }}
              className="w-full py-16 border border-dashed border-white/10 rounded-[40px] text-white/20 hover:text-[#00ff9d] hover:border-[#00ff9d]/40 transition-all font-mono uppercase tracking-[0.5em] text-[10px] flex items-center justify-center gap-4 group"
            >
              <Plus size={14} className="group-hover:rotate-90 transition-transform duration-500" /> 
              Cargar_Más_Proyectos_del_Archivo
            </motion.button>
          </div>
        </section>

        {/* 3. CTA INTERMEDIO */}
        <div className="py-24 px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: expoEase as any }}
            className="max-w-6xl mx-auto p-10 md:p-20 bg-[#080808] border border-white/5 relative overflow-hidden group rounded-[40px]"
          >
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-30 transition-opacity"><Zap size={120} className="text-[#00ff9d]" /></div>
            <div className="relative z-10 max-w-2xl">
              <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-6">¿BUSCAS ESTE <br /> NIVEL DE IMPACTO?</h3>
              <p className="text-white/40 text-lg md:text-xl mb-10 font-light italic leading-relaxed">Cada proyecto anterior comenzó con una auditoría técnica. Vamos a detectar qué piezas le faltan a tu negocio para escalar al siguiente nivel de autoridad.</p>
              <button onClick={scrollToAudit} className="group flex items-center gap-4 px-10 py-6 bg-white text-black font-black text-[11px] uppercase tracking-[0.4em] hover:bg-[#00ff9d] transition-all duration-500">
                INICIAR PROTOCOLO <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform duration-500" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* 4. PILARES DE EJECUCIÓN */}
        <ScrollSection scrollYProgress={scrollYProgress} range={[0.65, 0.9]}>
          <div className="py-12 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: <Cpu size={28} />, title: "Ingeniería", color: "text-purple-500", desc: "Código limpio y optimizado para una velocidad de carga instantánea que Google premia." },
                { icon: <Eye size={28} />, title: "Impacto", color: "text-[#00ff9d]", desc: "Diseño visual quirúrgico que posiciona tu marca por encima del 99% de tu competencia." },
                { icon: <Target size={28} />, title: "Retorno", color: "text-white", desc: "Enfoque obsesivo en la conversión. Cada pixel está diseñado para generar confianza y ventas." }
              ].map((item, i) => (
                <div key={i} className="p-10 md:p-14 bg-white/[0.02] border border-white/5 hover:border-[#00ff9d]/20 transition-all duration-500 rounded-[30px]">
                  <div className={`${item.color} mb-6`}>{item.icon}</div>
                  <h3 className="text-2xl font-[1000] italic uppercase mb-4 tracking-tighter">{item.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed font-light italic">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollSection>

        {/* 5. AUDITORÍA FORM */}
        <AuditoriaForm />

      </main>
      <Footer />

      <style jsx global>{`
        @keyframes gradient-slow { 0% { background-position: 0% 50% } 50% { background-position: 100% 50% } 100% { background-position: 0% 50% } }
        @keyframes gradient { 0% { background-position: 0% 50% } 50% { background-position: 100% 50% } 100% { background-position: 0% 50% } }
        @keyframes scan { 0% { top: -5%; } 100% { top: 105%; } }
        .animate-gradient-slow { animation: gradient-slow 8s ease infinite; }
        .animate-scan { animation: scan 4s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        body { overflow-x: hidden; background: #030303; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}

function ProjectItem({ project, index }: any) {
  const itemRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: itemRef, offset: ["start end", "end start"] });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -60]);

  return (
    <motion.div 
      ref={itemRef}
      style={{ opacity, scale, y }}
      className="group relative bg-white/[0.01] border border-white/5 rounded-[40px] md:rounded-[60px] overflow-hidden flex flex-col lg:grid lg:grid-cols-12 gap-8 p-6 md:p-12 hover:border-[#00ff9d]/20 transition-all duration-700"
    >
      <div className="lg:col-span-5 flex flex-col justify-between space-y-12 relative z-10">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-white/5 rounded-md border border-white/10">
               <span className="text-[#00ff9d] font-mono text-[10px]">[{project.year}]</span>
            </div>
            <div className="flex items-center gap-2 text-white/20 font-mono text-[9px] uppercase tracking-widest">
              <Terminal size={10} /> {project.tech}
            </div>
          </div>
          
          <h3 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter group-hover:text-[#00ff9d] transition-colors duration-500 leading-[0.85]">
            {project.title}
          </h3>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-purple-500" />
            <p className="text-white/40 font-light italic uppercase tracking-[0.3em] text-[10px]">
              {project.category}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="text-[11px] font-mono uppercase tracking-[0.4em] text-[#00ff9d]/60 flex items-center gap-4 group-hover:text-white transition-all">
            <Layers size={14} className="text-purple-500 animate-pulse" /> 
            {project.impact}
          </div>
          <div className="flex gap-1 h-1.5 w-32">
            <div className="h-full w-1/3 bg-white/5 group-hover:bg-[#00ff9d]/40 transition-colors" />
            <div className="h-full w-1/3 bg-white/5 group-hover:bg-[#00ff9d]/20 transition-colors delay-75" />
            <div className="h-full w-1/3 bg-white/5 group-hover:bg-[#00ff9d]/10 transition-colors delay-150" />
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 relative h-96 md:h-[600px] rounded-[30px] md:rounded-[50px] overflow-hidden group/img">
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
          style={{ backgroundImage: `url(${project.img})` }} 
        />
        <div className="absolute inset-0 bg-[#030303]/50 group-hover:bg-[#030303]/10 transition-all duration-700" />
        
        {/* Efectos de escaneo técnico */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 mix-blend-overlay" />
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#00ff9d] to-transparent shadow-[0_0_20px_rgba(0,255,145,0.8)] animate-scan z-20" />
          <div className="absolute inset-y-0 left-0 w-[1px] bg-[#00ff9d]/30 shadow-[0_0_15px_rgba(0,255,145,0.3)]" />
        </div>

        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 bg-black/80 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-full flex items-center gap-5 translate-y-24 group-hover:translate-y-0 transition-transform duration-700">
            <div className="relative">
              <div className="w-2.5 h-2.5 rounded-full bg-[#00ff9d]" />
              <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-[#00ff9d] animate-ping opacity-75" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/70">
              ROI_Estado: <span className="text-[#00ff9d]">Optimizado</span>
            </span>
        </div>

        <div className="absolute top-8 right-8 md:top-12 md:right-12 opacity-0 group-hover:opacity-100 translate-x-12 group-hover:translate-x-0 transition-all duration-500">
          <div className="w-16 h-16 rounded-full bg-[#00ff9d] text-black flex items-center justify-center shadow-2xl">
            <ArrowUpRight size={28} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}