import { useReveal } from '../hooks/useReveal'
import { useStoreData } from '../hooks/useStoreData'

const TOTAL_DOWNLOADS = '1.1M+'

function Star() {
  return (
    <svg className="w-3.5 h-3.5 text-yellow-400 inline" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

export default function StatsStrip() {
  const { data } = useStoreData()
  const ref = useReveal()

  const appRating = data ? data.appStore.rating.toFixed(1) : '4.8'
  const playRating = data ? data.playStore.rating.toFixed(1) : '4.6'

  const stats = [
    { value: TOTAL_DOWNLOADS, label: 'downloads' },
    { value: appRating,       label: 'App Store',    star: true },
    { value: playRating,      label: 'Google Play',  star: true },
  ]

  return (
    <div
      ref={ref}
      className="reveal max-w-5xl mx-auto px-6 mb-20"
    >
      <div
        className="flex flex-wrap justify-center sm:justify-around gap-6 py-6 px-8 rounded-2xl"
        style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        {stats.map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <span className="text-2xl font-bold text-white">
              {s.star && <Star />} {s.value}
            </span>
            <span className="text-xs" style={{ color: 'var(--color-offwhite-2)' }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
