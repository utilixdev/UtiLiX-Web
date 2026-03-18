'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2 } from 'lucide-react'
import { useState } from 'react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  // Cambiamos a string para evitar errores de inferencia de TypeScript en el build
  const [status, setStatus] = useState<string>('idle')
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    telefono: '', 
    servicio: '', 
    message: '' 
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'loading' || status === 'success') return;

    setStatus('loading')

    const payload = {
      name: formData.name,
      email: formData.email,
      telefono: formData.telefono,
      apellidos: "(Desde Navbar)",
      servicio: formData.servicio,
      web: "Solicitada vía Modal Navbar",
      message: `CONTACTO RÁPIDO: ${formData.message}`
    }

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.status === 200 || res.ok) {
        setStatus('success')
        setTimeout(() => {
          onClose()
          setStatus('idle')
          setFormData({ name: '', email: '', telefono: '', servicio: '', message: '' })
        }, 2500)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 4000)
      }
    } catch (error) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[300]"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ ease: [0.19, 1, 0.22, 1], duration: 0.8 }}
            className="fixed inset-0 m-auto w-[95%] max-w-2xl h-fit max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-white/5 p-8 md:p-12 z-[301] rounded-3xl shadow-[0_0_80px_rgba(0,0,0,1)] no-scrollbar"
          >
            <div className="flex justify-between items-start mb-10">
              <div>
                <h2 className="text-4xl font-black italic tracking-tighter text-white uppercase">
                  {status === 'success' ? 'Protocolo Activo.' : 'Admisión.'}<span className="text-[#c98628]">.</span>
                </h2>
                <p className="text-white/30 text-[9px] mt-2 font-mono uppercase tracking-[0.4em]">
                  {status === 'success' ? 'Transmisión Completada' : 'Initialize Project Inquiry'}
                </p>
              </div>
              <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all">
                <X size={18} strokeWidth={1} />
              </button>
            </div>

            {status === 'success' ? (
              <div className="py-20 text-center">
                <motion.p 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="text-[#c98628] font-mono text-[10px] tracking-[0.5em] uppercase italic"
                >
                  Solicitud registrada. Verifique su bandeja de entrada.
                </motion.p>
              </div>
            ) : (
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                <div className="space-y-1">
                  <p className="text-[8px] font-mono text-white/20 uppercase tracking-widest ml-1">Identity</p>
                  <input required type="text" placeholder="NOMBRE COMPLETO" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-transparent border-b border-white/10 p-4 text-[11px] tracking-[0.2em] outline-none focus:border-[#c98628] transition-colors uppercase font-light text-white"
                  />
                </div>

                <div className="space-y-1">
                  <p className="text-[8px] font-mono text-white/20 uppercase tracking-widest ml-1">Email</p>
                  <input required type="email" placeholder="CORREO ELECTRÓNICO" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-transparent border-b border-white/10 p-4 text-[11px] tracking-[0.2em] outline-none focus:border-[#c98628] transition-colors uppercase font-light text-white"
                  />
                </div>

                <div className="space-y-1">
                  <p className="text-[8px] font-mono text-white/20 uppercase tracking-widest ml-1">Terminal</p>
                  <input required type="tel" placeholder="TELÉFONO" 
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                    className="w-full bg-transparent border-b border-white/10 p-4 text-[11px] tracking-[0.2em] outline-none focus:border-[#c98628] transition-colors uppercase font-light text-white"
                  />
                </div>

                <div className="space-y-1">
                  <p className="text-[8px] font-mono text-white/20 uppercase tracking-widest ml-1">Protocolo</p>
                  <select 
                    required
                    value={formData.servicio}
                    onChange={(e) => setFormData({...formData, servicio: e.target.value})}
                    className="w-full bg-transparent border-b border-white/10 p-4 text-[11px] tracking-[0.2em] outline-none focus:border-[#c98628] transition-colors uppercase font-light appearance-none text-white/60"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23c98628'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                  >
                    <option value="" className="bg-black text-white/30 italic text-xs">Selecciona una opción</option>
                    <option value="Imagen y Autoridad" className="bg-black text-white">Mejorar mi imagen y autoridad</option>
                    <option value="Web" className="bg-black text-white">Nueva página web</option>
                    <option value="Plan Completo" className="bg-black text-white">Plan completo: Imagen + Web</option>
                  </select>
                </div>

                <div className="md:col-span-2 space-y-1">
                  <p className="text-[8px] font-mono text-white/20 uppercase tracking-widest ml-1">Context</p>
                  <textarea required placeholder="MENSAJE" rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-transparent border-b border-white/10 p-4 text-[11px] tracking-[0.2em] outline-none focus:border-[#c98628] transition-colors resize-none uppercase font-light text-white"
                  ></textarea>
                </div>
                
                <div className="md:col-span-2 pt-6">
                  <div className="relative group">
                    <button 
                      type="submit"
                      disabled={status === 'loading' || status === 'success'}
                      className={`relative w-full py-5 text-[10px] tracking-[0.4em] uppercase font-black transition-all duration-500 overflow-hidden rounded-full shadow-lg flex justify-center items-center ${
                        status === 'success' ? 'bg-[#00ff9d] text-black' : 
                        status === 'loading' ? 'bg-white/10 text-white border border-white/10' :
                        'bg-white text-black'
                      }`}
                    >
                      <span className={`relative z-10 flex items-center gap-2 transition-colors duration-500 ${status === 'idle' ? 'group-hover:text-white' : ''}`}>
                        {status === 'loading' && <Loader2 className="animate-spin" size={14} />}
                        {status === 'loading' && 'Procesando...'}
                        {status === 'success' && '✓ Transmisión Éxito'}
                        {status === 'error' && 'Error - Reintentar'}
                        {status === 'idle' && 'Submit Request'}
                      </span>

                      {status === 'idle' && (
                        <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.19,1,0.22,1]" />
                      )}
                    </button>
                  </div>
                  {status === 'error' && (
                    <p className="text-red-500 text-[8px] font-mono mt-4 text-center tracking-widest uppercase animate-pulse">Fallo en el enlace. Reintente.</p>
                  )}
                </div>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}