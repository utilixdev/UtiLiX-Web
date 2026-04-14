'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, MessageSquare, Zap, ArrowUpRight } from 'lucide-react';

const expoEase = [0.19, 1, 0.22, 1];

// --- HELPER COMPONENTS (Iguales a Filosofía) ---
const ScrollSection = ({ children, scrollYProgress, range }: { children: React.ReactNode, scrollYProgress: any, range: [number, number] }) => {
  const opacity = useTransform(scrollYProgress, range, [1, 0]);
  const y = useTransform(scrollYProgress, range, [0, -40]);
  const scale = useTransform(scrollYProgress, range, [1, 0.99]);
  
  return <motion.section style={{ opacity, scale, y }} className="relative w-full overflow-hidden">{children}</motion.section>;
};

// --- COMPONENTE AUDITORIA FORM (Mismo estilo que Filosofía) ---
function AuditoriaForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const inputStyle = "w-full bg-transparent border-b border-white/10 py-2 text-[#00ff9d] focus:outline-none focus:border-[#00ff9d] transition-colors duration-500 placeholder:text-white/10 font-medium tracking-widest uppercase text-sm";
  const labelStyle = "block text-[9px] uppercase tracking-[0.4em] text-[#00ff9d]/70 mb-1 font-bold";
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'loading' || status === 'success') return;
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <section id="auditoria" className="relative py-24 px-6 bg-[#030303] overflow-hidden scroll-mt-24">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-[clamp(1.8rem,5vw,4rem)] font-[950] leading-[0.9] tracking-tighter uppercase text-white/90 mb-4 italic">
            ¿TU WEB NO <br />
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-white to-[#00ff9d] bg-[length:200%_200%] animate-[gradient_8s_ease_infinite]">ESTÁ VENDIENDO?</span>
          </h2>
          <p className="text-white/40 font-medium text-[10px] md:text-xs tracking-[0.3em] uppercase max-w-xl mx-auto leading-relaxed">
            Hablamos claro. Analizaremos tu caso para decirte por qué tu competencia te está ganando la partida.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          <div className="relative"><label className={labelStyle}>Nombre *</label><input name="nombre" type="text" placeholder="Tu nombre" className={inputStyle} required /></div>
          <div className="relative"><label className={labelStyle}>Email *</label><input name="email" type="email" placeholder="email@ejemplo.com" className={inputStyle} required /></div>
          <div className="relative md:col-span-2"><label className={labelStyle}>Web actual</label><input name="web" type="url" placeholder="www.tunegocio.com" className={inputStyle} /></div>
          <div className="md:col-span-2 pt-4 flex justify-center">
            <button type="submit" className="relative group overflow-hidden bg-white text-black px-12 py-5 font-black uppercase tracking-[0.4em] text-[11px] transition-all duration-500">
               <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                {status === 'success' ? '✓ ENVIADO' : 'SOLICITAR AUDITORÍA'}
               </span>
               <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

const posts = [
  { id: 'agencia-diseno-web', num: '01', icon: <Target size={24} />, title: "¿Qué preguntas hacer antes de contratar?", desc: "No tires tu dinero. Si no te responden a esto con claridad, huye. Aprende a detectar el humo antes de pagar la primera factura.", tag: "Protocolo // Supervivencia" },
  { id: 'boton-whatsapp', num: '02', icon: <MessageSquare size={24} />, title: "WhatsApp: Tu comercial 24/7", desc: "¿Tu web es una tarjeta de visita muda o una máquina de captar clientes? Un pequeño cambio que multiplica tus contactos hoy.", tag: "Estrategia // Conversión" },
  { id: 'web-vs-instagram', num: '03', icon: <Zap size={24} />, title: "Tu web no es un mueble, es un motor", desc: "Por qué Instagram no es suficiente. El riesgo de construir tu casa en terreno alquilado y cómo tomar el control de tu negocio.", tag: "Autoridad // Negocio" }
];

export default function BlogPage() {
  const [isHydrated, setIsHydrated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: isHydrated ? containerRef : undefined, offset: ["start start", "end end"] });

  useEffect(() => { setIsHydrated(true); }, []);

  if (!isHydrated) return <div className="bg-[#030303] min-h-screen" />;

  return (
    <div ref={containerRef} className="bg-[#030303] text-white selection:bg-[#00ff9d] selection:text-black min-h-screen">
      <main className="relative w-full">
        
        {/* 1. HERO (Estructura de Filosofía) */}
        <ScrollSection scrollYProgress={scrollYProgress} range={[0, 0.25]}>
          <div className="relative min-h-[70svh] flex flex-col px-6 pt-24 md:pt-32 pb-16">
            <div className="max-w-7xl mx-auto w-full relative z-10 text-center md:text-left">
              <motion.div 
                initial={{ opacity: 0, x: -40 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 1, ease: expoEase as any }}
                className="mb-4 inline-block"
              >
                <span className="text-[#00ff9d] font-mono text-[10px] tracking-[0.8em] uppercase border-l border-[#00ff9d]/30 pl-4">
                 UTILIX - BLOG // IDEAS QUE VENDEN
                </span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1, delay: 0.3, ease: expoEase as any }} 
                className="text-[clamp(2.5rem,9vw,9rem)] font-[1000] leading-[0.85] tracking-tighter uppercase text-white mb-10 md:mb-12"
              >
                MENOS HUMO. <br />
                <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-white to-[#00ff9d] bg-[length:200%_200%] animate-[gradient_8s_ease_infinite]">MÁS RESULTADOS.</span>
              </motion.h1>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: expoEase as any }}
                className="max-w-2xl"
              >
                <p className="text-xl md:text-2xl font-light italic text-white/40 leading-tight">
                  Hablamos claro. Aquí no encontrarás tecnicismos para marearte. Encontrarás la verdad sobre cómo hacer que <span className="text-white">internet trabaje para tu negocio</span>.
                </p>
              </motion.div>
            </div>
          </div>
        </ScrollSection>

        {/* 2. FEED DE ARTÍCULOS */}
        <section className="py-24 px-6 border-t border-white/5 bg-[#050505]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: expoEase as any }}
                >
                  <Link 
                    href={`/blog/${post.id}`}
                    className="group relative p-10 bg-white/[0.02] border border-white/5 hover:border-[#00ff9d]/30 transition-all duration-700 flex flex-col h-full overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-[#00ff9d]/[0.02] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.19,1,0.22,1]" />

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-16">
                        <div className="p-4 bg-white/5 rounded-none text-[#00ff9d] group-hover:scale-110 group-hover:bg-[#00ff9d] group-hover:text-black transition-all duration-500">
                          {post.icon}
                        </div>
                        <span className="text-5xl font-black text-white/5 group-hover:text-[#00ff9d]/10 transition-colors tracking-tighter">
                          {post.num}
                        </span>
                      </div>

                      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#00ff9d]/60 mb-4 block">
                        {post.tag}
                      </span>
                      
                      <h2 className="text-3xl font-[1000] italic uppercase mb-6 leading-[0.9] tracking-tighter group-hover:text-white transition-colors">
                        {post.title}
                      </h2>
                      
                      <p className="text-white/40 text-sm leading-relaxed font-light italic mb-12 group-hover:text-white/60 transition-colors">
                        {post.desc}
                      </p>

                      <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-[#00ff9d]">
                        LEER ARTÍCULO <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-500" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <AuditoriaForm />

      </main>

      <style jsx global>{`
        @keyframes gradient { 
          0% { background-position: 0% 50% } 
          50% { background-position: 100% 50% } 
          100% { background-position: 0% 50% } 
        }
        html { scroll-behavior: smooth; }
        body { background: #030303; }
      `}</style>
    </div>
  );
}