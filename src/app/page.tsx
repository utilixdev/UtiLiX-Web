'use client';

import { useState } from 'react'
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Metodologia from "@/components/Metodologia";
import Filosofia from "@/components/Filosofia";
import ServicesGrid from "@/components/ServicesGrid";
import Footer from "@/components/Footer";
import Projects from "@/components/Projects";
import CustomCursor from "@/components/CustomCursor";
import ContactModal from "@/components/ContactModal";
import AuditoriaForm from "@/components/AuditoriaForm";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false)

  return (
    <main className="relative bg-[#030303] text-white min-h-screen overflow-x-hidden selection:bg-utilix-green selection:text-black">
      
      {/* 1. Capa de Interacción Superior */}
      <CustomCursor />

      {/* Navbar recibe callback para abrir modal */}
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* 2. Secuencia de Apertura (El Manifiesto) */}
      <article className="relative">
        <Hero />
        <Filosofia />
      </article>

      {/* 3. Ecosistema de Soluciones */}
      <div className="flex flex-col overflow-visible">
        
        <Metodologia />

        <ServicesGrid />

        <Projects />

        {/* 5. Captación de Autoridad: Formulario de Auditoría */}
        <AuditoriaForm />

      </div>

      {/* 6. Cierre de Autoridad */}
      <Footer />
      
    </main>
  );
}