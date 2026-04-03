import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Tratamiento de datos personales, derechos del usuario y compromiso de confidencialidad de UtiLiX Digital Architecture.',
  robots: { index: false, follow: true }
}

export default function PrivacidadLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}