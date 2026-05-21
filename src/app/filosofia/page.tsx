'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Cpu, Target, Eye, ArrowUpRight, Zap } from 'lucide-react';
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
      message: `SOLICITUD DESDE FILOSOFÍA: El cliente requiere "${rawData.servicio}". Web: ${rawData.web || "N/A"}.`
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

// --- PÁGINA PRINCIPAL ---
export default function FilosofiaPage() {
  const [isHydrated, setIsHydrated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: isHydrated ? containerRef : undefined, offset: ["start start", "end end"] });

  useEffect(() => { setIsHydrated(true); }, []);

  const scrollToAudit = () => {
    const section = document.getElementById('auditoria');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isHydrated) return <div className="bg-[#030303] min-h-screen" />;

  return (
    <div ref={containerRef} className="bg-[#030303] text-white selection:bg-utilix-green selection:text-black min-h-screen">
      <Navbar />
      <main className="relative w-full">
        
        {/* 1. HERO */}
        <ScrollSection scrollYProgress={scrollYProgress} range={[0, 0.2]}>
          <div className="relative min-h-[70svh] flex flex-col justify-center px-6 pt-24 md:pt-32 pb-0">
            <div className="max-w-6xl mx-auto w-full relative z-10 text-center md:text-left">
              <motion.div 
                initial={{ opacity: 0, x: -40 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 1, ease: expoEase as any }}
                className="mb-4 inline-block"
              >
                <span className="text-utilix-green font-mono text-[10px] tracking-[0.8em] uppercase border-l border-utilix-green/30 pl-4">01 // EL ESTÁNDAR UTILIX</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1, delay: 0.3, ease: expoEase as any }} 
                className="text-[clamp(2.2rem,8.5vw,8rem)] font-[1000] leading-[0.85] tracking-tighter uppercase text-white mb-10 md:mb-12"
              >
                SÉ EL REFERENTE <br />
                <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-utilix-violet via-white to-utilix-green bg-[length:200%_200%] animate-[gradient_slow_8s_ease_infinite]">DE TU SECTOR.</span>
              </motion.h1>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: expoEase as any }}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end"
              >
                <div className="md:col-span-8">
                  <p className="text-xl md:text-2xl font-light italic text-white/40 leading-tight">
                    La mayoría de empresas tienen webs que solo "están ahí". Nosotros creamos <span className="text-white">herramientas de captación</span> diseñadas para una sola cosa: que el cliente te elija a ti antes de haber hablado contigo.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </ScrollSection>

        {/* 2. LA DIFERENCIA */}
        <ScrollSection scrollYProgress={scrollYProgress} range={[0.2, 0.45]}>
          <div className="py-4 md:py-8 px-6 bg-[#050505] border-y border-white/5">
            <div className="max-w-6xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, x: 40 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 1, ease: expoEase as any }}
                className="w-full"
              >
                <span className="text-[11px] font-black uppercase tracking-[0.6em] text-utilix-violet mb-4 flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-utilix-violet/50" /> 02 // NUESTRO COMPROMISO
                </span>
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 1, delay: 0.3, ease: expoEase as any }} 
                className="text-[clamp(1.8rem,5vw,4rem)] font-[900] leading-[0.9] tracking-tighter uppercase text-white/90 mb-4 italic"
              >
                <span className="block mb-2">TRANSFORMAMOS TU NOMBRE </span>
                <span className="relative inline-block italic font-light text-transparent bg-clip-text bg-gradient-to-r from-utilix-violet via-white to-utilix-green bg-[length:200%_200%] animate-[gradient-slow_8s_ease_infinite] pb-1">EN UNA MARCA.</span>
              </motion.h2>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6, ease: expoEase as any }}
                className="max-w-3xl space-y-4 text-lg text-white/60 leading-relaxed font-light italic"
              >
                <p>Si tu presencia digital no proyecta el valor real de lo que vendes, estás regalando dinero a tu competencia. No buscamos que tu web sea "la más bonita", buscamos que sea <span className="text-white">la que más confianza genere</span> para cerrar ventas más grandes.</p>
              </motion.div>
            </div>
          </div>
        </ScrollSection>

        {/* 3. CTA INTERMEDIO */}
        <div className="py-2 px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: expoEase as any }}
            className="max-w-6xl mx-auto p-8 md:p-12 bg-[#080808] border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity"><Zap size={100} className="text-utilix-green" /></div>
            <div className="relative z-10 max-w-2xl">
              <h3 className="text-2xl md:text-4xl font-black italic uppercase tracking-tighter mb-4">¿ESTÁS PERDIENDO <br /> CLIENTES POR TU WEB?</h3>
              <p className="text-white/40 text-lg mb-6 font-light italic">Una web lenta o con un diseño mediocre es un comercial que no sabe hablar. Vamos a encontrar los errores que están frenando tu crecimiento.</p>
              <button onClick={scrollToAudit} className="group flex items-center gap-4 px-8 py-5 bg-white text-black font-black text-[10px] uppercase tracking-[0.4em] hover:bg-utilix-green transition-all duration-500">
                AUDITAR MI NEGOCIO <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform duration-500" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* 4. LOS TRES PILARES */}
        <ScrollSection scrollYProgress={scrollYProgress} range={[0.55, 0.85]}>
          <div className="py-4 md:py-8 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {[
                  { icon: <Cpu size={28} />, title: "Fiabilidad", color: "text-utilix-violet", desc: "Tu negocio no se detiene, tu web tampoco. Creamos sistemas robustos que funcionan siempre." },
                  { icon: <Eye size={28} />, title: "Status", color: "text-utilix-green", desc: "En el mundo digital, lo que parece es lo que es. Posicionamos tu marca con estética de alto nivel." },
                  { icon: <Target size={28} />, title: "Conversión", color: "text-white", desc: "Diseñamos pensando en la psicología de tu cliente. Eliminamos los obstáculos hacia el contacto." }
                ].map((item, i) => (
                  <div key={i} className="p-8 md:p-10 bg-white/[0.02] border border-white/5 hover:border-utilix-green/20 transition-all duration-500">
                    <div className={`${item.color} mb-4`}>{item.icon}</div>
                    <h3 className="text-2xl font-[1000] italic uppercase mb-2 tracking-tighter">{item.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed font-light italic">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* 5. AUDITORÍA FORM */}
        <AuditoriaForm />

      </main>

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