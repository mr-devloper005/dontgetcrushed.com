import { slot4BrandConfig } from '@/editable/theme/brand.config'

const brand = slot4BrandConfig.siteName

export const pagesContent = {
  home: {
    metadata: {
      title: 'Save, organize, and rediscover the resources that matter',
      description: 'A clean home for curated bookmarks and collections — save links worth keeping, organize them into shelves, and rediscover them fast.',
      openGraphTitle: 'Curated bookmarks and collections, beautifully organized',
      openGraphDescription: 'Save the best links, build curated collections, and rediscover resources without the clutter.',
      keywords: ['social bookmarking', 'curated collections', 'save links', 'resource library', 'content discovery'],
    },
    hero: {
      badge: 'New · Curated collections',
      title: ['Quick clean and', 'clutter-free'],
      highlight: 'bookmarks',
      description: 'Save every link worth keeping, organize it into curated collections, and rediscover your resources the moment you need them — without the mess.',
      primaryCta: { label: 'Browse collections', href: '/sbm' },
      secondaryCta: { label: 'Learn more', href: '/about' },
      searchPlaceholder: 'Search bookmarks, collections, and resources',
      previewTitle: 'Quick Save',
      previewSubtitle: 'Latest from the library',
    },
    marquee: {
      label: 'Trusted by curators, researchers, and builders',
      tags: ['Design', 'Engineering', 'Marketing', 'Research', 'Productivity', 'Reading list', 'Tools', 'Inspiration'],
    },
    features: {
      badge: 'Why save here',
      title: ['Your organized and', 'fully searchable library'],
      description: 'A calmer way to keep what matters — every saved resource stays clean, contextual, and one search away.',
      items: [
        {
          key: 'curate',
          title: 'Curate with intent',
          description: 'Group links into themed collections so every resource has a home and nothing useful gets lost in a sea of tabs.',
        },
        {
          key: 'discover',
          title: 'Discover what matters',
          description: 'Surface fresh, hand-picked resources from the community and follow the threads that fit how you work.',
        },
        {
          key: 'search',
          title: 'Find it in seconds',
          description: 'Full-text search across titles, notes, and tags means the link you saved months ago is always one query away.',
        },
      ],
    },
    stats: {
      badge: 'At a glance',
      title: ['Built for fast', 'and focused saving'],
      // value is derived from real data where possible (see component); copy here.
      items: [
        { key: 'resources', suffix: '+', label: 'Saved resources' },
        { key: 'collections', value: 'Daily', label: 'Fresh additions' },
        { key: 'search', value: '< 1s', label: 'Average lookup' },
        { key: 'clutter', value: 'Zero', label: 'Clutter, by design' },
      ],
    },
    intro: {
      badge: 'About the library',
      title: 'Built for saving, organizing, and rediscovering the resources that matter.',
      paragraphs: [
        'This platform brings curated bookmarking together with clean collections, so visitors can save links, group them by theme, and move naturally between related resources.',
        'Instead of scattering useful links across browsers, tabs, and notes, everything stays connected in one tidy library with consistent navigation and instant search.',
        'Whether someone starts with a single resource, a curated collection, or a quick search, they can keep discovering what they need without friction.',
      ],
    },
    benefits: {
      badge: 'Digital workspace',
      title: ['One system built for', 'next-gen bookmarking'],
      description: 'Everything you save stays connected, contextual, and easy to act on — from the moment you bookmark it to the moment you need it again.',
      points: [
        'Curated collections that keep related links together.',
        'Clean reading-first cards with notes and source context.',
        'Fast full-text search across your entire library.',
        'Lightweight, distraction-free, and fast on every device.',
      ],
      primaryLink: { label: 'Browse collections', href: '/sbm' },
      secondaryLink: { label: 'Start saving', href: '/create' },
    },
    cta: {
      badge: 'Start curating',
      title: 'Got a resource worth keeping?',
      description: `Save it, organize it, and share it with the ${brand} community — building your library takes seconds.`,
      primaryCta: { label: 'Save a bookmark', href: '/create' },
      secondaryCta: { label: 'Contact us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest additions in this collection.',
    },
  },
  about: {
    badge: 'Our story',
    title: 'A calmer, clearer way to keep what matters.',
    description: `${brand} is built to make saving, organizing, and rediscovering resources feel effortless — a single, tidy home for the links worth keeping.`,
    paragraphs: [
      'Most useful links die in a forgotten tab or an endless bookmark folder. We started this to fix that — to give every saved resource a clean home and a reason to come back to it.',
      'Instead of scattering bookmarks across browsers and notes apps, the platform keeps them curated into collections, searchable in seconds, and easy to share with the people who need them.',
    ],
    values: [
      {
        title: 'Curation over clutter',
        description: 'We prioritize structure, context, and calm so your library stays useful as it grows — not overwhelming.',
      },
      {
        title: 'Connected collections',
        description: 'Resources, notes, and curators stay connected, so discovery feels natural and nothing useful gets buried.',
      },
      {
        title: 'Fast and trustworthy',
        description: 'Clean navigation and instant search help you find the right resource the moment you need it.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${brand}`,
    title: 'A support lane that matches what you are building.',
    description: 'Tell us what you are trying to save, organize, or launch. We will route it through the right lane instead of forcing every request into one generic bucket.',
    formTitle: 'Send a message',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search bookmarks, collections, topics, and resources across the library.',
    },
    hero: {
      badge: 'Search the library',
      title: 'Find the right resource, faster.',
      description: 'Search by keyword, topic, tag, or title to rediscover bookmarks and collections from across the platform.',
      placeholder: 'Search by keyword, topic, tag, or title',
    },
    resultsTitle: 'Latest from the library',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Save a new bookmark or build a collection on the platform.',
    },
    locked: {
      badge: 'Member access',
      title: 'Log in to save and curate.',
      description: 'Use your account to open the workspace and start saving resources into your collections.',
    },
    hero: {
      badge: 'Curator workspace',
      title: 'Save a resource worth keeping.',
      description: 'Add the link, give it context with a title, summary, and tags, and drop it into the right collection.',
    },
    formTitle: 'Resource details',
    submitLabel: 'Save resource',
    successTitle: 'Resource saved successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back to your library.',
      description: 'Log in to keep saving, organizing, and rediscovering the resources that matter to you.',
      formTitle: 'Log in',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then log in.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Get started',
      title: 'Create your account and start curating.',
      description: 'Build your account to save resources, organize collections, and share your best finds with the community.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Log in',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'More from this curator',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit official site',
    },
  },
} as const
