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

// ESTRATEGIA DE DATOS ESTRUCTURADOS (JSON-LD) - Local Business + National Scope
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "UtiLiX",
  "alternateName": "UtiLiX Digital Architecture",
  "description": "Estudio de ingeniería digital de alta gama en Vic (Osona). Expertos en diseño web de autor y software escalable para toda España.",
  "url": "https://utilix.es",
  "logo": "https://utilix.es/logo.png",
  "image": "https://utilix.es/og-image.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Carrer de Vic", // Puedes poner tu calle o dejarlo así
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
    { "@type": "State", "name": "Cataluña" },
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
    "Next.js 16 Development",
    "Core Web Vitals Performance",
    "High-End Web Design Osona",
    "Technical SEO España",
    "UX/UI Luxury Architecture",
    "Desarrollo de Software a medida en Vic"
  ]
};

// SEO DE ÉLITE - ENFOQUE LOCAL & NACIONAL
export const metadata: Metadata = {
  title: {
    default: "UtiLiX | Diseño Web de Autor en Vic & Ingeniería Digital Premium",
    template: "%s | UtiLiX" 
  },
  description: "Lideramos la innovación digital desde Vic (Osona). Especialistas en desarrollo web premium con Next.js y performance extrema para marcas que buscan destacar en toda España.",
  keywords: [
    "Diseño web Vic",
    "Agencia digital Osona",
    "Desarrollo web de autor España",
    "Ingeniería digital premium",
    "Next.js Developer Barcelona",
    "UtiLiX Vic",
    "Software a medida Osona",
    "Estrategia digital de lujo",
    "Optimización Core Web Vitals"
  ],
  metadataBase: new URL('https://utilix.es'),
  alternates: { 
    canonical: '/',
  },
  twitter: {
    card: "summary_large_image",
    title: "UtiLiX | Arquitectura Digital de Alto Impacto",
    description: "Webs de alto rendimiento y diseño boutique. De Vic al mundo.",
    images: ["/og-image.jpg"], 
    creator: "@utilix"
  },
  openGraph: {
    title: "UtiLiX | Ingeniería Digital en Vic & Diseño Premium",
    description: "Elevamos marcas a través de tecnología de vanguardia y diseño de autor. Rendimiento 100/100 garantizado.",
    url: 'https://utilix.es',
    siteName: 'UtiLiX',
    locale: 'es_ES',
    type: 'website',
    images: [{ 
      url: '/og-image.jpg', 
      width: 1200, 
      height: 630, 
      alt: 'UtiLiX - Digital Luxury Architecture en Vic' 
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
        {/* Schema.org - ADN para Google Search Console */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {/* Usamos el componente cliente para manejar la lógica de fuentes y Providers */}
      <RootLayoutClient fontClassName={font.className}>
        {children}
      </RootLayoutClient>
    </html>
  );
}