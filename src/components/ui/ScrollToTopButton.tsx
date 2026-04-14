import { useState, useCallback } from 'react'
import { ArrowUp } from 'lucide-react'
import { cn } from '../../lib/utils'

type CurtainState = 'idle' | 'dropping' | 'rising'

export default function ScrollToTopButton() {
  const [curtain, setCurtain] = useState<CurtainState>('idle')

  const handleClick = useCallback(() => {
    if (curtain !== 'idle') return
    setCurtain('dropping')
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
      setCurtain('rising')
      setTimeout(() => setCurtain('idle'), 650)
    }, 650)
  }, [curtain])

  return (
    <>
      {/* Curtain overlay */}
      <div
        className={cn(
          'curtain-overlay',
          curtain === 'dropping' && 'curtain-dropping',
          curtain === 'rising' && 'curtain-rising',
        )}
        aria-hidden="true"
      >
        <div className="curtain-band bg-celeste" />
        <div className="curtain-band bg-amarillo" />
        <div className="curtain-band bg-magenta" />
      </div>

      {/* Scroll to top button */}
      <button
        onClick={handleClick}
        aria-label="Volver al inicio"
        className={cn(
          'btn-border-anim-fixed',
          'fixed bottom-6 right-6 z-[9999]',
          'w-12 h-12 rounded-full',
          'bg-white dark:bg-gray-900',
          'border border-gray-200 dark:border-gray-700',
          'flex items-center justify-center',
          'shadow-md transition-colors duration-300',
        )}
      >
        <ArrowUp className="w-5 h-5 text-gray-700 dark:text-gray-200" />
      </button>
    </>
  )
}
