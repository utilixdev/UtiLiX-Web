'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

const expoEase = [0.19, 1, 0.22, 1];

const ScrollSection = ({ children, scrollYProgress, range }: { children: React.ReactNode, scrollYProgress: any, range: [number, number] }) => {
  const opacity = useTransform(scrollYProgress, range, [1, 0]);
  const y = useTransform(scrollYProgress, range, [0, -40]);
  const scale = useTransform(scrollYProgress, range, [1, 0.99]);
  
  return <motion.section style={{ opacity, scale, y }} className="relative w-full overflow-hidden">{children}</motion.section>;
};

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
    <section id="auditoria" className="relative py-24 px-6 bg-[#030303] overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-[clamp(1.8rem,5vw,4rem)] font-[950] leading-[0.9] tracking-tighter uppercase text-white/90 mb-4 italic">
            ¿LISTO PARA <br />
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-white to-[#00ff9d] bg-[length:200%_200%] animate-[gradient_8s_ease_infinite]">TRABAJAR BIEN?</span>
          </h2>
          <p className="text-white/40 font-medium text-[10px] md:text-xs tracking-[0.3em] uppercase max-w-xl mx-auto leading-relaxed">
            Analizamos tu caso. Te decimos qué está fallando. Sin vueltas. Gratis.
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

const questions = [
  {
    num: '01',
    question: '¿Cuál es vuestro proceso de trabajo?',
    why: 'Esto separa al profesional del que improvisa. Si no tienen un método claro con fases definidas, ya sabes: van a ir improvisando con tu dinero.',
    goodAnswer: '"Primero hacemos sesión de descubrimiento. Después wireframes. Luego diseño con 2 rondas de revisión. Finalmente desarrollo. Todo en 4-6 semanas."',
    badAnswer: '"Somos muy flexibles, trabajamos según tus necesidades." (Traducción: no tenemos ni idea de lo que hacemos)',
  },
  {
    num: '02',
    question: '¿Qué incluye EXACTAMENTE el presupuesto?',
    why: 'La letra pequeña mata. Necesitas saber: número de páginas, revisiones incluidas, quién hace los textos, quién pone las fotos, hosting incluido o no.',
    goodAnswer: '"5 páginas, 2 revisiones por fase, textos a tu cargo o +500€ si los hacemos nosotros, dominio y hosting primer año incluido."',
    badAnswer: '"Un presupuesto cerrado de 3.000€." (Prepárate para los extras que irán apareciendo)',
  },
  {
    num: '03',
    question: '¿La web será MÍA al 100%?',
    why: 'CRÍTICO. Algunas agencias usan plataformas propias. Si quieres cambiar de proveedor, pierdes todo. Pregunta directamente: "¿Puedo llevarme la web a otro hosting?"',
    goodAnswer: '"Sí, la web es tuya. WordPress autohospedado. Tienes acceso completo a código, base de datos y panel de administración."',
    badAnswer: '"Es mejor que la gestionemos nosotros." (Traducción: vas a ser nuestro rehén)',
  },
  {
    num: '04',
    question: '¿Cuánto tiempo tardará el proyecto?',
    why: 'Una web profesional: 3-8 semanas. Si te dicen "3 días", es plantilla genérica. Si te dicen "6 meses" para algo básico, huele mal.',
    goodAnswer: '"4-6 semanas para una web de 5 páginas personalizada. Puede variar si tardas en dar feedback."',
    badAnswer: '"Cuando esté lista." o "En unos días." (Ninguna de las dos respuestas es seria)',
  },
  {
    num: '05',
    question: '¿Cómo voy a actualizar la web YO MISMO?',
    why: 'Tu web debe ser tuya. Si te dicen "mejor no toques nada", te están atando de por vida a su mantenimiento.',
    goodAnswer: '"Usamos WordPress. Te damos 1 hora de formación en videollamada. Después puedes cambiar textos, fotos y añadir entradas tú solo."',
    badAnswer: '"No te preocupes, cada cambio lo hacemos nosotros." (= cada cambio te lo cobramos)',
  },
  {
    num: '06',
    question: '¿Qué pasa si algo falla DESPUÉS de la entrega?',
    why: 'Toda agencia seria da garantía de 30 días mínimo para bugs técnicos. NO para que cambies de opinión sobre el diseño.',
    goodAnswer: '"30 días de garantía para cualquier error técnico o funcional. Documentación completa incluida."',
    badAnswer: '"Una vez entregado, cualquier cambio es aparte." (Traducción: te dejamos tirado)',
  },
  {
    num: '07',
    question: '¿Podéis mostrarme webs PARECIDAS que hayáis hecho?',
    why: 'Que tengan portafolio bonito no significa nada. Pide ejemplos de TU sector, TU tamaño de proyecto. Y contacta a esos clientes.',
    goodAnswer: '"Aquí tienes 3 proyectos similares. Te paso el contacto del cliente X si quieres preguntarle directamente."',
    badAnswer: '"Mira nuestro Instagram." (No has preguntado por Instagram, has preguntado por trabajos similares)',
  },
  {
    num: '08',
    question: '¿El mantenimiento es OBLIGATORIO?',
    why: 'El mantenimiento es importante (actualizaciones, backups), pero NO debe ser obligatorio. Algunas agencias lo usan para retenerte.',
    goodAnswer: '"Ofrecemos mantenimiento opcional: 50€/mes. Incluye actualizaciones y backup semanal. Pero no es obligatorio."',
    badAnswer: '"El mantenimiento va incluido en el paquete anual." (= te están atando quieras o no)',
  },
];

export default function AgenciaDisenoBlogPost() {
  const [isHydrated, setIsHydrated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: isHydrated ? containerRef : undefined, offset: ["start start", "end end"] });

  useEffect(() => { setIsHydrated(true); }, []);

  if (!isHydrated) return <div className="bg-[#030303] min-h-screen" />;

  return (
    <div ref={containerRef} className="bg-[#030303] text-white selection:bg-[#00ff9d] selection:text-black min-h-screen">
      <main className="relative w-full">
        
        {/* HERO */}
        <ScrollSection scrollYProgress={scrollYProgress} range={[0, 0.15]}>
          <div className="relative min-h-[60svh] flex flex-col px-6 pt-24 md:pt-32 pb-16 border-b border-white/5">
            <div className="max-w-5xl mx-auto w-full relative z-10">
              <motion.div 
                initial={{ opacity: 0, x: -40 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 1, ease: expoEase as any }}
              >
                <Link href="/blog" className="inline-flex items-center gap-3 text-[#00ff9d] font-mono text-[10px] tracking-[0.6em] uppercase mb-8 hover:gap-4 transition-all duration-300 group">
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  VOLVER AL BLOG
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: expoEase as any }}
                className="mb-6"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#00ff9d]/60">
                  Protocolo // Supervivencia
                </span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1, delay: 0.3, ease: expoEase as any }} 
                className="text-[clamp(2rem,7vw,6rem)] font-[1000] leading-[0.88] tracking-tighter uppercase text-white mb-8"
              >
                ¿QUÉ PREGUNTAS HACER <br />
                <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-white to-[#00ff9d] bg-[length:200%_200%] animate-[gradient_8s_ease_infinite]">ANTES DE CONTRATAR?</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: expoEase as any }}
                className="text-xl md:text-2xl font-light italic text-white/40 leading-tight max-w-3xl"
              >
                No tires tu dinero. Si no te responden a esto con claridad, <span className="text-white">huye</span>. 
                Aprende a detectar el humo antes de pagar la primera factura.
              </motion.p>
            </div>
          </div>
        </ScrollSection>

        {/* INTRO */}
        <section className="py-16 px-6 bg-[#050505]">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: expoEase as any }}
            >
              <p className="text-2xl md:text-3xl font-light italic leading-relaxed text-white/60 mb-8">
                Contratar una agencia de diseño web <span className="text-white">no debería ser un salto de fe</span>. 
                Y sin embargo, muchos autónomos acaban con webs que no funcionan, proyectos sin terminar o facturas que explotan sin previo aviso.
              </p>
              
              <p className="text-lg font-light text-white/40 leading-relaxed">
                La buena noticia: <span className="text-[#00ff9d]">todo esto se puede evitar</span> haciendo las preguntas correctas desde el principio.
              </p>
            </motion.div>
          </div>
        </section>

        {/* POR QUÉ ESTAS PREGUNTAS */}
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: expoEase as any }}
              className="bg-white/[0.02] border border-white/5 p-8 md:p-12"
            >
              <div className="flex items-start gap-4 mb-6">
                <AlertTriangle className="text-[#00ff9d] mt-1 flex-shrink-0" size={28} />
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight mb-4">LA VERDAD QUE NADIE TE CUENTA</h2>
                  <p className="text-white/60 leading-relaxed">
                    Una agencia profesional <span className="text-white">no solo no tiene problemas</span> en responder estas preguntas, 
                    sino que <span className="text-[#00ff9d]">te las adelanta</span> antes de que tú preguntes.
                  </p>
                  <p className="text-white/60 leading-relaxed mt-4">
                    Las agencias que esquivan respuestas claras o te hacen sentir que "no entiendes" 
                    suelen ser las mismas que luego <span className="text-white">desaparecen cuando hay un problema</span>.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* LAS 8 PREGUNTAS */}
        <section className="py-24 px-6 bg-[#050505]">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-16 text-center"
            >
              LAS <span className="text-[#00ff9d]">8 PREGUNTAS</span> QUE TE PROTEGEN
            </motion.h2>

            <div className="space-y-12">
              {questions.map((q, i) => (
                <motion.div
                  key={q.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: expoEase as any }}
                  className="relative bg-white/[0.02] border border-white/5 p-8 md:p-12 hover:border-[#00ff9d]/20 transition-all duration-700"
                >
                  <div className="absolute top-8 right-8 text-6xl md:text-8xl font-black text-white/[0.03] tracking-tighter">
                    {q.num}
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-6 leading-tight">
                      {q.question}
                    </h3>

                    <div className="mb-8 pb-8 border-b border-white/5">
                      <p className="text-sm uppercase tracking-[0.3em] text-[#00ff9d]/60 mb-3 font-bold">
                        ¿POR QUÉ PREGUNTAR ESTO?
                      </p>
                      <p className="text-white/60 leading-relaxed italic">
                        {q.why}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-[#00ff9d]/5 border border-[#00ff9d]/20 p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle2 className="text-[#00ff9d]" size={20} />
                          <span className="text-xs font-black uppercase tracking-wider text-[#00ff9d]">
                            BUENA RESPUESTA
                          </span>
                        </div>
                        <p className="text-sm text-white/80 italic leading-relaxed">
                          {q.goodAnswer}
                        </p>
                      </div>

                      <div className="bg-red-500/5 border border-red-500/20 p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <XCircle className="text-red-500" size={20} />
                          <span className="text-xs font-black uppercase tracking-wider text-red-500">
                            MALA RESPUESTA
                          </span>
                        </div>
                        <p className="text-sm text-white/80 italic leading-relaxed">
                          {q.badAnswer}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SEPARADOR AGRESIVO */}
        <section className="py-16 px-6 bg-[#030303]">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-purple-500/10 via-white/5 to-[#00ff9d]/10 border-l-4 border-[#00ff9d] p-8 md:p-12"
            >
              <p className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight">
                EL MAYOR ERROR NO ES CONTRATAR <br className="hidden md:block" />
                A UNA MALA AGENCIA.
              </p>
              <p className="text-2xl md:text-3xl font-light italic mt-4 text-white/60">
                Es <span className="text-white">no hacer preguntas</span> por miedo a "parecer que no sabes".
              </p>
            </motion.div>
          </div>
        </section>

        {/* CONCLUSIÓN */}
        <section className="py-16 px-6 bg-[#050505]">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-8">
                LO QUE SEPARA A LOS PROS DEL HUMO
              </h2>
              
              <div className="space-y-6 text-lg text-white/60 leading-relaxed">
                <p>
                  Las agencias profesionales <span className="text-white">hablan claro</span>, te educan en vez de confundirte con tecnicismos, 
                  y te dan opciones en lugar de paquetes cerrados.
                </p>
                
                <p>
                  Si alguien te presiona para que firmes rápido, o te hace sentir que "no entiendes nada de esto", 
                  probablemente <span className="text-white">no es la persona adecuada</span> para tu proyecto.
                </p>

                <div className="bg-white/[0.02] border border-white/5 p-8 mt-8">
                  <p className="text-sm uppercase tracking-[0.3em] text-[#00ff9d] mb-4 font-bold">
                    RESUMEN // UNA AGENCIA SERIA TE OFRECE
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Transparencia total: presupuestos desglosados y sin letra pequeña',
                      'Propiedad completa: la web es tuya, no estás alquilando',
                      'Autonomía: puedes gestionarla tú o contratar a quien quieras',
                      'Garantías claras: saben lo que prometen y lo cumplen',
                      'Comunicación honesta: te explican las cosas de forma que las entiendas'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="text-[#00ff9d] mt-1 flex-shrink-0" size={20} />
                        <span className="text-white/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-xl font-light italic text-white/80 pt-8">
                  Recuerda: estás <span className="text-white">invirtiendo en tu negocio</span>. No en un capricho. 
                  Tienes todo el derecho a entender exactamente qué estás comprando.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA FORM */}
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
