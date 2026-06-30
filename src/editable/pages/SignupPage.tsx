import type { Metadata } from 'next'
import Link from 'next/link'
import { Bookmark, CheckCircle2 } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

const reasons = [
  'Save links into curated collections in seconds.',
  'Rediscover any resource with instant search.',
  'Share your best finds with the community.',
]

export default function SignupPage() {
  const auth = pagesContent.auth.signup
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-panel-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] w-full max-w-[var(--editable-container)] items-center gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[0.92fr_1fr] lg:px-8">
          <div className="rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 shadow-[0_24px_70px_rgba(12,28,18,0.1)] sm:p-9">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">{auth.badge}</p>
            <h1 className="editable-display mt-1 text-2xl font-extrabold tracking-[-0.02em]">{auth.formTitle}</h1>
            <EditableLocalSignupForm />
            <p className="mt-6 text-sm text-[var(--slot4-muted-text)]">Already have an account? <Link href="/login" className="font-bold text-[var(--slot4-accent)] underline-offset-4 hover:underline">{auth.loginCta}</Link></p>
          </div>

          <div className="relative hidden overflow-hidden rounded-[2.5rem] bg-[var(--slot4-dark-bg)] p-10 text-white lg:block">
            <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(143,225,64,0.28),transparent_70%)]" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-3 py-1 text-xs font-bold text-[var(--slot4-on-accent)]">
                <Bookmark className="h-3.5 w-3.5" /> {SITE_CONFIG.name}
              </span>
              <h2 className="editable-display mt-8 max-w-md text-4xl font-extrabold uppercase leading-[1.0] tracking-[-0.02em]">{auth.title}</h2>
              <p className="mt-5 max-w-sm text-base leading-7 text-white/65">{auth.description}</p>
              <ul className="mt-9 grid gap-3">
                {reasons.map((reason) => (
                  <li key={reason} className="flex items-start gap-3 text-sm font-medium text-white/80">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--slot4-accent-fill)]" />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
