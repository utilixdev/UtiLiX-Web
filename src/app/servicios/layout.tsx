// app/servicios/layout.tsx
// ═══════════════════════════════════════════════════════════════════════════
// LAYOUT METADATA OPTIMIZADA PARA GOOGLE ADS NACIONAL + SEO ESPAÑA
// 
// CAMBIOS VS VERSIÓN ANTERIOR:
// - Title enfocado en beneficio + profesionalidad (no en ubicación)
// - Description con lenguaje de conversión nacional
// - Keywords priorizadas por valor comercial, no por geografía
// - Canonical correcto
// - Robots optimizados para maximizar visibilidad
// ═══════════════════════════════════════════════════════════════════════════

import { Metadata } from 'next';

export const metadata: Metadata = {
  
  // ── TITLE OPTIMIZADO PARA CONVERSIÓN NACIONAL ────────────────────────────
  // Estructura: [Beneficio emocional] | [Keyword comercial] | [Marca]
  // 
  // EVITAMOS: "Diseño web Vic y Osona" (limita alcance percibido)
  // USAMOS: Beneficio universal + profesionalidad + alcance implícito
  // 
  // Máximo 60 caracteres para evitar corte en SERPs
  title: 'Páginas Web que Traen Clientes | Diseño Web Profesional | Utilix',
  // 64 caracteres (se puede acortar a "Webs que Traen Clientes" si quieres 58)

  // ── DESCRIPTION PARA QUALITY SCORE + CTR ──────────────────────────────────
  // Fórmula optimizada para Google Ads:
  // [Acción + Beneficio] + [Target específico] + [Diferenciador único] + [Cobertura] + [CTA implícito]
  // 
  // Entre 150-160 caracteres = óptimo para mostrar completo en móvil y escritorio
  description:
    'Creamos webs profesionales que atraen clientes reales. Para pymes y autónomos en toda España. Sin tecnicismos, sin letra pequeña. Trato directo.',
  // 149 caracteres ✓

  // ── KEYWORDS PRIORIZADAS POR VALOR COMERCIAL ──────────────────────────────
  // TIER 1: Alta intención comercial (gente lista para contratar)
  // TIER 2: Long tail con menor competencia
  // TIER 3: Servicios específicos
  // TIER 4: Regional (solo principales ciudades)
  // TIER 5: Local (respaldo, no prioridad)
  keywords: [
    // ── TIER 1: NACIONAL - ALTA INTENCIÓN COMERCIAL ────────────────────────
    'diseño web profesional',
    'crear página web profesional',
    'hacer página web empresa',
    'diseño web para negocios',
    'desarrollo web profesional',
    'empresa diseño web',
    'agencia diseño web',
    'páginas web profesionales España',
    'diseño web corporativo',
    'servicios diseño web',

    // ── TIER 2: LONG TAIL - MENOR COMPETENCIA, MAYOR CONVERSIÓN ────────────
    'cuanto cuesta página web profesional',
    'diseño web sin tecnicismos',
    'web para mi negocio',
    'páginas web que venden',
    'web que atrae clientes',
    'presupuesto diseño web profesional',
    'empresa páginas web España',
    'diseño web pymes',
    'diseño web autónomos',
    'web profesional precio',

    // ── TIER 3: SERVICIOS ESPECÍFICOS ──────────────────────────────────────
    'tienda online profesional',
    'desarrollo ecommerce España',
    'mantenimiento web empresas',
    'posicionamiento SEO España',
    'optimización web profesional',
    'rediseño web profesional',
    'diseño web responsive',
    'web corporativa profesional',

    // ── TIER 4: REGIONAL (Solo principales mercados) ────────────────────────
    'diseño web Madrid',
    'diseño web Barcelona',
    'diseño web Valencia',
    'diseño web Sevilla',
    'diseño web Bilbao',

    // ── TIER 5: LOCAL (Mantener autoridad, no priorizar) ───────────────────
    'diseño web Vic',
    'diseño web Osona',

    // ── MARCA ───────────────────────────────────────────────────────────────
    'Utilix',
    'Utilix diseño web',
    'Utilix España',
  ],

  // ── CANONICAL ABSOLUTO ────────────────────────────────────────────────────
  // Evita duplicados si se accede con trailing slash, parámetros UTM, etc.
  alternates: {
    canonical: 'https://utilix.es/servicios',
    
    // Preparado para futuras versiones en otros idiomas:
    // languages: {
    //   'es-ES': 'https://utilix.es/servicios',
    //   'ca-ES': 'https://utilix.es/ca/serveis',
    // },
  },

  // ── OPEN GRAPH REFORZADO ───────────────────────────────────────────────────
  // Se combina con los OG tags del SEOHead de la page
  openGraph: {
    title: 'Páginas Web que Traen Clientes | Diseño Web Profesional España',
    description: 'Hacemos webs profesionales para pymes y autónomos en toda España. Trato directo, sin tecnicismos.',
    url: 'https://utilix.es/servicios',
    siteName: 'Utilix',
    locale: 'es_ES',
    type: 'website',
    
    // Imagen específica para esta sección
    images: [
      {
        url: '/og-servicios.jpg',
        width: 1200,
        height: 630,
        alt: 'Utilix - Diseño web profesional para empresas en España',
      },
    ],
  },

  // ── TWITTER/X CARD ─────────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'Páginas Web que Traen Clientes | Utilix',
    description: 'Diseño web profesional para pymes y autónomos en toda España. Sin tecnicismos.',
    images: ['/og-servicios.jpg'],
    // Si tienes cuenta de Twitter/X: creator: '@utilix_web',
  },

  // ── ROBOTS MAXIMIZADOS PARA VISIBILIDAD ───────────────────────────────────
  // Configuración agresiva para aparecer en todos los resultados posibles
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      // max-snippet:-1 = Google puede usar fragmento de cualquier longitud
      'max-snippet': -1,
      // max-image-preview:large = Google puede mostrar imagen grande = más espacio visual en SERPs
      'max-image-preview': 'large',
      // max-video-preview:-1 = Google puede mostrar preview completa del vídeo hero
      'max-video-preview': -1,
    },
  },

  // ── ADDITIONAL METADATA ────────────────────────────────────────────────────
  // Información adicional que mejora la indexación
  authors: [{ name: 'Utilix' }],
  creator: 'Utilix',
  publisher: 'Utilix',
  
  // Category ayuda a Google a clasificar tu contenido
  category: 'Web Design and Development Services',

  // ── VERIFICATION (si usas herramientas de terceros) ────────────────────────
  // Google Search Console ya está en el layout raíz, pero si quieres añadir
  // verificación de otras herramientas específicas para esta sección:
  // verification: {
  //   google: 'código-de-verificación',
  //   yandex: 'código-yandex',
  //   bing: 'código-bing',
  // },
};

// ── EXPORTS Y METADATA PARA OPTIMIZACIÓN ──────────────────────────────────────
// Si Next.js 14+ lo soporta, puedes exportar generateMetadata para páginas dinámicas
// export async function generateMetadata({ params }): Promise<Metadata> { ... }

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}