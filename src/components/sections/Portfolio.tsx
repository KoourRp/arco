import { useState } from 'react'
import { projects, type Project, type ProjectCategory } from '../../data/projects'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { useTheme } from '../../contexts/ThemeContext'
import { cn } from '../../lib/utils'
import ProjectModal from '../ui/ProjectModal'

// ─── Imágenes de letras ARCO ──────────────────────────────────────────────────
import aBlack from '../../assets/img/portfolio/a_black.png'
import aWhite from '../../assets/img/portfolio/a_white.png'
import rBlack from '../../assets/img/portfolio/r_black.png'
import rWhite from '../../assets/img/portfolio/r_white.png'
import cBlack from '../../assets/img/portfolio/c_black.png'
import cWhite from '../../assets/img/portfolio/c_white.png'
import oBlack from '../../assets/img/portfolio/o_black.png'
import oWhite from '../../assets/img/portfolio/o_white.png'

const letterImages: Record<string, { light: string; dark: string }> = {
  a: { light: aBlack, dark: aWhite },
  r: { light: rBlack, dark: rWhite },
  c: { light: cBlack, dark: cWhite },
  o: { light: oBlack, dark: oWhite },
}

// ─── Colores por categoría ────────────────────────────────────────────────────
// Usados tanto en el selector ARCO como en el código de cada card.
// A=blanco (sobre fondo oscuro del selector), R=celeste, C=amarillo, O=magenta

const CATEGORY_COLOR: Record<Exclude<ProjectCategory, 'todos'>, string> = {
  arquitectura:   '#ffffff',
  regularizacion: '#83cfef',
  interiorismo:   '#ffdc5b',
  patrimonio:     '#e73978',
}

// ─── Selector ARCO ───────────────────────────────────────────────────────────

const ARCO_LETTERS: {
  letter: string
  value: Exclude<ProjectCategory, 'todos'>
  label: string
}[] = [
  { letter: 'A', value: 'arquitectura',   label: 'Arquitectura y Construcción' },
  { letter: 'R', value: 'regularizacion', label: 'Gestión y Regularizaciones'  },
  { letter: 'C', value: 'interiorismo',   label: 'Interiorismo y Diseño'       },
  { letter: 'O', value: 'patrimonio',     label: 'Patrimonio y Restauración'   },
]

function ArcoLetter({
  letter,
  value,
  label,
  isActive,
  onSelect,
}: {
  letter: string
  value: Exclude<ProjectCategory, 'todos'>
  label: string
  isActive: boolean
  onSelect: (v: ProjectCategory) => void
}) {
  const [hovered, setHovered] = useState(false)
  const { theme } = useTheme()
  const lit      = isActive || hovered
  const color    = value === 'arquitectura' && theme === 'light'
    ? '#18181b'
    : CATEGORY_COLOR[value]

  // Siempre usamos la versión blanca como máscara de luminancia:
  // píxeles blancos (letra) → muestran el color; píxeles negros (fondo) → ocultan
  const maskSrc = letterImages[letter.toLowerCase()].dark

  return (
    <button
      onClick={() => onSelect(value)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col items-center gap-2 focus:outline-none"
      aria-pressed={isActive}
    >
      {/* Letra enmascarada con color corporativo */}
      <div
        aria-label={`letra ${letter.toUpperCase()}`}
        style={{
          backgroundColor:    lit ? color : '#71717a',
          WebkitMaskImage:    `url(${maskSrc})`,
          WebkitMaskSize:     'contain',
          WebkitMaskRepeat:   'no-repeat',
          WebkitMaskPosition: 'center',
          maskImage:          `url(${maskSrc})`,
          maskSize:           'contain',
          maskRepeat:         'no-repeat',
          maskPosition:       'center',
          maskMode:           'luminance',
        } as React.CSSProperties}
        className={cn(
          'w-20 h-20 cursor-pointer select-none transition-all duration-300',
          lit ? 'opacity-100' : 'opacity-40 group-hover:opacity-100',
        )}
      />

      {/* Barra indicadora de activo */}
      <span
        style={{ backgroundColor: color }}
        className={cn(
          'h-px rounded-full transition-all duration-300',
          lit ? 'w-8 opacity-100' : 'w-0 opacity-0',
        )}
      />

      {/* Label de categoría */}
      <span
        style={{ color: color }}
        className={cn(
          'text-[10px] font-semibold tracking-widest uppercase text-center leading-tight max-w-[88px]',
          'transition-all duration-300',
          lit ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1',
        )}
      >
        {label}
      </span>
    </button>
  )
}

function ArcoSelector({
  active,
  onSelect,
}: {
  active: ProjectCategory
  onSelect: (v: ProjectCategory) => void
}) {
  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-950 px-8 py-12 mb-16">
      {/* Las 4 letras */}
      <div className="flex items-start justify-center gap-10 sm:gap-16 lg:gap-24">
        {ARCO_LETTERS.map(({ letter, value, label }) => (
          <ArcoLetter
            key={value}
            letter={letter}
            value={value}
            label={label}
            isActive={active === value}
            onSelect={onSelect}
          />
        ))}
      </div>

      {/* Botón "Todos" — discreto, separado */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => onSelect('todos')}
          className={cn(
            'text-sm font-medium tracking-wide transition-all duration-200',
            active === 'todos'
              ? 'text-zinc-900 dark:text-white underline underline-offset-4'
              : 'text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400',
          )}
        >
          Ver todos
        </button>
      </div>
    </div>
  )
}

