import { useEffect, useRef, useState, useCallback } from 'react'
import { X, ChevronUp, ChevronDown } from 'lucide-react'
import { type Project, type ProjectCategory } from '../../data/projects'
import { cn } from '../../lib/utils'

// ─── Colores por categoría ────────────────────────────────────────────────────

const CATEGORY_COLOR: Record<Exclude<Project['category'], never>, string> = {
  arquitectura:   '#ffffff',
  regularizacion: '#83cfef',
  interiorismo:   '#ffdc5b',
  patrimonio:     '#e73978',
}

const CATEGORY_LABEL: Record<ProjectCategory, string> = {
  todos:          'Todos',
  arquitectura:   'Arquitectura y Construcción',
  regularizacion: 'Gestión y Regularizaciones',
  interiorismo:   'Interiorismo y Diseño',
  patrimonio:     'Patrimonio y Restauración',
}

const SUBCATEGORY_LABEL: Record<NonNullable<Project['subcategory']>, string> = {
  residencial: 'Residencial',
  comercial:   'Comercial',
  publico:     'Público',
  industrial:  'Industrial',
}

// ─── Badge de origen ──────────────────────────────────────────────────────────

function OriginBadge({ origin }: { origin: Project['origin'] }) {
  if (origin === 'colaboracion') {
    return (
      <span className="inline-flex text-xs font-semibold px-3 py-1 rounded-full bg-magenta/20 text-magenta">
        En colaboración
      </span>
    )
  }
  if (origin === 'academia') {
    return (
      <span className="inline-flex text-xs font-semibold px-3 py-1 rounded-full bg-amarillo/20 text-amarillo">
        I+D
      </span>
    )
  }
  return null
}

// ─── Constantes ───────────────────────────────────────────────────────────────

const MAX_DOTS      = 8
const STACK_OFFSET  = 8   // px que "asoma" cada tarjeta anterior por encima

// ─── Modal ────────────────────────────────────────────────────────────────────

export default function ProjectModal({
  project,
  projects,
  onClose,
}: {
  project:  Project
  projects: Project[]
  onClose:  () => void
}) {
  const categoryProjects = projects.filter(p => p.category === project.category)
  const initialIndex     = Math.max(0, categoryProjects.findIndex(p => p.id === project.id))

  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const scrollRef = useRef<HTMLDivElement>(null)

  const totalCount = categoryProjects.length
  const showNav    = totalCount > 1
  const codeColor  = CATEGORY_COLOR[categoryProjects[currentIndex].category]

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
      // Sin animación: posición directa al montar
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
    // Overlay
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      {/*
        Wrapper exterior: referencia para el botón X y los dots.
        Necesita ser relativo y estar FUERA del overflow-hidden del modal
        para que el botón no quede recortado.
      */}
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
                    style={i === currentIndex ? { backgroundColor: codeColor } : undefined}
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

        {/*
          ── Scroll track con snap ──
          - overflow-y-scroll + scroll-snap-type: y mandatory
          - Fondo zinc-950 para que el STACK_OFFSET entre tarjetas
            muestre el fondo oscuro, dando sensación de profundidad
          - scrollbarWidth: none oculta la barra nativa
        */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="h-full overflow-y-scroll rounded-3xl bg-zinc-950"
          style={{
            scrollSnapType: 'y mandatory',
            scrollbarWidth: 'none',
            // Ocultar scrollbar en webkit
            msOverflowStyle: 'none',
          } as React.CSSProperties}
        >
          {categoryProjects.map((p, i) => {
            const color = CATEGORY_COLOR[p.category]

            return (
              /*
                Wrapper de cada tarjeta.
                paddingTop incremental → cada tarjeta "asoma" desde arriba,
                dejando ver el fondo oscuro del track y creando el efecto stack.
                h-full + scroll-snap-align: start → cada sección ocupa el viewport
                y el snap se ancla al inicio del wrapper.
              */
              <div
                key={p.id}
                style={{
                  height:          '100%',
                  flexShrink:      0,
                  scrollSnapAlign: 'start',
                  paddingTop:      `${i * STACK_OFFSET}px`,
                }}
              >
                {/* Tarjeta principal */}
                <div
                  className="relative h-full rounded-3xl shadow-2xl overflow-hidden bg-zinc-900 flex flex-col sm:flex-row"
                >
                  {/* ── Columna izquierda: imagen (40%) ── */}
                  <div className="relative sm:w-2/5 h-52 sm:h-full overflow-hidden flex-shrink-0">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Gradiente de transición hacia la columna de contenido */}
                    <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-transparent via-transparent to-zinc-900/60" />
                  </div>

                  {/* ── Columna derecha: contenido (60%) ── */}
                  <div className="sm:w-3/5 flex flex-col justify-center p-8 sm:p-10 overflow-y-auto">

                    {/* Code */}
                    <p
                      style={{ color }}
                      className="font-mono text-xs tracking-widest mb-5"
                    >
                      {p.code}
                    </p>

                    {/* Nombre stacked */}
                    <div className="mb-6">
                      {p.name.split(' ').map((word, wi) => (
                        <p
                          key={wi}
                          className="text-4xl md:text-5xl font-black leading-[0.9] uppercase tracking-tight text-white"
                        >
                          {word}
                        </p>
                      ))}
                    </div>

                    {/* Tags categoría + subcategoría */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      <span
                        style={{ color, borderColor: color }}
                        className="text-xs font-semibold px-3 py-1 rounded-full border bg-transparent"
                      >
                        {CATEGORY_LABEL[p.category]}
                      </span>
                      {p.subcategory && (
                        <span className="text-xs font-semibold px-3 py-1 rounded-full border border-zinc-600 text-zinc-400">
                          {SUBCATEGORY_LABEL[p.subcategory]}
                        </span>
                      )}
                    </div>

                    {/* Descripción */}
                    <p className="text-base leading-relaxed text-zinc-300 mb-5 line-clamp-3">
                      {p.description}
                    </p>

                    {/* Alcances */}
                    {p.details && p.details.length > 0 && (
                      <ul className="space-y-2 mb-5">
                        {p.details.map((item, di) => (
                          <li
                            key={di}
                            className="flex items-start gap-2.5 text-sm text-zinc-400"
                          >
                            <span
                              style={{ backgroundColor: color }}
                              className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Badge de origen si aplica */}
                    {p.origin !== 'propio' && <OriginBadge origin={p.origin} />}

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
