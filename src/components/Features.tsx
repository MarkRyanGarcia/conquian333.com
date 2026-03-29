import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'

const CARDS = [
  { icon: '🌐', titleKey: 'features_language_title', descKey: 'features_language_desc' },
  { icon: '🃏', titleKey: 'features_deck_title',     descKey: 'features_deck_desc'     },
  { icon: '🎨', titleKey: 'features_color_title',    descKey: 'features_color_desc'    },
]

export default function Features() {
  const { t } = useTranslation()
  const headingRef = useReveal()
  const gridRef = useReveal()

  return (
    <section className="relative max-w-5xl mx-auto pt-20 px-5">
      <h2 ref={headingRef} className="text-3xl font-bold text-center mb-10 reveal">
        {t('features_headline')}
      </h2>
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal-stagger">
        {CARDS.map((card) => (
          <div
            key={card.titleKey}
            className="flex flex-col items-center text-center gap-3 rounded-2xl p-6"
            style={{
              background: 'rgba(0, 104, 71, 0.35)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'var(--color-offwhite)',
            }}
          >
            <span className="text-5xl">{card.icon}</span>
            <h3 className="text-xl font-semibold">{t(card.titleKey)}</h3>
            <p className="text-sm" style={{ color: 'var(--color-offwhite-2)' }}>{t(card.descKey)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
