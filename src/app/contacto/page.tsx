'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Globe, Clock, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactoPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="bg-[#030303] min-h-screen" />;

  return (
    <div className="bg-[#030303] text-white selection:bg-utilix-green selection:text-black">
      <Navbar />
      <main className="pt-32 min-h-screen flex flex-col justify-center px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24">
          {/* INFO SIDE */}
          <div className="space-y-16">
            <div>
              <span className="text-utilix-green font-mono text-[10px] tracking-[1em] uppercase block mb-8">Connection_Portal</span>
              <h1 className="text-6xl md:text-9xl font-[1000] italic uppercase tracking-tighter leading-none mb-12">
                HABLEMOS <br /> <span className="text-white/10">LÓGICA.</span>
              </h1>
              <p className="text-2xl text-white/40 font-light italic max-w-md">
                Si buscas una página web más, no somos tu sitio. Si buscas una <span className="text-white">ventaja competitiva</span>, estás en casa.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Inquiries</p>
                  <p className="text-xl font-bold italic">info@utilix.es</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-utilix-green">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Response_Time</p>
                  <p className="text-xl font-bold italic">24h_Standard</p>
                </div>
              </div>
            </div>
          </div>

          {/* FORM SIDE */}
          <div className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-[50px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-utilix-violet/10 blur-[80px]" />
            <form className="space-y-8 relative z-10">
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em] ml-4">01_Nombre_Entidad</label>
                <input type="text" placeholder="Escribe aquí..." className="w-full bg-white/[0.03] border border-white/5 rounded-full px-8 py-5 focus:outline-none focus:border-utilix-green/50 transition-all text-sm italic" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em] ml-4">02_Email_Corporativo</label>
                <input type="email" placeholder="email@domain.com" className="w-full bg-white/[0.03] border border-white/5 rounded-full px-8 py-5 focus:outline-none focus:border-utilix-green/50 transition-all text-sm italic" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em] ml-4">03_Desafío_Técnico</label>
                <textarea rows={4} placeholder="¿Qué sistema necesitas construir?" className="w-full bg-white/[0.03] border border-white/5 rounded-[30px] px-8 py-5 focus:outline-none focus:border-utilix-green/50 transition-all text-sm italic resize-none" />
              </div>
              <button className="w-full bg-white text-black py-6 rounded-full font-black uppercase tracking-[0.4em] text-[11px] flex items-center justify-center gap-4 hover:bg-utilix-green transition-all group">
                Enviar_Solicitud <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </main>
      <div className="py-20"></div>
      <Footer />
    </div>
  );
}