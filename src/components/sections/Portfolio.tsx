import { useState } from 'react'
import { projects, type ProjectCategory } from '../../data/projects'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { cn } from '../../lib/utils'
import { MapPin, Calendar } from 'lucide-react'

const filters: { label: string; value: ProjectCategory }[] = [
  { label: 'Todos', value: 'todos' },
  { label: 'Residencial', value: 'residencial' },
  { label: 'Comercial', value: 'comercial' },
  { label: 'Interiorismo', value: 'interiorismo' },
]

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ transitionDelay: `${index * 100}ms` }}
      className={cn(
        'group rounded-2xl overflow-hidden bg-white dark:bg-gray-900',
        'shadow-sm hover:shadow-xl transition-all duration-500',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
      )}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 right-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <p className="text-white text-sm leading-relaxed">{project.description}</p>
        </div>
        <span className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 text-xs font-semibold px-3 py-1 rounded-full capitalize text-gray-700 dark:text-gray-200">
          {project.category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{project.title}</h3>
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <MapPin size={12} /> {project.location}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={12} /> {project.year}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('todos')
  const { ref: headRef, isVisible: headVisible } = useScrollAnimation()

  const filtered =
    activeFilter === 'todos' ? projects : projects.filter(p => p.category === activeFilter)

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

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={cn(
                'btn-border-anim px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300',
                activeFilter === f.value
                  ? 'bg-magenta text-white shadow-md shadow-magenta/30'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
