'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, MessageCircle, TrendingUp, Smartphone, Zap } from 'lucide-react';

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
            MULTIPLICA <br />
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-white to-[#00ff9d] bg-[length:200%_200%] animate-[gradient_8s_ease_infinite]">TUS CONTACTOS</span>
          </h2>
          <p className="text-white/40 font-medium text-[10px] md:text-xs tracking-[0.3em] uppercase max-w-xl mx-auto leading-relaxed">
            Te enseñamos cómo convertir tu web en una máquina de captar clientes.
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

const stats = [
  { value: '78%', label: 'Prefiere contactar por WhatsApp que por email' },
  { value: '3x', label: 'Más conversiones con botón WhatsApp visible' },
  { value: '< 5seg', label: 'El tiempo que un visitante decide si contactarte' },
];

const pasos = [
  {
    num: '01',
    title: 'DÓNDE COLOCARLO',
    desc: 'Esquina inferior derecha. Fijo. Siempre visible. Que siga al usuario mientras hace scroll. No lo escondas en el footer.',
    icon: <Smartphone size={32} />,
  },
  {
    num: '02',
    title: 'QUÉ TEXTO USAR',
    desc: 'Nada de "Hola, ¿en qué puedo ayudarte?" Específico: "¿Necesitas presupuesto?" o "¿Consulta urgente?" Que sepa exactamente para qué sirve ese click.',
    icon: <MessageCircle size={32} />,
  },
  {
    num: '03',
    title: 'PRE-RELLENAR EL MENSAJE',
    desc: 'Cuando hagan click, que el mensaje ya esté escrito: "Hola, vengo de vuestra web y quiero información sobre [servicio]". Reduces fricción = más conversiones.',
    icon: <Zap size={32} />,
  },
];

export default function BotonWhatsAppBlogPost() {
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
                  Estrategia // Conversión
                </span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1, delay: 0.3, ease: expoEase as any }} 
                className="text-[clamp(2rem,7vw,6rem)] font-[1000] leading-[0.88] tracking-tighter uppercase text-white mb-8"
              >
                WHATSAPP: <br />
                <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-white to-[#00ff9d] bg-[length:200%_200%] animate-[gradient_8s_ease_infinite]">TU COMERCIAL 24/7</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: expoEase as any }}
                className="text-xl md:text-2xl font-light italic text-white/40 leading-tight max-w-3xl"
              >
                ¿Tu web es una tarjeta de visita muda o una <span className="text-white">máquina de captar clientes</span>? 
                Un pequeño cambio que multiplica tus contactos hoy.
              </motion.p>
            </div>
          </div>
        </ScrollSection>

        {/* EL PROBLEMA */}
        <section className="py-16 px-6 bg-[#050505]">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: expoEase as any }}
            >
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-8">
                EL PROBLEMA QUE <span className="text-[#00ff9d]">NADIE TE CUENTA</span>
              </h2>
              
              <p className="text-2xl md:text-3xl font-light italic leading-relaxed text-white/60 mb-8">
                Tienes una web preciosa. Fotos profesionales. Textos bien escritos. Pero <span className="text-white">no te contactan</span>.
              </p>
              
              <p className="text-lg font-light text-white/40 leading-relaxed mb-6">
                ¿Sabes por qué? Porque has puesto un formulario de contacto que da pereza rellenar. 
                O un email que nadie va a escribir. O peor: un teléfono que nadie va a llamar (estamos en 2024, a nadie le gusta llamar).
              </p>

              <div className="bg-red-500/10 border border-red-500/20 p-8 mt-8">
                <p className="text-xl font-black uppercase tracking-tight text-red-400 mb-4">
                  LA CRUDA REALIDAD:
                </p>
                <p className="text-white/80 leading-relaxed">
                  Si tu visitante tiene que <span className="text-white">pensar más de 5 segundos</span> en cómo contactarte, 
                  no lo hará. Se irá. Y probablemente contactará con tu competencia que sí tiene un botón de WhatsApp bien visible.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* STATS */}
        <section className="py-16 px-6 bg-[#030303]">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4">
                LOS NÚMEROS NO MIENTEN
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: expoEase as any }}
                  className="bg-white/[0.02] border border-white/5 p-8 text-center hover:border-[#00ff9d]/30 transition-all duration-500"
                >
                  <div className="text-5xl md:text-6xl font-black text-[#00ff9d] mb-4 tracking-tighter">
                    {stat.value}
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* POR QUÉ FUNCIONA */}
        <section className="py-16 px-6 bg-[#050505] border-t border-white/5">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-8">
                POR QUÉ UN BOTÓN DE WHATSAPP <span className="text-[#00ff9d]">MULTIPLICA TUS CONTACTOS</span>
              </h2>
              
              <div className="space-y-8">
                <div className="bg-white/[0.02] border-l-4 border-[#00ff9d] p-6">
                  <h3 className="text-xl font-black uppercase mb-3">1. ELIMINA LA FRICCIÓN</h3>
                  <p className="text-white/60 leading-relaxed">
                    Un click y ya estás hablando con la persona. Sin formularios, sin esperas, sin emails que tal vez lean mañana. 
                    <span className="text-white"> Inmediato.</span>
                  </p>
                </div>

                <div className="bg-white/[0.02] border-l-4 border-[#00ff9d] p-6">
                  <h3 className="text-xl font-black uppercase mb-3">2. ES DONDE YA ESTÁN</h3>
                  <p className="text-white/60 leading-relaxed">
                    Todo el mundo tiene WhatsApp abierto. Todo el rato. Es la app que más usan. 
                    ¿Por qué obligarles a ir a su email o descolgar el teléfono?
                  </p>
                </div>

                <div className="bg-white/[0.02] border-l-4 border-[#00ff9d] p-6">
                  <h3 className="text-xl font-black uppercase mb-3">3. CONVERSACIÓN NATURAL</h3>
                  <p className="text-white/60 leading-relaxed">
                    La gente se siente más cómoda mandando un mensaje que rellenando un formulario formal. 
                    Es más <span className="text-white">humano, más cercano, más real</span>.
                  </p>
                </div>

                <div className="bg-white/[0.02] border-l-4 border-[#00ff9d] p-6">
                  <h3 className="text-xl font-black uppercase mb-3">4. REDUCES EL ABANDONO</h3>
                  <p className="text-white/60 leading-relaxed">
                    ¿Sabes cuánta gente empieza a rellenar tu formulario de contacto y lo deja a medias? 
                    <span className="text-white"> Más del 60%</span>. Con WhatsApp, el abandono es casi cero.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CÓMO HACERLO BIEN - 3 PASOS */}
        <section className="py-24 px-6 bg-[#030303]">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">
                CÓMO HACERLO <span className="text-[#00ff9d]">BIEN</span>
              </h2>
              <p className="text-white/40 text-lg italic">
                No vale con poner el botón y ya. Hay una forma correcta de hacerlo.
              </p>
            </motion.div>

            <div className="space-y-8">
              {pasos.map((paso, i) => (
                <motion.div
                  key={paso.num}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: expoEase as any }}
                  className="relative bg-white/[0.02] border border-white/5 p-8 md:p-12 hover:border-[#00ff9d]/30 transition-all duration-700 group"
                >
                  <div className="absolute top-8 right-8 text-7xl md:text-9xl font-black text-white/[0.02] tracking-tighter group-hover:text-[#00ff9d]/5 transition-colors">
                    {paso.num}
                  </div>

                  <div className="relative z-10 flex items-start gap-6">
                    <div className="flex-shrink-0 p-4 bg-[#00ff9d]/10 text-[#00ff9d] group-hover:bg-[#00ff9d] group-hover:text-black transition-all duration-500">
                      {paso.icon}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4">
                        {paso.title}
                      </h3>
                      <p className="text-lg text-white/60 leading-relaxed">
                        {paso.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* EJEMPLO PRÁCTICO */}
        <section className="py-16 px-6 bg-[#050505] border-t border-white/5">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-8">
                EJEMPLO <span className="text-[#00ff9d]">PRÁCTICO</span>
              </h2>

              <div className="bg-white/[0.02] border border-white/5 p-8 md:p-12">
                <p className="text-sm uppercase tracking-[0.3em] text-[#00ff9d]/60 mb-6 font-bold">
                  CASO REAL // ANTES VS DESPUÉS
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-red-500/5 border border-red-500/20 p-6">
                    <div className="text-xs font-black uppercase tracking-wider text-red-500 mb-4">
                      ❌ ANTES
                    </div>
                    <p className="text-sm text-white/60 leading-relaxed mb-4">
                      Web de fontanería. Formulario de contacto con 8 campos. Email en el footer. Teléfono que no se podía clickar.
                    </p>
                    <div className="text-3xl font-black text-red-500">
                      2-3 contactos/semana
                    </div>
                  </div>

                  <div className="bg-[#00ff9d]/5 border border-[#00ff9d]/20 p-6">
                    <div className="text-xs font-black uppercase tracking-wider text-[#00ff9d] mb-4">
                      ✓ DESPUÉS
                    </div>
                    <p className="text-sm text-white/60 leading-relaxed mb-4">
                      Botón WhatsApp fijo. Mensaje pre-rellenado: "Hola, necesito presupuesto para...". 
                      Siempre visible.
                    </p>
                    <div className="text-3xl font-black text-[#00ff9d]">
                      15-20 contactos/semana
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5">
                  <p className="text-xl font-black uppercase tracking-tight text-center">
                    <span className="text-[#00ff9d]">+500% DE AUMENTO</span> EN CONTACTOS
                  </p>
                  <p className="text-center text-white/40 text-sm mt-2 italic">
                    Sin cambiar absolutamente nada más en la web.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ERRORES COMUNES */}
        <section className="py-16 px-6 bg-[#030303]">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-8">
                ERRORES QUE <span className="text-red-500">MATAN</span> LA CONVERSIÓN
              </h2>

              <div className="space-y-6">
                {[
                  { error: 'Botón solo en el footer', fix: 'Tiene que estar SIEMPRE visible. Fijo. Flotante.' },
                  { error: 'Sin mensaje pre-rellenado', fix: 'Facilítales el primer paso. Que solo tengan que darle a enviar.' },
                  { error: 'Icono pequeño que no se ve', fix: 'Grande. Verde. Inconfundible. Que destaque.' },
                  { error: 'Solo en versión escritorio', fix: 'El 70% de tu tráfico es móvil. Prioriza ahí.' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="bg-white/[0.02] border-l-4 border-red-500/30 p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-red-500 mt-1">✗</div>
                      <div className="flex-1">
                        <p className="text-white/80 font-bold mb-2">{item.error}</p>
                        <p className="text-white/40 text-sm italic">→ {item.fix}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CONCLUSIÓN AGRESIVA */}
        <section className="py-16 px-6 bg-[#050505] border-t border-white/5">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-purple-500/10 via-[#00ff9d]/10 to-white/5 border-l-4 border-[#00ff9d] p-8 md:p-12"
            >
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-6 leading-tight">
                LA PREGUNTA NO ES <br />
                "¿DEBERÍA PONERLO?"
              </h2>
              <p className="text-2xl font-light italic text-white/60">
                La pregunta es: <span className="text-white">"¿Cuántos clientes estoy perdiendo cada día que no lo tengo?"</span>
              </p>
            </motion.div>

            <div className="mt-12 space-y-6 text-lg text-white/60 leading-relaxed">
              <p>
                Un botón de WhatsApp bien implementado puede <span className="text-white">multiplicar por 3 tus contactos</span>. 
                Sin inversión en publicidad. Sin cambiar tu web. Solo reduciendo la fricción entre "me interesa" y "te escribo".
              </p>

              <p className="text-white/80 font-bold">
                Y eso, en un mercado donde cada cliente cuenta, es la diferencia entre crecer o quedarte donde estás.
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
