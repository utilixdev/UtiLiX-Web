import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.utilix.es';

  return [
    // 01. HOME (Prioridad Máxima)
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          es: `${baseUrl}/es`,
          ca: `${baseUrl}/ca`,
        },
      },
    },
    // 02. FILOSOFÍA
    {
      url: `${baseUrl}/filosofia`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // 03. METODOLOGÍA
    {
      url: `${baseUrl}/metodologia`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // 04. SERVICIOS
    {
      url: `${baseUrl}/servicios`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9, // Alta prioridad porque es donde vendes
    },
    // 05. PROYECTOS
    {
      url: `${baseUrl}/proyectos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // ─── 06. SECCIÓN BLOG (Añadido para captación de leads) ──────────────────
    // La home del blog se actualiza a menudo cada vez que subes un post.
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },

    // ─── 07. ARTÍCULOS INDIVIDUALES DEL BLOG ─────────────────────────────────
    // Registramos las URLs exactas de tus contenidos dinámicos.
    // Damos prioridad 0.7 para que Google entienda que son contenidos de valor.
    {
      url: `${baseUrl}/blog/web-vs-instagram`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/boton-whatsapp`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/agencia-diseno-web`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // *Nota: Cuando crees un artículo nuevo en el futuro, añádelo aquí abajo igual que estos*

    // --- LEGALES (Prioridad Baja para no distraer a Google) ---
    {
      url: `${baseUrl}/legal/privacidad`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.1,
    },
    {
      url: `${baseUrl}/legal/aviso-legal`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.1,
    },
    {
      url: `${baseUrl}/legal/cookies`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.1,
    },
  ];
}