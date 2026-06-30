import type { CSSProperties } from 'react'

export const editableRootStyle = {
  // Revex-inspired system: clean white surfaces, a bright lime-green accent for
  // highlights/fills, a deep green-black for primary actions + dark sections,
  // soft greenish hairline borders, and generous radii. Flat, premium, modern.
  '--slot4-page-bg': '#ffffff',
  '--slot4-page-text': '#0c1c12',
  '--slot4-panel-bg': '#f3f8ec',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#566a5b',
  '--slot4-soft-muted-text': '#8a978c',
  // Readable green for eyebrows, links, icons (passes on white).
  '--slot4-accent': '#4f9d27',
  // Bright lime for highlight fills + badges (pairs with dark text).
  '--slot4-accent-fill': '#8fe140',
  '--slot4-accent-soft': '#edf8d6',
  '--slot4-on-accent': '#0c1c12',
  // Deep green-black: dark sections + primary (black) pill buttons.
  '--slot4-dark-bg': '#0c1c12',
  '--slot4-dark-text': '#f3f8ec',
  '--slot4-media-bg': '#eef2e8',
  '--slot4-cream': '#ffffff',
  '--slot4-warm': '#f3f8ec',
  '--slot4-lavender': '#ffffff',
  '--slot4-gray': '#f3f8ec',
  '--slot4-body-gradient': 'none',
  '--editable-page-bg': '#ffffff',
  '--editable-page-text': '#0c1c12',
  '--editable-container': '1240px',
  '--editable-border': '#e5ecdd',
  '--editable-nav-bg': '#ffffff',
  '--editable-nav-text': '#0c1c12',
  '--editable-nav-active': '#4f9d27',
  '--editable-nav-active-text': '#0c1c12',
  '--editable-cta-bg': '#0c1c12',
  '--editable-cta-text': '#ffffff',
  '--editable-search-bg': '#ffffff',
  '--editable-footer-bg': '#0c1c12',
  '--editable-footer-text': '#f3f8ec',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-fill)]',
  onAccentText: 'text-[var(--slot4-on-accent)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[var(--editable-border)]',
  darkBorder: 'border-white/10',
  shadow: 'shadow-[0_10px_40px_rgba(12,28,18,0.06)]',
  shadowStrong: 'shadow-[0_24px_70px_rgba(12,28,18,0.12)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.72))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-6 lg:px-8',
    sectionY: 'py-16 sm:py-20 lg:py-28',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[150px] shrink-0 snap-start sm:w-[170px]',
  },
  type: {
    eyebrow: 'text-[11px] font-bold uppercase tracking-[0.26em] text-[var(--slot4-accent)]',
    // Revex-style oversized uppercase display headline.
    heroTitle: 'editable-display text-[2.5rem] font-extrabold uppercase leading-[0.98] tracking-[-0.02em] sm:text-6xl lg:text-7xl',
    sectionTitle: 'editable-display text-3xl font-extrabold uppercase tracking-[-0.02em] sm:text-4xl lg:text-5xl',
    body: 'text-base leading-relaxed',
  },
  surface: {
    card: `rounded-3xl border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-3xl border ${editablePalette.border} ${editablePalette.panelBg}`,
    dark: `rounded-3xl ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    // Primary = Revex black pill.
    primary: `inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-dark-bg)] px-7 py-3.5 text-sm font-bold tracking-[0.01em] text-white transition duration-300 hover:shadow-[0_12px_30px_rgba(12,28,18,0.25)] hover:-translate-y-0.5 active:translate-y-0`,
    // Secondary = ghost / underlined.
    secondary: `inline-flex items-center justify-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-7 py-3.5 text-sm font-bold tracking-[0.01em] text-[var(--slot4-page-text)] transition duration-300 hover:border-[var(--slot4-accent)] hover:-translate-y-0.5 active:translate-y-0`,
    // Accent = Revex bright lime pill.
    accent: `inline-flex items-center justify-center gap-2 rounded-full ${editablePalette.accentBg} px-7 py-3.5 text-sm font-bold text-[var(--slot4-on-accent)] transition duration-300 hover:shadow-[0_12px_30px_rgba(143,225,64,0.4)] hover:-translate-y-0.5 active:translate-y-0`,
  },
  media: {
    frame: `relative overflow-hidden rounded-3xl ${editablePalette.mediaBg}`,
    ratio: 'aspect-[2/3]',
  },
  motion: {
    lift: 'transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(12,28,18,0.14)]',
    fade: 'transition duration-300 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'Change the full site color palette in editableRootStyle first; all sections consume those CSS variables.',
  'Keep page structure in src/editable/sections/HomeSections.tsx so AI can redesign the whole home experience in one file.',
  'Use wide readable grids; never create skinny columns for paragraphs or cards.',
  'Lead with large uppercase display headlines and lime-green highlights, like the Revex reference.',
  'Keep dynamic post fetching intact; do not replace posts with mock arrays.',
  'Use postHref() for all post links so task-specific routes keep working.',
] as const
