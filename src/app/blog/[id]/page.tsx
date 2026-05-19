'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';

// 1. Traemos tus 3 archivos de la carpeta de componentes
import AgenciaDisenoWeb from '@/components/blog/agencia-diseno-web'; 
import BotonWhatsapp from '@/components/blog/boton-whatsapp';
import WebVsInstagram from '@/components/blog/web-vs-instagram';

// 2. Los emparejamos con los enlaces del menú
const componentesBlog: Record<string, React.ComponentType> = {
  'agencia-diseno-web': AgenciaDisenoWeb,
  'boton-whatsapp': BotonWhatsapp,
  'web-vs-instagram': WebVsInstagram,
};

export default function PaginaArticulo() {
  const params = useParams();
  const id = params.id as string;

  // Si alguien inventa una URL que no existe, muestra error 404
  if (!id || !componentesBlog[id]) {
    notFound();
  }

  // Invocamos el archivo que toca
  const ComponenteALeer = componentesBlog[id];

  return (
    <div className="bg-[#030303] min-h-screen text-white">
      <ComponenteALeer />
    </div>
  );
}