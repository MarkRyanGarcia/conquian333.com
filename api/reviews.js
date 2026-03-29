// @ts-check
// Vercel serverless function — Node.js, ESM via dynamic import

const APP_STORE_ID = '1069186374'
const PLAY_STORE_ID = 'com.alexga.Conquian333'

const CACHE_TTL = 60 * 60 * 1000 // 1 hour
/** @type {{ data: any; ts: number } | null} */
let cache = null

async function fetchAppStore() {
  const [ratingsRes, reviewsRes] = await Promise.all([
    fetch(`https://itunes.apple.com/lookup?id=${APP_STORE_ID}&country=us`),
    fetch(`https://itunes.apple.com/us/rss/customerreviews/id=${APP_STORE_ID}/sortBy=mostRecent/json`),
  ])

  const ratingsJson = await ratingsRes.json()
  const reviewsJson = await reviewsRes.json()

  const appInfo = ratingsJson.results?.[0] ?? {}
  const entries = reviewsJson.feed?.entry ?? []
  const reviewEntries = entries.filter((/** @type {any} */ e) => e['im:rating'])

  const reviews = reviewEntries.slice(0, 6).map((/** @type {any} */ e) => ({
    id: e.id?.label ?? String(Math.random()),
    author: e.author?.name?.label ?? 'Anonymous',
    rating: parseInt(e['im:rating']?.label ?? '5', 10),
    text: e.content?.label ?? '',
    date: e.updated?.label ?? '',
    source: 'appstore',
  }))

  return {
    rating: parseFloat(appInfo.averageUserRating ?? '0'),
    ratingCount: appInfo.userRatingCount ?? 0,
    reviews,
  }
}

async function fetchPlayStore() {
  // Dynamic import for ESM-only package
  const gplay = await import('google-play-scraper')

  const [appInfo, reviewsResult] = await Promise.all([
    gplay.default.app({ appId: PLAY_STORE_ID }),
    gplay.default.reviews({ appId: PLAY_STORE_ID, sort: gplay.default.sort.NEWEST, num: 6 }),
  ])

  const reviews = reviewsResult.data.map((/** @type {any} */ r) => ({
    id: r.id,
    author: r.userName,
    rating: r.score,
    text: r.text ?? '',
    date: r.date ? new Date(r.date).toISOString() : '',
    source: 'playstore',
    avatar: r.userImage ?? undefined,
  }))

  return {
    rating: appInfo.score ?? 0,
    ratingCount: appInfo.ratings ?? 0,
    installs: appInfo.installs ?? 'N/A',
    reviews,
  }
}

/**
 * @param {import('@vercel/node').VercelRequest} _req
 * @param {import('@vercel/node').VercelResponse} res
 */
export default async function handler(_req, res) {
  // CORS — allow the site origin
  res.setHeader('Access-Control-Allow-Origin', '*')

  if (cache && Date.now() - cache.ts < CACHE_TTL) {
    return res.setHeader('X-Cache', 'HIT').json(cache.data)
  }

  try {
    const [appStore, playStore] = await Promise.all([
      fetchAppStore(),
      fetchPlayStore(),
    ])

    const data = { appStore, playStore }
    cache = { data, ts: Date.now() }

    res
      .setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
      .setHeader('X-Cache', 'MISS')
      .json(data)
  } catch (err) {
    console.error('reviews fetch error', err)
    res.status(500).json({ error: 'Failed to fetch store data' })
  }
}
