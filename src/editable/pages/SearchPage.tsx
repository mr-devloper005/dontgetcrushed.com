import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Filter, Search, SearchX } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'
import { Ads } from '@/lib/ads'
import { pickAdSlot, AD_SLOT_POOLS } from '@/editable/ads/ad-placement'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const decodeHtmlEntities = (value: string) => value.replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (entity, code: string) => {
  if (code[0] === '#') {
    const radix = code[1]?.toLowerCase() === 'x' ? 16 : 10
    const numeric = Number.parseInt(code.slice(radix === 16 ? 2 : 1), radix)
    return Number.isFinite(numeric) && numeric >= 0 && numeric <= 0x10ffff ? String.fromCodePoint(numeric) : entity
  }
  return ({ amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' } as Record<string, string>)[code.toLowerCase()] || entity
})
const stripHtml = (value: string) => decodeHtmlEntities(value.replace(/<[^>]*>/g, ' '))
const plainText = (value: string) => stripHtml(value).replace(/\s+/g, ' ').trim()
const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const getImage = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.find((item) => typeof item?.url === 'string')?.url : ''
  const images = Array.isArray(content.images) ? content.images.find((item) => typeof item === 'string') as string | undefined : ''
  return media || compactRaw(content.featuredImage) || compactRaw(content.image) || compactRaw(content.thumbnail) || images || ''
}
const compactRaw = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const summaryOf = (post: SitePost) => plainText(post.summary || compactRaw(getContent(post).description) || compactRaw(getContent(post).excerpt) || '')

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  // Profiles stay reachable by direct URL but never surface in public search.
  if (derivedTask === 'profile') return false
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

function SearchResultCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  // Route from the task config (e.g. /sbm/<slug>); buildPostUrl can fall back
  // to /posts for tasks missing from the enabled taskViews map, which 404s.
  const taskRoute = SITE_CONFIG.tasks.find((item) => item.key === task)?.route
  const href = `${taskRoute || `/${task || 'sbm'}`}/${post.slug}`
  const image = getImage(post)
  const summary = summaryOf(post)
  const taskLabel = SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Resource'
  const strong = index % 5 === 0

  return (
    <Link
      href={href}
      className={`reveal group block overflow-hidden rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] shadow-[0_10px_40px_rgba(12,28,18,0.05)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(12,28,18,0.12)] ${strong ? 'md:col-span-2' : ''}`}
    >
      {image ? (
        <div className={`relative overflow-hidden bg-[var(--slot4-media-bg)] ${strong ? 'aspect-[16/7]' : 'aspect-[16/10]'}`}>
          <img src={image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(12,28,18,0.5))]" />
          <span className="absolute left-4 top-4 rounded-full bg-[var(--slot4-accent-fill)] px-3 py-1 text-[11px] font-bold text-[var(--slot4-on-accent)]">{taskLabel}</span>
        </div>
      ) : null}
      <div className="p-6">
        {!image ? <span className="inline-flex rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--slot4-accent)]">{taskLabel}</span> : null}
        <h2 className="editable-display mt-3 line-clamp-2 text-xl font-bold leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)] transition group-hover:text-[var(--slot4-accent)]">{post.title}</h2>
        {summary ? <p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{summary}</p> : null}
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--slot4-page-text)]">Open result <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
      </div>
    </Link>
  )
}

const fieldClass = 'min-w-0 flex-1 bg-transparent text-sm font-semibold text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-soft-muted-text)]'
const fieldShell = 'flex items-center gap-2.5 rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-3'

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.filter((item) => item.enabled).flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  // Profiles never surface in public search; keep it focused on collections.
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled && item.key !== 'profile')
  const adSlot = pickAdSlot(AD_SLOT_POOLS.search)

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className={`mx-auto w-full max-w-[var(--editable-container)] px-5 py-12 sm:px-6 lg:px-8 lg:py-16`}>
          <div className="overflow-hidden rounded-[2.5rem] border border-[var(--editable-border)] bg-[var(--slot4-dark-bg)] p-7 text-white sm:p-10 lg:p-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[var(--slot4-accent-fill)]">{pagesContent.search.hero.badge}</p>
            <h1 className="editable-display mt-5 max-w-2xl text-3xl font-extrabold uppercase leading-[1.02] tracking-[-0.02em] sm:text-5xl">{pagesContent.search.hero.title}</h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/65">{pagesContent.search.hero.description}</p>

            <form action="/search" className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-4 sm:p-5">
              <input type="hidden" name="master" value="1" />
              <label className="flex items-center gap-3 rounded-2xl bg-[var(--slot4-surface-bg)] px-4 py-3.5">
                <Search className="h-5 w-5 text-[var(--slot4-muted-text)]" />
                <input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className={fieldClass} />
              </label>
              <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
                <label className={fieldShell}>
                  <Filter className="h-4 w-4 text-[var(--slot4-muted-text)]" />
                  <input name="category" defaultValue={category} placeholder="Category" className={fieldClass} />
                </label>
                <select name="task" defaultValue={task} className="rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-3 text-sm font-bold text-[var(--slot4-page-text)] outline-none">
                  <option value="">All content types</option>
                  {enabledTasks.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
                </select>
                <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--slot4-accent-fill)] px-7 py-3 text-sm font-bold text-[var(--slot4-on-accent)] transition hover:brightness-105" type="submit">
                  Search
                </button>
              </div>
            </form>
          </div>

          <div className="mt-8 flex justify-center">
            <Ads slot={adSlot} showLabel className="w-full" />
          </div>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">{results.length} results</p>
              <h2 className="editable-display mt-2 text-2xl font-extrabold tracking-[-0.02em] sm:text-3xl">{query ? `Results for “${query}”` : pagesContent.search.resultsTitle}</h2>
            </div>
            <Link href="/sbm" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-5 py-2.5 text-sm font-bold transition hover:border-[var(--slot4-accent)]">Browse library <ArrowRight className="h-4 w-4" /></Link>
          </div>

          {results.length ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {results.map((post, index) => <SearchResultCard key={post.id || post.slug} post={post} index={index} />)}
            </div>
          ) : (
            <div className="mt-8 rounded-[2rem] border border-dashed border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-12 text-center">
              <SearchX className="mx-auto h-8 w-8 text-[var(--slot4-muted-text)]" />
              <p className="editable-display mt-5 text-2xl font-bold tracking-[-0.02em]">No matching resources found.</p>
              <p className="mt-3 text-sm text-[var(--slot4-muted-text)]">Try a different keyword, content type, or category.</p>
            </div>
          )}
        </section>
      </main>
    </EditableSiteShell>
  )
}
