'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogIn, LogOut, Menu, PlusCircle, Search, UserPlus, UserRound, X } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

// Friendly public labels for the enabled content tasks (keeps href dynamic).
const PUBLIC_TASK_LABELS: Partial<Record<TaskKey, string>> = {
  sbm: 'Bookmarks',
  pdf: 'Resources',
  article: 'Articles',
  listing: 'Listings',
  classified: 'Marketplace',
  image: 'Gallery',
}

// Profiles + raw task-archive links never surface in the public navigation.
const HIDDEN_FROM_NAV: TaskKey[] = ['profile']

function usePublicNav() {
  return useMemo(() => {
    const taskLinks = SITE_CONFIG.tasks
      .filter((task) => task.enabled && !HIDDEN_FROM_NAV.includes(task.key))
      .map((task) => ({ label: PUBLIC_TASK_LABELS[task.key] || task.label, href: task.route }))
    return [{ label: 'Home', href: '/' }, ...taskLinks, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }]
  }, [])
}

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navItems = usePublicNav()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`))

  return (
    <header
      className={`sticky top-0 z-50 bg-[var(--editable-nav-bg)]/90 text-[var(--editable-nav-text)] backdrop-blur-xl transition-all duration-300 ${
        scrolled ? 'border-b border-[var(--editable-border)] shadow-[0_6px_24px_rgba(12,28,18,0.06)]' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex min-h-[76px] w-full max-w-[var(--editable-container)] items-center gap-6 px-5 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-9 w-9 object-contain" />
          
          <span className="editable-display max-w-[200px] truncate text-xl font-extrabold tracking-[-0.03em]">{SITE_CONFIG.name}</span>
        </Link>

        <div className="ml-2 hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition duration-200 ${
                  active
                    ? 'text-[var(--slot4-page-text)]'
                    : 'text-[var(--slot4-muted-text)] hover:text-[var(--slot4-page-text)]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-4 bottom-1 h-[2px] origin-left rounded-full bg-[var(--slot4-accent-fill)] transition-transform duration-300 ${
                    active ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Link
            href="/search"
            aria-label="Search"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--editable-border)] text-[var(--slot4-muted-text)] transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-page-text)]"
          >
            <Search className="h-4 w-4" />
          </Link>

          {session ? (
            <>
              <Link
                href="/create"
                className="hidden items-center gap-2 rounded-full border border-[var(--editable-border)] px-4 py-2 text-sm font-bold text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)] sm:inline-flex"
              >
                <PlusCircle className="h-4 w-4" /> Create
              </Link>
              <span className="hidden items-center gap-2 rounded-full bg-[var(--slot4-accent-soft)] px-3.5 py-2 text-sm font-bold text-[var(--slot4-page-text)] sm:inline-flex">
                <UserRound className="h-4 w-4 text-[var(--slot4-accent)]" />
                <span className="max-w-[120px] truncate">{session.name}</span>
              </span>
              <button
                type="button"
                onClick={logout}
                className="hidden items-center gap-2 rounded-full bg-[var(--slot4-dark-bg)] px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 sm:inline-flex"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden items-center gap-2 px-4 py-2 text-sm font-bold text-[var(--slot4-page-text)] transition hover:text-[var(--slot4-accent)] sm:inline-flex"
              >
                <LogIn className="h-4 w-4" /> Login
              </Link>
              <Link
                href="/signup"
                className="hidden items-center gap-2 rounded-full bg-[var(--slot4-dark-bg)] px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(12,28,18,0.25)] sm:inline-flex"
              >
                <UserPlus className="h-4 w-4" /> Sign up
              </Link>
            </>
          )}

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--editable-border)] text-[var(--slot4-page-text)] lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--editable-nav-bg)] px-5 py-5 lg:hidden">
          <div className="grid gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-sm font-bold transition ${
                    active
                      ? 'bg-[var(--slot4-accent-soft)] text-[var(--slot4-page-text)]'
                      : 'text-[var(--slot4-muted-text)] hover:bg-[var(--slot4-panel-bg)]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
          <div className="mt-4 grid gap-2 border-t border-[var(--editable-border)] pt-4">
            {session ? (
              <>
                <Link href="/create" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--editable-border)] px-5 py-3 text-sm font-bold">
                  <PlusCircle className="h-4 w-4" /> Create
                </Link>
                <button type="button" onClick={() => { logout(); setOpen(false) }} className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-dark-bg)] px-5 py-3 text-sm font-bold text-white">
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--editable-border)] px-5 py-3 text-sm font-bold">
                  <LogIn className="h-4 w-4" /> Login
                </Link>
                <Link href="/signup" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-dark-bg)] px-5 py-3 text-sm font-bold text-white">
                  <UserPlus className="h-4 w-4" /> Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}
