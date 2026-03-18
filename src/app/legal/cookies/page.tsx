'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

export default function CookiesPage() {
  useEffect(() => {
    document.body.style.cursor = 'auto';
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <main className="bg-[#030303] min-h-screen pt-40 pb-20 px-6 overflow-hidden font-mono relative">
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03] z-0">
        <div className="text-[60vw] font-[1000] text-white">U</div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto relative z-10"
      >
        <div className="mb-16">
          <p className="text-[#00ff9d] text-[10px] uppercase tracking-[0.5em] font-bold mb-4 font-mono">
            OPTIMIZACIÓN_SESIÓN // SESSION_HANDSHAKE
          </p>
          <h1 className="text-5xl md:text-7xl font-[1000] text-white uppercase tracking-tighter italic leading-none">
            Cookies<span className="text-[#00ff9d]">.</span>
          </h1>
        </div>

        <div className="border-l border-white/10 pl-8 md:pl-12 space-y-12">
          <motion.section variants={itemVariants}>
            <h2 className="text-[#00ff9d] text-xs uppercase tracking-[0.3em] mb-4 font-bold italic">1. Cookies Estructurales (Hard-Wired)</h2>
            <p className="text-white/40 leading-[1.8] font-light text-sm md:text-base uppercase tracking-wider">
              Utilizamos cookies de capa técnica esenciales para la persistencia de la sesión y la renderización de micro-interacciones. Sin estos fragmentos de datos, la latencia de la interfaz y la integridad visual de la plataforma podrían verse comprometidas.
            </p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-[#00ff9d] text-xs uppercase tracking-[0.3em] mb-4 font-bold italic">2. Análisis de Rendimiento (Telemetry)</h2>
            <p className="text-white/40 leading-[1.8] font-light text-sm md:text-base uppercase tracking-wider">
              Implementamos identificadores anónimos para monitorizar el flujo de navegación y detectar cuellos de botella en la experiencia de usuario. Estos datos nos permiten iterar nuestra ingeniería para ofrecer un rendimiento de grado industrial.
            </p>
          </motion.section>
        </div>

        <div className="mt-24 pt-12 border-t border-white/5">
          <Link 
            href="/" 
            className="inline-flex items-center gap-4 text-[#00ff9d] text-[10px] font-black uppercase tracking-[0.6em] group"
          >
            <motion.span 
              animate={{ x: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              ←
            </motion.span> 
            Volver al núcleo
          </Link>
        </div>
      </motion.div>
    </main>
  );
}