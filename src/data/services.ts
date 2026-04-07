export interface Service {
  id: string
  title: string
  description: string
  icon: string
}

export const services: Service[] = [
  {
    id: 'diseno-arquitectonico',
    title: 'Diseño Arquitectónico',
    description:
      'Proyectos residenciales y comerciales con identidad propia. Desde el concepto hasta la materialización, creamos espacios que inspiran.',
    icon: 'Building2',
  },
  {
    id: 'remodelaciones',
    title: 'Remodelaciones',
    description:
      'Transformamos espacios existentes con intervenciones inteligentes que maximizan el potencial de cada metro cuadrado.',
    icon: 'Hammer',
  },
  {
    id: 'interiorismo',
    title: 'Interiorismo',
    description:
      'Diseño de interiores que combina funcionalidad, estética y bienestar. Cada detalle cuenta una historia.',
    icon: 'Sofa',
  },
  {
    id: 'asesoria-inmobiliaria',
    title: 'Asesoría Inmobiliaria',
    description:
      'Te acompañamos en la toma de decisiones de inversión y compra, evaluando el potencial real de cada propiedad.',
    icon: 'TrendingUp',
  },
  {
    id: 'asesoria-normativa',
    title: 'Asesoría Normativa',
    description:
      'Gestión de permisos, revisión de normas urbanísticas y acompañamiento en trámites ante la DOM y otros organismos.',
    icon: 'FileCheck',
  },
  {
    id: 'asesoria-diseno',
    title: 'Asesoría de Diseño',
    description:
      'Consultoría puntual para proyectos en curso: revisión de planos, paletas de materiales y resolución de problemas de diseño.',
    icon: 'Lightbulb',
  },
]
