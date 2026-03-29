import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useStoreData } from '../hooks/useStoreData'
import type { Review } from '../types/storeData'

gsap.registerPlugin(ScrollTrigger)

// Static fallback reviews (shown while loading or on error)
const STATIC_REVIEWS = [
  { authorKey: 'review_1_author', locationKey: 'review_1_location', textKey: 'review_1_text', avatar: './user1.jpg' },
  { authorKey: 'review_2_author', locationKey: 'review_2_location', textKey: 'review_2_text', avatar: './user2.jpg' },
  { authorKey: 'review_3_author', locationKey: 'review_3_location', textKey: 'review_3_text', avatar: './user3.jpg' },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? 'text-yellow-400' : 'text-white/20'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function StoreStats({ data }: { data: NonNullable<ReturnType<typeof useStoreData>['data']> }) {
  const avgRating = ((data.appStore.rating + data.playStore.rating) / 2).toFixed(1)
  const totalRatings = (data.appStore.ratingCount + data.playStore.ratingCount).toLocaleString()

  return (
    <div className="flex flex-wrap justify-center gap-8 mb-12">
      <div className="text-center">
        <p className="text-4xl font-bold text-white">{avgRating}</p>
        <StarRating rating={parseFloat(avgRating)} />
        <p className="text-xs mt-1" style={{ color: 'var(--color-offwhite-2)' }}>avg rating</p>
      </div>
      <div className="text-center">
        <p className="text-4xl font-bold text-white">{totalRatings}</p>
        <p className="text-xs mt-1" style={{ color: 'var(--color-offwhite-2)' }}>total ratings</p>
      </div>
      <div className="text-center">
        <p className="text-4xl font-bold text-white">{data.playStore.installs}</p>
        <p className="text-xs mt-1" style={{ color: 'var(--color-offwhite-2)' }}>installs</p>
      </div>
      <div className="text-center">
        <p className="text-4xl font-bold text-white">{data.appStore.rating.toFixed(1)}</p>
        <StarRating rating={data.appStore.rating} />
        <p className="text-xs mt-1" style={{ color: 'var(--color-offwhite-2)' }}>App Store</p>
      </div>
      <div className="text-center">
        <p className="text-4xl font-bold text-white">{data.playStore.rating.toFixed(1)}</p>
        <StarRating rating={data.playStore.rating} />
        <p className="text-xs mt-1" style={{ color: 'var(--color-offwhite-2)' }}>Google Play</p>
      </div>
    </div>
  )
}

function LiveReviewCard({ review, refCb }: { review: Review; refCb: (el: HTMLDivElement | null) => void }) {
  const initials = review.author.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
  const date = review.date ? new Date(review.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : ''
  const sourceBadge = review.source === 'appstore' ? '🍎' : '▶'

  return (
    <div
      ref={refCb}
      className="flex flex-col gap-3 rounded-2xl p-6"
      style={{ background: 'rgba(0, 104, 71, 0.35)', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--color-offwhite)' }}
    >
      <div className="flex items-center justify-between">
        <StarRating rating={review.rating} />
        <span className="text-xs" style={{ color: 'var(--color-offwhite-2)' }}>{sourceBadge} {date}</span>
      </div>
      <p className="text-sm italic flex-1">"{review.text}"</p>
      <div className="flex items-center gap-3 mt-auto">
        {review.avatar
          ? <img src={review.avatar} alt={review.author} className="w-9 h-9 rounded-full object-cover" style={{ border: '2px solid rgba(255,255,255,0.3)' }} />
          : <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'rgba(255,255,255,0.15)' }}>{initials}</div>
        }
        <p className="font-bold text-sm">{review.author}</p>
      </div>
    </div>
  )
}

export default function Reviews() {
  const { t } = useTranslation()
  const { data, loading } = useStoreData()
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<HTMLDivElement[]>([])

  useGSAP(() => {
    if (cardRefs.current.length === 0) return
    gsap.from(cardRefs.current, {
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
    })
  }, { scope: sectionRef, dependencies: [loading] })

  // Static reviews always shown first, then live 4+ star reviews from stores
  const liveReviews: Review[] = data
    ? [...data.appStore.reviews, ...data.playStore.reviews].filter((r) => r.rating >= 4)
    : []

  // Static card component (featured, always visible)
  const StaticCard = ({ review, idx }: { review: typeof STATIC_REVIEWS[0]; idx: number }) => (
    <div
      ref={(el) => { if (el) cardRefs.current[idx] = el }}
      className="flex flex-col gap-3 rounded-2xl p-6 relative"
      style={{
        background: 'rgba(0, 104, 71, 0.55)',
        border: '1px solid rgba(255,255,255,0.35)',
        color: 'var(--color-offwhite)',
      }}
    >
      <StarRating rating={5} />
      <p className="text-sm italic flex-1">"{t(review.textKey)}"</p>
      <div className="flex items-center gap-3 mt-auto">
        <img src={review.avatar} alt={t(review.authorKey)} className="w-10 h-10 rounded-full object-cover" style={{ border: '2px solid rgba(255,255,255,0.4)' }} />
        <div>
          <p className="font-bold text-sm">{t(review.authorKey)}</p>
          <p className="text-xs" style={{ color: 'var(--color-offwhite-2)' }}>{t(review.locationKey)}</p>
        </div>
      </div>
    </div>
  )

  return (
    <section id="reviews" ref={sectionRef} className="relative max-w-5xl mx-auto pt-20 px-5">
      <h2 className="text-3xl font-bold text-center mb-10">{t('reviews_heading')}</h2>

      {/* Live stats bar */}
      {data && <StoreStats data={data} />}

      {/* Featured static reviews — always at top */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {STATIC_REVIEWS.map((review, i) => (
          <StaticCard key={review.authorKey} review={review} idx={i} />
        ))}
      </div>

      {/* Live store reviews — 4+ stars only */}
      {liveReviews.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {liveReviews.map((review, i) => (
            <LiveReviewCard
              key={review.id}
              review={review}
              refCb={(el) => { if (el) cardRefs.current[STATIC_REVIEWS.length + i] = el }}
            />
          ))}
        </div>
      )}
    </section>
  )
}
