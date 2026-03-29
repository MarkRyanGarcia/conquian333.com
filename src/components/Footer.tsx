import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer
      className="text-center pt-8 pb-6 mt-12 px-5"
      style={{
        color: 'var(--color-offwhite-2)',
        borderTop: '1px solid rgba(255,255,255,0.15)',
      }}
    >
      <p className="text-sm">Conquian 333</p>
      <p className="text-xs mt-1">{t('footer_copyright')}</p>
    </footer>
  )
}
