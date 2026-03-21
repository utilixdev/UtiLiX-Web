import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://utilix.es';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      // Esto le dice a Google: "Si el usuario habla catalán, muéstrale esta versión"
      alternates: {
        languages: {
          es: `${baseUrl}/es`,
          ca: `${baseUrl}/ca`,
        },
      },
    },
    {
      url: `${baseUrl}/legal/privacidad`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.1, // Bajamos prioridad a legales para que Google se centre en la Home
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