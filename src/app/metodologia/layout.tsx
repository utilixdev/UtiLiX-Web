import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Metodología de Alto Rendimiento',
  description: 'Nuestro proceso de 3 fases: Auditoría, Arquitectura y Despliegue. Descubre cómo transformamos problemas técnicos en máquinas de captación de clientes.',
}

export default function MetodologiaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}