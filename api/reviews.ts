import type { VercelRequest, VercelResponse } from '@vercel/node'
import gplay from 'google-play-scraper'

const APP_STORE_ID = '1069186374'
const PLAY_STORE_ID = 'com.alexga.Conquian333'

// Simple in-memory cache (resets on cold start, ~1hr TTL)
let cache: { data: StoreData; ts: number } | null = null
const CACHE_TTL = 60 * 60 * 1000 // 1 hour

export interface Review {
  id: string
  author: string
  rating: number
  text: string
  date: string
  source: 'appstore' | 'playstore'
  avatar?: string
}

export interface StoreData {
  appStore: {
    rating: number
    ratingCount: number
    reviews: Review[]
  }
  playStore: {
    rating: number
    ratingCount: number
    installs: string
    reviews: Review[]
  }
}

async function fetchAppStore(): Promise<StoreData['appStore']> {
  // iTunes RSS feed — semi-official, no auth needed
  const [ratingsRes, reviewsRes] = await Promise.all([
    fetch(`https://itunes.apple.com/lookup?id=${APP_STORE_ID}&country=us`),
    fetch(`https://itunes.apple.com/us/rss/customerreviews/id=${APP_STORE_ID}/sortBy=mostRecent/json`),
  ])

  const ratingsJson = await ratingsRes.json()
  const reviewsJson = await reviewsRes.json()

  const appInfo = ratingsJson.results?.[0] ?? {}
  const entries: any[] = reviewsJson.feed?.entry ?? []

  // First entry is app metadata, rest are reviews
  const reviewEntries = entries.filter((e) => e['im:rating'])

  const reviews: Review[] = reviewEntries.slice(0, 6).map((e) => ({
    id: e.id?.label ?? Math.random().toString(),
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

async function fetchPlayStore(): Promise<StoreData['playStore']> {
  const [appInfo, reviews] = await Promise.all([
    gplay.app({ appId: PLAY_STORE_ID }),
    gplay.reviews({ appId: PLAY_STORE_ID, sort: gplay.sort.NEWEST, num: 6 }),
  ])

  const mappedReviews: Review[] = reviews.data.map((r) => ({
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
    reviews: mappedReviews,
  }
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  // Return cached data if fresh
  if (cache && Date.now() - cache.ts < CACHE_TTL) {
    return res.setHeader('X-Cache', 'HIT').json(cache.data)
  }

  try {
    const [appStore, playStore] = await Promise.all([
      fetchAppStore(),
      fetchPlayStore(),
    ])

    const data: StoreData = { appStore, playStore }
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
