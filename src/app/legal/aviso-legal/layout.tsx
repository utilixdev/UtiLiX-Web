// app/aviso-legal/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aviso Legal | Utilix',
  description:
    'Información legal, datos identificativos y condiciones de uso del sitio web de Utilix. Diseño web para negocios en Vic, Osona y España.',
  robots: {
    index: false,
    follow: true,
    // follow:true es importante — Google sigue los links internos de esta página
    // aunque no la indexe, lo que ayuda al crawl del resto del sitio.
  },
  alternates: {
    canonical: 'https://utilix.es/aviso-legal',
  },
}

export default function AvisoLegalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}