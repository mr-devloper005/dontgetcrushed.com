import type { Metadata } from 'next'
import Link from 'next/link'
import { Bookmark, FolderOpen, Search, Sparkles } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

const perks = [
  { icon: FolderOpen, label: 'Curated collections' },
  { icon: Search, label: 'Instant full-text search' },
  { icon: Sparkles, label: 'Fresh community picks' },
]

export default function LoginPage() {
  const auth = pagesContent.auth.login
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-panel-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] w-full max-w-[var(--editable-container)] items-center gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:px-8">
          <div className="relative hidden overflow-hidden rounded-[2.5rem] bg-[var(--slot4-dark-bg)] p-10 text-white lg:block">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(143,225,64,0.3),transparent_70%)]" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-3 py-1 text-xs font-bold text-[var(--slot4-on-accent)]">
                <Bookmark className="h-3.5 w-3.5" /> {SITE_CONFIG.name}
              </span>
              <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[var(--slot4-accent-fill)] mt-8">{auth.badge}</p>
              <h1 className="editable-display mt-4 max-w-md text-4xl font-extrabold uppercase leading-[1.0] tracking-[-0.02em]">{auth.title}</h1>
              <p className="mt-5 max-w-sm text-base leading-7 text-white/65">{auth.description}</p>
              <ul className="mt-9 grid gap-3">
                {perks.map((perk) => (
                  <li key={perk.label} className="flex items-center gap-3 text-sm font-medium text-white/80">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-[var(--slot4-accent-fill)]"><perk.icon className="h-4 w-4" /></span>
                    {perk.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 shadow-[0_24px_70px_rgba(12,28,18,0.1)] sm:p-9">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--slot4-accent)] lg:hidden">{auth.badge}</p>
            <h2 className="editable-display mt-1 text-2xl font-extrabold tracking-[-0.02em]">{auth.formTitle}</h2>
            <EditableLocalLoginForm />
            <p className="mt-6 text-sm text-[var(--slot4-muted-text)]">New here? <Link href="/signup" className="font-bold text-[var(--slot4-accent)] underline-offset-4 hover:underline">{auth.createCta}</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
