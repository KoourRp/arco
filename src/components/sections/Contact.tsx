import { useState, useRef } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { cn } from '../../lib/utils'

const WHATSAPP = '+56935607782'
const EMAIL = 'contact@arco-lab.cl'

export default function Contact() {
  const { ref: headRef, isVisible: headVisible } = useScrollAnimation()
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation()
  const { ref: infoRef, isVisible: infoVisible } = useScrollAnimation()

  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const formEl = useRef<HTMLFormElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const data = new FormData(formEl.current!)
    const name = data.get('name') as string
    const message = data.get('message') as string
    const subject = data.get('subject') as string

    const text = encodeURIComponent(
      `Hola, soy ${name}.\nAsunto: ${subject}\n${message}`,
    )
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
      window.open(`https://wa.me/${WHATSAPP.replace(/\D/g, '')}?text=${text}`, '_blank')
    }, 600)
  }

  return (
    <section id="contacto" className="py-24 lg:py-32 bg-gray-50 dark:bg-gray-900/50">
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
            Hablemos
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Contacto
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            ¿Tienes un proyecto en mente? Cuéntanos y te ayudamos a hacerlo realidad.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info + Map */}
          <div
            ref={infoRef as React.RefObject<HTMLDivElement>}
            className={cn(
              'space-y-8 transition-all duration-700',
              infoVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10',
            )}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                {
                  icon: MapPin,
                  label: 'Dirección',
                  value: 'La Concepción 141\nProvidencia, Santiago',
                  href: 'https://maps.google.com/?q=La+Concepción+141,+Providencia,+Santiago',
                },
                {
                  icon: Phone,
                  label: 'WhatsApp',
                  value: '+56 9 3560 7782',
                  href: `https://wa.me/56935607782`,
                },
                {
                  icon: Mail,
                  label: 'Email',
                  value: EMAIL,
                  href: `mailto:${EMAIL}`,
                },
                {
                  icon: Clock,
                  label: 'Horarios',
                  value: 'Lun–Vie\n9:00–18:00 hrs',
                  href: undefined,
                },
              ].map(item => (
                <div
                  key={item.label}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800"
                >
                  <div className="w-10 h-10 rounded-xl bg-celeste/10 flex items-center justify-center mb-3">
                    <item.icon size={18} className="text-celeste" />
                  </div>
                  <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-700 dark:text-gray-300 hover:text-magenta dark:hover:text-magenta transition-colors whitespace-pre-line"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                      {item.value}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Embedded map */}
            <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 h-72">
              <iframe
                title="Ubicación AR|CO"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.0786890305!2d-70.61808082400783!3d-33.43317739874143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf5f5898e4c7%3A0x9a5c7f5c5a5c5a5c!2sLa+Concepci%C3%B3n+141%2C+Providencia%2C+Regi%C3%B3n+Metropolitana!5e0!3m2!1ses!2scl!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form */}
          <div
            ref={formRef as React.RefObject<HTMLDivElement>}
            className={cn(
              'transition-all duration-700 delay-200',
              formVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10',
            )}
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 shadow-sm">
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center gap-4">
                  <CheckCircle size={56} className="text-celeste" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">¡Mensaje enviado!</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Se abrió WhatsApp con tu mensaje. Te respondemos a la brevedad.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-4 text-sm text-magenta hover:underline"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form ref={formEl} onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Envíanos un mensaje
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide block mb-1.5">
                        Nombre
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Tu nombre"
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-celeste transition"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide block mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="tu@email.com"
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-celeste transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide block mb-1.5">
                      Asunto
                    </label>
                    <select
                      name="subject"
                      required
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-celeste transition"
                    >
                      <option value="">Selecciona un servicio…</option>
                      <option>Diseño Arquitectónico</option>
                      <option>Remodelaciones</option>
                      <option>Interiorismo</option>
                      <option>Asesoría Inmobiliaria</option>
                      <option>Asesoría Normativa</option>
                      <option>Asesoría de Diseño</option>
                      <option>Otro</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide block mb-1.5">
                      Mensaje
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Cuéntanos sobre tu proyecto…"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-celeste transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-magenta text-white font-semibold py-3.5 rounded-full hover:bg-magenta/85 transition-all shadow hover:shadow-magenta/30 hover:shadow-lg disabled:opacity-70"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send size={16} />
                    )}
                    {loading ? 'Enviando…' : 'Enviar por WhatsApp'}
                  </button>

                  <p className="text-center text-xs text-gray-400">
                    También puedes escribirnos directamente a{' '}
                    <a href={`mailto:${EMAIL}`} className="text-celeste hover:underline">
                      {EMAIL}
                    </a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
