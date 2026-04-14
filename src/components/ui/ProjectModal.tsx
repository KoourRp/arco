import { useEffect, useRef, useState, useCallback } from 'react'
import { X, ChevronUp, ChevronDown } from 'lucide-react'
import {
  type Project,
  type ARCOLetter,
  ARCO_COLORS,
  ARCO_LABELS,
  getProjectCode,
  getCodeStyle,
} from '../../data/projects'
import { cn } from '../../lib/utils'

// ─── Código con color(es) ARCO ────────────────────────────────────────────────

function ARCOCode({ project }: { project: Project }) {
  return (
    <span className="font-mono text-xs tracking-widest uppercase" style={getCodeStyle(project.arcoTypes)}>
      {getProjectCode(project)}
    </span>
  )
}

// ─── Constantes ───────────────────────────────────────────────────────────────

const MAX_DOTS     = 8
const STACK_OFFSET = 8   // px que "asoma" cada tarjeta anterior por encima

// ─── Modal ────────────────────────────────────────────────────────────────────

export default function ProjectModal({
  project,
  projects,
  filterLetter,
  onClose,
}: {
  project:      Project
  projects:     Project[]
  filterLetter: ARCOLetter | null
  onClose:      () => void
}) {
  // Proyectos de navegación según el filtro activo
  const navProjects  = filterLetter
    ? projects.filter(p => p.arcoTypes.includes(filterLetter))
    : projects
  const initialIndex = Math.max(0, navProjects.findIndex(p => p.id === project.id))

  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const scrollRef = useRef<HTMLDivElement>(null)

  const totalCount = navProjects.length
  const showNav    = totalCount > 1

  // Color del dot activo: primera letra del proyecto actual
  const currentProject = navProjects[currentIndex]
  const dotColor       = ARCO_COLORS[currentProject.arcoTypes[0]]

  // ── Scroll programático ───────────────────────────────────────────────────

  const scrollToIndex = useCallback((idx: number) => {
    const el = scrollRef.current
    if (!el || idx < 0 || idx >= totalCount) return
    el.scrollTo({ top: idx * el.clientHeight, behavior: 'smooth' })
  }, [totalCount])

  // ── Sincronizar índice con posición de scroll ─────────────────────────────

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const newIndex = Math.round(el.scrollTop / el.clientHeight)
    if (newIndex !== currentIndex) setCurrentIndex(newIndex)
  }, [currentIndex])

  // ── Ir al proyecto inicial al montar ─────────────────────────────────────

  useEffect(() => {
    const el = scrollRef.current
    if (el && initialIndex > 0) {
      el.scrollTop = initialIndex * el.clientHeight
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Teclado: Escape + flechas ─────────────────────────────────────────────

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')    onClose()
      if (e.key === 'ArrowDown') scrollToIndex(currentIndex + 1)
      if (e.key === 'ArrowUp')   scrollToIndex(currentIndex - 1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, currentIndex, scrollToIndex])

  // ── Bloquear scroll del body ──────────────────────────────────────────────

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // ── Dots: ventana deslizante ──────────────────────────────────────────────

  const visibleCount = Math.min(totalCount, MAX_DOTS)
  let startDot = Math.max(0, currentIndex - Math.floor(MAX_DOTS / 2))
  startDot = Math.min(startDot, totalCount - visibleCount)
  const visibleDotIndices = Array.from({ length: visibleCount }, (_, i) => startDot + i)

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl animate-fade-in"
        style={{ height: '90vh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Botón de cierre ── */}
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className={cn(
            'absolute -top-3 -right-3 z-30',
            'flex items-center justify-center w-9 h-9 rounded-full',
            'bg-white dark:bg-zinc-800 shadow-lg',
            'text-zinc-500 hover:text-zinc-900 dark:hover:text-white',
            'transition-colors duration-200',
          )}
        >
          <X size={16} strokeWidth={2.5} />
        </button>

        {/* ── Panel de navegación lateral (dots + chevrons) ── */}
        {showNav && (
          <div
            className="absolute -right-10 top-1/2 -translate-y-1/2 z-20 hidden sm:flex flex-col items-center gap-2"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => scrollToIndex(currentIndex - 1)}
              aria-label="Proyecto anterior"
              className={cn(
                'flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200',
                currentIndex === 0
                  ? 'opacity-0 pointer-events-none'
                  : 'text-zinc-400 hover:text-white hover:bg-white/10',
              )}
            >
              <ChevronUp size={16} />
            </button>

            <div className="flex flex-col items-center gap-1.5 py-1">
              {visibleDotIndices.map(i => (
                <button
                  key={i}
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Proyecto ${i + 1}`}
                  className="flex items-center justify-center w-5 h-5"
                >
                  <span
                    style={i === currentIndex ? { backgroundColor: dotColor } : undefined}
                    className={cn(
                      'rounded-full transition-all duration-300',
                      i === currentIndex
                        ? 'w-2.5 h-2.5'
                        : 'w-1.5 h-1.5 bg-zinc-600 hover:bg-zinc-400',
                    )}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={() => scrollToIndex(currentIndex + 1)}
              aria-label="Proyecto siguiente"
              className={cn(
                'flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200',
                currentIndex === totalCount - 1
                  ? 'opacity-0 pointer-events-none'
                  : 'text-zinc-400 hover:text-white hover:bg-white/10',
              )}
            >
              <ChevronDown size={16} />
            </button>
          </div>
        )}

        {/* ── Scroll track con snap ── */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="h-full overflow-y-scroll rounded-3xl bg-zinc-950"
          style={{
            scrollSnapType:  'y mandatory',
            scrollbarWidth:  'none',
            msOverflowStyle: 'none',
          } as React.CSSProperties}
        >
          {navProjects.map((p, i) => {
            return (
              <div
                key={p.id}
                style={{
                  height:          '100%',
                  flexShrink:      0,
                  scrollSnapAlign: 'start',
                  paddingTop:      `${i * STACK_OFFSET}px`,
                }}
              >
                <div className="relative h-full rounded-3xl shadow-2xl overflow-hidden bg-zinc-900 flex flex-col sm:flex-row">

                  {/* ── Columna izquierda: imagen (40%) ── */}
                  <div className="relative sm:w-2/5 h-52 sm:h-full overflow-hidden flex-shrink-0">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-transparent via-transparent to-zinc-900/60" />
                  </div>

                  {/* ── Columna derecha: contenido (60%) ── */}
                  <div className="sm:w-3/5 flex flex-col justify-center p-8 sm:p-10 overflow-y-auto">

                    {/* Código ARCO */}
                    <div className="mb-5">
                      <ARCOCode project={p} />
                    </div>

                    {/* Nombre stacked */}
                    <div className="mb-1">
                      {p.name.split(' ').map((word, wi) => (
                        <p
                          key={wi}
                          className="text-4xl md:text-5xl font-black leading-[0.9] uppercase tracking-tight text-white"
                        >
                          {word}
                        </p>
                      ))}
                    </div>

                    {/* Comuna bajo el nombre */}
                    <p className="text-sm text-zinc-400 mt-1 mb-5">{p.comuna}</p>

                    {/* Chips de letras ARCO */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {p.arcoTypes.map(letter => (
                        <span
                          key={letter}
                          className="px-3 py-1 rounded-full text-xs font-mono border"
                          style={{
                            color:       ARCO_COLORS[letter],
                            borderColor: ARCO_COLORS[letter],
                          }}
                        >
                          {ARCO_LABELS[letter]}
                        </span>
                      ))}
                    </div>

                    {/* Tipos como hashtags */}
                    {p.tipos.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3 mb-5">
                        {p.tipos.map(tipo => (
                          <span key={tipo} className="text-xs text-white/60 font-mono">
                            #{tipo}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Descripción */}
                    <p className="text-base leading-relaxed text-zinc-300 mb-5 line-clamp-3">
                      {p.description}
                    </p>


                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
