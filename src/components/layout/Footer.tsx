import { MapPin, Phone, Mail, Clock, Share2, Globe } from 'lucide-react'
import arcoLogo from '../../assets/img/arcoheader_black.png'

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img src={arcoLogo} alt="ARCO Laboratorio de Arquitectura" className="h-10 w-auto object-contain mb-4" />
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Laboratorio de Arquitectura. Diseño disruptivo, innovador y accesible para transformar
              los espacios en que vivimos.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wide uppercase text-xs">
              Navegación
            </h3>
            <ul className="space-y-2 text-sm">
              {['Inicio', 'Nosotros', 'Servicios', 'Portfolio', 'Contacto'].map(item => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={e => {
                      e.preventDefault()
                      document.querySelector(`#${item.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="hover:text-celeste transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wide uppercase text-xs">
              Servicios
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                'Diseño Arquitectónico',
                'Remodelaciones',
                'Interiorismo',
                'Asesoría Inmobiliaria',
                'Asesoría Normativa',
                'Asesoría de Diseño',
              ].map(s => (
                <li key={s} className="text-gray-400 hover:text-celeste transition-colors cursor-default">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wide uppercase text-xs">
              Contacto
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-celeste mt-0.5 shrink-0" />
                <span>La Concepción 141, Providencia, Santiago</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-celeste shrink-0" />
                <a href="tel:+56935607782" className="hover:text-celeste transition-colors">
                  +56 9 3560 7782
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-celeste shrink-0" />
                <a href="mailto:contact@arco-lab.cl" className="hover:text-celeste transition-colors">
                  contact@arco-lab.cl
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={15} className="text-celeste mt-0.5 shrink-0" />
                <span>Lun–Vie · 9:00–18:00 hrs</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} ARCO Laboratorio de Arquitectura. Todos los derechos reservados.</span>
          <span>Santiago, Chile</span>
        </div>
      </div>
    </footer>
  )
}
