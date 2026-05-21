'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuditoriaForm from '@/components/AuditoriaForm';

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const expo = [0.19, 1, 0.22, 1] as const;
const noiseUrl = `data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E`;

// Unsplash: foto editorial de ciudad / trabajo / ordenador — libre de uso
const PARALLAX_IMG = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80';

// ─── DATA ─────────────────────────────────────────────────────────────────────
const needs = [
  {
    id: '01',
    emoji: '👤',
    problem: 'La gente me busca y no me encuentra',
    solution: 'Apareces justo cuando te necesitan',
    desc: 'Cada día alguien busca exactamente lo que tú ofreces. Si no apareces tú, aparece otro. Te construimos algo que trabaja por ti mientras tú haces lo tuyo.',
    accent: '#00ff9d',
    from: 'left' as const,
  },
  {
    id: '02',
    emoji: '📱',
    problem: 'Mi web da una imagen que no me representa',
    solution: 'Una primera impresión que cierra ventas',
    desc: 'Tienes tres segundos. Si lo que ven no les convence, se van. Y se van para siempre. Hacemos que lo primero que vean sea tan bueno que quieran saber más.',
    accent: '#a78bfa',
    from: 'bottom' as const,
  },
  {
    id: '03',
    emoji: '🛒',
    problem: 'Quiero vender sin depender del horario',
    solution: 'Tu negocio abierto las 24 horas',
    desc: 'Da igual si vendes productos, servicios o experiencias. Montamos una tienda que vende mientras duermes, mientras comes y mientras estás de vacaciones.',
    accent: '#fbbf24',
    from: 'right' as const,
  },
  {
    id: '04',
    emoji: '📣',
    problem: 'Publico en redes y no consigo nada',
    solution: 'Contenido que convierte seguidores en clientes',
    desc: 'Publicar por publicar es ruido. Lo que necesitas es una estrategia que conecte, que hable el idioma de tu cliente y que les dé una razón para llamarte.',
    accent: '#fb7185',
    from: 'left' as const,
  },
  {
    id: '05',
    emoji: '⚡',
    problem: 'Mi web existe pero no hace nada por mí',
    solution: 'La convertimos en tu mejor comercial',
    desc: 'Una web que no convierte es dinero tirado. La analizamos, la destripamos y la transformamos en algo que capta, convence y hace que el teléfono suene.',
    accent: '#22d3ee',
    from: 'bottom' as const,
  },
  {
    id: '06',
    emoji: '🔒',
    problem: 'Cada vez que algo falla, me quedo solo',
    solution: 'Alguien real que coge el teléfono',
    desc: 'Nada de tickets, nada de esperas, nada de chatbots. Cuando algo va mal, hablas con una persona real que conoce tu negocio y que lo resuelve.',
    accent: '#4ade80',
    from: 'right' as const,
  },
];

const steps = [
  {
    n: '01',
    title: 'Nos cuentas qué tienes y qué quieres',
    desc: 'Sin formularios eternos. Una conversación real de 20 minutos en la que te escuchamos de verdad para entender dónde estás y adónde quieres llegar.',
    tag: 'Diagnóstico honesto',
    color: 'rgba(0,255,157,0.3)',
  },
  {
    n: '02',
    title: 'Te decimos exactamente qué haremos',
    desc: 'Un plan claro. Lo que haremos, cuánto tardará y cuánto costará. Todo por escrito, sin sorpresas al final. Si no te convence, no hay ningún problema.',
    tag: 'Propuesta sin letra pequeña',
    color: 'rgba(167,139,250,0.25)',
  },
  {
    n: '03',
    title: 'Lo hacemos y tú ves la diferencia',
    desc: 'Trabajamos, te mantenemos informado y al final tienes algo que funciona. No una entrega y adiós. Una relación que crece con tu negocio.',
    tag: 'Resultados reales',
    color: 'rgba(251,191,36,0.2)',
  },
];

