//─────────────────────────────────────────────────────────────────────────────
// 3. app/proyectos/layout.tsx
// Qué busca el cliente: "ejemplos de webs", "portfolio diseño web"
// Intención: evaluación. El cliente quiere prueba social y ver el nivel.
// Esta página tiene que posicionar para "portfolio web España" y
// "ejemplos web Osona" — búsquedas de volumen real y baja dificultad.
// ─────────────────────────────────────────────────────────────────────────────

// app/proyectos/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Proyectos web realizados | Utilix – Portfolio diseño web España',
  // "portfolio diseño web España" — búsqueda real, volumen medio, baja competencia
  // para un dominio nuevo. La combinación local+nacional maximiza cobertura.

  description:
    'Webs reales para negocios reales. Mira lo que hemos construido para autónomos y pymes en Vic, Osona y toda España. Rápidas, modernas y pensadas para atraer clientes.',

  keywords: [
    // Portfolio — intención de evaluación
    'portfolio diseño web España',
    'ejemplos páginas web negocios',
    'webs realizadas pymes',
    'portfolio web autónomos',
    // Locales
    'portfolio web Vic',
    'proyectos web Osona',
    'ejemplos webs Osona',
    'diseño web Manlleu ejemplos',
    // Por tipo de proyecto
    'ejemplos tienda online España',
    'webs para restaurantes',
    'webs para clínicas',
    'webs para comercios locales',
    // Marca
    'Utilix proyectos',
    'Utilix portfolio',
    'trabajos Utilix web',
  ],

  alternates: {
    canonical: 'https://utilix.es/proyectos',
  },

  openGraph: {
    title: 'Proyectos Utilix – Webs que funcionan de verdad',
    description:
      'Cada proyecto que ves aquí tiene detrás un negocio que quería mejorar y que ahora consigue más clientes. Mira lo que podemos hacer por el tuyo.',
    locale: 'es_ES',
    type: 'website',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
}

export default function ProyectosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}