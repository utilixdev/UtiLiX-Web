'use client';

import { motion } from "framer-motion";
import { useState } from "react";

export default function AuditoriaForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const inputStyle = "w-full bg-transparent border-b border-white/10 py-3 text-[#00ff9d] focus:outline-none focus:border-[#00ff9d] transition-colors duration-500 placeholder:text-white/30 font-medium tracking-widest uppercase text-sm";
  const labelStyle = "block text-[9px] uppercase tracking-[0.4em] text-[#00ff9d]/70 mb-1 font-bold";

  // SVG para la flecha del select (en sustitución del styled-jsx)
  const selectIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2300ff9d'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'loading' || status === 'success') return;

    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData);

    const payload = {
      name: rawData.nombre,
      email: rawData.email,
      telefono: rawData.telefono,
      apellidos: rawData.apellidos || "",
      servicio: rawData.servicio,
      web: rawData.web || "No proporcionada",
      message: `SOLICITUD DE AUDITORÍA: El cliente requiere el servicio "${rawData.servicio}". Web actual: ${rawData.web || "N/A"}.`
    };

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.status === 200 || response.ok) {
        // DISPARO DE CONVERSIÓN GOOGLE ADS
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'conversion', {
            'send_to': 'AW-942717987/N4ZEKP4wsED', // Sustituye 'conversion_id_aqui' por el ID que te da Google si es distinto
            'value': 1.0,
            'currency': 'EUR'
          });
        }

        setStatus('success');
        const form = e.target as HTMLFormElement;
        form.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="auditoria" className="relative mt-[-90px] md:mt-[-80px] py-0 px-6 bg-[#030303] overflow-hidden scroll-mt-24">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-[clamp(1.8rem,5vw,5rem)] font-[950] leading-[0.9] tracking-tighter uppercase text-white/90 mb-4 italic">
            ¿Tu web actual refleja  <br />
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-white to-emerald-400 bg-[length:200%_200%] animate-[gradient_8s_ease_infinite]">
              el valor de tu negocio?
            </span>
          </h2>
          <p className="text-white/40 font-medium text-[9px] md:text-xs tracking-[0.3em] uppercase max-w-xl mx-auto leading-relaxed">
          Si la respuesta es no, podemos hacer algo al respecto. Cuéntanos tu situación — sin compromiso, sin plantillas, sin perder el tiempo.          </p>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10"
        >
          <div className="relative">
            <label className={labelStyle}>Nombre *</label>
            <input name="nombre" type="text" placeholder="Tu nombre" className={inputStyle} required />
          </div>

          <div className="relative">
            <label className={labelStyle}>Apellidos</label>
            <input name="apellidos" type="text" placeholder="Tus apellidos" className={inputStyle} />
          </div>

          <div className="relative">
            <label className={labelStyle}>Email de contacto *</label>
            <input name="email" type="email" placeholder="clinica@ejemplo.com" className={inputStyle} required />
          </div>

          <div className="relative">
            <label className={labelStyle}>Teléfono *</label>
            <input name="telefono" type="tel" placeholder="123 456 789" className={inputStyle} required />
          </div>

          <div className="relative md:col-span-2">
            <label className={labelStyle}>¿En qué podemos ayudarte?</label>
            <div className="relative">
              <select 
                name="servicio" 
                required
                className={`${inputStyle} appearance-none cursor-pointer font-bold w-full pr-10`}
                style={{ 
                  backgroundImage: `url("${selectIcon}")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.5rem center',
                  backgroundSize: '1.2em'
                }}
              >
                <option value="" className="bg-black text-white/30 italic text-xs">Cuéntanos brevemente qué tienes ahora y qué quieres conseguir</option>
                <option value="Imagen y Autoridad" className="bg-black text-white">Mejorar mi imagen y ganar autoridad</option>
                <option value="Web" className="bg-black text-white">Nueva página web (más moderna y rápida)</option>
                <option value="Plan Completo" className="bg-black text-white">Plan completo: Imagen + Web + Captación</option>
              </select>
            </div>
          </div>

          <div className="relative md:col-span-2">
            <label className={labelStyle}>Web actual (si tienes)</label>
            <input name="web" type="url" placeholder="www.tuclinica.com" className={inputStyle} />
          </div>

          <div className="md:col-span-2 pt-10 flex justify-center">
            <div className="relative group w-full md:w-auto">
              <div className={`absolute -inset-[1px] rounded-none transition duration-500 blur-[4px] ${
                status === 'success' ? 'bg-[#00ff9d] opacity-100' : 'bg-gradient-to-r from-purple-500 via-white to-emerald-400 opacity-20 group-hover:opacity-100 animate-[gradient_8s_ease_infinite] bg-[length:200%_200%]'
              }`} />
              
              <button 
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className={`relative px-24 py-6 rounded-none font-black uppercase tracking-[0.5em] text-[12px] w-full md:w-auto transition-all duration-500 overflow-hidden ${
                  status === 'success' ? 'bg-[#00ff9d] text-black' : 
                  status === 'loading' ? 'bg-white/10 text-white border border-white/20' :
                  'bg-white text-black'
                }`}
              >
                <span className={`relative z-10 block transition-colors duration-500 ${status === 'idle' ? 'group-hover:text-white' : ''}`}>
                  {status === 'loading' && 'Enviando...'}
                  {status === 'success' && '✓ Enviado!'}
                  {status === 'error' && 'Error - Reintentar'}
                  {status === 'idle' && 'SOLICITAR AUDITORÍA GRATUITA'}
                </span>

                {status === 'idle' && (
                  <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.19,1,0.22,1]" />
                )}
              </button>
            </div>
          </div>
          
          {status === 'error' && (
            <p className="md:col-span-2 text-center text-red-500 font-bold text-[10px] uppercase tracking-widest mt-4">
              Fallo en la respuesta del servidor. Reintente.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}