const pillars = [
  {
    icon: '📍',
    title: 'Trato directo, siempre',
    desc: 'Hablas con quien hace el trabajo. Sin intermediarios, sin call centers, sin esperas. Cuando necesitas algo, estamos.',
  },
  {
    icon: '🗣️',
    title: 'Hablamos claro',
    desc: 'Cero siglas, cero tecnicismos. Te contamos todo en tu idioma para que tú decidas con información real, no con promesas vacías.',
  },
  {
    icon: '🎯',
    title: 'Enfocados en tu negocio',
    desc: 'No hacemos cosas bonitas que no sirven para nada. Cada decisión que tomamos tiene un porqué y un resultado que puedes ver.',
  },
  {
    icon: '🤝',
    title: 'Sin letra pequeña',
    desc: 'Lo que te decimos es lo que hacemos. Sin sorpresas en el presupuesto, sin cambios de última hora, sin excusas.',
  },
];

// ─── SEO — España + Osona ─────────────────────────────────────────────────────
function SEOHead() {
  return (
    <Head>
      <title>Páginas web para negocios | Utilix – Diseño web en Vic, Osona y toda España</title>
      <meta
        name="description"
        content="Creamos webs que atraen clientes y generan negocio. Especialistas en diseño web para pymes y autónomos a nivel nacional. Sin tecnicismos, con resultados reales."
      />
      <meta
        name="keywords"
        content="diseño web Osona, página web Vic, diseño web España, web para negocios, crear web Manlleu, web Torelló, diseño web pymes, web para autónomos España, Utilix web"
      />
      <meta property="og:title" content="Webs que funcionan de verdad | Utilix – Vic, Osona y España" />
      <meta
        property="og:description"
        content="Hacemos webs que traen clientes reales. Para negocios de Vic, Osona y toda España. Sin tecnicismos, sin excusas."
      />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://utilix.es/og-image.jpg" />
      <meta name="robots" content="index, follow" />
      <meta name="geo.region" content="ES-CT" />
      <meta name="geo.placename" content="Vic, Osona, Catalunya" />
      <link rel="canonical" href="https://utilix.es/servicios" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'Utilix',
            description: 'Diseño y desarrollo web para negocios en Vic, Osona y toda España',
            url: 'https://utilix.es',
            areaServed: [
              { '@type': 'City', name: 'Vic' },
              { '@type': 'AdministrativeArea', name: 'Osona' },
              { '@type': 'Country', name: 'España' },
            ],
            serviceType: [
              'Diseño web',
              'Desarrollo web',
              'SEO local',
              'Tiendas online',
              'Mantenimiento web',
              'Redes sociales',
            ],
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Servicios digitales para negocios',
              itemListElement: needs.map((n) => ({
                '@type': 'Offer',
                name: n.solution,
                description: n.desc,
              })),
            },
          }),
        }}
      />
    </Head>
  );
}

// ─── CURSOR GLOW ─────────────────────────────────────────────────────────────
function CursorGlow() {
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);
  const springX = useSpring(mouseX, { stiffness: 55, damping: 16 });
  const springY = useSpring(mouseY, { stiffness: 55, damping: 16 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - 200);
      mouseY.set(e.clientY - 200);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed z-[1] w-[400px] h-[400px] rounded-full hidden lg:block"
      style={{
        x: springX,
        y: springY,
        background: 'radial-gradient(circle, rgba(0,255,157,0.04) 0%, transparent 70%)',
      }}
    />
  );
}

