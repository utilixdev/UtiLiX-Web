import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Información detallada sobre el uso de cookies, seguimiento y tecnologías de almacenamiento en UtiLiX.',
  robots: { index: false, follow: true }
}

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}