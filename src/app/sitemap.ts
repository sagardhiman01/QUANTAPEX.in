import { MetadataRoute } from 'next';
import { CITIES } from '../lib/cities';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://quantapex.in';

  // Base pages
  const basePages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/#analyze`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#sales`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
  ];

  // Dynamic PSEO pages for 200+ cities
  const cityPages = CITIES.map((city) => ({
    url: `${baseUrl}/agency/${city.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...basePages, ...cityPages];
}
