import Link from 'next/link'
import {
  ArrowRight, ArrowUpRight, Bookmark, FolderOpen, Globe, Layers, Search, Sparkles, Zap,
} from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditablePostImage, postHref } from '@/editable/cards/PostCards'
import { EditableHeroCollage } from '@/editable/sections/EditableHeroCollage'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-6 lg:px-8'

/* ------------------------------- helpers ------------------------------- */
function getExcerpt(post?: SitePost | null, limit = 130) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

function categoryOf(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || ''
}

function domainOf(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw = (typeof content.website === 'string' && content.website) || (typeof content.url === 'string' && content.url) || (typeof content.link === 'string' && content.link) || ''
  return raw ? raw.replace(/^https?:\/\//, '').replace(/\/.*$/, '').replace(/^www\./, '') : ''
}

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

function latestPostImages(posts: SitePost[], max = 6) {
  const seen = new Set<string>()
  const out: string[] = []
  for (const post of posts) {
    const img = getEditablePostImage(post)
    if (!img || img.includes('placeholder') || seen.has(img)) continue
    seen.add(img)
    out.push(img)
    if (out.length >= max) break
  }
  return out
}

/* ------------------------------- shared cards ------------------------------- */
function BookmarkCard({ post, href }: { post: SitePost; href: string }) {
  const category = categoryOf(post)
  const domain = domainOf(post)
  const image = getEditablePostImage(post)
  const hasImage = image && !image.includes('placeholder')
  return (
    <Link
      href={href}
      className="reveal group flex flex-col overflow-hidden rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(12,28,18,0.12)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--slot4-media-bg)]">
        {hasImage ? (
          <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]" loading="lazy" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Bookmark className="h-9 w-9 text-[var(--slot4-soft-muted-text)]" />
          </div>
        )}
        {category ? (
          <span className="absolute left-3 top-3 rounded-full bg-[var(--slot4-accent-fill)] px-3 py-1 text-[11px] font-bold text-[var(--slot4-on-accent)] shadow-sm">{category}</span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        {domain ? <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--slot4-accent)]">{domain}</p> : null}
        <h3 className="editable-display mt-1.5 line-clamp-2 text-lg font-bold leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)] transition group-hover:text-[var(--slot4-accent)]">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-[var(--slot4-muted-text)]">{getExcerpt(post, 120)}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--slot4-page-text)]">
          Open resource <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  )
}

/* --------------------------------- Hero --------------------------------- */
export function EditableHomeHero({ posts, timeSections }: HomeSectionProps) {
  const hero = pagesContent.home.hero
  const marquee = pagesContent.home.marquee
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const heroImages = latestPostImages(pool)
  const previewPosts = pool.slice(0, 3)
  const titleLines = hero.title

  return (
    <section className="relative overflow-hidden">
      {/* soft radial green glow behind hero */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-[640px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(143,225,64,0.18),transparent_70%)]" />

      <div className={`relative grid gap-12 pb-10 pt-14 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-16 ${container}`}>
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] py-1.5 pl-1.5 pr-4 text-sm font-semibold text-[var(--slot4-page-text)] shadow-sm">
            <span className="rounded-full bg-[var(--slot4-accent-fill)] px-3 py-1 text-xs font-bold text-[var(--slot4-on-accent)]">New</span>
            {hero.badge.replace(/^New[·\s]*/i, '')}
          </span>

          <h1 className="editable-display mt-7 text-balance text-[2.7rem] font-extrabold uppercase leading-[0.98] tracking-[-0.02em] text-[var(--slot4-page-text)] sm:text-6xl lg:text-[4.4rem]">
            {titleLines[0]}{' '}
            <span className="inline-block">
              {titleLines[1]}{' '}
              <span className="relative inline-block rounded-2xl bg-[var(--slot4-accent-soft)] px-3 text-[var(--slot4-accent)]">{hero.highlight}</span>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-[var(--slot4-muted-text)] sm:text-lg">{hero.description}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href={hero.primaryCta.href} className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-dark-bg)] px-7 py-3.5 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(12,28,18,0.25)]">
              {hero.primaryCta.label} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={hero.secondaryCta.href} className="inline-flex items-center gap-2 text-sm font-bold text-[var(--slot4-page-text)] underline decoration-[var(--slot4-accent-fill)] decoration-2 underline-offset-[6px] transition hover:text-[var(--slot4-accent)]">
              {hero.secondaryCta.label}
            </Link>
          </div>

          <form action="/search" className="mt-8 flex w-full max-w-md items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-1.5 pl-5 shadow-[0_10px_40px_rgba(12,28,18,0.06)]">
            <Search className="h-4 w-4 shrink-0 text-[var(--slot4-muted-text)]" />
            <input name="q" placeholder={hero.searchPlaceholder} className="min-w-0 flex-1 bg-transparent py-2 text-sm text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-soft-muted-text)]" />
            <button className="shrink-0 rounded-full bg-[var(--slot4-accent-fill)] px-5 py-2.5 text-sm font-bold text-[var(--slot4-on-accent)] transition hover:brightness-105">Search</button>
          </form>
        </div>

        {/* Floating preview card (Revex-style) */}
        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-[radial-gradient(70%_70%_at_50%_30%,rgba(143,225,64,0.22),transparent_75%)]" />
          <div className="overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] shadow-[0_40px_90px_rgba(12,28,18,0.16)]">
            <div className="relative aspect-[16/9] bg-[var(--slot4-media-bg)]">
              <EditableHeroCollage images={heroImages} />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(12,28,18,0.35))]" />
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[var(--slot4-page-text)] shadow">
                <Bookmark className="h-3.5 w-3.5 text-[var(--slot4-accent)]" /> {hero.previewTitle}
              </div>
            </div>
            <div className="p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--slot4-muted-text)]">{hero.previewSubtitle}</p>
              <div className="mt-3 grid gap-2.5">
                {previewPosts.length ? (
                  previewPosts.map((post) => (
                    <div key={post.id || post.slug} className="flex items-center gap-3 rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-3.5 py-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
                        <Globe className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-bold text-[var(--slot4-page-text)]">{post.title}</span>
                        <span className="block truncate text-xs text-[var(--slot4-muted-text)]">{domainOf(post) || categoryOf(post) || 'Saved resource'}</span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--slot4-accent)]" />
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-[var(--editable-border)] px-3.5 py-6 text-center text-sm text-[var(--slot4-muted-text)]">
                    Fresh resources will appear here as they are saved.
                  </div>
                )}
              </div>
              <Link href={pagesContent.home.hero.primaryCta.href} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-5 py-3 text-sm font-bold text-[var(--slot4-on-accent)] transition hover:brightness-105">
                View the library <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* tag marquee band */}
      <div className="border-y border-[var(--editable-border)] bg-[var(--slot4-panel-bg)]">
        <div className={`flex flex-col gap-4 py-5 ${container}`}>
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--slot4-muted-text)]">{marquee.label}</p>
          <div className="editable-marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
            <div className="editable-marquee-track gap-3 pr-3">
              {[...marquee.tags, ...marquee.tags].map((tag, index) => (
                <span key={`${tag}-${index}`} className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-2 text-sm font-semibold text-[var(--slot4-page-text)]">
                  <Sparkles className="h-3.5 w-3.5 text-[var(--slot4-accent)]" /> {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------- Features + Stats (dark) ----------------------- */
const featureIcons = [FolderOpen, Sparkles, Search]

export function EditableStoryRail({ posts, timeSections }: HomeSectionProps) {
  const features = pagesContent.home.features
  const stats = pagesContent.home.stats
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const resourceCount = pool.length

  const statValue = (key: string, fallback?: string) => {
    if (key === 'resources') return `${Math.max(resourceCount, 1)}`
    return fallback || ''
  }

  return (
    <section className="bg-[var(--slot4-dark-bg)] text-[var(--slot4-dark-text)]">
      <div className={`py-20 sm:py-24 lg:py-28 ${container}`}>
        <div className="reveal max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[var(--slot4-accent-fill)]">{features.badge}</p>
          <h2 className="editable-display mt-5 text-3xl font-extrabold uppercase leading-[1.02] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
            {features.title[0]}<br />{features.title[1]}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/65">{features.description}</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {features.items.map((item, index) => {
            const Icon = featureIcons[index] || Bookmark
            return (
              <div key={item.key} className="reveal group rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition duration-500 hover:-translate-y-1.5 hover:border-[var(--slot4-accent-fill)]/40 hover:bg-white/[0.06]" style={{ transitionDelay: `${index * 60}ms` }}>
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--slot4-accent-fill)] text-[var(--slot4-on-accent)] transition group-hover:scale-105">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="editable-display mt-6 text-xl font-bold tracking-[-0.01em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/60">{item.description}</p>
              </div>
            )
          })}
        </div>

        {/* Stats band */}
        <div className="mt-8 grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:grid-cols-2 lg:grid-cols-4 lg:p-8">
          {stats.items.map((item) => (
            <div key={item.key} className="reveal text-center">
              <p className="editable-display text-4xl font-extrabold tracking-[-0.03em] text-[var(--slot4-accent-fill)] sm:text-5xl">
                {statValue(item.key, 'value' in item ? (item as { value?: string }).value : '')}
                {'suffix' in item ? (item as { suffix?: string }).suffix : ''}
              </p>
              <p className="mt-2 text-sm font-medium text-white/60">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --------------- Benefits split + Featured library item ---------------- */
export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const benefits = pagesContent.home.benefits
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const featured = pool[0]
  const featuredImage = featured ? getEditablePostImage(featured) : ''
  const hasFeaturedImage = featuredImage && !featuredImage.includes('placeholder')

  return (
    <section className="bg-[var(--slot4-surface-bg)]">
      <div className={`py-20 sm:py-24 ${container}`}>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div className="reveal">
            <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[var(--slot4-accent)]">{benefits.badge}</p>
            <h2 className="editable-display mt-5 text-3xl font-extrabold uppercase leading-[1.02] tracking-[-0.02em] text-[var(--slot4-page-text)] sm:text-4xl lg:text-5xl">
              {benefits.title[0]}<br />{benefits.title[1]}
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-[var(--slot4-muted-text)]">{benefits.description}</p>
            <ul className="mt-7 grid gap-3">
              {benefits.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm font-medium text-[var(--slot4-page-text)]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
                    <Zap className="h-3 w-3" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={benefits.primaryLink.href} className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-dark-bg)] px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5">
                {benefits.primaryLink.label} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={benefits.secondaryLink.href} className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] px-6 py-3 text-sm font-bold text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)]">
                {benefits.secondaryLink.label}
              </Link>
            </div>
          </div>

          {featured ? (
            <Link href={postHref(primaryTask, featured, primaryRoute)} className="reveal group relative block overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] shadow-[0_30px_70px_rgba(12,28,18,0.12)]">
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--slot4-media-bg)]">
                {hasFeaturedImage ? (
                  <img src={featuredImage} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
                ) : (
                  <div className="flex h-full items-center justify-center"><Layers className="h-12 w-12 text-[var(--slot4-soft-muted-text)]" /></div>
                )}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(12,28,18,0.82))]" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--slot4-accent-fill)] px-3 py-1 text-[11px] font-bold text-[var(--slot4-on-accent)]">
                    <Sparkles className="h-3 w-3" /> Featured save
                  </span>
                  <h3 className="editable-display mt-3 line-clamp-2 text-2xl font-bold leading-tight tracking-[-0.01em] text-white">{featured.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/75">{getExcerpt(featured, 140)}</p>
                </div>
              </div>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  )
}

