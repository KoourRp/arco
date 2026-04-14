import { ArrowUp } from 'lucide-react'
import { cn } from '../../lib/utils'
import { useCurtain } from '../../contexts/CurtainContext'

export default function ScrollToTopButton() {
  const { triggerCurtain } = useCurtain()

  return (
    <button
      onClick={triggerCurtain}
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
  )
}