// ─── MARQUEE ─────────────────────────────────────────────────────────────────
function Marquee() {
  const items = [
    'Webs que venden',
    'Vic · Osona · España',
    'Tiendas online',
    'Sin tecnicismos',
    'SEO local y nacional',
    'Mantenimiento',
    'Resultados reales',
    'Trato directo',
  ];
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-5 border-y border-white/[0.05]">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-[10px] font-black uppercase tracking-[0.45em] text-white/12 shrink-0 flex items-center gap-10"
          >
            {item}
            <span style={{ color: 'rgba(0,255,157,0.2)' }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── NEED CARD — con dirección de entrada diferente por card ──────────────────
function NeedCard({
  need,
  index,
  onCta,
}: {
  need: typeof needs[0];
  index: number;
  onCta: () => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [hovered, setHovered] = useState(false);

  // Dirección de entrada: left → x:-60, right → x:60, bottom → y:60
  const initialX = need.from === 'left' ? -60 : need.from === 'right' ? 60 : 0;
  const initialY = need.from === 'bottom' ? 60 : 0;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, x: initialX, y: initialY }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: 0.95,
        delay: (index % 3) * 0.12,
        ease: expo as any,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col bg-[#0c0c0c] border border-white/[0.07] rounded-2xl overflow-hidden"
      style={{
        boxShadow: hovered ? `0 0 55px -12px ${need.accent}40` : '0 0 0 transparent',
        transition: 'box-shadow 0.5s ease',
      }}
    >
      {/* Hover radial glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(ellipse at 15% 15%, ${need.accent}0e, transparent 60%)`,
        }}
      />
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-8 bottom-8 w-[2px] rounded-full transition-all duration-500"
        style={{ background: hovered ? need.accent : `${need.accent}1a` }}
      />

      <div className="relative z-10 p-6 md:p-8 lg:p-9 flex flex-col gap-4 h-full">
        {/* Top */}
        <div className="flex items-start justify-between">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 transition-transform duration-500"
            style={{
              background: `${need.accent}0f`,
              border: `1px solid ${need.accent}1f`,
              transform: hovered ? 'scale(1.08)' : 'scale(1)',
            }}
          >
            {need.emoji}
          </div>
          <span className="font-mono text-[8px] text-white/10 tracking-[0.4em] uppercase mt-1">
            {need.id}
          </span>
        </div>

        {/* Problem */}
        <h3 className="text-xl md:text-2xl font-black tracking-tight leading-[1.15] text-white">
          {need.problem}
        </h3>

        {/* Solution badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest w-fit"
          style={{
            background: `${need.accent}0f`,
            color: need.accent,
            border: `1px solid ${need.accent}18`,
          }}
        >
          ✓ {need.solution}
        </div>

        <p className="text-white/38 text-sm leading-relaxed flex-1">{need.desc}</p>

        <button
          onClick={onCta}
          className="mt-auto text-[10px] font-black uppercase tracking-widest px-4 py-3 rounded-xl w-full transition-all duration-300"
          style={{
            background: hovered ? need.accent : 'transparent',
            color: hovered ? '#000' : `${need.accent}60`,
            border: `1px solid ${need.accent}22`,
          }}
        >
          Esto me pasa a mí →
        </button>
      </div>
    </motion.article>
  );
}

// ─── NEEDS GRID SECTION ───────────────────────────────────────────────────────
function NeedsSection({ onCta }: { onCta: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="px-4 md:px-10 lg:px-20 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: expo as any }}
          className="mb-12 md:mb-16"
        >
          <p className="text-[9px] uppercase tracking-[0.55em] text-[#00ff9d]/50 font-black mb-4">
            Encuentra tu caso
          </p>
          <h2
            className="font-black tracking-tighter leading-[0.88] text-white uppercase"
            style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}
          >
            ¿Cuál de estos
            <br />
            <span className="italic font-extralight text-white/28">eres tú?</span>
          </h2>
        </motion.div>

        {/* Grid 3×2 con entradas diferidas por dirección */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {needs.map((need, i) => (
            <NeedCard key={need.id} need={need} index={i} onCta={onCta} />
          ))}
        </div>

        {/* Bottom CTA link */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.55, ease: expo as any }}
          className="mt-10 flex items-center gap-4"
        >
          <button
            onClick={onCta}
            className="relative group flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-[#00ff9d] transition-colors duration-300"
          >
            <span>No sé exactamente qué necesito, pero quiero hablarlo</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// ─── PARALLAX IMAGE + TEXT ────────────────────────────────────────────────────
function ParallaxSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const txtX1 = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const txtX2 = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const overlayO = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.65, 0.5]);

  return (
    <div ref={ref} className="relative overflow-hidden" style={{ height: 'clamp(340px, 55vw, 680px)' }}>
      {/* Imagen de fondo con parallax */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 scale-[1.15]">
        <img
          src={PARALLAX_IMG}
          alt="Espacio de trabajo moderno — diseño web para negocios"
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </motion.div>

      {/* Overlay oscuro dinámico */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: overlayO, background: '#030303' }}
      />

      {/* Gradient lateral para fundir con el fondo de la página */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-transparent to-[#030303]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/60 via-transparent to-[#030303]/60" />

      {/* Texto parallax — dos líneas en direcciones opuestas */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 md:gap-4 pointer-events-none select-none overflow-hidden">
        <motion.p
          className="font-black uppercase text-white/[0.07] whitespace-nowrap leading-none"
          style={{ 
            fontSize: 'clamp(3.5rem, 10vw, 9.5rem)', x: txtX1 
          }}
        >
          Osona · Vic · Manlleu · Torelló · Granollers · Barcelona · Cataluña · España ·
        </motion.p>
        <motion.p
          className="font-black uppercase text-white/[0.12] whitespace-nowrap leading-none"
          style={{ 
            fontSize: 'clamp(3.5rem, 10vw, 9.5rem)', 
            x: txtX2 
          }}
        >
          Web · Negocio · Clientes · Resultados ·
        </motion.p>
      </div>

      {/* Chip central */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: expo as any }}
          className="px-6 py-3 rounded-full border border-white/10 backdrop-blur-sm bg-white/[0.04] text-[10px] font-black uppercase tracking-[0.5em] text-white/50"
        >
          Diseño web · Osona y España
        </motion.div>
      </div>
    </div>
  );
}

// ─── STICKY STEPS ─────────────────────────────────────────────────────────────
function StickySteps({ onCta }: { onCta: () => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section ref={sectionRef} className="px-4 md:px-10 lg:px-20 py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: expo as any }}
          className="mb-14 md:mb-16"
        >
          <p className="text-[9px] uppercase tracking-[0.55em] text-[#00ff9d]/50 font-black mb-5">
            Así funciona
          </p>
          <h2
            className="font-black tracking-tighter leading-[0.88] text-white uppercase"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 5.5rem)' }}
          >
            Sin rodeos,
            <br />
            <span className="italic font-extralight text-white/28">sin letra pequeña.</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-4 md:gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1 + i * 0.2, ease: expo as any }}
              className="md:sticky md:top-24"
              style={{ zIndex: 10 + i }}
            >
              <div
                className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/[0.07]"
                style={{
                  background: `linear-gradient(135deg, #${{ 0: '111', 1: '0f0f0f', 2: '0d0d0d' }[i]} 0%, #080808 100%)`,
                  boxShadow: `0 ${12 + i * 16}px ${50 + i * 25}px rgba(0,0,0,${0.45 + i * 0.18})`,
                  marginTop: i === 0 ? 0 : '-1rem',
                }}
              >
                {/* Accent line top */}
                <div
                  className="absolute top-0 left-0 right-0 h-[1px]"
                  style={{ background: `linear-gradient(90deg, ${step.color}, transparent)` }}
                />
                {/* Watermark number */}
                <span
                  className="absolute right-5 md:right-10 top-2 font-black leading-none select-none pointer-events-none"
                  style={{
                    fontSize: 'clamp(5rem, 14vw, 10rem)',
                    color: 'rgba(255,255,255,0.02)',
                  }}
                >
                  {step.n}
                </span>

                <div className="relative z-10 p-7 md:p-10 lg:p-12">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
                    <div
                      className="w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl shrink-0 flex items-center justify-center font-black font-mono text-sm"
                      style={{
                        background: 'rgba(0,255,157,0.08)',
                        color: '#00ff9d',
                        border: '1px solid rgba(0,255,157,0.18)',
                      }}
                    >
                      {step.n}
                    </div>
                    <div className="flex-1">
                      <span
                        className="inline-block text-[9px] font-black uppercase tracking-[0.4em] mb-3"
                        style={{ color: 'rgba(0,255,157,0.45)' }}
                      >
                        {step.tag}
                      </span>
                      <h3
                        className="font-black tracking-tight text-white mb-3 leading-[1.1]"
                        style={{ fontSize: 'clamp(1.2rem, 3vw, 1.9rem)' }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-white/38 text-sm md:text-base leading-relaxed max-w-2xl">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.75, ease: expo as any }}
          className="mt-12 md:mt-16 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
        >
          <button
            onClick={onCta}
            className="relative group flex items-center gap-3 px-7 py-4 bg-[#00ff9d] text-black font-black uppercase tracking-[0.2em] text-[10px] rounded-xl overflow-hidden"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              Empezamos cuando quieras
            </span>
            <span className="relative z-10 group-hover:translate-x-1 group-hover:text-white transition-all duration-300">
              →
            </span>
            <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.19,1,0.22,1]" />
          </button>
          <span className="text-[9px] text-white/18 uppercase tracking-widest font-mono">
            Sin compromiso · Respuesta en 24h
          </span>
        </motion.div>
      </div>
    </section>
  );
}

