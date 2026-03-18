'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function StudioPage() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ["start start", "end end"]
  });

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="bg-[#030303] min-h-screen" />;

  return (
    <div ref={containerRef} className="bg-[#030303] text-white">
      <Navbar />
      <main className="pt-32">
        {/* SECCIÓN 01: IDENTIDAD */}
        <section className="min-h-screen flex flex-col justify-center px-6 md:px-20">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-utilix-green font-mono text-[10px] tracking-[1em] uppercase block mb-12">Studio_Core_Identity</span>
              <h1 className="text-[clamp(3.5rem,10vw,9rem)] font-[1000] italic leading-[0.8] tracking-tighter uppercase mb-16">
                CRITERIO <br /> <span className="text-white/10">SOBRE VOLUMEN.</span>
              </h1>
              <div className="space-y-8 text-2xl text-white/40 font-light italic leading-relaxed">
                <p>Utilix nace de una frustración compartida: la mediocridad digital. En un mundo saturado de plantillas y soluciones genéricas, nosotros elegimos la <span className="text-white">hiper-personalización técnica</span>.</p>
                <p>No somos una agencia. Somos un partner de infraestructura. Solo aceptamos 12 proyectos al año para garantizar que cada línea de código sea un activo estratégico, no solo un gasto.</p>
              </div>
            </div>
            <div className="aspect-[4/5] bg-white/[0.02] border border-white/5 rounded-[60px] relative overflow-hidden group">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070')] bg-cover bg-center grayscale opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#030303] to-transparent" />
               <div className="absolute bottom-12 left-12 space-y-2">
                 <p className="font-mono text-[10px] text-utilix-green tracking-widest uppercase">Location: 40.4168° N, 3.7038° W</p>
                 <p className="text-xl font-black italic uppercase">HQ_Spain_Mainland</p>
               </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 02: VALORES TÉCNICOS */}
        <section className="py-40 bg-white/[0.01] border-y border-white/5 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16">
            {[
              { title: "Obsesión por el Rendimiento", desc: "Si no carga en menos de 500ms, no está terminado. La velocidad es la primera capa de la experiencia de lujo." },
              { title: "Arquitectura Invisible", desc: "El buen diseño se ve, pero la buena ingeniería se siente. Construimos sistemas que funcionan sin que el usuario note la complejidad interna." },
              { title: "Escalabilidad Nativa", desc: "No parcheamos. Creamos cimientos que permiten a tu marca crecer de 100 a 1M de usuarios sin cambiar una sola línea de código." }
            ].map((v, i) => (
              <div key={i} className="space-y-6">
                <div className="w-12 h-[1px] bg-utilix-violet" />
                <h3 className="text-2xl font-black italic uppercase tracking-tighter">{v.title}</h3>
                <p className="text-white/40 font-light leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}