// ✏️ EDITABLE — where page ad slots are chosen.
//
// Each public page renders ONE <Ads /> component, and the slot it uses is picked
// at random from a small page-specific pool. The pools are kept disjoint per page
// so the archive, detail, and search pages always render *different* slots. The
// approved shape for every slot stays locked in src/lib/ads/ad-slots.ts.

/** Random slot from a pool. Pages render server-side, so a fresh pick per render
 *  is fine — there is no client value to hydrate. Falls back to the first slot. */
export function pickAdSlot(pool: readonly string[]): string {
  if (!pool.length) return 'in-feed'
  return pool[Math.floor(Math.random() * pool.length)] ?? pool[0]
}

// Disjoint per-page pools → archive, detail and search never collide on a slot.
export const AD_SLOT_POOLS = {
  archive: ['header', 'in-feed'],
  detail: ['sidebar', 'article-bottom'],
  search: ['footer', 'popup'],
} as const
