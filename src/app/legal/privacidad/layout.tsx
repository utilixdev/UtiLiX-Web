// ─────────────────────────────────────────────────────────────────────────────
// 6. app/privacidad/layout.tsx
// Igual que aviso legal — no indexar es correcto.
// ─────────────────────────────────────────────────────────────────────────────

// app/privacidad/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad | Utilix',
  description:
    'Cómo tratamos tus datos personales, tus derechos y nuestro compromiso con la privacidad en Utilix.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://utilix.es/privacidad',
  },
}

export default function PrivacidadLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}