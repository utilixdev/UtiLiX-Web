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

// ESTRATEGIA DE DATOS ESTRUCTURADOS (JSON-LD)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "UtiLiX",
  "alternateName": "UtiLiX Digital Architecture",
  "description": "Estudio de ingeniería digital en Vic. Especialistas en captación de clientes mediante diseño web de autor, e-commerce y auditorías de rendimiento para toda España.",
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
    "Auditoría de Captación Digital",
    "Next.js 16 Development",
    "Tiendas Online E-commerce",
    "Diseño Web Corporativo",
    "Estrategias de Conversión",
    "High-End Web Design Osona",
    "Technical SEO España",
    "Desarrollo de Software a medida en Vic"
  ]
};

export const metadata: Metadata = {
  title: {
    default: "UtiLiX | Diseño Web en Vic & Auditoría de Captación Digital",
    template: "%s | UtiLiX" 
  },
  description: "Ingeniería digital de autor en Vic (Osona). No solo creamos webs premium con Next.js, desbloqueamos tu captación de clientes con auditorías gratuitas y hojas de ruta estratégicas para toda España.",
  keywords: [
    "Diseño web Vic",
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
  },
  verification: {
    google: "yIHejNo5cuZMal9UM0wf-SjiwYnK6RBAIsZGFK7VLwY",
  },
  twitter: {
    card: "summary_large_image",
    title: "UtiLiX | Ingeniería Digital y Estrategia de Captación",
    description: "Webs de alto impacto y consultoría estratégica para captar más clientes. De Vic al mundo.",
    images: ["/og-image.jpg"], 
    creator: "@utilix"
  },
  openGraph: {
    title: "UtiLiX | Diseño Web en Vic & Ingeniería de Conversión",
    description: "Diseño web de autor y auditorías gratuitas. Detectamos qué bloquea tu crecimiento y lo solucionamos con tecnología Next.js de vanguardia.",
    url: 'https://utilix.es',
    siteName: 'UtiLiX',
    locale: 'es_ES',
    type: 'website',
    images: [{ 
      url: '/og-image.jpg', 
      width: 1200, 
      height: 630, 
      alt: 'UtiLiX - Auditoría y Diseño Web Profesional en Vic' 
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