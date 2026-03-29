import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import { SmootherContext } from '../context/SmootherContext'

const IOS_URL = 'https://apps.apple.com/us/app/conquian-333/id1069186374'
const ANDROID_URL = 'https://play.google.com/store/apps/details?id=com.alexga.Conquian333'

export default function Footer() {
  const { t } = useTranslation()
  const { smoother } = useContext(SmootherContext)

  return (
    <footer
      className="max-w-5xl mx-auto pt-10 pb-8 mt-12 px-5"
      style={{ borderTop: '1px solid rgba(255,255,255,0.15)', color: 'var(--color-offwhite-2)' }}
    >
      {/* Store badges */}
      <div id="download" className="flex justify-center gap-4 mb-8">
        <a href={IOS_URL} target="_blank" rel="noopener noreferrer">
          <img src="./app-store.png" alt="Download on the App Store" className="h-10 hover:opacity-80 transition-opacity" />
        </a>
        <a href={ANDROID_URL} target="_blank" rel="noopener noreferrer">
          <img src="./google-play.png" alt="Get it on Google Play" className="h-10 hover:opacity-80 transition-opacity" />
        </a>
      </div>

      {/* Nav links */}
      <div className="flex justify-center gap-6 text-sm mb-6">
        <button
          className="hover:text-white transition-colors cursor-pointer"
          onClick={() => smoother?.scrollTo('#tutorial', true)}
        >
          {t('tutorial')}
        </button>
        <button
          className="hover:text-white transition-colors cursor-pointer"
          onClick={() => smoother?.scrollTo('#reviews', true)}
        >
          {t('reviews')}
        </button>
      </div>

      {/* Social + email */}
      <div className="flex justify-center gap-5 mb-6">
        <a
          href="https://www.facebook.com/conquian"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="hover:text-white transition-colors"
        >
          {/* Facebook icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
          </svg>
        </a>
        <a
          href="https://www.instagram.com/conquian333"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="hover:text-white transition-colors"
        >
          {/* Instagram icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.516 2.497 5.783 2.226 7.15 2.163 8.416 2.105 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
          </svg>
        </a>
        <a
          href="mailto:conquian333@gmail.com"
          aria-label="Email"
          className="hover:text-white transition-colors"
        >
          {/* Email icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </a>
      </div>

      {/* Copyright */}
      <div className="text-center">
        <p className="text-sm font-semibold" style={{ color: 'var(--color-offwhite)' }}>Conquian 333</p>
        <p className="text-xs mt-1">{t('footer_copyright')}</p>
      </div>
    </footer>
  )
}
