'use client';

import { useState } from 'react'
import Hero from "@/components/Hero";
import Metodologia from "@/components/Metodologia";
import Filosofia from "@/components/Filosofia";
import ServicesGrid from "@/components/ServicesGrid";
import Projects from "@/components/Projects";
import ContactModal from "@/components/ContactModal";
import AuditoriaForm from "@/components/AuditoriaForm";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false)

  return (
    <main className="relative bg-[#030303] text-white min-h-screen overflow-x-hidden selection:bg-utilix-green selection:text-black">
      
      {/* NOTA: El Navbar, Footer y CustomCursor ya no se ponen aquí 
          porque se cargan automáticamente desde el RootLayoutClient.
      */}

      {/* Contact Modal - Se mantiene aquí si es específico de la Home */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* 1. Secuencia de Apertura (El Manifiesto) */}
      <article className="relative">
        <Hero />
        <Filosofia />
      </article>

      {/* 2. Ecosistema de Soluciones */}
      <div className="flex flex-col overflow-visible">
        
        <Metodologia />

        <ServicesGrid />

        <Projects />

        {/* 3. Captación de Autoridad: Formulario de Auditoría */}
        <AuditoriaForm />

      </div>
      
    </main>
  );
}