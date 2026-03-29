import { useTranslation } from 'react-i18next'
import { useStoreData } from '../hooks/useStoreData'
import { useReveal } from '../hooks/useReveal'
import type { Review } from '../types/storeData'

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

const TOTAL_DOWNLOADS = '1.1M+'

function StoreStats({ data }: { data: NonNullable<ReturnType<typeof useStoreData>['data']> }) {
  const avgRating = ((data.appStore.rating + data.playStore.rating) / 2).toFixed(1)
  const totalRatings = (data.appStore.ratingCount + data.playStore.ratingCount).toLocaleString()

  return (
    <div className="flex flex-wrap justify-center gap-8 mb-12">
      {[
        { value: TOTAL_DOWNLOADS, label: 'downloads' },
        { value: avgRating, label: 'avg rating', rating: parseFloat(avgRating) },
        { value: totalRatings, label: 'total ratings' },
        { value: data.appStore.rating.toFixed(1), label: 'App Store', rating: data.appStore.rating },
        { value: data.playStore.rating.toFixed(1), label: 'Google Play', rating: data.playStore.rating },
      ].map((stat) => (
        <div key={stat.label} className="text-center">
          <p className="text-4xl font-bold text-white">{stat.value}</p>
          {stat.rating !== undefined && <StarRating rating={stat.rating} />}
          <p className="text-xs mt-1" style={{ color: 'var(--color-offwhite-2)' }}>{stat.label}</p>
        </div>
      ))}
    </div>
  )
}

function LiveReviewCard({ review }: { review: Review }) {
  const initials = review.author.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
  const date = review.date ? new Date(review.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : ''
  console.log(review)
  return (
    <div
      className="flex flex-col gap-3 rounded-2xl p-6"
      style={{ background: 'rgba(0, 104, 71, 0.35)', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--color-offwhite)' }}
    >
      <div className="flex items-center justify-between">
        <StarRating rating={review.rating} />
        <span className="text-xs" style={{ color: 'var(--color-offwhite-2)' }}>
          {review.source === 'appstore' ? '🍎' : '▶'} {date}
        </span>
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
  const { data } = useStoreData()
  const headingRef = useReveal()
  const statsRef = useReveal()
  const staticGridRef = useReveal()
  const liveGridRef = useReveal()

  const liveReviews: Review[] = data
    ? [...data.appStore.reviews, ...data.playStore.reviews].filter((r) => r.rating >= 4).slice(0, 6)
    : []

  return (
    <section id="reviews" className="relative max-w-5xl mx-auto pt-20 px-5">
      <h2 ref={headingRef} className="text-3xl font-bold text-center mb-10 reveal">{t('reviews_heading')}</h2>

      <div ref={statsRef} className={`reveal${!data ? ' hidden' : ''}`}>
        {data && <StoreStats data={data} />}
      </div>

      <div ref={staticGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 reveal-stagger">
        {STATIC_REVIEWS.map((review) => (
          <div
            key={review.authorKey}
            className="flex flex-col gap-3 rounded-2xl p-6"
            style={{ background: 'rgba(0, 104, 71, 0.55)', border: '1px solid rgba(255,255,255,0.35)', color: 'var(--color-offwhite)' }}
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
        ))}
      </div>

      <div ref={liveGridRef} className={`grid grid-cols-1 md:grid-cols-3 gap-6 reveal-stagger${liveReviews.length === 0 ? ' hidden' : ''}`}>
        {liveReviews.map((review) => (
          <LiveReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  )
}
