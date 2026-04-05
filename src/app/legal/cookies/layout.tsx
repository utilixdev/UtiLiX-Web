// ─────────────────────────────────────────────────────────────────────────────
// 5. app/cookies/layout.tsx
// Igual que aviso legal — no indexar es correcto.
// ─────────────────────────────────────────────────────────────────────────────

// app/cookies/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Cookies | Utilix',
  description:
    'Información sobre el uso de cookies y tecnologías de seguimiento en el sitio web de Utilix.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://utilix.es/cookies',
  },
}

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}