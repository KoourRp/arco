import { useState } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import arcoLogo from '../../assets/img/arcoheader_black.png'

function InstagramButton() {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href="https://www.instagram.com/arco_lab/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram @arco_lab"
      className="btn-border-anim relative flex items-center justify-center w-10 h-10 rounded-full text-gray-400 dark:text-gray-500 hover:text-gray-200 transition-colors duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
        <defs>
          <linearGradient id="insta-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#f09433" />
            <stop offset="25%"  stopColor="#e6683c" />
            <stop offset="50%"  stopColor="#dc2743" />
            <stop offset="75%"  stopColor="#cc2366" />
            <stop offset="100%" stopColor="#bc1888" />
          </linearGradient>
        </defs>
        <path
          fill={hovered ? 'url(#insta-grad)' : 'currentColor'}
          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
        />
      </svg>
    </a>
  )
}

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
          <div className="flex items-center gap-4">
            <InstagramButton />
            <span>Santiago, Chile</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
