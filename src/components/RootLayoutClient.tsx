'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import CookieBanner from "@/components/CookieBanner";

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
    <body className={`${fontClassName} bg-[#030303] text-white antialiased overflow-x-hidden md:cursor-none`}>
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

      <style dangerouslySetInnerHTML={{ __html: `
        /* Tus estilos CSS de margen y diseño aquí igual que los tenías */
        section { padding-left: 7vw !important; padding-right: 7vw !important; margin-bottom: 12vh !important; }
        /* ... resto de tu CSS ... */
      `}} />
    </body>
  );
}