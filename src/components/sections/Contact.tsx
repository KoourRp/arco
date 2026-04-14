import { useState, useRef } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { cn } from '../../lib/utils'

const WHATSAPP = '56935607782'
const EMAIL    = 'contact@arco-lab.cl'

// ─── Ícono WhatsApp (SVG inline) ─────────────────────────────────────────────
function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function Contact() {
  const { ref: headRef, isVisible: headVisible } = useScrollAnimation()
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation()
  const { ref: infoRef, isVisible: infoVisible } = useScrollAnimation()

  const [sent, setSent]       = useState<'whatsapp' | 'email' | null>(null)
  const [loading, setLoading] = useState<'whatsapp' | 'email' | null>(null)
  const formEl = useRef<HTMLFormElement>(null)

  const getFormData = () => {
    const data    = new FormData(formEl.current!)
    const name    = (data.get('name')    as string).trim()
    const email   = (data.get('email')   as string).trim()
    const subject = (data.get('subject') as string).trim()
    const message = (data.get('message') as string).trim()
    return { name, email, subject, message }
  }

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!formEl.current?.reportValidity()) return
    const { name, subject, message } = getFormData()
    const text = encodeURIComponent(`Hola, soy ${name}.\nAsunto: ${subject}\n${message}`)
    setLoading('whatsapp')
    setTimeout(() => {
      setLoading(null)
      setSent('whatsapp')
      window.open(`https://wa.me/${WHATSAPP}?text=${text}`, '_blank')
    }, 600)
  }

  const handleEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!formEl.current?.reportValidity()) return
    const { name, email, subject, message } = getFormData()
    const body = encodeURIComponent(
      `Nombre: ${name}\nEmail: ${email}\n\n${message}`
    )
    const subjectEncoded = encodeURIComponent(`[ARCO] ${subject}`)
    setLoading('email')
    setTimeout(() => {
      setLoading(null)
      setSent('email')
      window.open(`mailto:${EMAIL}?subject=${subjectEncoded}&body=${body}`, '_blank')
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
                  href: `https://wa.me/${WHATSAPP}`,
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
                title="Ubicación ARCO"
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
                    {sent === 'whatsapp'
                      ? 'Se abrió WhatsApp con tu mensaje. Te respondemos a la brevedad.'
                      : 'Se abrió tu cliente de correo con el mensaje listo. Te respondemos a la brevedad.'}
                  </p>
                  <button
                    onClick={() => setSent(null)}
                    className="mt-4 text-sm text-magenta hover:underline"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form ref={formEl} className="space-y-5" noValidate>
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

                  {/* Botones de envío */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    {/* WhatsApp */}
                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      disabled={!!loading}
                      className="btn-border-anim flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold py-3.5 rounded-full hover:bg-[#1ebe5c] transition-all shadow hover:shadow-[#25D366]/30 hover:shadow-lg disabled:opacity-70 text-sm"
                    >
                      {loading === 'whatsapp' ? (
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      ) : (
                        <WhatsAppIcon size={16} />
                      )}
                      WhatsApp
                    </button>

                    {/* Email */}
                    <button
                      type="button"
                      onClick={handleEmail}
                      disabled={!!loading}
                      className="btn-border-anim flex items-center justify-center gap-2 bg-celeste text-gray-900 font-semibold py-3.5 rounded-full hover:bg-celeste/85 transition-all shadow hover:shadow-celeste/30 hover:shadow-lg disabled:opacity-70 text-sm"
                    >
                      {loading === 'email' ? (
                        <span className="w-4 h-4 border-2 border-gray-900/40 border-t-gray-900 rounded-full animate-spin" />
                      ) : (
                        <Send size={15} />
                      )}
                      Correo
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
