import Link from 'next/link'
import { ArrowRight, Bookmark, FolderOpen, Search, Sparkles } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const valueIcons = [FolderOpen, Sparkles, Search]

export default function AboutPage() {
  const about = pagesContent.about
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 -top-40 h-[520px] bg-[radial-gradient(55%_55%_at_50%_0%,rgba(143,225,64,0.16),transparent_70%)]" />
          <div className="relative mx-auto w-full max-w-[var(--editable-container)] px-5 pb-10 pt-16 text-center sm:px-6 sm:pt-24 lg:px-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[var(--slot4-accent)] shadow-sm">
              <Bookmark className="h-3.5 w-3.5" /> {about.badge}
            </span>
            <h1 className="editable-display mx-auto mt-7 max-w-4xl text-balance text-4xl font-extrabold uppercase leading-[0.98] tracking-[-0.02em] sm:text-6xl lg:text-7xl">
              {about.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[var(--slot4-muted-text)] sm:text-lg">{about.description}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/sbm" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-dark-bg)] px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5">Browse collections <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] px-7 py-3.5 text-sm font-bold transition hover:border-[var(--slot4-accent)]">Contact us</Link>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="mx-auto w-full max-w-[var(--editable-container)] px-5 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="reveal rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-8 shadow-[0_20px_60px_rgba(12,28,18,0.06)] lg:p-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[var(--slot4-accent)]">The mission</p>
              <h2 className="editable-display mt-4 text-2xl font-extrabold tracking-[-0.02em] sm:text-3xl">A home for the links worth keeping</h2>
              <div className="mt-6 space-y-4 text-base leading-7 text-[var(--slot4-muted-text)]">
                {about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
            <div className="reveal relative overflow-hidden rounded-[2rem] bg-[var(--slot4-dark-bg)] p-8 text-white lg:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(143,225,64,0.28),transparent_70%)]" />
              <p className="relative text-[11px] font-bold uppercase tracking-[0.26em] text-[var(--slot4-accent-fill)]">Why it matters</p>
              <p className="relative mt-5 editable-display text-2xl font-bold leading-snug tracking-[-0.01em] sm:text-3xl">
                Every saved resource stays clean, contextual, and one search away — so your best finds never get lost again.
              </p>
              <div className="relative mt-8 grid grid-cols-3 gap-4">
                {[['Curated', 'Collections'], ['Instant', 'Search'], ['Zero', 'Clutter']].map(([value, label]) => (
                  <div key={label}>
                    <p className="editable-display text-2xl font-extrabold text-[var(--slot4-accent-fill)]">{value}</p>
                    <p className="mt-1 text-xs font-medium text-white/60">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-[var(--slot4-panel-bg)]">
          <div className="mx-auto w-full max-w-[var(--editable-container)] px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="reveal max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[var(--slot4-accent)]">What we value</p>
              <h2 className="editable-display mt-4 text-3xl font-extrabold uppercase tracking-[-0.02em] sm:text-4xl">Principles that shape {SITE_CONFIG.name}</h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {about.values.map((value, index) => {
                const Icon = valueIcons[index] || Sparkles
                return (
                  <div key={value.title} className="reveal group rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(12,28,18,0.1)]" style={{ transitionDelay: `${index * 60}ms` }}>
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)] transition group-hover:scale-105">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="editable-display mt-6 text-xl font-bold tracking-[-0.01em]">{value.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