// ─── WHY SECTION ─────────────────────────────────────────────────────────────
function WhySection({ onCta }: { onCta: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="px-4 md:px-10 lg:px-20 py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: expo as any }}
          className="mb-12 md:mb-14"
        >
          <p className="text-[9px] uppercase tracking-[0.55em] text-[#00ff9d]/50 font-black mb-5">
            La diferencia
          </p>
          <h2
            className="font-black tracking-tighter leading-[0.88] text-white uppercase"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 5.5rem)' }}
          >
            No somos lo que
            <br />
            <span className="italic font-extralight text-white/28">
              te has encontrado antes.
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: i * 0.1, ease: expo as any }}
              className="group p-7 md:p-9 rounded-2xl border border-white/[0.06] bg-white/[0.02] flex flex-col gap-3 hover:border-white/[0.12] hover:bg-white/[0.03] transition-all duration-500"
            >
              <span className="text-2xl">{p.icon}</span>
              <h3 className="text-lg md:text-xl font-black tracking-tight text-white group-hover:text-[#00ff9d] transition-colors duration-400">
                {p.title}
              </h3>
              <p className="text-white/38 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.45, ease: expo as any }}
          className="mt-6 p-8 md:p-12 rounded-2xl border border-[#00ff9d]/10 bg-[#00ff9d]/[0.025] relative overflow-hidden"
        >
          <div className="absolute -right-6 -top-6 w-40 h-40 bg-[#00ff9d]/5 rounded-full blur-[50px] pointer-events-none" />
          <p
            className="text-white/55 leading-relaxed italic max-w-2xl relative z-10"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' }}
          >
            Hay cientos de opciones online.{' '}
            <span className="text-white not-italic font-bold">
              Nosotros somos los que cogemos el teléfono,
            </span>{' '}
            los que explican las cosas sin rodeos y los que no desaparecen cuando más los necesitas.
          </p>
          <button
            onClick={onCta}
            className="relative z-10 mt-8 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em] text-[#00ff9d] hover:gap-4 transition-all duration-300"
          >
            Quiero esa conversación <span>→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FINAL CTA ────────────────────────────────────────────────────────────────