// ─── Badge de origen ──────────────────────────────────────────────────────────

function OriginBadge({ origin }: { origin: (typeof projects)[number]['origin'] }) {
  if (origin === 'colaboracion') {
    return (
      <span className="absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full bg-magenta/20 text-magenta backdrop-blur-sm">
        En colaboración
      </span>
    )
  }
  if (origin === 'academia') {
    return (
      <span className="absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full bg-amarillo/20 text-amarillo backdrop-blur-sm">
        I+D
      </span>
    )
  }
  return null
}

// ─── Card de proyecto ─────────────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: (typeof projects)[number]
  index: number
  onClick: () => void
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })
  const codeColor = CATEGORY_COLOR[project.category]

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ transitionDelay: `${index * 100}ms` }}
      onClick={onClick}
      className={cn(
        'btn-border-anim group rounded-2xl cursor-pointer',
        'shadow-md hover:shadow-2xl transition-all duration-500',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
      )}
    >
      {/* Contenedor interno: overflow-hidden aislado del borde animado */}
      <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
        {/* Imagen */}
        <img
          src={project.image}
          alt={project.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Overlay oscuro con gradiente — solo en hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Blur sutil en el tercio inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-2/3 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Info en hover */}
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out">
          <p
            style={{ color: codeColor }}
            className="font-mono text-xs tracking-widest mb-1"
          >
            {project.code}
          </p>
          {project.subcategory && (
            <p className="text-xs text-zinc-300 mb-1.5 capitalize tracking-wide">
              {project.subcategory}
            </p>
          )}
          <h3 className="font-bold text-white text-lg leading-snug mb-1">
            {project.name}
          </h3>
          <p className="text-sm text-zinc-300 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Badge de origen */}
        <OriginBadge origin={project.origin} />
      </div>
    </div>
  )
}

// ─── Sección principal ────────────────────────────────────────────────────────

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('todos')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const { ref: headRef, isVisible: headVisible } = useScrollAnimation()

  const filtered =
    activeFilter === 'todos'
      ? projects
      : projects.filter(p => p.category === activeFilter)

  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={cn(
            'text-center max-w-2xl mx-auto mb-12 transition-all duration-700',
            headVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-magenta mb-3 block">
            Nuestro trabajo
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Portfolio
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Proyectos que reflejan nuestra manera de entender la arquitectura.
          </p>
        </div>

        {/* Selector ARCO */}
        <ArcoSelector active={activeFilter} onSelect={setActiveFilter} />

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          projects={projects}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}
