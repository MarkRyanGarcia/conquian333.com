import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const REVIEWS = [
  { authorKey: 'review_1_author', locationKey: 'review_1_location', textKey: 'review_1_text', avatar: './user1.jpg' },
  { authorKey: 'review_2_author', locationKey: 'review_2_location', textKey: 'review_2_text', avatar: './user2.jpg' },
  { authorKey: 'review_3_author', locationKey: 'review_3_location', textKey: 'review_3_text', avatar: './user3.jpg' },
]

export default function Reviews() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<HTMLDivElement[]>([])

  useGSAP(() => {
    gsap.from(cardRefs.current, {
      opacity: 0,
      y: 40,
      stagger: 0.2,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="relative max-w-5xl mx-auto pt-20 px-5"
    >
      <h2 className="text-3xl font-bold text-center mb-10">
        {t('reviews_heading')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {REVIEWS.map((review, i) => (
          <div
            key={review.authorKey}
            ref={(el) => { if (el) cardRefs.current[i] = el }}
            className="flex flex-col gap-3 rounded-2xl p-6"
            style={{
              background: 'rgba(0, 104, 71, 0.35)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'var(--color-offwhite)',
            }}
          >
            <p className="text-sm italic">"{t(review.textKey)}"</p>
            <div className="flex items-center gap-3 mt-2">
              <img
                src={review.avatar}
                alt={t(review.authorKey)}
                className="w-10 h-10 rounded-full object-cover"
                style={{ border: '2px solid rgba(255,255,255,0.3)' }}
              />
              <div>
                <p className="font-bold text-sm">{t(review.authorKey)}</p>
                <p className="text-xs" style={{ color: 'var(--color-offwhite-2)' }}>
                  {t(review.locationKey)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
