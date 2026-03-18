'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PrivacidadPage() {
  useEffect(() => {
    document.body.style.cursor = 'auto';
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.19, 1, 0.22, 1] as any,
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <main className="bg-[#030303] min-h-screen pt-40 pb-20 px-6 overflow-hidden relative">
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03] z-0">
        <span className="text-[60vw] font-[1000] text-white">U</span>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto relative z-10"
      >
        <div className="mb-16">
          <motion.p variants={itemVariants} className="text-[#00ff9d] text-[10px] uppercase tracking-[0.5em] font-bold mb-4 font-mono">
            SEGURIDAD_DATOS // ENCRIPTACIÓN_ACTIVA_TLS_1.3
          </motion.p>
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-[1000] text-white uppercase tracking-tighter italic leading-none">
            {"Privacidad"}<span className="text-[#00ff9d]">.</span>
          </motion.h1>
        </div>

        <div className="border-l border-white/10 pl-8 md:pl-12 space-y-12">
          <motion.section variants={itemVariants}>
            <h2 className="text-[#00ff9d] font-mono text-xs uppercase tracking-[0.3em] mb-4 font-bold italic">1. RECOGIDA DE DATOS (INPUT_STREAM)</h2>
            <p className="text-white/40 leading-[1.8] font-light text-sm md:text-base uppercase tracking-wider font-mono">
              Utilix Studio aplica el principio de minimización de datos. Solo procesamos los metadatos estrictamente necesarios para la arquitectura de tu proyecto: Identidad corporativa, vectores de contacto y activos de red. Toda transferencia se realiza bajo protocolos de encriptación end-to-end.
            </p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-[#00ff9d] font-mono text-xs uppercase tracking-[0.3em] mb-4 font-bold italic">2. FINALIDAD DEL TRATAMIENTO (LOGIC_CORE)</h2>
            <p className="text-white/40 leading-[1.8] font-light text-sm md:text-base uppercase tracking-wider font-mono">
              Tu información es el combustible de nuestra ingeniería. La finalidad exclusiva es el despliegue de estrategias de autoridad digital y la optimización de interfaces. No operamos con brokers de datos; tu visión de negocio permanece en un entorno privado.
            </p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-[#00ff9d] font-mono text-xs uppercase tracking-[0.3em] mb-4 font-bold italic">3. DERECHOS ARCO (SISTEMA_CRUD)</h2>
            <p className="text-white/40 leading-[1.8] font-light text-sm md:text-base uppercase tracking-wider font-mono">
              Como administrador de tu información, mantienes acceso total a las funciones de consulta y purga de registros. Para ejecutar una instrucción de borrado definitivo, envía el comando "PURGE_REQUEST" a info@utilix.es.
            </p>
          </motion.section>
        </div>

        <motion.div variants={itemVariants} className="mt-24 pt-12 border-t border-white/5">
          <Link href="/" className="inline-flex items-center gap-4 text-[#00ff9d] text-[10px] font-black uppercase tracking-[0.6em] group transition-all">
            <span className="group-hover:-translate-x-2 transition-transform duration-500">{"←"}</span> 
            Volver al núcleo
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}