'use client';

import { useMotionValue, useSpring, useTransform, useInView, motion, useScroll } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const METODOS = [
  {
    id: "01",
    titulo: "Radiografía de tu sector",
    descripcion: "Antes de diseñar nada, analizamos cómo se presenta tu competencia en el sector y dónde están dejando huecos. No suposiciones — datos reales de lo que funciona en tu mercado concreto."
  },
  {
    id: "02",
    titulo: "Diseño que posiciona",
    descripcion: "Construimos una página web que comunica exactamente lo que tu cliente ideal necesita ver para elegirte. No tendencias genéricas — una identidad construida sobre lo que te hace diferente."
  },
  {
    id: "03",
    titulo: "Entrega y activación",
    descripcion: "Tu web nueva no es el final. Te entregamos con todo listo para funcionar: velocidad, SEO local, analítica y los primeros 30 días de soporte incluidos."
  }
];

function MetodoCard({ metodo, index }: { metodo: any; index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { margin: "-10% 0px", once: true });

  return (
    <div
      ref={cardRef}
      style={{ 
        transform: 'translateZ(0)',
        backgroundColor: '#030303', 
      }}
      className="relative py-20 md:py-32 px-6 bg-[#030303] border-t border-white/5 overflow-hidden scroll-mt-24 group"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,#1a1033_0%,#030303_100%)]" />

      <div className="relative z-10">
        <span className="block text-utilix-green font-mono text-[10px] mb-6 opacity-40 group-hover:opacity-100 transition-all duration-300">
          [{metodo.id}]
        </span>
        <h3 className="text-xl md:text-2xl font-[950] text-white uppercase tracking-tighter mb-4 group-hover:text-utilix-violet transition-colors duration-300">
          {metodo.titulo}
        </h3>
        <p className="text-white/40 text-sm leading-relaxed font-light tracking-wide group-hover:text-white/80 transition-colors duration-300">
          {metodo.descripcion}
        </p>
      </div>

      <div 
        className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-utilix-violet via-white to-utilix-green transition-all duration-500 ease-out
          ${isInView ? 'w-full' : 'w-0'} 
          md:w-0 md:group-hover:w-full`} 
      />
    </div>
  );
}

export default function Metodologia() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  const layer1X = useTransform(springX, v => v * 0.8);
  const layer1Y = useTransform(springY, v => v * 0.8);

  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ["start start", "end start"], 
  });

  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 120, 
    damping: 40,
  });

  const opacityStack = useTransform(smoothProgress, [0, 0.7, 0.9], [1, 1, 0]);
  const scaleStack = useTransform(smoothProgress, [0, 0.8], [1, 0.88]);
  const yStack = useTransform(smoothProgress, [0, 1], [0, -250]);
  const rotateXStack = useTransform(smoothProgress, [0, 1], [0, -15]);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth > 1024) {
        mouseX.set((e.clientX / window.innerWidth - 0.5) * 30);
        mouseY.set((e.clientY / window.innerHeight - 0.5) * 30);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return <section className="min-h-screen bg-[#030303]" />;

  return (
    <section  
      ref={containerRef}
      id="method"  
      className="relative flex flex-col items-center px-6 pt-12 md:pt-16 pb-24 md:pb-40"
      style={{ perspective: "1200px", minHeight: 'fit-content' }}
    >
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden hidden md:block">
        <motion.div
          style={{ x: layer1X, y: layer1Y }}
          className="absolute top-[-5%] right-[-5%] w-[50vw] h-[50vw] bg-utilix-violet/[0.02] rounded-full blur-[100px]"
        />
      </div>

      <motion.div 
        style={{ 
          opacity: opacityStack, 
          scale: scaleStack,
          y: yStack,
          rotateX: rotateXStack,
          willChange: 'transform, opacity' 
        }}
        className="relative z-10 max-w-7xl mx-auto w-full pt-0 mt-0 mb-0"
      >
        <div className="flex flex-col items-center text-center pt-0 mt-0 mb-12">
          <span className="text-utilix-green/60 font-mono text-[10px] tracking-[0.8em] uppercase border-x border-white/10 px-6 py-1 mb-6 mt-0">
            Cómo trabajamos
          </span>
          <h2 className="text-[clamp(1.8rem,5vw,4rem)] font-[950] leading-[0.9] tracking-tighter uppercase text-white/90 mb-4 italic">
           Así trabajamos para  <br />
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-utilix-violet via-white to-utilix-green bg-[length:200%_200%] animate-gradient-slow">
              que tu negocio crezca.
            </span>
          </h2>
          <p className="max-w-1xl text-white/40 text-lg md:text-xl font-light leading-relaxed">
            Sin reuniones infinitas. Sin sorpresas. Un proceso claro desde el primer día.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12">
          {METODOS.map((metodo, index) => (
            <MetodoCard key={metodo.id} metodo={metodo} index={index} />
          ))}
        </div>

        <div className="mt-12 mb-0 flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-[1px] bg-gradient-to-r from-utilix-violet via-white to-utilix-green opacity-30 group-hover:opacity-100 blur-[2px] transition duration-500 animate-gradient-slow bg-[length:200%_200%]" />
            <a
              href="#services"
              className="relative flex items-center justify-center bg-black text-white px-12 py-6 font-bold uppercase tracking-[0.4em] text-[10px] overflow-hidden"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-500">
                Explorar Soluciones 
              </span>
            </a>
          </div>
        </div>
      </motion.div>

      <style jsx global>{`
        @keyframes gradient-slow {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
        .animate-gradient-slow {
          animation: gradient-slow 8s ease infinite;
        }
      `}</style>
    </section>
  );
}