import type { LucideIcon } from 'lucide-react'
import { Building2, Hammer, Sofa, TrendingUp, FileCheck, Lightbulb } from 'lucide-react'
import { services } from '../../data/services'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { cn } from '../../lib/utils'

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Hammer,
  Sofa,
  TrendingUp,
  FileCheck,
  Lightbulb,
}

function ServiceCard({ service, index }: { service: (typeof services)[number]; index: number }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })
  const Icon = iconMap[service.icon] ?? Building2

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ transitionDelay: `${index * 80}ms` }}
      className={cn(
        'btn-border-anim group p-8 rounded-2xl border border-gray-300 dark:border-gray-800',
        'bg-white dark:bg-gray-900',
        'hover:border-celeste dark:hover:border-celeste',
        'hover:shadow-xl hover:shadow-celeste/10 dark:hover:shadow-celeste/5',
        'transition-all duration-500',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      )}
    >
      <div className="w-12 h-12 rounded-xl bg-celeste/10 dark:bg-celeste/10 flex items-center justify-center mb-5 group-hover:bg-celeste/20 transition-colors">
        <Icon size={22} className="text-celeste" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{service.description}</p>
    </div>
  )
}

export default function Services() {
  const { ref: headRef, isVisible: headVisible } = useScrollAnimation()

  return (
    <section id="servicios" className="py-24 lg:py-32 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={cn(
            'text-center max-w-2xl mx-auto mb-16 transition-all duration-700',
            headVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-magenta mb-3 block">
            Lo que hacemos
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Nuestros servicios
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Soluciones integrales para cada etapa de tu proyecto, desde la idea hasta la entrega.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href={`https://wa.me/56935607782?text=${encodeURIComponent('Hola, quiero consultar sobre sus servicios')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-border-anim inline-flex items-center gap-2 bg-magenta text-white font-semibold px-8 py-4 rounded-full hover:bg-magenta/85 transition-all shadow hover:shadow-magenta/30 hover:shadow-lg text-lg"
          >
            Agenda tu asesoría 👉
          </a>
        </div>
      </div>
    </section>
  )
}
