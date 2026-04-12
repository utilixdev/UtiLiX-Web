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

// ─── JSON-LD ESTRUCTURADO ─────────────────────────────────────────────────────
// Google usa esto para entender quién eres, qué haces y dónde.
// Es uno de los factores más importantes para el Local Pack (mapa de Google).
// Mantener sincronizado con la ficha de Google My Business.
// ─────────────────────────────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",

  // ProfessionalService es más específico que LocalBusiness —
  // Google lo usa para mostrar servicios en Knowledge Panel.
  "@type": "ProfessionalService",

  "name": "Utilix",

  // alternateName ayuda a que Google entienda variaciones de búsqueda:
  // alguien puede buscar "Utilix Vic", "Utilix web", "Utilix Osona"
  "alternateName": [
    "Utilix Vic",
    "Utilix Osona",
    "Utilix diseño web",
    "Utilix webs"
  ],

  // Description optimizada para entidades — Google la usa en Knowledge Panel.
  // Lenguaje directo, sin tecnicismos, con ubicaciones clave.
  "description": "Creamos webs que traen clientes reales a tu negocio. Para autónomos y pymes en Vic, Osona, Barcelona y toda España. Trato directo, sin tecnicismos y sin letra pequeña.",

  "url": "https://utilix.es",
  "logo": "https://utilix.es/imagenes/logo.png",
  "image": "https://utilix.es/og-image.jpg",

  // Dirección física — crítica para SEO local.
  // Debe coincidir EXACTAMENTE con la ficha de Google My Business.
  // Si cambias algo aquí, cámbialo también en GMB.
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Vic",
    "addressRegion": "Osona",
    "postalCode": "08500",
    "addressCountry": "ES"
  },

  // Coordenadas — refuerzan la señal local para el mapa de Google.
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 41.9301,
    "longitude": 2.2549
  },

  // areaServed — de lo local a lo nacional, en orden de relevancia.
  // Google lo usa para decidir en qué búsquedas geolocalizadas mostrarte.
  "areaServed": [
    { "@type": "City", "name": "Vic" },
    { "@type": "AdministrativeArea", "name": "Osona" },
    { "@type": "City", "name": "Manlleu" },
    { "@type": "City", "name": "Torelló" },
    { "@type": "City", "name": "Tona" },
    { "@type": "City", "name": "Vic" },
    { "@type": "AdministrativeArea", "name": "Barcelona" },
    { "@type": "AdministrativeArea", "name": "Catalunya" },
    { "@type": "Country", "name": "España" }
  ],

  // Teléfono — debe coincidir con GMB y con lo que aparece en la web.
  // Google cruza los tres puntos. Si no coinciden, baja tu puntuación local.
  "telephone": "+34711556444",

  // priceRange — Google lo muestra en el Knowledge Panel.
  // $$ = precio medio, $$$ = premium. Elige según tu posicionamiento.
  "priceRange": "$$",

  // Horario — debe coincidir con GMB.
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "08:00",
    "closes": "18:00"
  },

  // hasOfferCatalog — ayuda a Google a mostrar tus servicios en Rich Results.
  // Escrito en lenguaje de cliente, no de proveedor.
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios web para negocios",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Diseño web para negocios",
        "description": "Webs modernas y rápidas que atraen clientes. Para autónomos y pymes en Vic, Osona y España."
      },
      {
        "@type": "Offer",
        "name": "Tiendas online",
        "description": "Vende tus productos sin depender del horario. Montamos tu tienda y te enseñamos a gestionarla."
      },
      {
        "@type": "Offer",
        "name": "SEO local para negocios",
        "description": "Aparece cuando te buscan en Google. Optimizamos tu web para que te encuentren en Vic, Osona y tu zona."
      },
      {
        "@type": "Offer",
        "name": "Mantenimiento web",
        "description": "Nos ocupamos de todo para que no tengas que pensar en la tecnología. Actualizaciones, seguridad y soporte directo."
      },
      {
        "@type": "Offer",
        "name": "Redes sociales para negocios",
        "description": "Estrategia de contenidos que convierte seguidores en clientes. Para negocios locales en Osona y España."
      }
    ]
  },

  // sameAs — ayuda a Google a construir tu entidad de marca.
  // Añade todas las URLs donde Utilix tiene presencia.
  "sameAs": [
    "https://www.instagram.com/utilix.tech/",
    "https://wa.me/34679958614"
    // Cuando tengas LinkedIn, Facebook o Google My Business URL, añádelos aquí
  ]
};

