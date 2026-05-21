import { Metadata, Viewport } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import RootLayoutClient from "./RootLayoutClient";
import Script from "next/script";

const font = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
  variable: '--font-montserrat',
  display: 'swap',
});

// ─── JSON-LD ESTRUCTURADO (ESTRATEGIA HÍBRIDA: NACIONAL CON ANCLA LOCAL) ──────
// 
// FILOSOFÍA:
// Tu ubicación física en Vic NO es una debilidad, es tu PRUEBA DE CREDIBILIDAD.
// Google Ads nacional + presencia local verificada = Quality Score más alto.
// Un negocio "sin dirección" parece menos legítimo que uno con sede física clara.
//
// RESULTADO:
// - Apareces en búsquedas nacionales (Google Ads + SEO orgánico)
// - Mantienes autoridad local consolidada (ventaja competitiva)
// - Generas más confianza (negocio real vs. freelance sin ubicación)
// ──────────────────────────────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  
  "name": "Utilix",
  
  // AlternateName OPTIMIZADO para búsquedas de marca a nivel nacional
  "alternateName": [
    "Utilix Agencia Web",
    "Utilix Diseño Web",
    "Utilix España",
    "Utilix Studio"
  ],

  // Description: Nacional primero, local como respaldo de credibilidad
  "description": "Agencia de diseño web profesional. Creamos páginas web que traen clientes reales a tu negocio. Para autónomos y pymes en toda España. Sede en Vic, Barcelona.",

  "url": "https://utilix.es",
  "logo": "https://utilix.es/imagenes/logo.png",
  "image": "https://utilix.es/og-image.jpg",

  // Dirección física IMPRESCINDIBLE para:
  // 1. Verificación de Google My Business
  // 2. Credibilidad en anuncios de Google Ads
  // 3. Señal de confianza para usuarios nacionales
  // (Un negocio con sede física > freelance sin ubicación)
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Vic",
    "addressRegion": "Barcelona",
    "postalCode": "08500",
    "addressCountry": "ES"
  },

  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 41.9301,
    "longitude": 2.2549
  },

  // areaServed ESTRATÉGICO:
  // España primero (señal a Google: servicio nacional)
  // Regiones clave después (SEO de nivel medio)
  // Local al final (mantiene autoridad consolidada)
  "areaServed": [
    {
      "@type": "Country",
      "name": "España",
      "description": "Servicios de diseño web profesional para pymes y autónomos en toda España"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Comunidad de Madrid",
      "description": "Diseño web Madrid"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Comunidad Valenciana",
      "description": "Diseño web Valencia"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Andalucía",
      "description": "Diseño web Andalucía"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Catalunya",
      "description": "Diseño web Catalunya"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Barcelona",
      "description": "Diseño web Barcelona"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Osona",
      "description": "Diseño web Osona"
    },
    {
      "@type": "City",
      "name": "Vic",
      "description": "Agencia diseño web Vic"
    }
  ],

  "telephone": "+34711556444",
  "priceRange": "$$",
  
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "08:00",
    "closes": "18:00"
  },

  // hasOfferCatalog OPTIMIZADO para Google Ads + SEO Nacional
  // Keywords que bajan el CPC: "profesional", "negocios", "pymes"
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios de diseño web profesional",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Diseño web profesional para empresas",
        "description": "Páginas web corporativas de alto rendimiento enfocadas a conversión. Sin tecnicismos ni excusas. Servicio en toda España.",
        "areaServed": "España"
      },
      {
        "@type": "Offer",
        "name": "Desarrollo de tiendas online",
        "description": "E-commerce robustos y escalables diseñados para maximizar ventas. Montamos tu tienda online y te enseñamos a gestionarla.",
        "areaServed": "España"
      },
      {
        "@type": "Offer",
        "name": "Posicionamiento SEO para negocios",
        "description": "Optimización en buscadores para empresas que necesitan un flujo constante de clientes reales. SEO técnico y de contenidos.",
        "areaServed": "España"
      },
      {
        "@type": "Offer",
        "name": "Mantenimiento web integral",
        "description": "Soporte técnico, optimización de velocidad Core Web Vitals y seguridad gestionada para empresas y pymes en España.",
        "areaServed": "España"
      },
      {
        "@type": "Offer",
        "name": "Estrategia de redes sociales",
        "description": "Gestión de contenidos en redes sociales que convierten seguidores en clientes. Para negocios en toda España.",
        "areaServed": "España"
      }
    ]
  },

  "sameAs": [
    "https://www.instagram.com/utilixstudio/",
    "https://wa.me/34711556444"
  ],

  // Agregamos más señales de entidad profesional
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "27"
  }
};

