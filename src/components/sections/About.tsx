import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { cn } from '../../lib/utils'
import { CheckCircle } from 'lucide-react'

const values = [
  'Diseño centrado en las personas',
  'Innovación con materiales sostenibles',
  'Transparencia en cada etapa',
  'Entrega en plazo y presupuesto',
]

export default function About() {
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation()
  const { ref: imgRef, isVisible: imgVisible } = useScrollAnimation()

  return (
    <section id="nosotros" className="py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div
            ref={imgRef as React.RefObject<HTMLDivElement>}
            className={cn(
              'relative transition-all duration-700',
              imgVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10',
            )}
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80"
                alt="Equipo AR|CO trabajando"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Color accent */}
            <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-2xl bg-celeste/20 dark:bg-celeste/10 -z-10" />
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-amarillo/30 dark:bg-amarillo/10 -z-10" />
          </div>

          {/* Text side */}
          <div
            ref={textRef as React.RefObject<HTMLDivElement>}
            className={cn(
              'transition-all duration-700 delay-200',
              textVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10',
            )}
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-magenta mb-3 block">
              Quiénes somos
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
              Arquitectura que{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-celeste to-magenta">
                desafía
              </span>{' '}
              lo convencional
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 text-lg">
              AR|CO es un laboratorio de arquitectura fundado en Santiago con el objetivo de hacer el
              buen diseño accesible. Combinamos rigor técnico con exploración creativa para generar
              espacios que conectan con las personas.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              Cada proyecto es una oportunidad para repensar cómo habitamos el mundo. Trabajamos de la
              mano de nuestros clientes desde el primer boceto hasta la entrega de llaves.
            </p>

            <ul className="space-y-3 mb-10">
              {values.map(v => (
                <li key={v} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <CheckCircle size={18} className="text-celeste shrink-0" />
                  <span>{v}</span>
                </li>
              ))}
            </ul>

            <a
              href={`https://wa.me/56935607782?text=${encodeURIComponent('Hola, quiero agendar una asesoría con AR|CO')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-magenta text-white font-semibold px-7 py-3.5 rounded-full hover:bg-magenta/85 transition-all shadow hover:shadow-magenta/30 hover:shadow-lg"
            >
              Agenda tu asesoría 👉
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
