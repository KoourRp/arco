import { createContext, useCallback, useContext, useState } from 'react'
import { cn } from '../lib/utils'

type CurtainState = 'idle' | 'dropping' | 'rising'

interface CurtainContextValue {
  triggerCurtain: () => void
}

const CurtainContext = createContext<CurtainContextValue | null>(null)

export function CurtainProvider({ children }: { children: React.ReactNode }) {
  const [curtain, setCurtain] = useState<CurtainState>('idle')

  const triggerCurtain = useCallback(() => {
    if (curtain !== 'idle') return
    setCurtain('dropping')
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
      setCurtain('rising')
      setTimeout(() => setCurtain('idle'), 650)
    }, 650)
  }, [curtain])

  return (
    <CurtainContext.Provider value={{ triggerCurtain }}>
      {children}

      {/* Curtain overlay */}
      <div
        className={cn(
          'curtain-overlay',
          curtain === 'dropping' && 'curtain-dropping',
          curtain === 'rising' && 'curtain-rising',
        )}
        aria-hidden="true"
      >
        <div className="curtain-band bg-amarillo" />
        <div className="curtain-band bg-celeste" />
        <div className="curtain-band bg-magenta" />
      </div>
    </CurtainContext.Provider>
  )
}

export function useCurtain() {
  const ctx = useContext(CurtainContext)
  if (!ctx) throw new Error('useCurtain must be used inside CurtainProvider')
  return ctx
}
