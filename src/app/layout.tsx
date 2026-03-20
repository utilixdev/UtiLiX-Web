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

// ESTRATEGIA DE DATOS ESTRUCTURADOS (JSON-LD) - OPTIMIZADA OSONA
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "UtiLiX",
  "alternateName": ["UtiLiX Digital Architecture", "UtiLiX Disseny Web Vic"],
  "description": "Estudi d'enginyeria digital a Vic. Especialistes en captació de clients, disseny web d'autor, e-commerce i auditories de rendiment a Osona i tota Espanya.",
  "url": "https://utilix.es",
  "logo": "https://utilix.es/logo.png",
  "image": "https://utilix.es/og-image.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Carrer de Vic", 
    "addressLocality": "Vic",
    "addressRegion": "Osona",
    "postalCode": "08500",
    "addressCountry": "ES"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 41.9301,
    "longitude": 2.2549
  },
  "areaServed": [
    { "@type": "City", "name": "Vic" },
    { "@type": "AdministrativeArea", "name": "Osona" },
    { "@type": "City", "name": "Manlleu" },
    { "@type": "City", "name": "Tona" },
    { "@type": "City", "name": "Torelló" },
    { "@type": "State", "name": "Catalunya" },
    { "@type": "Country", "name": "España" }
  ],
  "telephone": "+34711556444",
  "priceRange": "$$$",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "19:00"
  },
  "knowsAbout": [
    "Auditoría de Captación Digital",
    "Disseny Web Vic i Osona",
    "Next.js 16 Development",
    "Tiendas Online E-commerce",
    "Diseño Web Corporativo",
    "Estrategias de Conversión",
    "High-End Web Design Osona",
    "Technical SEO España",
    "Pàgines web a mida",
    "Desarrollo de Software a medida en Vic"
  ]
};

export const metadata: Metadata = {
  title: {
    // Título de impacto: Ataca la búsqueda local + el beneficio inmediato
    default: "Diseño Web en Vic y Osona | Auditoría de Captación | UtiLiX",
    template: "%s | UtiLiX" 
  },
  // Descripción enfocada a convertir el clic: Solución + Proximidad + Gancho
  description: "Estudio de ingeniería digital en Vic y Osona. No solo diseñamos webs premium; desbloqueamos tu captación de clientes con auditorías de rendimiento reales. Disseny web a mida per a empreses que busquen resultats.",
  keywords: [
    "Diseño web Vic",
    "Disseny web Vic",
    "Pàgines web Osona",
    "Auditoría digital gratuita Osona",
    "Captación de clientes online",
    "Crear tienda online Vic",
    "Páginas web para empresas",
    "Desarrollo web de autor España",
    "Ingeniería digital premium",
    "Next.js Developer Barcelona",
    "E-commerce profesional",
    "Estrategia de crecimiento digital",
    "Mantenimiento web Vic",
    "Software a medida Osona",
    "Posicionamiento SEO Barcelona"
  ],
  metadataBase: new URL('https://utilix.es'),
  alternates: { 
    canonical: '/',
    languages: {
      'es-ES': '/es',
      'ca-ES': '/ca',
    },
  },
  verification: {
    google: "yIHejNo5cuZMal9UM0wf-SjiwYnK6RBAIsZGFK7VLwY",
  },
  twitter: {
    card: "summary_large_image",
    title: "UtiLiX | Diseño Web Vic & Osona | Ingeniería de Captación",
    description: "Webs de alto impacto y consultoría estratégica para captar más clientes en Osona y toda España.",
    images: ["/og-image.jpg"], 
    creator: "@utilix"
  },
  openGraph: {
    title: "UtiLiX | Diseño Web en Vic y Osona | Ingeniería de Conversión",
    description: "Diseño web de autor y auditorías gratuitas. Detectamos qué bloquea tu crecimiento en Osona y lo solucionamos con Next.js.",
    url: 'https://utilix.es',
    siteName: 'UtiLiX',
    locale: 'es_ES',
    type: 'website',
    images: [{ 
      url: '/og-image.jpg', 
      width: 1200, 
      height: 630, 
      alt: 'UtiLiX - Auditoría y Diseño Web Profesional en Vic y Osona' 
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