/* --------------------- Time-based library collections -------------------- */
const sectionCopy: Record<string, { eyebrow: string; title: string }> = {
  spotlight: { eyebrow: 'Fresh this week', title: 'New in the last 7 days' },
  browse: { eyebrow: 'Trending now', title: 'Popular this month' },
  index: { eyebrow: 'Evergreen', title: 'From the archive' },
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 8), href: primaryRoute },
          { key: 'browse', posts: posts.slice(8, 16), href: primaryRoute },
          { key: 'index', posts: posts.slice(16, 24), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((section) => section.posts.length)
  if (!visible.length) return null

  return (
    <>
      {visible.map((section, index) => {
        const copy = sectionCopy[section.key] || { eyebrow: 'Discover', title: 'More to explore' }
        return (
          <section key={section.key} className={index % 2 === 0 ? 'bg-[var(--slot4-panel-bg)]' : 'bg-[var(--slot4-surface-bg)]'}>
            <div className={`py-16 sm:py-20 ${container}`}>
              <div className="reveal flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--slot4-accent)]">{copy.eyebrow}</p>
                  <h2 className="editable-display mt-2 text-2xl font-extrabold uppercase tracking-[-0.02em] sm:text-4xl">{copy.title}</h2>
                </div>
                <Link href={section.href || primaryRoute} className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-2 text-sm font-bold text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)]">
                  See all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.posts.slice(0, 8).map((post) => (
                  <BookmarkCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}

/* -------------------------------- CTA band ------------------------------ */
export function EditableHomeCta() {
  const cta = pagesContent.home.cta
  return (
    <section id="get-app" className="scroll-mt-24 bg-[var(--slot4-surface-bg)]">
      <div className={`py-16 sm:py-20 ${container}`}>
        <div className="reveal relative overflow-hidden rounded-[2.5rem] bg-[var(--slot4-dark-bg)] px-6 py-16 text-center sm:px-10 sm:py-20">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(143,225,64,0.3),transparent_70%)]" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(143,225,64,0.18),transparent_70%)]" />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--slot4-accent-fill)]">
              <Sparkles className="h-3.5 w-3.5" /> {cta.badge}
            </span>
            <h2 className="editable-display text-3xl font-extrabold uppercase leading-[1.02] tracking-[-0.02em] text-white sm:text-5xl">{cta.title}</h2>
            <p className="max-w-xl text-base leading-7 text-white/65 sm:text-lg">{cta.description}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href={cta.primaryCta.href} className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-7 py-3.5 text-sm font-bold text-[var(--slot4-on-accent)] transition hover:-translate-y-0.5 hover:brightness-105">
                {cta.primaryCta.label} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={cta.secondaryCta.href} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10">
                {cta.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
