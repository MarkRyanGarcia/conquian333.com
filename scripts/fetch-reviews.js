// Runs at build time (node scripts/fetch-reviews.js)
// Writes public/api/reviews.json so it gets included in the dist output

import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '../public/api')
const OUT_FILE = join(OUT_DIR, 'reviews.json')

const APP_STORE_ID = '1069186374'
const PLAY_STORE_ID = 'com.alexga.Conquian333'

async function fetchAppStore() {
  try {
    const [ratingsRes, reviewsRes] = await Promise.all([
      fetch(`https://itunes.apple.com/lookup?id=${APP_STORE_ID}&country=us`),
      fetch(`https://itunes.apple.com/us/rss/customerreviews/id=${APP_STORE_ID}/sortBy=mostRecent/json`),
    ])
    const ratingsJson = await ratingsRes.json()
    const reviewsJson = await reviewsRes.json()

    const appInfo = ratingsJson.results?.[0] ?? {}
    const entries = reviewsJson.feed?.entry ?? []
    const reviewEntries = entries.filter((e) => e['im:rating'])

    return {
      rating: parseFloat(appInfo.averageUserRating ?? '0'),
      ratingCount: appInfo.userRatingCount ?? 0,
      reviews: reviewEntries.slice(0, 6).map((e) => ({
        id: e.id?.label ?? String(Math.random()),
        author: e.author?.name?.label ?? 'Anonymous',
        rating: parseInt(e['im:rating']?.label ?? '5', 10),
        text: e.content?.label ?? '',
        date: e.updated?.label ?? '',
        source: 'appstore',
      })),
    }
  } catch (e) {
    console.warn('App Store fetch failed:', e.message)
    return { rating: 0, ratingCount: 0, reviews: [] }
  }
}

async function fetchPlayStore() {
  try {
    const gplay = await import('google-play-scraper')
    const g = gplay.default

    const [appInfo, reviewsResult] = await Promise.all([
      g.app({ appId: PLAY_STORE_ID }),
      g.reviews({ appId: PLAY_STORE_ID, sort: g.sort.NEWEST, num: 6 }),
    ])

    return {
      rating: appInfo.score ?? 0,
      ratingCount: appInfo.ratings ?? 0,
      installs: appInfo.installs ?? 'N/A',
      reviews: reviewsResult.data.map((r) => ({
        id: r.id,
        author: r.userName,
        rating: r.score,
        text: r.text ?? '',
        date: r.date ? new Date(r.date).toISOString() : '',
        source: 'playstore',
        avatar: r.userImage ?? undefined,
      })),
    }
  } catch (e) {
    console.warn('Play Store fetch failed:', e.message)
    return { rating: 0, ratingCount: 0, installs: 'N/A', reviews: [] }
  }
}

console.log('Fetching store data...')
const [appStore, playStore] = await Promise.all([fetchAppStore(), fetchPlayStore()])
const data = { appStore, playStore, generatedAt: new Date().toISOString() }

mkdirSync(OUT_DIR, { recursive: true })
writeFileSync(OUT_FILE, JSON.stringify(data, null, 2))
console.log(`✓ Written to ${OUT_FILE}`)
console.log(`  App Store: ${appStore.rating} ⭐ (${appStore.ratingCount} ratings, ${appStore.reviews.length} reviews)`)
console.log(`  Play Store: ${playStore.rating} ⭐ (${playStore.ratingCount} ratings, ${playStore.installs} installs, ${playStore.reviews.length} reviews)`)
