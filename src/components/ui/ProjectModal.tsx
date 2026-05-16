import { useEffect, useRef, useState, useCallback } from 'react'
import { X, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
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
    <span className="font-mono text-xs tracking-widest uppercase animate-fade-in" style={getCodeStyle(project.arcoTypes)}>
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

  // Color del dot: filtro activo (consistente con la letra del filtro) o tipo del proyecto actual
  const dotColor = filterLetter
    ? ARCO_COLORS[filterLetter]
    : ARCO_COLORS[navProjects[currentIndex].arcoTypes[0]]

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

  // ── Dots: rail con translateY ─────────────────────────────────────────────
  // En vez de una ventana discreta, el contenedor completo se desplaza con
  // CSS transform para que los puntos se muevan de verdad al hacer scroll.

  const DOT_SLOT     = 26   // button h-5 (20px) + gap-1.5 (6px)
  const VISIBLE_DOTS = Math.min(totalCount, MAX_DOTS)
  const RAIL_H       = VISIBLE_DOTS * 20 + Math.max(0, VISIBLE_DOTS - 1) * 6

  // Mantener el punto activo centrado en el área visible
  const rawTranslate   = RAIL_H / 2 - 10 - currentIndex * DOT_SLOT
  const minTranslate   = totalCount > MAX_DOTS ? -(totalCount - MAX_DOTS) * DOT_SLOT : 0
  const dotsTranslateY = Math.max(minTranslate, Math.min(0, rawTranslate))

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

        {/* ── Navegación mobile: prev / contador / next ── */}
        {showNav && (
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex sm:hidden items-center gap-1 px-2 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/30"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => scrollToIndex(currentIndex - 1)}
              aria-label="Proyecto anterior"
              className={cn(
                'btn-border-anim flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 text-white hover:bg-white/15',
                currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100',
              )}
            >
              <ChevronLeft size={14} />
            </button>

            <span className="text-white text-xs font-mono px-2 tabular-nums">
              {currentIndex + 1} / {totalCount}
            </span>

            <button
              onClick={() => scrollToIndex(currentIndex + 1)}
              aria-label="Proyecto siguiente"
              className={cn(
                'btn-border-anim flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 text-white hover:bg-white/15',
                currentIndex === totalCount - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100',
              )}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        )}

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

            <div
              className="flex flex-col items-center overflow-hidden"
              style={{ height: `${RAIL_H}px` }}
            >
              <div
                className="flex flex-col items-center gap-1.5 flex-shrink-0"
                style={{
                  transform:  `translateY(${dotsTranslateY}px)`,
                  transition: 'transform 0.3s ease',
                }}
              >
                {Array.from({ length: totalCount }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToIndex(i)}
                    aria-label={`Proyecto ${i + 1}`}
                    className="flex items-center justify-center w-5 h-5 flex-shrink-0"
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
                  <div className="sm:w-3/5 flex flex-col p-8 sm:p-10 overflow-y-auto">
                  <div className="my-auto">

                    {/* Código ARCO */}
                    <div className="mb-5">
                      <ARCOCode project={p} />
                    </div>

                    {/* Nombre stacked */}
                    <div className="mb-1">
                      {p.name.split(' ').map((word, wi) => (
                        <p
                          key={wi}
                          className="text-2xl sm:text-4xl md:text-5xl font-black leading-[0.9] uppercase tracking-tight text-white"
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
                    {p.description && (
                      <p className="text-base leading-relaxed text-zinc-300 mb-5">
                        {p.description}
                      </p>
                    )}

                  </div>
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