// ─── METADATA PRINCIPAL (OPTIMIZADA PARA GOOGLE ADS NACIONAL + SEO) ───────────
//
// ESTRATEGIA DE KEYWORDS:
// 1. NACIONAL (80% del esfuerzo): términos de alto valor comercial
// 2. REGIONAL (15%): comunidades autónomas principales
// 3. LOCAL (5%): mantener autoridad Vic/Osona
//
// OBJETIVO CPC:
// - "diseño web profesional" → CPC objetivo: 1,20€-2,50€
// - "crear página web empresa" → CPC objetivo: 1,50€-3,00€
// - "diseño web para negocios" → CPC objetivo: 1,80€-3,50€
//
// Tu Quality Score subirá porque:
// - Metadata sincronizada con landing page
// - Contenido original y relevante
// - Señales de negocio legítimo (dirección, teléfono, horarios)
// ──────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://utilix.es'),

  title: {
    // TITLE OPTIMIZADO PARA CONVERSIÓN NACIONAL
    // Estructura: [Beneficio claro] | [Keyword comercial] | [Marca]
    // 
    // "Páginas web que traen clientes" = beneficio emocional ANTES que keyword
    // "Diseño web profesional" = keyword de alto valor comercial
    // "España" = señal geográfica para campañas nacionales
    //
    // EVITAMOS: "Diseño web España" (muy genérico, CPC alto, conversión baja)
    // USAMOS: Beneficio + profesionalidad + alcance
    default: "Páginas Web que Traen Clientes | Diseño Web Profesional España | Utilix",
    template: "%s | Utilix"
  },

  // Description OPTIMIZADA para CTR en Google Ads + SERP orgánico
  // 
  // Fórmula: [Acción + Beneficio] + [Target] + [Diferenciador] + [Cobertura]
  // 
  // "Creamos webs" → Activo, no pasivo
  // "traen clientes reales" → Beneficio medible, no vanity metrics
  // "pymes y autónomos" → Target específico (mejor CTR que "empresas")
  // "Sin tecnicismos ni excusas" → Tu diferenciador (copy potente de tus anuncios)
  // "En toda España" → Cobertura nacional clara
  description: "Creamos webs profesionales que traen clientes reales a tu negocio. Para pymes y autónomos en toda España. Sin tecnicismos, sin excusas. Trato directo desde Vic, Barcelona.",
  // 169 caracteres ✓ (óptimo: 150-160, pero tu diferenciador vale los 9 extra)

  // KEYWORDS REORGANIZADAS POR ESTRATEGIA
  keywords: [
    // ── TIER 1: ALTA INTENCIÓN COMERCIAL NACIONAL (Tu objetivo principal) ──
    // Estas keywords tienen búsquedas de gente lista para contratar
    "diseño web profesional",
    "crear página web profesional",
    "hacer página web para empresa",
    "diseño web para negocios",
    "desarrollo web profesional",
    "empresa diseño web",
    "agencia diseño web",
    "páginas web profesionales",
    "diseño web corporativo",
    "servicios diseño web",

    // ── TIER 2: LONG TAIL NACIONAL (Menor volumen, mayor conversión) ───────
    // Búsquedas específicas = menos competencia + mejor conversión
    "cuanto cuesta hacer una página web profesional",
    "diseño web sin tecnicismos",
    "web para mi negocio",
    "páginas web que venden",
    "web que atrae clientes",
    "presupuesto diseño web profesional",
    "empresa páginas web España",
    "diseño web para pymes",
    "diseño web para autónomos",

    // ── TIER 3: SERVICIOS ESPECÍFICOS NACIONAL ──────────────────────────────
    "tienda online profesional",
    "desarrollo ecommerce España",
    "mantenimiento web empresas",
    "posicionamiento SEO España",
    "optimización web profesional",
    "rediseño web profesional",

    // ── TIER 4: REGIONAL (Comunidades autónomas principales) ────────────────
    // Mantener presencia en regiones clave sin saturar
    "diseño web Madrid",
    "diseño web Barcelona",
    "diseño web Valencia",
    "diseño web Sevilla",
    "diseño web Málaga",
    "diseño web Zaragoza",
    "diseño web Bilbao",
    
    // ── TIER 5: CATALUNYA (Mercado natural por idioma y proximidad) ────────
    "disseny web Barcelona",
    "disseny web Catalunya",
    "disseny web professional",
    "pàgina web empresa Catalunya",

    // ── TIER 6: LOCAL (Autoridad consolidada, mantener pero no priorizar) ──
    "diseño web Vic",
    "diseño web Osona",
    "disseny web Vic",
    "página web Vic",
    "web Osona",

    // ── MARCA (Fundamental para remarketing y búsquedas directas) ───────────
    "Utilix",
    "Utilix web",
    "Utilix diseño web",
    "Utilix España",
    "Utilix agencia"
  ],

  // Canonical limpio
  alternates: {
    canonical: 'https://utilix.es',
  },

  // Google Search Console verificado
  verification: {
    google: "yIHejNo5cuZMal9UM0wf-SjiwYnK6RBAIsZGFK7VLwY",
  },

  // ── OPEN GRAPH (Para compartir en RRSS y WhatsApp) ─────────────────────────
  // Crítico para campañas de Google Ads con extensiones de red de display
  openGraph: {
    // Title corto y directo para RRSS
    title: "Utilix – Webs que traen clientes | Diseño Web Profesional España",
    
    // Description adaptada a share social (menos formal, más cercana)
    description: "Hacemos páginas web para pymes y autónomos que quieren más clientes. Trato directo, sin tecnicismos y sin excusas. En toda España.",
    
    url: 'https://utilix.es',
    siteName: 'Utilix',
    locale: 'es_ES',
    type: 'website',
    
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Utilix – Diseño web profesional para empresas y negocios en España'
    }],
  },

  // ── TWITTER / X ────────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Utilix – Webs que traen clientes | Diseño Web Profesional",
    description: "Páginas web para pymes y autónomos en toda España. Trato directo, sin tecnicismos.",
    images: ["/og-image.jpg"],
  },

  // ── ROBOTS (Maximizar visibilidad en Google) ───────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// ── VIEWPORT ──────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  themeColor: '#030303',
  width: 'device-width',
  initialScale: 1,
};

// ── ROOT LAYOUT ───────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`scroll-smooth ${font.variable}`}>
      <head>
        {/* Google Tag (gtag.js) - Google Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-942717987"
          strategy="afterInteractive"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-942717987');
          `}
        </Script>

        {/* JSON-LD — Datos estructurados */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Preconnects críticos para Core Web Vitals */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        
        {/* Preconnect a Google Ads para mejorar tiempo de carga del tracking */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <RootLayoutClient fontClassName={font.className}>
        {children}
      </RootLayoutClient>
    </html>
  );
}