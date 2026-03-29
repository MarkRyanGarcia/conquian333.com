// Runs at build time (node scripts/fetch-reviews.js)
// Writes public/api/reviews.json so it gets included in the dist output

import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '../public/api')
const AVATARS_DIR = join(__dirname, '../public/api/avatars')
const OUT_FILE = join(OUT_DIR, 'reviews.json')

const APP_STORE_ID = '1069186374'
const PLAY_STORE_ID = 'com.alexga.Conquian333'

async function downloadAvatar(url, id) {
  try {
    const res = await fetch(url)
    if (!res.ok) return undefined
    const buf = Buffer.from(await res.arrayBuffer())
    const ext = url.includes('.png') ? 'png' : 'jpg'
    const filename = `${id}.${ext}`
    writeFileSync(join(AVATARS_DIR, filename), buf)
    return `/app/v2/api/avatars/${filename}`
  } catch {
    return undefined
  }
}

async function fetchAppStore() {
  try {
    // Fetch multiple pages to find enough 4-5 star reviews
    const [ratingsRes, page1Res, page2Res] = await Promise.all([
      fetch(`https://itunes.apple.com/lookup?id=${APP_STORE_ID}&country=us`),
      fetch(`https://itunes.apple.com/us/rss/customerreviews/id=${APP_STORE_ID}/sortBy=mostRecent/page=1/json`),
      fetch(`https://itunes.apple.com/us/rss/customerreviews/id=${APP_STORE_ID}/sortBy=mostRecent/page=2/json`),
    ])
    const ratingsJson = await ratingsRes.json()
    const page1Json = await page1Res.json()
    const page2Json = await page2Res.json()

    const appInfo = ratingsJson.results?.[0] ?? {}
    const entries = [
      ...(page1Json.feed?.entry ?? []),
      ...(page2Json.feed?.entry ?? []),
    ].filter((e) => e['im:rating'])

    const goodReviews = entries
      .filter((e) => parseInt(e['im:rating']?.label ?? '0', 10) >= 4)
      .slice(0, 8)
      .map((e) => ({
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
      reviews: goodReviews,
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
      g.reviews({ appId: PLAY_STORE_ID, sort: g.sort.RATING, num: 50 }),
    ])

    const goodReviews = reviewsResult.data
      .filter((r) => r.score >= 4)
      .slice(0, 8)

    // Download avatars locally to avoid CORS issues
    const reviewsWithAvatars = await Promise.all(
      goodReviews.map(async (r) => {
        const localAvatar = r.userImage ? await downloadAvatar(r.userImage, r.id) : undefined
        return {
          id: r.id,
          author: r.userName,
          rating: r.score,
          text: r.text ?? '',
          date: r.date ? new Date(r.date).toISOString() : '',
          source: 'playstore',
          avatar: localAvatar,
        }
      })
    )

    return {
      rating: appInfo.score ?? 0,
      ratingCount: appInfo.ratings ?? 0,
      installs: appInfo.installs ?? 'N/A',
      reviews: reviewsWithAvatars,
    }
  } catch (e) {
    console.warn('Play Store fetch failed:', e.message)
    return { rating: 0, ratingCount: 0, installs: 'N/A', reviews: [] }
  }
}

console.log('Fetching store data...')
mkdirSync(AVATARS_DIR, { recursive: true })
const [appStore, playStore] = await Promise.all([fetchAppStore(), fetchPlayStore()])
const data = { appStore, playStore, generatedAt: new Date().toISOString() }

mkdirSync(OUT_DIR, { recursive: true })
writeFileSync(OUT_FILE, JSON.stringify(data, null, 2))
console.log(`✓ Written to ${OUT_FILE}`)
console.log(`  App Store: ${appStore.rating} ⭐ (${appStore.ratingCount} ratings, ${appStore.reviews.length} reviews)`)
console.log(`  Play Store: ${playStore.rating} ⭐ (${playStore.ratingCount} ratings, ${playStore.installs} installs, ${playStore.reviews.length} reviews)`)
