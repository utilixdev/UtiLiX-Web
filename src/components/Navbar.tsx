'use client'

import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { X, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ContactModal from '@/components/ContactModal'

// --- CORRECCIÓN: Definimos la interfaz para las props ---
interface NavbarProps {
  onOpenContact?: () => void;
}

// --- CORRECCIÓN: Recibimos onOpenContact como prop ---
export default function Navbar({ onOpenContact }: NavbarProps) {
  const { scrollY } = useScroll()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)

  const lastScroll = useRef(0)
  const direction = useRef("up")

  const navY = useSpring(0, { stiffness: 400, damping: 40 })
  const navOpacity = useSpring(1, { stiffness: 400, damping: 40 })

  // Navegación solicitada
  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Filosofía', href: '/filosofia' },
    { name: 'Metodología', href: '/metodologia' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Proyectos', href: '/proyectos' },
    { name: 'Contacto', action: 'contact' }
  ]

  useEffect(() => {
    const update = (latest: number) => {
      const diff = latest - lastScroll.current
      if (Math.abs(diff) < 10 || isOpen) return
      if (latest > lastScroll.current && latest > 120) {
        if (direction.current !== "down") {
          navY.set(-120)
          navOpacity.set(0)
          direction.current = "down"
        }
      } else {
        if (direction.current !== "up") {
          navY.set(0)
          navOpacity.set(1)
          direction.current = "up"
        }
      }
      lastScroll.current = latest
    }
    const unsub = scrollY.on("change", update)
    return () => unsub()
  }, [isOpen, navY, navOpacity, scrollY])

  useEffect(() => {
    document.body.style.overflow = isOpen || isContactOpen ? 'hidden' : 'unset'
  }, [isOpen, isContactOpen])

  const ease = [0.19, 1, 0.22, 1]

  // Función unificada para abrir contacto y cerrar menú
  const triggerContact = () => {
    setIsOpen(false);
    // Si existe la prop externa, la usamos; si no, usamos el estado interno
    if (onOpenContact) {
      onOpenContact();
    } else {
      setTimeout(() => {
        setIsContactOpen(true);
      }, 300);
    }
  };

  return (
    <>
      <motion.nav
        style={{ y: navY, opacity: navOpacity }}
        className="fixed top-0 w-full z-[100] px-6 py-2 md:px-12 backdrop-blur-md"
      >
        <div className="max-w-[1800px] mx-auto flex justify-between items-center">
          {/* --- LOGO INSERTADO AQUÍ --- */}
          <Link href="/" className="cursor-pointer">
            <motion.img 
              src="/imagenes/logo.png" 
              alt="Utilix Logo"
              whileHover={{ scale: 1.02 }}
              className="h-16 md:h-18 w-auto object-contain"
            />
          </Link>

          <motion.button
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-4 border border-white/10 px-4 py-2 rounded-full bg-white/[0.03] backdrop-blur-xl"
            aria-label="Abrir menú"
            aria-expanded={isOpen}
          >
            <span className="text-[9px] tracking-[0.4em] uppercase text-white/60 font-mono">Menu</span>
            <div className="flex flex-col gap-1">
              <span className="w-6 h-[1px] bg-white"></span>
              <span className="w-4 h-[1px] bg-white"></span>
            </div>
          </motion.button>
        </div>

        {/* SEO Link Map: Invisible para humanos, oro para Google */}
        <div className="sr-only opacity-0 pointer-events-none absolute">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href || '/'}>
              {link.name}
            </Link>
          ))}
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: ease as any }}
            className="fixed inset-0 bg-[#050505] z-[200] flex flex-col"
          >
            <div className="flex justify-between items-center px-6 py-6 md:px-12">
              <span className="text-[8px] tracking-[0.8em] text-white/20 font-mono">SYSTEM_CORE_REQD</span>
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform duration-300">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 grid md:grid-cols-2 overflow-hidden">
              {/* IZQUIERDA: ENLACES */}
              <div className="flex flex-col justify-center px-6 md:px-20 border-r border-white/5">
                {navLinks.map((item, i) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ x: -40, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05, duration: 0.8, ease: ease as any }}
                    >
                      <Link
                        href={item.href ?? '#'}
                        onClick={(e) => {
                          if (item.action === 'contact') {
                            e.preventDefault();
                            triggerContact();
                          } else {
                            setIsOpen(false);
                          }
                        }}
                        className="group flex items-center gap-4 border-b border-white/5 py-4 md:py-5 cursor-pointer"
                      >
                        <span className={`text-[10px] font-mono transition-colors ${isActive ? 'text-[#00ff9d]' : 'text-white/20 group-hover:text-white'}`}>
                          0{i + 1}
                        </span>
                        <span className={`text-2xl md:text-4xl font-black italic uppercase tracking-tighter transition-all ${isActive ? 'text-[#00ff9d]' : 'text-white/40 group-hover:text-white'}`}>
                          {item.name}
                        </span>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              {/* DERECHA: CAJETILLA DE CONTACTO */}
              <div className="hidden md:flex flex-col justify-center items-start px-20 space-y-12 bg-white/[0.01]">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4"
                >
                  <p className="text-[10px] tracking-[0.4em] text-white/20 font-mono uppercase">Protocolo de Mensajería</p>
                  <button 
                    onClick={triggerContact}
                    className="group text-4xl font-light tracking-tighter text-white hover:text-[#00ff9d] transition-all flex items-center gap-4 text-left"
                  >
                    info@utilix.es 
                    <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" strokeWidth={1} size={32} />
                  </button>
                </motion.div>

                <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.5 }}
                   className="space-y-6"
                >
                  <p className="text-[10px] tracking-[0.4em] text-white/20 font-mono uppercase">Next Step</p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={triggerContact}
                    className="group bg-white text-black px-10 py-5 rounded-full text-[11px] tracking-[0.3em] uppercase font-bold flex items-center gap-8"
                  >
                    Explorar Proyecto
                    <div className="w-2 h-2 bg-black rounded-full group-hover:scale-[2] group-hover:bg-[#00ff9d] transition-all" />
                  </motion.button>
                </motion.div>
              </div>
            </div>

            {/* MOBILE FOOTER */}
            <div className="md:hidden px-6 pb-10 flex flex-col gap-6 border-t border-white/5 pt-8">
              <button 
                onClick={triggerContact}
                className="text-xs tracking-widest text-white/40 hover:text-[#00ff9d] uppercase font-mono text-center"
              >
                info@utilix.es
              </button>
              <button
                className="bg-white text-black w-full py-5 rounded-full text-[10px] tracking-[0.3em] uppercase font-bold"
                onClick={triggerContact}
              >
                Explorar Proyecto
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  )
}