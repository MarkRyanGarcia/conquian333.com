import { useTranslation } from 'react-i18next'

export default function Tutorial() {
  const { t } = useTranslation()

  return (
    <section id="tutorial" className="relative max-w-5xl mx-auto pt-20 px-5 text-center">
      <h2 className="text-3xl font-bold mb-4">{t('tutorial_heading')}</h2>
      <p className="text-lg mb-8" style={{ color: 'var(--color-offwhite-2)' }}>
        {t('tutorial_subheading')}
      </p>

      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
        <iframe
          src="https://www.youtube.com/embed/dJpJs62DknU"
          title={t('tutorial_heading')}
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 0,
            borderRadius: '0.75rem',
          }}
        />
      </div>
    </section>
  )
}
