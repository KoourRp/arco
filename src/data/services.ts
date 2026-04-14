export interface Service {
  id: string
  title: string
  description: string
  icon: string
  whatsappText: string
}

const WA = 'Hola, me interesa el servicio de'

export const services: Service[] = [
  {
    id: 'diseno-arquitectonico',
    title: 'Diseño Arquitectónico',
    description:
      'Proyectos residenciales y comerciales con identidad propia. Desde el concepto hasta la materialización, creamos espacios que inspiran.',
    icon: 'Building2',
    whatsappText: `${WA} Diseño Arquitectónico. Me gustaría agendar una asesoría para hablar sobre mi proyecto.`,
  },
  {
    id: 'remodelaciones',
    title: 'Remodelaciones',
    description:
      'Transformamos espacios existentes con intervenciones inteligentes que maximizan el potencial de cada metro cuadrado.',
    icon: 'Hammer',
    whatsappText: `${WA} Remodelaciones. Tengo un espacio que me gustaría transformar y quisiera conocer sus opciones.`,
  },
  {
    id: 'interiorismo',
    title: 'Interiorismo',
    description:
      'Diseño de interiores que combina funcionalidad, estética y bienestar. Cada detalle cuenta una historia.',
    icon: 'Sofa',
    whatsappText: `${WA} Interiorismo. Me gustaría agendar una asesoría para el diseño de interiores de mi espacio.`,
  },
  {
    id: 'asesoria-inmobiliaria',
    title: 'Asesoría Inmobiliaria',
    description:
      'Te acompañamos en la toma de decisiones de inversión y compra, evaluando el potencial real de cada propiedad.',
    icon: 'TrendingUp',
    whatsappText: `${WA} Asesoría Inmobiliaria. Estoy evaluando una propiedad y me gustaría contar con su orientación.`,
  },
  {
    id: 'asesoria-normativa',
    title: 'Asesoría Normativa',
    description:
      'Gestión de permisos, revisión de normas urbanísticas y acompañamiento en trámites ante la DOM y otros organismos.',
    icon: 'FileCheck',
    whatsappText: `${WA} Asesoría Normativa. Necesito orientación sobre permisos o trámites y me gustaría coordinar una consulta.`,
  },
  {
    id: 'asesoria-diseno',
    title: 'Asesoría de Diseño',
    description:
      'Consultoría puntual para proyectos en curso: revisión de planos, paletas de materiales y resolución de problemas de diseño.',
    icon: 'Lightbulb',
    whatsappText: `${WA} Asesoría de Diseño. Tengo un proyecto en curso y me gustaría una consulta puntual.`,
  },
]
