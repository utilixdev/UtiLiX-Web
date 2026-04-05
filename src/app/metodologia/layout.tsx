// ─────────────────────────────────────────────────────────────────────────────
// 2. app/metodologia/layout.tsx
// Qué busca el cliente: "cómo me van a hacer la web", "cuánto tarda"
// Intención: consideración/decisión. El cliente ya sabe lo que quiere,
// está evaluando a quién contratar. Aquí se cierra o se pierde.
// ─────────────────────────────────────────────────────────────────────────────

// app/metodologia/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Proceso de trabajo | Utilix – Tu web lista en 3 pasos claros',
  // "proceso de trabajo" es la búsqueda real — "metodología de alto rendimiento"
  // no la busca nadie. "Tu web lista en 3 pasos" actúa de CTA en el SERP.

  description:
    'Sin formularios eternos ni presupuestos opacos. Te explicamos exactamente qué haremos, cuánto tardará y cuánto costará. Para negocios en Vic, Osona y toda España.',

  keywords: [
    // Proceso — cómo trabajamos
    'proceso creación página web',
    'cuánto tarda hacer una web',
    'pasos para crear una web',
    'cómo contratar diseño web',
    // Locales
    'crear web Vic paso a paso',
    'diseño web Osona proceso',
    // Intención de decisión
    'presupuesto web sin sorpresas',
    'diseño web transparente España',
    'hacer web para mi negocio',
    'web rápida para autónomos',
    // Marca
    'Utilix proceso',
    'Utilix metodología',
  ],

  alternates: {
    canonical: 'https://utilix.es/metodologia',
  },

  openGraph: {
    title: 'Cómo hacemos tu web en Utilix – 3 pasos, sin sorpresas',
    description:
      'Una conversación, una propuesta clara y un resultado que funciona. Así de simple es trabajar con nosotros. Sin tecnicismos, sin esperas, sin letra pequeña.',
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

export default function MetodologiaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}