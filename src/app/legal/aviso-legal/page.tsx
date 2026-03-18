'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

export default function AvisoLegalPage() {
  useEffect(() => {
    document.body.style.cursor = 'auto';
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 1, ease: [0.19, 1, 0.22, 1] }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <main className="bg-[#030303] min-h-screen pt-40 pb-20 px-6 relative">
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] z-0">
        <div className="text-[60vw] font-black text-white select-none">U</div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto relative z-10"
      >
        <div className="mb-16">
          <p className="text-[#00ff9d] text-[10px] uppercase tracking-[0.5em] font-bold mb-4 font-mono">
            PROTOCOLO_IDENTIFICACIÓN // HOST_VERIFICATION
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter italic leading-none">
            Aviso Legal <strong className="text-[#00ff9d] font-black">.</strong>
          </h1>
        </div>

        <div className="border-l border-white/10 pl-8 md:pl-12 space-y-12">
          <motion.div variants={itemVariants} className="block">
            <h2 className="text-[#00ff9d] text-xs uppercase tracking-[0.3em] mb-4 font-bold italic">1. Propiedad del Nodo</h2>
            <p className="text-white/40 leading-[1.8] font-medium text-sm md:text-base uppercase tracking-wider font-mono">
              En virtud de la Ley 34/2002 (LSSI-CE), se establece que el dominio utilix.es y toda su infraestructura digital son gestionados por Baruc Nsue. Para cualquier auditoría de cumplimiento o comunicación oficial, el canal habilitado es info@utilix.es.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="block">
            <h2 className="text-[#00ff9d] text-xs uppercase tracking-[0.3em] mb-4 font-bold italic">2. Protección de Activos</h2>
            <p className="text-white/40 leading-[1.8] font-medium text-sm md:text-base uppercase tracking-wider font-mono">
              La arquitectura visual, el framework de diseño y el código fuente propietario están protegidos por leyes internacionales de propiedad intelectual. Cualquier replicación o ingeniería inversa de los activos de Utilix Studio sin autorización expresa constituye una violación de protocolo legal.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="block">
            <h2 className="text-[#00ff9d] text-xs uppercase tracking-[0.3em] mb-4 font-bold italic">3. Limitación de Responsabilidad</h2>
            <p className="text-white/40 leading-[1.8] font-medium text-sm md:text-base uppercase tracking-wider font-mono">
              Utilix Studio no se hace responsable de las brechas de seguridad derivadas de un mal uso del hardware del usuario o de interferencias en nodos de red externos. El acceso a esta plataforma implica la aceptación de nuestros estándares de seguridad.
            </p>
          </motion.div>
        </div>
        
        <div className="mt-24 pt-12 border-t border-white/5">
          <Link href="/" className="inline-flex items-center text-[#00ff9d] text-[10px] font-black uppercase tracking-[0.6em] hover:text-white transition-colors group">
            <motion.span whileHover={{ x: -5 }} className="mr-2">←</motion.span>
            Volver al núcleo
          </Link>
        </div>
      </motion.div>
    </main>
  );
}