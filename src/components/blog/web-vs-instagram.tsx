'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Instagram, Globe, AlertTriangle, Shield, Crown } from 'lucide-react';

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
            CONSTRUYE <br />
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-white to-[#00ff9d] bg-[length:200%_200%] animate-[gradient_8s_ease_infinite]">TU IMPERIO</span>
          </h2>
          <p className="text-white/40 font-medium text-[10px] md:text-xs tracking-[0.3em] uppercase max-w-xl mx-auto leading-relaxed">
            Te ayudamos a crear tu base digital. Sin ataduras. Sin dependencias.
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

const riesgos = [
  {
    title: 'CAMBIOS DE ALGORITMO',
    desc: 'Instagram cambia las reglas cuando quiere. Lo que funcionaba ayer, mañana no. Tu alcance puede caer un 70% de la noche a la mañana. Y tú no puedes hacer nada.',
    icon: <AlertTriangle size={32} />,
  },
  {
    title: 'CIERRE DE CUENTA',
    desc: 'Una denuncia falsa. Un error del sistema. Un malentendido con las normas. Y de repente pierdes 10.000 seguidores. ¿Tienes forma de contactarlos fuera de Instagram? Si no, acabas de perder tu negocio.',
    icon: <AlertTriangle size={32} />,
  },
  {
    title: 'DEPENDENCIA DEL FLUJO',
    desc: 'En Instagram, si no publicas constantemente, desapareces. Es una rueda de hámster. En tu web, el contenido sigue ahí, trabajando para ti aunque no publiques nada nuevo durante un mes.',
    icon: <AlertTriangle size={32} />,
  },
];

const webVsInstagram = [
  {
    categoria: 'CONTROL',
    instagram: 'Las reglas las pone Instagram',
    web: 'Tú decides todo',
  },
  {
    categoria: 'VISIBILIDAD',
    instagram: 'El algoritmo decide quién te ve',
    web: 'Apareces en Google cuando te buscan',
  },
  {
    categoria: 'PROPIEDAD',
    instagram: 'Pueden cerrarte la cuenta sin previo aviso',
    web: 'Nadie puede quitarte tu sitio',
  },
  {
    categoria: 'AUDIENCIA',
    instagram: 'No tienes los emails de tus seguidores',
    web: 'Construyes tu propia base de datos',
  },
  {
    categoria: 'CONTENIDO',
    instagram: 'Desaparece en el feed en horas',
    web: 'Permanece accesible años',
  },
  {
    categoria: 'MONETIZACIÓN',
    instagram: 'Compites por atención con millones',
    web: 'Es tu espacio, sin distracciones',
  },
];

export default function WebVsInstagramBlogPost() {
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
                  Autoridad // Negocio
                </span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1, delay: 0.3, ease: expoEase as any }} 
                className="text-[clamp(2rem,7vw,6rem)] font-[1000] leading-[0.88] tracking-tighter uppercase text-white mb-8"
              >
                TU WEB NO ES UN MUEBLE. <br />
                <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-white to-[#00ff9d] bg-[length:200%_200%] animate-[gradient_8s_ease_infinite]">ES UN MOTOR.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: expoEase as any }}
                className="text-xl md:text-2xl font-light italic text-white/40 leading-tight max-w-3xl"
              >
                Por qué Instagram no es suficiente. <span className="text-white">El riesgo de construir tu casa en terreno alquilado</span> y cómo tomar el control de tu negocio.
              </motion.p>
            </div>
          </div>
        </ScrollSection>

        {/* LA ILUSIÓN */}
        <section className="py-16 px-6 bg-[#050505]">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: expoEase as any }}
            >
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-8">
                LA PREGUNTA QUE TODO EL MUNDO HACE
              </h2>
              
              <div className="bg-white/[0.02] border border-white/5 p-8 md:p-12">
                <p className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-6 text-[#00ff9d]">
                  "¿Para qué quiero una web si ya tengo Instagram?"
                </p>
                <p className="text-xl font-light italic text-white/60 leading-relaxed">
                  Tiene sentido. Instagram es gratis, rápido, y todo el mundo está ahí. 
                  Pero hay un problema: <span className="text-white">Instagram es una casa de alquiler</span>. 
                  Y el casero puede cambiar las reglas cuando quiera.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* HISTORIA REAL */}
        <section className="py-16 px-6 bg-[#030303] border-t border-white/5">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 p-8 md:p-12">
                <div className="flex items-start gap-4 mb-6">
                  <Instagram className="text-red-400 mt-1 flex-shrink-0" size={32} />
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-red-400 mb-3 font-bold">
                      HISTORIA REAL // 2023
                    </p>
                    <h3 className="text-2xl font-black uppercase mb-4">EL DÍA QUE SARA PERDIÓ TODO</h3>
                  </div>
                </div>
                
                <p className="text-lg text-white/80 leading-relaxed mb-4">
                  Sara tenía una tienda de repostería con <span className="text-white font-bold">15.000 seguidores</span> en Instagram. 
                  Vendía bien. Todo iba perfecto.
                </p>
                
                <p className="text-lg text-white/80 leading-relaxed mb-4">
                  Un día, Instagram cambió el algoritmo. De la noche a la mañana, sus posts pasaron de 
                  <span className="text-white font-bold"> 2.000 visualizaciones a 200</span>.
                </p>
                
                <p className="text-lg text-white/80 leading-relaxed mb-4">
                  Sus ventas cayeron un <span className="text-red-400 font-bold">70%</span>.
                </p>
                
                <p className="text-lg text-white/80 leading-relaxed">
                  No había hecho nada mal. Simplemente, <span className="text-white">las reglas cambiaron</span>.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* COMPARATIVA */}
        <section className="py-24 px-6 bg-[#050505]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">
                ALQUILER <span className="text-red-500">VS</span> PROPIEDAD
              </h2>
              <p className="text-white/40 text-lg italic max-w-2xl mx-auto">
                La diferencia entre construir en terreno ajeno o en el tuyo propio
              </p>
            </motion.div>

            <div className="space-y-4">
              {webVsInstagram.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: expoEase as any }}
                  className="grid md:grid-cols-[200px_1fr_1fr] gap-4 bg-white/[0.02] border border-white/5 p-6 hover:border-white/10 transition-all duration-500"
                >
                  <div className="flex items-center">
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-[#00ff9d]">
                      {item.categoria}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Instagram className="text-red-400 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-red-400/60 mb-1 font-bold">Instagram</p>
                      <p className="text-white/60 leading-relaxed">{item.instagram}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe className="text-[#00ff9d] mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#00ff9d]/60 mb-1 font-bold">Tu Web</p>
                      <p className="text-white/80 leading-relaxed font-medium">{item.web}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* LOS 3 RIESGOS */}
        <section className="py-24 px-6 bg-[#030303] border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">
                LOS 3 <span className="text-red-500">RIESGOS REALES</span>
              </h2>
              <p className="text-white/40 text-lg italic">
                De depender solo de las redes sociales
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {riesgos.map((riesgo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: expoEase as any }}
                  className="bg-white/[0.02] border border-red-500/20 p-8 hover:border-red-500/40 transition-all duration-500"
                >
                  <div className="text-red-500 mb-6">
                    {riesgo.icon}
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight mb-4 text-red-400">
                    {riesgo.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed text-sm">
                    {riesgo.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* POR QUÉ TU WEB ES TU CASA */}
        <section className="py-16 px-6 bg-[#050505]">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-8">
                POR QUÉ TU WEB ES <span className="text-[#00ff9d]">TU CASA PROPIA</span>
              </h2>

              <div className="space-y-8">
                <div className="bg-white/[0.02] border-l-4 border-[#00ff9d] p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <Crown className="text-[#00ff9d] flex-shrink-0" size={28} />
                    <h3 className="text-2xl font-black uppercase">CONTROL TOTAL</h3>
                  </div>
                  <p className="text-white/60 leading-relaxed">
                    Tu web es tuya. Decides qué mostrar, cómo mostrarlo, y a quién. 
                    <span className="text-white"> No hay algoritmos que oculten tu contenido</span>. 
                    No hay límites en los caracteres o restricciones de formato. Es tu espacio.
                  </p>
                </div>

                <div className="bg-white/[0.02] border-l-4 border-[#00ff9d] p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <Shield className="text-[#00ff9d] flex-shrink-0" size={28} />
                    <h3 className="text-2xl font-black uppercase">BASE DE DATOS PROPIA</h3>
                  </div>
                  <p className="text-white/60 leading-relaxed">
                    Con una web, puedes capturar emails. Y <span className="text-white">un email es infinitamente más valioso</span> que un seguidor de Instagram, 
                    porque puedes contactar directamente con esa persona sin depender de que una red social le muestre tu mensaje.
                  </p>
                </div>

                <div className="bg-white/[0.02] border-l-4 border-[#00ff9d] p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <Globe className="text-[#00ff9d] flex-shrink-0" size={28} />
                    <h3 className="text-2xl font-black uppercase">CREDIBILIDAD</h3>
                  </div>
                  <p className="text-white/60 leading-relaxed">
                    Cuando alguien quiere contratarte para algo serio, lo primero que hace es buscarte en Google. 
                    Si no tienes web, <span className="text-white">pierdes puntos de credibilidad</span>. 
                    Una web bien hecha dice: "Esto es un negocio serio, no un hobby".
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* LA ESTRATEGIA CORRECTA */}
        <section className="py-24 px-6 bg-[#030303] border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12 text-center">
                LA ESTRATEGIA <span className="text-[#00ff9d]">INTELIGENTE</span>
              </h2>

              <div className="bg-gradient-to-br from-[#00ff9d]/10 to-purple-500/10 border border-[#00ff9d]/20 p-8 md:p-12 mb-12">
                <p className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-6 leading-tight">
                  NO SE TRATA DE ELEGIR <br className="hidden md:block" />
                  ENTRE WEB O INSTAGRAM.
                </p>
                <p className="text-xl font-light italic text-white/60">
                  Se trata de entender <span className="text-white">qué papel juega cada uno</span>.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white/[0.02] border border-white/5 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Instagram className="text-purple-400" size={32} />
                    <h3 className="text-xl font-black uppercase">INSTAGRAM</h3>
                  </div>
                  <p className="text-sm uppercase tracking-[0.3em] text-purple-400/60 mb-3 font-bold">
                    COMO ESCAPARATE
                  </p>
                  <p className="text-white/60 leading-relaxed">
                    Úsalo para generar visibilidad, mostrar tu trabajo, conectar con la gente de forma rápida y visual.
                  </p>
                </div>

                <div className="bg-white/[0.02] border border-white/5 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Globe className="text-[#00ff9d]" size={32} />
                    <h3 className="text-xl font-black uppercase">TU WEB</h3>
                  </div>
                  <p className="text-sm uppercase tracking-[0.3em] text-[#00ff9d]/60 mb-3 font-bold">
                    COMO BASE
                  </p>
                  <p className="text-white/80 leading-relaxed font-medium">
                    Es donde ocurre la venta, donde capturas leads, donde tienes el control total.
                  </p>
                </div>
              </div>

              <div className="bg-white/[0.02] border-l-4 border-[#00ff9d] p-8">
                <p className="text-sm uppercase tracking-[0.3em] text-[#00ff9d] mb-4 font-bold">
                  EN LA PRÁCTICA
                </p>
                <div className="space-y-4 text-white/60">
                  <p>→ <span className="text-white">Instagram:</span> Publicas fotos de tus trabajos, Stories del día a día, contenido que genere engagement</p>
                  <p>→ <span className="text-white">Bio de Instagram:</span> Pones el enlace a tu web</p>
                  <p>→ <span className="text-white">Tu web:</span> Información completa, testimonios, portafolio, forma clara de contactar</p>
                  <p>→ <span className="text-white">Capturas el email:</span> Ofreces algo de valor a cambio del email</p>
                  <p>→ <span className="text-white">Email marketing:</span> Mantienes el contacto sin depender de Instagram</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CONCLUSIÓN DEMOLEDORA */}
        <section className="py-16 px-6 bg-[#050505] border-t border-white/5">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-red-500/10 via-white/5 to-[#00ff9d]/10 border-l-4 border-[#00ff9d] p-8 md:p-12 mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-6 leading-tight">
                NO TE JUEGUES EL NEGOCIO <br />
                A UN SOLO NÚMERO
              </h2>
              <p className="text-xl font-light italic text-white/60">
                Instagram es una herramienta poderosa. Pero eso es exactamente lo que es: 
                <span className="text-white"> una herramienta</span>. No tu base de operaciones.
              </p>
            </motion.div>

            <div className="space-y-6 text-lg text-white/60 leading-relaxed">
              <p>
                Tu web es <span className="text-white">tu casa</span>. Tu territorio. 
                El único lugar en internet donde tú mandas, donde nadie puede cambiarte las reglas, 
                y donde construyes un activo que crece contigo.
              </p>

              <p className="text-2xl font-black uppercase tracking-tight text-white/90 pt-6">
                USA INSTAGRAM PARA ATRAER. <br />
                USA TU WEB PARA <span className="text-[#00ff9d]">CONVERTIR</span>.
              </p>

              <p className="text-white/80 italic pt-4">
                Y siempre, SIEMPRE, ten una forma de contactar con tu audiencia que no dependa de que Mark Zuckerberg se levante de buen humor.
              </p>
            </div>
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
