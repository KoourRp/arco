import { ArrowDown } from 'lucide-react'
import Button from '../ui/Button'

export default function Hero() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=85"
          alt="Arquitectura AR|CO"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-950/65 dark:bg-gray-950/75" />
        {/* Gradient accent */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-gray-950/40 to-transparent" />
      </div>

      {/* Decorative color bar */}
      <div className="absolute top-0 left-0 right-0 h-1 flex">
        <div className="flex-1 bg-celeste" />
        <div className="flex-1 bg-amarillo" />
        <div className="flex-1 bg-magenta" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-20">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-celeste mb-8 animate-fade-in">
          Laboratorio de Arquitectura · Santiago, Chile
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tight leading-none mb-6">
          <span className="block">Espacios que</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-celeste via-amarillo to-magenta">
            transforman
          </span>
          <span className="block">vidas</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-200 leading-relaxed mb-12">
          Diseño arquitectónico disruptivo e innovador. Convertimos ideas en espacios con propósito,
          identidad y valor real.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            as="a"
            href={`https://wa.me/56935607782?text=${encodeURIComponent('Hola, quiero agendar una asesoría con AR|CO')}`}
            size="lg"
          >
            Agenda tu asesoría 👉
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-gray-900"
            onClick={() => scrollTo('#portfolio')}
          >
            Ver proyectos
          </Button>
        </div>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mt-20 pt-10 border-t border-white/10">
          {[
            { value: '+80', label: 'Proyectos' },
            { value: '10+', label: 'Años de experiencia' },
            { value: '100%', label: 'Satisfacción' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-black text-celeste">{stat.value}</div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={() => scrollTo('#nosotros')}
        aria-label="Scroll hacia abajo"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors animate-bounce z-10"
      >
        <ArrowDown size={24} />
      </button>
    </section>
  )
}
