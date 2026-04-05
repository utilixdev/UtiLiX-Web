// app/servicios/layout.tsx
// ─── METADATA EN CASCADA — Next.js App Router ────────────────────────────────
// Este layout añade su capa de metadata que se fusiona con la de la page.
// La page tiene el JSON-LD y los OG tags completos.
// Este layout añade: title template, description optimizada para búsqueda real,
// keywords secundarias y alternates canonical correcto.

import { Metadata } from 'next';

export const metadata: Metadata = {
  // ── TITLE ──────────────────────────────────────────────────────────────────
  // Estructura: [Keyword principal] | [Marca] – [Diferenciador]
  // Máximo 60 caracteres para que no se corte en SERPs.
  // Keyword "diseño web" + ubicaciones principales + propuesta de valor.
  title: 'Diseño web para negocios en Vic y Osona | Utilix',

  // ── DESCRIPTION ────────────────────────────────────────────────────────────
  // Entre 140-160 caracteres. Debe incluir:
  // 1. Qué haces (verbo activo)
  // 2. Para quién (autónomos, pymes, negocios locales)
  // 3. Dónde (Vic, Osona, España — para cubrir búsquedas locales y nacionales)
  // 4. El diferenciador real (sin tecnicismos, trato directo)
  // 5. Un CTA implícito
  description:
    'Creamos webs que atraen clientes y hacen sonar el teléfono. Para autónomos y pymes en Vic, Osona y toda España. Trato directo, sin tecnicismos y sin letra pequeña.',

  // ── KEYWORDS ───────────────────────────────────────────────────────────────
  // Google no las usa para ranking pero sí Bing y otros.
  // Mezcla: genéricas nacionales + long tail locales + por tipo de negocio.
  keywords: [
    // Locales — Osona
    'diseño web Vic',
    'página web Osona',
    'diseño web Manlleu',
    'web Torelló',
    'crear web Osona',
    'diseño web comarca Osona',
    // Nacionales — genéricas
    'diseño web para negocios',
    'diseño web pymes España',
    'página web autónomos',
    'crear página web empresa',
    'diseño web profesional España',
    // Long tail — por intención de búsqueda
    'web que atrae clientes',
    'diseño web sin tecnicismos',
    'tienda online para negocios',
    'mantenimiento web España',
    'SEO local negocios',
    // Marca
    'Utilix web',
    'Utilix diseño web',
  ],

  // ── ALTERNATES / CANONICAL ─────────────────────────────────────────────────
  // El canonical absoluto evita contenido duplicado si la URL
  // se accede con o sin trailing slash, con parámetros de UTM, etc.
  // IMPORTANTE: usa la URL absoluta aquí, no relativa como '/servicios'.
  // La relativa puede causar problemas si Next.js no resuelve bien el base URL.
  alternates: {
    canonical: 'https://utilix.es/servicios',
    // Si en el futuro añades versión en catalán:
    // languages: { 'ca': 'https://utilix.es/ca/serveis' }
  },

  // ── OPEN GRAPH ADICIONAL ───────────────────────────────────────────────────
  // La page ya tiene los OG tags principales en SEOHead().
  // Aquí añadimos lo que el layout puede reforzar.
  openGraph: {
    locale: 'es_ES',
    type: 'website',
  },

  // ── ROBOTS ─────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,        // Google puede usar fragmento de cualquier longitud
      'max-image-preview': 'large', // Google puede mostrar imagen grande en SERPs
      'max-video-preview': -1,  // Google puede mostrar preview de vídeo completa
    },
  },
};

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
