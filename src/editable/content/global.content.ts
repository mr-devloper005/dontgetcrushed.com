import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Independent reading platform',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Curated bookmarks & collections',
    primaryLinks: [
      { label: 'Bookmarks', href: '/sbm' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Browse collections', href: '/sbm' },
      secondary: { label: 'Save a bookmark', href: '/create' },
    },
  },
  footer: {
    tagline: 'Curated bookmarks and collections',
    description: 'A clean home for the links worth keeping — save resources, organize them into collections, and rediscover them in seconds.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Bookmarks', href: '/sbm' },
          { label: 'Search', href: '/search' },
        ],
      },
      {
        title: 'Site',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Built for clean discovery and curated collections.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
