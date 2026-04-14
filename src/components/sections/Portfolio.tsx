import { useState } from 'react'
import {
  projects,
  type Project,
  type ARCOLetter,
  ARCO_COLORS,
  ARCO_LABELS,
  getProjectCode,
  getCodeStyle,
} from '../../data/projects'
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

// ─── Selector ARCO ────────────────────────────────────────────────────────────

const ARCO_LETTERS: { letter: ARCOLetter; label: string }[] = [
  { letter: 'A', label: ARCO_LABELS.A },
  { letter: 'R', label: ARCO_LABELS.R },
  { letter: 'C', label: ARCO_LABELS.C },
  { letter: 'O', label: ARCO_LABELS.O },
]

function ArcoLetter({
  letter,
  label,
  isActive,
  onSelect,
}: {
  letter:   ARCOLetter
  label:    string
  isActive: boolean
  onSelect: (l: ARCOLetter) => void
}) {
  const [hovered, setHovered] = useState(false)
  const { theme } = useTheme()
  const lit   = isActive || hovered
  const color = letter === 'A' && theme === 'light'
    ? '#18181b'
    : ARCO_COLORS[letter]

  const maskSrc = letterImages[letter.toLowerCase()].dark

  return (
    <button
      onClick={() => onSelect(letter)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col items-center gap-2 focus:outline-none"
      aria-pressed={isActive}
    >
      {/* Letra enmascarada con color corporativo */}
      <div
        aria-label={`letra ${letter}`}
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
        style={{ color }}
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
  onAll,
}: {
  active:   ARCOLetter | null
  onSelect: (l: ARCOLetter) => void
  onAll:    () => void
}) {
  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-950 px-8 py-12 mb-16">
      <div className="flex items-start justify-center gap-10 sm:gap-16 lg:gap-24">
        {ARCO_LETTERS.map(({ letter, label }) => (
          <ArcoLetter
            key={letter}
            letter={letter}
            label={label}
            isActive={active === letter}
            onSelect={onSelect}
          />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={onAll}
          className={cn(
            'text-sm font-medium tracking-wide transition-all duration-200',
            active === null
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

// ─── Código con color(es) ARCO ────────────────────────────────────────────────

function CardCode({ project }: { project: Project }) {
  return (
    <p style={getCodeStyle(project.arcoTypes)} className="font-mono text-xs tracking-widest mb-1 uppercase">
      {getProjectCode(project)}
    </p>
  )
}

// ─── Card de proyecto ─────────────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project
  index:   number
  onClick: () => void
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

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
          <CardCode project={project} />
          <p className="text-xs text-zinc-400 mb-1 tracking-wide">{project.comuna}</p>
          <h3 className="font-bold text-white text-lg leading-snug mb-1">
            {project.name}
          </h3>
          <p className="text-sm text-zinc-300 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

      </div>
    </div>
  )
}

// ─── Sección principal ────────────────────────────────────────────────────────

export default function Portfolio() {
  const [activeLetter, setActiveLetter]     = useState<ARCOLetter | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const { ref: headRef, isVisible: headVisible } = useScrollAnimation()

  const filtered = activeLetter
    ? projects.filter(p => p.arcoTypes.includes(activeLetter))
    : projects

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
        <ArcoSelector
          active={activeLetter}
          onSelect={l => setActiveLetter(prev => prev === l ? null : l)}
          onAll={() => setActiveLetter(null)}
        />

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
          filterLetter={activeLetter}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}
