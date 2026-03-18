'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Cpu, Zap, Share2, Workflow, Database, Cog, ArrowDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AutomatizacionPage() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ["start start", "end end"]
  });

  useEffect(() => setMounted(true), []);

  const opacityHero = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);

  if (!mounted) return <div className="bg-[#030303] min-h-screen" />;

  return (
    <div ref={containerRef} className="bg-[#030303] text-white selection:bg-utilix-green selection:text-black">
      <Navbar />
      
      <main className="relative">
        {/* SECCIÓN 01: HERO & MANIFIESTO */}
        <motion.section style={{ opacity: opacityHero, scale: scaleHero }} className="min-h-screen flex flex-col justify-center px-6 md:px-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,145,0.05),transparent_70%)]" />
          <div className="max-w-7xl mx-auto z-10">
            <span className="text-utilix-green font-mono text-[10px] tracking-[1em] uppercase block mb-12 animate-pulse">System_Efficiency_Protocol_v4.0</span>
            <h1 className="text-[clamp(3.5rem,12vw,11rem)] font-[1000] italic leading-[0.8] tracking-tighter uppercase mb-16">
              SISTEMAS <br /> <span className="text-white/10">AUTÓNOMOS.</span>
            </h1>
            <div className="grid md:grid-cols-2 gap-12 items-end">
              <p className="text-2xl md:text-4xl font-light italic text-white/40 leading-tight">
                El crecimiento no debería ser proporcional al esfuerzo humano. Diseñamos <span className="text-white">arquitecturas lógicas</span> que escalan sin fricción.
              </p>
              <div className="flex flex-col gap-4 items-start md:items-end">
                <div className="w-16 h-[1px] bg-utilix-green" />
                <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.5em]">Scroll_to_explore_logic</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* SECCIÓN 02: LA FILOSOFÍA DEL FLUJO */}
        <section className="py-40 px-6 md:px-20 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-24">
              <div className="space-y-12">
                <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                  ELIMINAMOS <br /> EL RUIDO <br /> OPERATIVO.
                </h2>
                <div className="space-y-8 text-xl text-white/50 font-light leading-relaxed">
                  <p>La mayoría de las empresas pierden el 40% de su productividad en tareas repetitivas: sincronización manual de datos, gestión de leads o reportes estáticos.</p>
                  <p className="text-white">En Utilix, tratamos tu negocio como un software. Si una tarea se repite dos veces, merece ser automatizada.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Integración_API', val: 'Full_Stack' },
                  { label: 'Latencia_Respuesta', val: '< 200ms' },
                  { label: 'Uptime_Sistema', val: '99.9%' },
                  { label: 'Lógica_Condicional', val: 'Nativa' }
                ].map((stat, i) => (
                  <div key={i} className="p-8 border border-white/5 bg-white/[0.01] rounded-[30px] flex flex-col justify-between aspect-square">
                    <span className="text-[10px] font-mono text-utilix-green uppercase tracking-widest">{stat.label}</span>
                    <span className="text-4xl font-black italic text-white/20">{stat.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 03: MÓDULOS DE IMPACTO */}
        <section className="py-40 bg-[#050505] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-20">
            <h3 className="text-2xl font-mono text-utilix-violet uppercase tracking-[0.5em] mb-20 text-center">Verticales_de_Automatización</h3>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Sincronización Total",
                  desc: "Conectamos tu CRM, inventario y ventas en un solo flujo de datos en tiempo real. Cero duplicados, cero errores.",
                  icon: <Share2 className="w-12 h-12" />
                },
                {
                  title: "IA Operativa",
                  desc: "Implementamos agentes inteligentes que procesan lenguaje natural para atención al cliente y clasificación de datos.",
                  icon: <Cpu className="w-12 h-12" />
                },
                {
                  title: "Funnels Autónomos",
                  desc: "Sistemas de captación que califican y nutren leads sin intervención humana hasta el cierre.",
                  icon: <Zap className="w-12 h-12" />
                }
              ].map((card, i) => (
                <div key={i} className="p-12 bg-[#080808] border border-white/5 rounded-[50px] group hover:border-utilix-green/30 transition-all duration-700">
                  <div className="mb-8 text-utilix-green group-hover:scale-110 transition-transform">{card.icon}</div>
                  <h4 className="text-3xl font-bold italic uppercase tracking-tighter mb-6">{card.title}</h4>
                  <p className="text-white/40 leading-relaxed font-light">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECCIÓN 04: EL RESULTADO FINAL */}
        <section className="py-60 px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-12 leading-none">
              MENOS GESTIÓN, <br /> <span className="text-utilix-green">MÁS VISIÓN.</span>
            </h2>
            <p className="text-2xl text-white/30 font-light mb-16">
              Cuando el sistema es autónomo, tú recuperas el recurso más valioso de tu marca: tu capacidad estratégica.
            </p>
            <button className="bg-white text-black px-12 py-6 rounded-full font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-utilix-green transition-colors">
              Iniciar_Auditoría_Técnica
            </button>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}