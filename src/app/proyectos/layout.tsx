import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Proyectos y Casos de Éxito',
  description: 'Explora nuestro portfolio de arquitectura digital. Webs disruptivas, rápidas y orientadas a resultados para empresas que no aceptan lo convencional.',
}

export default function ProyectosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}