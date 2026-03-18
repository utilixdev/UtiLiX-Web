'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, Code, Smartphone, ChevronRight, Fingerprint, Cpu, Globe } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MetodologiaPage() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="bg-[#030303] min-h-screen" />;

  const steps = [
    {
      id: "01",
      icon: <Fingerprint className="w-10 h-10" />,
      title: "Diagnóstico de Autor",
      desc: "Auditamos la anatomía digital actual para identificar las fugas de autoridad. No buscamos errores genéricos, buscamos el potencial latente que otros ignoran para cimentar una base indestructible.",
      tech: "Análisis_Anatómico / Fugas_de_Autoridad / DNA_Extract"
    },
    {
      id: "02",
      icon: <Cpu className="w-10 h-10" />,
      title: "Ingeniería de Impacto",
      desc: "Arquitectura de software diseñada bajo estándares de alta costura digital. Fusionamos precisión técnica con visión estratégica para crear un código limpio, escalable y optimizado para la máxima conversión.",
      tech: "Alta_Costura_Digital / Next.js_15 / Precision_Engine"
    },
    {
      id: "03",
      icon: <Globe className="w-10 h-10" />,
      title: "Curaduría Estratégica",
      desc: "Desplegamos una narrativa visual y técnica que posiciona tu activo en el ecosistema de la excelencia. Transformamos clics en relaciones de valor mediante una implementación de vanguardia.",
      tech: "Ecosistema_Excelencia / Narrativa_Técnica / Full_Scale"
    }
  ];

  return (
    <div ref={containerRef} className="bg-[#030303] text-white selection:bg-utilix-green selection:text-black">
      <Navbar />
      <main>
        {/* HEADER CON DEGRADADO UNIFICADO */}
        <section className="min-h-[80vh] flex items-center px-6 md:px-20 pt-20">
          <div className="max-w-7xl mx-auto">
            <span className="text-utilix-green font-mono text-[10px] tracking-[1em] uppercase block mb-8">
              Filosofía_Operativa_v3
            </span>
            <h1 className="text-[clamp(3rem,10vw,9rem)] font-[1000] italic leading-[0.85] tracking-tighter uppercase mb-12">
              ELEVAR LO CONVENCIONAL <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-utilix-violet via-white/90 to-utilix-green">
                A EXCEPCIONAL.
              </span>
            </h1>
            <p className="text-xl md:text-3xl text-white/40 font-light italic max-w-3xl leading-tight">
              Un método riguroso diseñado para quienes no aceptan el promedio. <span className="text-white">Framer-by-frame</span>, redefinimos tu autoridad digital.
            </p>
          </div>
        </section>

        {/* LISTADO DE PASOS (REDISEÑO RESPONSIVO) */}
        <section className="py-20 md:py-40 px-6 md:px-20">
          <div className="max-w-7xl mx-auto space-y-32 md:space-y-60">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                className="grid lg:grid-cols-12 gap-10 md:gap-20 items-center"
              >
                <div className={`lg:col-span-6 ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-6 mb-8">
                    <div className="text-utilix-green font-mono text-4xl font-black opacity-30">[{step.id}]</div>
                    <div className="h-[1px] flex-1 bg-white/10" />
                  </div>
                  
                  <div className="text-utilix-violet mb-8">{step.icon}</div>
                  
                  <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-8 leading-none">
                    {step.title}
                  </h2>
                  
                  <p className="text-lg md:text-xl text-white/50 leading-relaxed font-light mb-10">
                    {step.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    {step.tech.split(' / ').map((t, idx) => (
                      <span key={idx} className="px-4 py-2 border border-white/5 bg-white/[0.02] rounded-full font-mono text-[9px] uppercase tracking-widest text-utilix-green">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-6 aspect-square md:aspect-video bg-white/[0.01] border border-white/5 rounded-[40px] md:rounded-[80px] relative overflow-hidden flex items-center justify-center group">
                   <div className="absolute inset-0 bg-gradient-to-br from-utilix-green/5 via-transparent to-utilix-violet/5 opacity-50" />
                   
                   {/* Elemento Visual Técnico */}
                   <div className="relative z-10 w-full h-full flex items-center justify-center">
                      <div className="w-32 h-32 md:w-48 md:h-48 border border-white/10 rounded-full flex items-center justify-center animate-spin-slow">
                        <div className="w-24 h-24 md:w-32 md:h-32 border border-utilix-green/20 rounded-full border-dashed" />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-mono text-[10px] text-white/20 uppercase tracking-[1em] rotate-90 md:rotate-0">
                          System_Check_OK
                        </span>
                      </div>
                   </div>

                   <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                      <div className="space-y-1">
                        <div className="w-8 h-[1px] bg-utilix-green" />
                        <div className="w-4 h-[1px] bg-utilix-green/40" />
                      </div>
                      <span className="text-[8px] font-mono text-white/10 uppercase tracking-widest">Logic_Board_v.03</span>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CIERRE METODOLÓGICO MEJORADO */}
        <section className="py-20 md:py-40 px-4">
          <div className="max-w-6xl mx-auto bg-white text-black rounded-[50px] md:rounded-[100px] py-20 md:py-32 px-6 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-utilix-violet via-black to-utilix-green" />
            
            <div className="relative z-10">
              <h3 className="text-4xl md:text-8xl font-black italic uppercase tracking-tighter mb-10 leading-none">
                NO ES MAGIA, <br /> ES PROTOCOLO.
              </h3>
              <p className="text-lg md:text-2xl font-medium opacity-60 mb-16 max-w-2xl mx-auto leading-tight">
                Cuando eliminas la improvisación y aplicas ingeniería de autor, el éxito deja de ser un azar para convertirse en una métrica predecible.
              </p>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-6 mx-auto group bg-black text-white px-10 py-6 rounded-full"
              >
                <span className="text-[12px] font-black uppercase tracking-[0.4em]">Descargar_Dossier_Técnico</span>
                <div className="w-10 h-10 rounded-full bg-utilix-green text-black flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                  <ChevronRight size={20} />
                </div>
              </motion.button>
            </div>
          </div>
        </section>
      </main>
      
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
      
      <Footer />
    </div>
  );
}