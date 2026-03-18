'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Instagram, Linkedin, CheckCircle2, Globe, Loader2 } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isHydrated, setIsHydrated] = useState(false);
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const isValidInput = url.includes('.') && url.length > 3;

  const handleExecute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidInput || status === 'sending') return;

    setStatus('sending');
    const cleanUrl = url.trim().toLowerCase();

    try {
      const res = await fetch('/api/send-audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          websiteUrl: cleanUrl,
          servicio: "Auditoría de Autoridad (Footer)",
          message: `Solicitud de análisis estratégico para el dominio: ${cleanUrl}`
        }),
      });

      // Si la respuesta es OK (200)
      if (res.ok) {
        setStatus('success');
        setUrl('');
        setTimeout(() => setStatus('idle'), 5000);
      } 
      // Si el servidor responde con error (400, 500, etc.)
      else {
        const errorData = await res.json().catch(() => ({}));
        console.error("Detalle del error en la API:", errorData);
        
        // Esto evita el "Endpoint error" genérico y te muestra la causa real en consola
        setStatus('idle');
        throw new Error(errorData.error || `Error del servidor: ${res.status}`);
      }
    } catch (err: any) {
      // Aquí verás en la consola si es un problema de dominio, API Key o ruta
      console.error("Error capturado en el Footer:", err.message);
      setStatus('idle');
    }
  };
  
  const scrollToSection = (id: string) => {
    if (window.location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isHydrated) return null;

  return (
    <footer className="relative pt-20 pb-12 md:pb-20 px-6 bg-[#030303] border-t border-white/5 overflow-hidden">
      
      {/* BACKGROUND ELEMENTS - "U" GIGANTE Y GRID SUTIL */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[70vw] font-[1000] text-white/[0.015] leading-none translate-y-1/4 select-none">
          U
        </span>
      </div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00ff9d]/40 to-transparent" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24">
          
          {/* BRANDING & INPUT SECCIÓN */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-10"
            >
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-[#00ff9d] animate-pulse" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#00ff9d] blur-[4px]" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.5em] text-white/50">
                SISTEMA_ACTIVO // v2.0.26
              </span>
            </motion.div>
            
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-[950] leading-[0.85] tracking-tighter uppercase text-white mb-6 italic">
              UtiLiX<span className="text-[#00ff9d] not-italic">.</span>STUDIO
            </h2>
            
            <p className="text-white/40 max-w-md text-lg leading-relaxed font-light italic mb-12">
              Transformamos la presencia digital en autoridad indiscutible. <br />
              <span className="text-white/80 not-italic font-medium">Introduce tu dominio para iniciar el análisis.</span>
            </p>

            {/* FORMULARIO VITAMINADO */}
            <div className="w-full max-w-md relative">
              <AnimatePresence mode="wait">
                {status !== 'success' ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onSubmit={handleExecute}
                    className="relative group"
                  >
                    <div className="absolute -inset-x-2 -bottom-2 h-[1px] bg-gradient-to-r from-transparent via-[#00ff9d]/0 to-transparent group-focus-within:via-[#00ff9d]/50 transition-all duration-700" />
                    
                    <div className="relative flex items-center">
                      <Globe size={14} className={`absolute left-0 transition-colors duration-500 ${url ? 'text-[#00ff9d]' : 'text-white/20'}`} />
                      <input 
                        type="text" 
                        required
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="TU-DOMINIO.COM" 
                        className="w-full bg-transparent border-b border-white/10 pl-7 py-5 text-xs font-mono uppercase tracking-[0.2em] text-white focus:outline-none focus:border-[#00ff9d] transition-all placeholder:text-white/5"
                      />
                      
                      <button 
                        type="submit"
                        disabled={status === 'sending' || !isValidInput}
                        className={`absolute right-0 flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase transition-all
                          ${isValidInput 
                            ? 'text-[#00ff9d] opacity-100 hover:tracking-[0.4em]' 
                            : 'text-white/20 cursor-not-allowed'
                          }`}
                      >
                        {status === 'sending' ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <>REDEFINIR <ArrowUpRight size={14} /></>
                        )}
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-4 py-5 px-6 bg-[#00ff9d]/5 border border-[#00ff9d]/20 rounded-sm"
                  >
                    <div className="p-1 bg-[#00ff9d] rounded-full">
                        <CheckCircle2 size={14} className="text-black" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-[#00ff9d] tracking-widest uppercase">Solicitud Procesada</span>
                        <span className="text-[9px] font-mono text-white/50 uppercase">Analizando métricas de autoridad...</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* COLUMNAS DE LINKS */}
          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div className="space-y-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Mapa_Sitio</h3>
              <ul className="space-y-4">
                {[
                  { name: 'Legado', id: 'proyectos' },
                  { name: 'Soluciones', id: 'services' },
                  { name: 'Transformación', id: 'auditoria' }
                ].map((link) => (
                  <li key={link.name}>
                    <button 
                      onClick={() => scrollToSection(link.id)}
                      className="text-[11px] text-white/40 hover:text-[#00ff9d] font-bold uppercase tracking-widest transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-[#00ff9d] transition-all" />
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00ff9d]/60">Ecosistema</h3>
              <ul className="space-y-4">
                {[
                  { name: 'Instagram', url: 'https://www.instagram.com/utilix.tech/', icon: <Instagram size={12} /> },
                  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/barucnsue/', icon: <Linkedin size={12} /> },
                ].map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[11px] text-white/40 hover:text-white font-bold uppercase tracking-widest transition-all flex items-center gap-3 group"
                    >
                      <span className="text-[#00ff9d] opacity-20 group-hover:opacity-100 transition-opacity">{link.icon}</span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1 space-y-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Directo</h3>
              <div className="group">
                <a href="mailto:info@utilix.es" className="block space-y-2">
                  <span className="text-[9px] text-[#00ff9d] block font-mono uppercase tracking-[0.3em] opacity-50 group-hover:opacity-100 transition-opacity">Protocolo_Email</span>
                  <span className="text-xs text-white/60 group-hover:text-white transition-colors font-mono break-all">info@utilix.es</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-10 gap-8">
          <div className="flex items-center gap-6">
            <p className="text-[9px] text-white/20 font-bold tracking-[0.3em] uppercase font-mono">
              © {currentYear} UTILIX STUDIO // DISEÑO DE ALTA AUTORIDAD
            </p>
          </div>
          
          <div className="flex gap-8">
            {['Privacidad', 'Aviso Legal', 'Cookies'].map((item) => (
              <Link 
                key={item}
                href={`/legal/${item.toLowerCase().replace(' ', '-')}`} 
                className="text-[9px] text-white/30 hover:text-[#00ff9d] transition-all font-bold tracking-[0.2em] uppercase"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;