function FinalCta({ onCta }: { onCta: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="px-4 md:px-10 lg:px-20 py-10 md:py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.1, ease: expo as any }}
        className="max-w-4xl mx-auto relative rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-white/[0.07] p-10 md:p-16 lg:p-20 text-center"
        style={{
          background:
            'linear-gradient(135deg, rgba(167,139,250,0.07) 0%, #030303 45%, rgba(0,255,157,0.07) 100%)',
        }}
      >
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-[#a78bfa]/8 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-[#00ff9d]/6 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10">
          <p className="text-[9px] uppercase tracking-[0.6em] text-[#00ff9d]/45 font-black mb-5">
            El primer paso es gratis
          </p>
          <h2
            className="font-black tracking-tighter leading-[0.88] text-white uppercase mb-5"
            style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}
          >
            ¿Hablamos de
            <br />
            <span
              className="italic font-extralight text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] via-white to-[#00ff9d] bg-[length:200%_200%]"
              style={{ animation: 'gradient 8s ease infinite' }}
            >
              tu negocio?
            </span>
          </h2>
          <p className="text-white/30 text-sm md:text-base leading-relaxed max-w-sm mx-auto mb-10">
            Sin compromisos. Sin presupuestos por sorpresa. Solo una conversación honesta.
          </p>
          <button
            onClick={onCta}
            className="relative group inline-flex items-center gap-3 px-10 py-5 bg-[#00ff9d] text-black font-black uppercase tracking-[0.25em] text-[11px] rounded-xl overflow-hidden"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              Cuéntanos tu caso
            </span>
            <span className="relative z-10 group-hover:translate-x-1 group-hover:text-white transition-all duration-300">
              →
            </span>
            <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.19,1,0.22,1]" />
          </button>
          <p className="mt-4 text-[9px] text-white/15 uppercase tracking-widest">
            Respuesta en menos de 24 horas · Sin spam
          </p>
        </div>
      </motion.div>
    </section>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
// Reemplaza desde tu "export default function ServiciosPage() {" hasta el "<Navbar />" por esto:

const needs = [
  {
    id: '01',
    solution: 'Aparecer cuando te necesitan',
    desc: 'Optimización SEO para que tu negocio aparezca en Google cuando buscan tus servicios.',
  },
  {
    id: '02',
    solution: 'Primera impresión que cierra ventas',
    desc: 'Diseño web profesional que convierte visitantes en clientes desde el primer segundo.',
  },
  {
    id: '03',
    solution: 'Tu negocio abierto 24/7',
    desc: 'Tiendas online que venden mientras duermes. E-commerce profesional para tu negocio.',
  },
  {
    id: '04',
    solution: 'Contenido que convierte',
    desc: 'Estrategia de redes sociales que transforma seguidores en clientes reales.',
  },
  {
    id: '05',
    solution: 'Web que trabaja para ti',
    desc: 'Rediseño y optimización web para convertir tu página en tu mejor comercial.',
  },
  {
    id: '06',
    solution: 'Soporte técnico real',
    desc: 'Mantenimiento web profesional con persona real que conoce tu negocio.',
  },
];

export default function ServiciosPage() {
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  // Parallax del hero (solo sobre el scroll global, no afecta al resto)
  const { scrollYProgress } = useScroll({
    target: mounted ? pageRef : undefined,
    offset: ['start start', 'end end'],
  });

  const heroVidY = useTransform(scrollYProgress, [0, 0.1], ['0%', '15%']);
  const heroVidScale = useTransform(scrollYProgress, [0, 0.1], [1, 1.06]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  useEffect(() => {
    setMounted(true);
    videoRef.current?.play().catch(() => {});
  }, []);

  const scrollToForm = useCallback(() => {
    document.getElementById('auditoria')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  if (!mounted) return <div className="bg-[#030303] min-h-screen" />;

  return (
    <>
      {/* ═══ JSON-LD ESTRUCTURADO - HÍBRIDO NACIONAL + LOCAL ═══ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'Utilix',
            alternateName: ['Utilix Diseño Web', 'Utilix Agencia Web', 'Utilix España'],
            description: 'Agencia de diseño web profesional. Creamos páginas web que traen clientes reales para pymes y autónomos en toda España.',
            url: 'https://utilix.es',
            logo: 'https://utilix.es/imagenes/logo.png',
            image: 'https://utilix.es/og-servicios.jpg',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Vic',
              addressRegion: 'Barcelona',
              postalCode: '08500',
              addressCountry: 'ES'
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 41.9301,
              longitude: 2.2549
            },
            areaServed: [
              { '@type': 'Country', name: 'España', description: 'Servicios de diseño web profesional en toda España' },
              { '@type': 'AdministrativeArea', name: 'Comunidad de Madrid', description: 'Diseño web profesional Madrid' },
              { '@type': 'AdministrativeArea', name: 'Comunidad Valenciana', description: 'Diseño web profesional Valencia' },
              { '@type': 'AdministrativeArea', name: 'Andalucía', description: 'Diseño web profesional Andalucía' },
              { '@type': 'AdministrativeArea', name: 'Catalunya', description: 'Diseño web profesional Catalunya' },
              { '@type': 'AdministrativeArea', name: 'Barcelona', description: 'Diseño web Barcelona' },
              { '@type': 'City', name: 'Vic', description: 'Sede central Utilix' }
            ],
            telephone: '+34711556444',
            email: 'info@utilix.es',
            priceRange: '$$',
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '08:00',
              closes: '18:00'
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Servicios de diseño web profesional',
              itemListElement: needs.map((n, i) => ({
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: n.solution,
                  description: n.desc,
                  provider: { '@type': 'ProfessionalService', name: 'Utilix' },
                  areaServed: 'España'
                },
                position: i + 1
              }))
            },
            serviceType: [
              'Diseño web profesional',
              'Desarrollo web para empresas',
              'Tiendas online y e-commerce',
              'Posicionamiento SEO',
              'Mantenimiento web',
              'Rediseño web profesional'
            ],
            sameAs: ['https://www.instagram.com/utilixstudio/', 'https://wa.me/34711556444'],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5.0',
              reviewCount: '27',
              bestRating: '5',
              worstRating: '1'
            },
            foundingDate: '2020',
            slogan: 'Páginas web que traen clientes reales'
          })
        }}
      />

      {/* ═══ BREADCRUMB SCHEMA ═══ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://utilix.es' },
              { '@type': 'ListItem', position: 2, name: 'Servicios', item: 'https://utilix.es/servicios' }
            ]
          })
        }}
      />

      {/* ═══ FAQ SCHEMA ═══ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: '¿Cuánto cuesta diseñar una página web profesional?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'El precio de una web profesional depende de tus necesidades. Una web corporativa básica desde 1.200€, tienda online desde 2.500€, y rediseños desde 900€. Te damos un presupuesto exacto después de conocer tu proyecto.'
                }
              },
              {
                '@type': 'Question',
                name: '¿Trabajáis en toda España?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sí, trabajamos con clientes en toda España. Nuestra sede está en Vic, Barcelona, pero ofrecemos servicios de diseño web profesional a nivel nacional con la misma calidad y trato directo.'
                }
              },
              {
                '@type': 'Question',
                name: '¿Cuánto tarda el desarrollo de una web?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Una web profesional se desarrolla en 3-6 semanas dependiendo de la complejidad. Te damos un cronograma exacto desde el inicio del proyecto.'
                }
              }
            ]
          })
        }}
      />

      <div
        ref={pageRef}
        className="bg-[#030303] text-white min-h-screen overflow-x-hidden selection:bg-[#00ff9d] selection:text-black"
      >
        <CursorGlow />
        <Navbar />

        <main>
          {/* ─────────────────────────────────────────────────────────────────
              1. HERO
              ─ Vídeo: pon tu archivo en /public/hero-video.mp4
              ─ Poster (fallback/carga): /public/hero-poster.jpg
              ─ Si no tienes vídeo todavía, el poster actúa de imagen estática
              ─────────────────────────────────────────────────────────────── */}
          <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
            <motion.div
              style={{ y: heroVidY, scale: heroVidScale }}
              className="absolute inset-0 z-0"
            >
              {/*
               * VÍDEO HERO
               * Coloca /public/hero-video.mp4 en tu proyecto.
               * Recomendación: timelapse del Mercat del Ram, la Plana de Vic,
               * o cualquier plano urbano de la comarca (duración 10-20s, loop).
               * Si no tienes vídeo, elimina el tag <video> entero y usa solo
               * el <div> de abajo con background-image al poster.
               */}
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/hero-poster.jpg"
                className="w-full h-full object-cover"
                aria-hidden
              >
                <source src="/videos/video1.mp4" type="video/mp4" />
              </video>

              {/* Overlays multicapa */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/55 to-[#030303]/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/80 via-transparent to-transparent" />
            </motion.div>

            {/* Grain */}
            <div
              className="absolute inset-0 z-[1] opacity-[0.02] pointer-events-none"
              style={{ backgroundImage: `url("${noiseUrl}")`, backgroundSize: '128px' }}
            />

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 1.2 }}
              className="absolute right-5 md:right-8 bottom-8 z-20 flex flex-col items-center gap-2"
            >
              <div className="w-px h-14 bg-white/10 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-[#00ff9d]"
                  animate={{ y: ['-100%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                />
              </div>
              <span
                className="text-[7px] uppercase tracking-[0.6em] text-white/12 font-mono"
                style={{ writingMode: 'vertical-rl' }}
              >
                scroll
              </span>
            </motion.div>

            {/* Hero content */}
            <motion.div
              style={{ opacity: heroContentOpacity }}
              className="relative z-10 px-5 md:px-12 lg:px-20 pb-14 md:pb-20 pt-28"
            >
              <div className="max-w-6xl mx-auto">
                {/* Eyebrow */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.3, ease: expo as any }}
                  className="flex items-center gap-3 mb-5"
                >
                  <div className="w-4 h-px bg-[#00ff9d]/50" />
                  <span className="text-[#00ff9d]/60 font-mono text-[9px] tracking-[0.7em] uppercase">
                    Utilix · Vic, Osona y España
                  </span>
                </motion.div>

                {/* H1 */}
                <motion.h1
                  initial={{ opacity: 0, y: 36 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.45, ease: expo as any }}
                  className="font-[1000] leading-[0.82] tracking-[-0.04em] uppercase text-white mb-8 md:mb-10"
                  style={{ fontSize: 'clamp(2.8rem, 9vw, 8.5rem)' }}
                >
                  Tu negocio,
                  <br />
                  <span
                    className="italic font-extralight text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] via-white to-[#00ff9d] bg-[length:200%_200%]"
                    style={{ animation: 'gradient 8s ease infinite' }}
                  >
                    más clientes.
                  </span>
                  <br />
                  <span className="text-white/50 text-[0.55em] font-extralight not-italic tracking-[-0.02em]">
                    Desarrollo y diseño web profesional
                  </span>
                </motion.h1>

                {/* Subtext + CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.75, ease: expo as any }}
                  className="flex flex-col md:flex-row md:items-end gap-7 md:gap-14"
                >
                  <p className="text-base md:text-lg lg:text-xl font-light text-white/42 leading-relaxed max-w-md">
                    Hacemos webs que traen clientes reales. Sin tecnicismos,{' '}
                    <span className="text-white/80">sin excusas,</span> sin desaparecer cuando más
                    nos necesitas.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                    <button
                      onClick={scrollToForm}
                      className="relative group px-7 py-4 bg-[#00ff9d] text-black font-black uppercase tracking-[0.2em] text-[10px] rounded-xl overflow-hidden"
                    >
                      <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                        Habla con nosotros
                      </span>
                      <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.19,1,0.22,1]" />
                    </button>
                    <a
                      href="tel:+34711556444"
                      className="px-7 py-4 border border-white/10 text-white/45 font-bold uppercase tracking-[0.16em] text-[10px] rounded-xl hover:border-white/30 hover:text-white transition-all duration-300 text-center"
                    >
                      Llámanos directo
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* ── 2. MARQUEE ───────────────────────────────────────────────────── */}
          <Marquee />

          {/* ── 3. INTRO TEXT ─────────────────────────────────────────────────── */}
          <section className="px-5 md:px-12 lg:px-20 py-16 md:py-24">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1, ease: expo as any }}
              >
                <p className="text-[9px] uppercase tracking-[0.55em] text-[#00ff9d]/35 font-black mb-7">
                  La verdad
                </p>
                <p
                  className="font-light text-white/50 leading-[1.38]"
                  style={{ fontSize: 'clamp(1.25rem, 3.5vw, 2.25rem)' }}
                >
                  La mayoría de negocios pierden clientes cada día{' '}
                  <span className="text-white font-semibold">
                    porque online parecen más pequeños de lo que son.
                  </span>{' '}
                  Eso tiene solución. Y es más sencilla de lo que crees.
                </p>
              </motion.div>
            </div>
          </section>

          {/* ── 4. NEEDS GRID 3×2 ─────────────────────────────────────────────── */}
          <NeedsSection onCta={scrollToForm} />

          {/* ── 5. PARALLAX IMAGE ─────────────────────────────────────────────── */}
          <ParallaxSection />

          {/* ── 6. STICKY STEPS ──────────────────────────────────────────────── */}
          <StickySteps onCta={scrollToForm} />

          {/* ── 7. WHY ───────────────────────────────────────────────────────── */}
          <WhySection onCta={scrollToForm} />

          {/* ── 8. FINAL CTA ─────────────────────────────────────────────────── */}
          <FinalCta onCta={scrollToForm} />

          {/* ── 9. FORMULARIO ────────────────────────────────────────────────── */}
          {/*
           * AuditoriaForm del componente original:
           * ✓ Ya tiene id="auditoria" para el scroll
           * ✓ Conectado a /api/send (Resend)
           * ✓ Estados loading / success / error
           * ✓ Estilos propios del componente respetados
           */}
          <div className="pb-16 md:pb-28">
            <AuditoriaForm />
          </div>
        </main>

        <style jsx global>{`
          @keyframes gradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          body {
            overflow-x: hidden;
            background: #030303;
            margin: 0;
            padding: 0;
          }

          html {
            scroll-behavior: smooth;
          }

          /* Scrollbar */
          ::-webkit-scrollbar {
            width: 3px;
          }
          ::-webkit-scrollbar-track {
            background: #030303;
          }
          ::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.07);
            border-radius: 2px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 255, 157, 0.28);
          }
        `}</style>
      </div>
    </>
  );
}
