'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import CookieBanner from "@/components/CookieBanner";

// 1. IMPORTA TUS COMPONENTES GLOBALES
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayoutClient({ 
  children, 
  fontClassName 
}: { 
  children: React.ReactNode, 
  fontClassName: string 
}) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const isSimplePage = pathname?.includes('legal') || pathname?.includes('privacidad') || pathname?.includes('cookies');

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <body 
      className={`
        ${fontClassName} 
        bg-[#030303] 
        text-white 
        antialiased 
        selection:bg-utilix-green/30 
        selection:text-white
        overflow-x-hidden
        md:cursor-none
      `}
    >
      {/* 2. NAVBAR GLOBAL (Se mostrará en todas las páginas) */}
      <Navbar />

      {mounted && (
        <div key={pathname + "-wrapper"}>
          {!isSimplePage && <ScrollProgress />}
          <CustomCursor />
          <CookieBanner />
        </div>
      )}
      
      <main key={pathname} className="relative block bg-[#030303] w-full overflow-x-hidden">
        {children}
      </main>

      {/* 3. FOOTER GLOBAL */}
      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        body, html {
          background-color: #030303;
          margin: 0;
          padding: 0;
        }
        
        section {
          display: block;
          position: relative;
          width: 100%;
          padding-left: 7vw !important;
          padding-right: 7vw !important;
          box-sizing: border-box;
        }

        section > div {
          max-width: 1400px;
          margin-left: auto;
          margin-right: auto;
        }

        section {
          margin-bottom: 12vh !important;
        }

        main > section:first-of-type {
          margin-bottom: 0 !important;
          padding-top: 0 !important;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        #services { margin-bottom: 2vh !important; }
        #proyectos { margin-top: 0 !important; margin-bottom: 12vh !important; }

        h2, h1 { margin-top: 0 !important; padding-top: 0 !important; }

        main > div { box-sizing: border-box; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #030303; }
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
      `}} />
    </body>
  );
}