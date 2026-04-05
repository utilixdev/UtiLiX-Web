// ─────────────────────────────────────────────────────────────────────────────
// 1. app/filosofia/layout.tsx
// Qué busca el cliente: "cómo trabaja esta empresa", "por qué contrataros"
// Intención: informacional/consideración. Competencia baja. Oportunidad alta.
// ─────────────────────────────────────────────────────────────────────────────

// app/filosofia/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cómo trabajamos | Utilix – Webs que traen clientes de verdad',
  // 60 chars ✓ — keyword "cómo trabajamos" + marca + diferenciador

  description:
    'Hacemos webs que generan negocio, no decoración. Descubre por qué cada decisión que tomamos está pensada para que tu negocio consiga más clientes. Sin tecnicismos, sin relleno.',
  // 179 chars — algo largo, pero la intención informacional permite más texto
  // Google suele mostrar 155-160 en desktop, el resto se corta en móvil

  keywords: [
    // Intención — cómo trabajamos
    'cómo funciona una agencia web',
    'proceso diseño web',
    'metodología diseño web',
    'diseño web orientado a resultados',
    // Locales
    'diseño web Vic filosofía',
    'empresa web Osona cómo trabaja',
    // Diferenciadores — long tail con baja competencia
    'web que convierte clientes',
    'diseño web sin tecnicismos',
    'web para autónomos España',
    'diseño web trato directo',
    // Marca
    'Utilix filosofía',
    'Utilix cómo trabajamos',
  ],

  alternates: {
    canonical: 'https://utilix.es/filosofia',
  },

  openGraph: {
    title: 'Cómo trabajamos en Utilix – Sin rodeos, con resultados',
    description:
      'Cada web que hacemos tiene un propósito: traerte clientes. Descubre nuestra forma de trabajar y por qué es diferente a lo que has visto hasta ahora.',
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

export default function FilosofiaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}