// ─── METADATA PRINCIPAL ───────────────────────────────────────────────────────
// Esta es la metadata de la página raíz (/).
// Los layouts de cada sección (servicios, proyectos, etc.) la sobreescriben
// gracias al sistema de metadata en cascada de Next.js App Router.
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {

  // metadataBase es obligatorio para que las URLs relativas (OG image, etc.)
  // se resuelvan correctamente en producción y en Vercel previews.
  metadataBase: new URL('https://utilix.es'),

  title: {
    // Title de la home — ataca la búsqueda local principal.
    // Estructura: [Keyword local] | [Marca] – [Beneficio directo]
    // "Diseño web Vic" = ~90 búsquedas/mes, competencia baja = posicionable.
    // "Diseño web Osona" = ~50 búsquedas/mes, prácticamente sin competencia.
    // "Diseño web Barcelona" = ~1.600 búsquedas/mes, competencia alta pero
    // con el tiempo y el contenido se puede rankear.
    default: "Diseño web en Vic y Osona | Webs que traen clientes | Utilix",

    // template se aplica a todas las páginas hijas que no tienen title propio.
    // El formato "%s | Utilix" mantiene la marca en todos los resultados.
    template: "%s | Utilix"
  },

  // Description de la home — debe responder a la búsqueda real del cliente:
  // "quiero una web que me traiga clientes", "diseño web Vic", "web para mi negocio".
  // Incluye: beneficio + ubicaciones + diferenciador + CTA implícito.
  // Entre 140-160 caracteres para que no se corte en los SERPs de Google.
  description: "Creamos webs que traen clientes reales a tu negocio. Para autónomos y pymes en Vic, Osona, Barcelona y toda España. Trato directo, sin tecnicismos y sin excusas.",
  // 159 caracteres ✓

  // Keywords — Google no las usa para ranking pero sí Bing, DuckDuckGo y otros.
  // Estrategia: local primero (fácil de ganar), luego nacional (largo plazo).
  keywords: [
    // ── LOCAL — Vic y Osona (victorias rápidas, 2-8 semanas) ──────────────
    "diseño web Vic",
    "disseny web Vic",           // en catalán — búsquedas reales en la comarca
    "página web Vic",
    "pàgina web Osona",
    "diseño web Osona",
    "crear web Vic",
    "web para negocios Vic",
    "diseño web Manlleu",
    "web Torelló",
    "diseño web comarca Osona",

    // ── BARCELONA Y CATALUÑA (medio plazo, 2-6 meses) ────────────────────
    "diseño web Barcelona",
    "diseño web Catalunya",
    "empresa diseño web Barcelona",
    "web para pymes Barcelona",
    "diseño web profesional Catalunya",

    // ── NACIONAL — España (largo plazo, 6-18 meses) ──────────────────────
    "diseño web para negocios",
    "diseño web pymes España",
    "página web autónomos España",
    "crear página web empresa España",
    "diseño web profesional España",
    "web que atrae clientes",

    // ── LONG TAIL — intención de compra alta, competencia baja ───────────
    "diseño web sin tecnicismos",
    "web para mi negocio",
    "quiero una web para mi empresa",
    "hacer web para autónomo",
    "tienda online para negocios España",
    "mantenimiento web para empresas",
    "SEO local para negocios",
    "web que vende clientes",

    // ── MARCA ─────────────────────────────────────────────────────────────
    "Utilix",
    "Utilix web",
    "Utilix Vic",
    "Utilix diseño web",
  ],

  // Canonical de la home — siempre URL absoluta.
  alternates: {
    canonical: 'https://utilix.es',
    // Cuando tengas versión en catalán, descomenta:
    // languages: {
    //   'es-ES': 'https://utilix.es',
    //   'ca-ES': 'https://utilix.es/ca',
    // },
  },

  // Verificación de Google Search Console — no tocar, está bien.
  verification: {
    google: "yIHejNo5cuZMal9UM0wf-SjiwYnK6RBAIsZGFK7VLwY",
  },

  // ── OPEN GRAPH ─────────────────────────────────────────────────────────────
  // Controla cómo se ve cuando alguien comparte la URL en WhatsApp,
  // LinkedIn, Facebook, etc. Crítico para campañas de Google Ads también.
  openGraph: {
    title: "Utilix – Webs que traen clientes reales | Vic, Osona y España",
    description: "Hacemos webs para autónomos y pymes que quieren más clientes. Sin tecnicismos, sin excusas. Vic, Osona, Barcelona y toda España.",
    url: 'https://utilix.es',
    siteName: 'Utilix',
    locale: 'es_ES',
    type: 'website',
    images: [{
      url: '/og-image.jpg',   // Coloca en /public/og-image.jpg — 1200x630px
      width: 1200,
      height: 630,
      alt: 'Utilix – Diseño web para negocios en Vic, Osona y España'
    }],
  },

  // ── TWITTER / X ────────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Utilix – Webs que traen clientes | Vic y Osona",
    description: "Webs para autónomos y pymes en Vic, Osona y España. Trato directo, sin tecnicismos.",
    images: ["/og-image.jpg"],
    // Si tienes cuenta en X/Twitter: creator: "@utilix_web"
  },

  // ── ROBOTS ─────────────────────────────────────────────────────────────────
  // max-snippet:-1 = Google puede usar fragmento de cualquier longitud en SERPs
  // max-image-preview:large = Google puede mostrar imagen grande = más espacio visual
  // max-video-preview:-1 = Google puede mostrar preview completa del vídeo hero
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
// themeColor controla el color de la barra del navegador en móvil.
// Debe coincidir con el background de tu página.
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

        {/* JSON-LD — datos estructurados para Google Knowledge Panel y Local Pack */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/*
         * Preconnect a dominios externos críticos para la velocidad de carga.
         * Google penaliza páginas lentas — cada ms cuenta para el Core Web Vitals.
         * Añade aquí cualquier dominio de fuente externa que uses (fonts, analytics...).
         */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/*
         * Si usas la imagen de Unsplash en el parallax de /servicios,
         * preconnect a Unsplash también mejora el LCP (Largest Contentful Paint).
         */}
        <link rel="preconnect" href="https://images.unsplash.com" />

        {/* Favicon — coloca estos archivos en /public/ */}
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