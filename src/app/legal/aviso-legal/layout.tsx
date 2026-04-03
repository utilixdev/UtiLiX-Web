import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aviso Legal',
  description: 'Datos identificativos, condiciones de uso del sitio web y responsabilidades legales de UtiLiX.',
  robots: { index: false, follow: true }
}

export default function AvisoLegalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}