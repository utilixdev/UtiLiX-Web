'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, BarChart3, Target } from 'lucide-react';
import Link from 'next/link';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: true,
    marketing: false
  });

  useEffect(() => {
    const savedPreferences = localStorage.getItem('utilix-cookie-preferences');
    if (!savedPreferences) {
      const timer = setTimeout(() => setIsVisible(true), 6000);
      return () => clearTimeout(timer);
    }
  }, []);

  const savePreferences = (prefs: typeof preferences) => {
    localStorage.setItem('utilix-cookie-preferences', JSON.stringify(prefs));
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    const allIn = { essential: true, analytics: true, marketing: true };
    savePreferences(allIn);
  };

  // Easing unificado para evitar conflictos de steps(2)
  const expoEase = [0.19, 1, 0.22, 1];

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ duration: 1.2, ease: expoEase }}
          className="fixed bottom-8 right-8 z-[200] w-[320px] md:w-[380px]"
        >
          <div className="relative bg-[#050505]/90 border border-white/10 backdrop-blur-3xl p-5 shadow-[20px_20px_60px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 right-0 w-16 h-[1px] bg-[#10B981]/50" />
            <div className="absolute top-0 right-0 w-[1px] h-16 bg-[#10B981]/50" />

            {!showSettings ? (
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-2 w-2">
                    <motion.span 
                      animate={{ scale: [1, 2], opacity: [0.6, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inline-flex h-full w-full rounded-full bg-[#10B981]"
                    />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
                  </div>
                  <span className="text-[10px] font-bold tracking-[0.4em] text-white/90 uppercase italic">
                    Privacy_Protocol
                  </span>
                </div>

                <p className="text-[10px] leading-relaxed text-white/40 uppercase tracking-widest font-medium">
                  Analizamos la interacción para optimizar el rendimiento. 
                  <Link href="/legal/cookies" className="text-white hover:text-[#10B981] ml-1 underline decoration-white/10 underline-offset-4">Read_Log</Link>
                </p>

                <div className="flex gap-2 pt-2">
                  <motion.button 
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.05)", color: "#ffffff" }}
                    onClick={() => setShowSettings(true)}
                    className="flex-1 border border-white/5 text-white/30 text-[9px] font-black py-3 uppercase tracking-widest"
                  >
                    Config
                  </motion.button>
                  <motion.button 
                    whileHover={{ backgroundColor: "#10B981" }}
                    onClick={handleAcceptAll}
                    className="flex-1 bg-white text-black text-[9px] font-[1000] py-3 uppercase tracking-[0.3em]"
                  >
                    Accept_All
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] text-[#10B981] tracking-[0.3em] uppercase italic font-bold">System_Settings</span>
                  <button onClick={() => setShowSettings(false)} className="text-white/20">
                    <X size={14} />
                  </button>
                </div>

                <div className="space-y-3">
                  {[
                    { id: 'essential', label: 'Essential', icon: <Shield size={12}/>, locked: true },
                    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={12}/>, locked: false },
                    { id: 'marketing', label: 'Marketing', icon: <Target size={12}/>, locked: false },
                  ].map((cat) => (
                    <motion.div 
                      key={cat.id} 
                      whileHover={{ borderColor: "rgba(255,255,255,0.1)" }}
                      className="flex items-center justify-between bg-white/[0.02] border border-white/5 p-3 group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-white/20 group-hover:text-[#10B981]">{cat.icon}</span>
                        <span className="text-[9px] text-white/60 uppercase tracking-widest font-bold">{cat.label}</span>
                      </div>
                      <input 
                        type="checkbox"
                        disabled={cat.locked}
                        checked={preferences[cat.id as keyof typeof preferences]}
                        onChange={(e) => setPreferences({...preferences, [cat.id]: e.target.checked})}
                        className="accent-[#10B981] w-3 h-3 cursor-pointer opacity-40 checked:opacity-100"
                      />
                    </motion.div>
                  ))}
                </div>

                <motion.button 
                  whileHover={{ backgroundColor: "#ffffff" }}
                  onClick={() => savePreferences(preferences)}
                  className="w-full bg-[#10B981] text-black text-[9px] font-[1000] py-3 uppercase tracking-[0.3em]"
                >
                  Save_Changes
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}