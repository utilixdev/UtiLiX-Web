import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Servicios de Ingeniería y Diseño Web',
  description: 'Desde auditorías de rendimiento hasta desarrollo con Next.js y e-commerce de alto nivel. Soluciones digitales a medida en Vic, Osona y toda España.',
}

export default function ServiciosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}