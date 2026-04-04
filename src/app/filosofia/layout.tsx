import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Filosofía y Estándar Digital',
  description: 'En UtiLiX no diseñamos webs que solo "están ahí". Descubre nuestra ingeniería de captación y por qué somos el nuevo estándar de autoridad digital.',
  alternates: {
    canonical: '/filosofia',
  },
}

export default function FilosofiaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}