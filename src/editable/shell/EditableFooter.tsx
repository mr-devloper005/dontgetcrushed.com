'use client'

import Link from 'next/link'
import { ArrowUpRight, Mail } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const PUBLIC_TASK_LABELS: Partial<Record<TaskKey, string>> = {
  sbm: 'Bookmarks',
  pdf: 'Resources',
  article: 'Articles',
  listing: 'Listings',
  classified: 'Marketplace',
  image: 'Gallery',
}
const HIDDEN_FROM_FOOTER: TaskKey[] = ['profile']

export function EditableFooter() {
  const taskLinks = SITE_CONFIG.tasks
    .filter((task) => task.enabled && !HIDDEN_FROM_FOOTER.includes(task.key))
    .map((task) => ({ label: PUBLIC_TASK_LABELS[task.key] || task.label, href: task.route }))
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()


  const exploreLinks = [{ label: 'Home', href: '/' }, ...taskLinks, { label: 'Search', href: '/search' }]
  const siteLinks = [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }]),
  ]

  return (
    <footer className="bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      {/* Newsletter / CTA band */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex w-full max-w-[var(--editable-container)] flex-col items-start justify-between gap-8 px-5 py-14 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <h2 className="editable-display max-w-xl text-3xl font-extrabold uppercase leading-[1.02] tracking-[-0.02em] sm:text-4xl">
            Save smarter. <span className="text-[var(--slot4-accent-fill)]">Stay organized.</span>
          </h2>
          <form action="/signup" className="flex w-full max-w-md items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 pl-5">
            <Mail className="h-4 w-4 shrink-0 text-white/50" />
            <input
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className="min-w-0 flex-1 bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/45"
            />
            <button className="shrink-0 rounded-full bg-[var(--slot4-accent-fill)] px-5 py-2.5 text-sm font-bold text-[var(--slot4-on-accent)] transition hover:brightness-105">
              Get started
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[var(--editable-container)] gap-12 px-5 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5">
            
              <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-6 w-6 object-contain" />
            
            <span className="editable-display text-xl font-extrabold tracking-[-0.03em]">{SITE_CONFIG.name}</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">{globalContent.footer?.description || SITE_CONFIG.description}</p>
         
        </div>

        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.26em] text-[var(--slot4-accent-fill)]">Explore</h3>
          <div className="mt-5 grid gap-2.5">
            {exploreLinks.map((item) => (
              <Link key={item.href} href={item.href} className="group inline-flex items-center gap-1.5 text-sm font-medium text-white/65 transition hover:text-white">
                {item.label}
                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.26em] text-[var(--slot4-accent-fill)]">Site</h3>
          <div className="mt-5 grid gap-2.5">
            {siteLinks.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-medium text-white/65 transition hover:text-white">
                {item.label}
              </Link>
            ))}
            {session ? (
              <button type="button" onClick={logout} className="text-left text-sm font-medium text-white/65 transition hover:text-white">
                Logout
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Oversized brand wordmark, Revex-style. */}
      <div className="mx-auto w-full max-w-[var(--editable-container)] overflow-hidden px-5 sm:px-6 lg:px-8">
        <p className="editable-display select-none truncate pb-2 text-[18vw] font-extrabold uppercase leading-[0.8] tracking-[-0.05em] text-white/[0.06] lg:text-[14rem]">
          {SITE_CONFIG.name}
        </p>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[var(--editable-container)] flex-col items-center justify-between gap-2 px-5 py-6 text-xs font-medium text-white/50 sm:flex-row sm:px-6 lg:px-8">
          <span>© {year} {SITE_CONFIG.name}. All rights reserved.</span>
          <span>{globalContent.footer?.bottomNote || 'Built for clean discovery and curated collections.'}</span>
        </div>
      </div>
    </footer>
  )
}
