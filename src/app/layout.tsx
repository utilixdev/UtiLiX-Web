import { Metadata, Viewport } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import RootLayoutClient from "./RootLayoutClient";

const font = Montserrat({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "700", "800", "900"],
  variable: '--font-montserrat',
  display: 'swap', 
});

// ESTRATEGIA DE DATOS ESTRUCTURADOS (JSON-LD) - El "ADN" para Google
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "UtiLiX",
  "alternateName": "UtiLiX Digital Architecture",
  "description": "Agencia boutique especializada en ingeniería digital de alta gama, diseño web de autor y performance SEO técnico.",
  "url": "https://utilix.es",
  "logo": "https://utilix.es/logo.png", // Asegúrate de tener tu logo en public
  "image": "https://utilix.es/og-image.jpg",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Barcelona",
    "addressRegion": "Cataluña",
    "addressCountry": "ES"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 41.3851,
    "longitude": 2.1734
  },
  "telephone": "+34679958614",
  "priceRange": "$$$",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "19:00"
  },
  "knowsAbout": [
    "Next.js Development",
    "Core Web Vitals Optimization",
    "High-End Web Design",
    "Technical SEO",
    "UX/UI Luxury Design"
  ]
};

// SEO DE ÉLITE 2026 - CONFIGURACIÓN AVANZADA
export const metadata: Metadata = {
  title: {
    default: "UtiLiX | Agencia de Desarrollo Web de Autor & Performance SEO",
    template: "%s | UtiLiX" 
  },
  description: "Expertos en ingeniería digital de alta gama. Diseño web de autor con Next.js, rendimiento Core Web Vitals 100 y estrategias de SEO técnico para marcas líderes.",
  keywords: [
    "Desarrollo web de autor", 
    "Diseño web premium", 
    "SEO técnico avanzado", 
    "Next.js Boutique España", 
    "UtiLiX",
    "Estrategia digital de lujo",
    "Optimización Core Web Vitals",
    "Agencia Next.js Barcelona"
  ],
  metadataBase: new URL('https://utilix.es'),
  alternates: { 
    canonical: '/',
  },
  twitter: {
    card: "summary_large_image",
    title: "UtiLiX | Ingeniería Digital de Alta Gama",
    description: "Webs de alto impacto con rendimiento extremo y diseño boutique.",
    images: ["/og-image.jpg"], 
    creator: "@utilix"
  },
  openGraph: {
    title: "UtiLiX | Ingeniería Digital de Alta Gama",
    description: "Webs que dominan el mercado. Rendimiento extremo y diseño impecable de autor.",
    url: 'https://utilix.es',
    siteName: 'UtiLiX',
    locale: 'es_ES',
    type: 'website',
    images: [{ 
      url: '/og-image.jpg', 
      width: 1200, 
      height: 630, 
      alt: 'UtiLiX - Digital Luxury Architecture' 
    }],
  },
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

export const viewport: Viewport = {
  themeColor: '#030303',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`scroll-smooth ${font.variable}`}>
      <head>
        {/* Inyección de JSON-LD: Imprescindible para aparecer con snippets enriquecidos */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <RootLayoutClient fontClassName={font.className}>
        {children}
      </RootLayoutClient>
    </html>
  );
}