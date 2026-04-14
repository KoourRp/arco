import { useEffect, useState } from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { useCurtain } from '../../contexts/CurtainContext'
import { cn } from '../../lib/utils'
import arcoLogoBlack from '../../assets/img/arcoheader_black.png'
import arcoLogoWhite from '../../assets/img/arcoheader_white.png'

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const { triggerCurtain } = useCurtain()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent',
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between md:grid md:grid-cols-3 h-16 md:h-20">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={e => { e.preventDefault(); triggerCurtain() }}
            className="select-none cursor-pointer"
          >
            <img
              src={theme === 'dark' ? arcoLogoBlack : arcoLogoWhite}
              alt="ARCO Laboratorio de Arquitectura"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center justify-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={e => handleNavClick(e, link.href)}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-magenta dark:hover:text-magenta transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Cambiar tema"
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a
              href={`https://wa.me/56935607782?text=${encodeURIComponent('Hola, quiero agendar una asesoría con ARCO')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-border-anim hidden sm:inline-flex items-center gap-2 bg-magenta text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-magenta/85 transition-all shadow hover:shadow-magenta/30 hover:shadow-md"
            >
              Agenda tu asesoría 👉
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="md:hidden p-2 text-gray-700 dark:text-gray-300"
              aria-label="Menú"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300',
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-md px-6 py-4 flex flex-col gap-4 border-t border-gray-100 dark:border-gray-800">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={e => handleNavClick(e, link.href)}
              className="text-base font-medium text-gray-700 dark:text-gray-300 hover:text-magenta dark:hover:text-magenta transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`https://wa.me/56935607782?text=${encodeURIComponent('Hola, quiero agendar una asesoría con ARCO')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-border-anim inline-flex items-center justify-center gap-2 bg-magenta text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-magenta/85 transition-all mt-2"
          >
            Agenda tu asesoría 👉
          </a>
        </div>
      </div>
    </header>
  )
}
