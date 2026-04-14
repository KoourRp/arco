import type { CSSProperties } from 'react'

export type ARCOLetter = 'A' | 'R' | 'C' | 'O'

export const ARCO_COLORS: Record<ARCOLetter, string> = {
  A: '#ffffff',
  R: '#83cfef',
  C: '#ffdc5b',
  O: '#e73978',
}

export const ARCO_LABELS: Record<ARCOLetter, string> = {
  A: 'Asesoría Territorial & Acción Social',
  R: 'Regeneración Urbana & Patrimonio',
  C: 'Construcción, Comercio & Especialidades',
  O: 'Objetos & Identidad Visual',
}

export const TIPOS_VALIDOS = [
  'Ley del Mono', 'Asesoría Normativa', 'Obra Menor', 'Sanitaria', 'Construcción',
  'Remodelación', 'Asesoría de Diseño', 'Recepción Definitiva', 'Obra Nueva',
  'Eléctrica', 'Topografía', 'Asesoría Licitación', 'Sub-División', 'Interiorismo',
  'Mobiliario', 'Realidad Aumentada', 'Concurso', 'Proyecto Urbano', 'Paisajismo',
  'Restauración', 'Rehabilitación',
] as const
export type TipoProyecto = typeof TIPOS_VALIDOS[number]

export interface Project {
  id:          number
  number:      string           // "047", "011"
  name:        string           // "Proyecto Salas"
  arcoTypes:   ARCOLetter[]
  tipos:       TipoProyecto[]   // alcances técnicos
  comuna:      string
  description: string
  image:       string
  origin:      'ARCO' | 'URK' | 'UNARTE'
}

export const getProjectCode = (p: Project): string =>
  `${p.arcoTypes.join('')}${p.number}_${p.name.toUpperCase()}`

export const getCodeStyle = (arcoTypes: ARCOLetter[]): CSSProperties => {
  const colors = arcoTypes.map(l => ARCO_COLORS[l])
  if (colors.length === 1) return { color: colors[0] }
  return {
    background:           `linear-gradient(90deg, ${colors.join(', ')})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor:  'transparent',
    backgroundClip:       'text',
  }
}

export const projects: Project[] = [

  // ── REALES ───────────────────────────────────────────────────────────────────

  {
    id: 1,
    number: '047',
    name: 'Proyecto Salas',
    arcoTypes: ['A', 'R', 'C', 'O'],
    tipos: [
      'Asesoría Normativa', 'Construcción', 'Remodelación', 'Asesoría de Diseño',
      'Obra Nueva', 'Eléctrica', 'Topografía', 'Sanitaria',
      'Interiorismo', 'Mobiliario', 'Paisajismo',
    ],
    comuna: 'Lo Barnechea',
    description:
      'Proyecto integral de vivienda unifamiliar con intervención completa en todas las especialidades, desde el diseño arquitectónico hasta el paisajismo exterior.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    origin: 'ARCO',
  },
  {
    id: 2,
    number: '011',
    name: 'Proyecto Osses',
    arcoTypes: ['A', 'C', 'O'],
    tipos: ['Sanitaria', 'Obra Menor'],
    comuna: 'Til Til',
    description:
      'Intervención de obra menor con enfoque en interiorismo y puesta en valor patrimonial de vivienda rural en Til Til.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    origin: 'ARCO',
  },

  // ── SOLO A ────────────────────────────────────────────────────────────────────

  {
    id: 3,
    number: '023',
    name: 'Proyecto Muñoz',
    arcoTypes: ['A'],
    tipos: ['Obra Nueva', 'Construcción'],
    comuna: 'Vitacura',
    description:
      'Vivienda nueva de 280 m² con diseño contemporáneo en Vitacura, destacando volúmenes puros y fachada de hormigón visto que dialoga con el entorno arbolado.',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
    origin: 'ARCO',
  },
  {
    id: 4,
    number: '031',
    name: 'Proyecto Torres',
    arcoTypes: ['A'],
    tipos: ['Remodelación', 'Construcción'],
    comuna: 'Las Condes',
    description:
      'Remodelación completa de casa esquina en Las Condes, incorporando nuevas aperturas, reorganización del programa y renovación estructural.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    origin: 'ARCO',
  },
  {
    id: 5,
    number: '038',
    name: 'Proyecto Ibáñez',
    arcoTypes: ['A'],
    tipos: ['Obra Nueva', 'Construcción'],
    comuna: 'Providencia',
    description:
      'Obra nueva de carácter residencial en Providencia con énfasis en eficiencia energética pasiva, ventilación cruzada y fachada de ladrillo artesanal.',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    origin: 'ARCO',
  },

  // ── SOLO R ────────────────────────────────────────────────────────────────────

  {
    id: 6,
    number: '019',
    name: 'Proyecto Herrera',
    arcoTypes: ['R'],
    tipos: ['Ley del Mono', 'Recepción Definitiva'],
    comuna: 'Quilicura',
    description:
      'Regularización bajo Ley del Mono de ampliaciones existentes en propiedad residencial de Quilicura, con obtención de recepción definitiva y cierre de expediente municipal.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    origin: 'ARCO',
  },
  {
    id: 7,
    number: '027',
    name: 'Proyecto Vargas',
    arcoTypes: ['R'],
    tipos: ['Asesoría Normativa', 'Recepción Definitiva'],
    comuna: 'Maipú',
    description:
      'Asesoría normativa y gestión de regularización ante la DOM de Maipú para inmueble con modificaciones no autorizadas, incluyendo levantamiento as-built y tramitación completa.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    origin: 'ARCO',
  },

  // ── SOLO C ────────────────────────────────────────────────────────────────────

  {
    id: 8,
    number: '033',
    name: 'Proyecto Castillo',
    arcoTypes: ['C'],
    tipos: ['Interiorismo', 'Mobiliario'],
    comuna: 'Ñuñoa',
    description:
      'Diseño de interiores y especificación de mobiliario a medida para departamento de 95 m² en Ñuñoa, con paleta neutra, detalles en madera y optimización de cada rincón.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    origin: 'ARCO',
  },
  {
    id: 9,
    number: '041',
    name: 'Proyecto Reyes',
    arcoTypes: ['C'],
    tipos: ['Asesoría de Diseño', 'Interiorismo'],
    comuna: 'Santiago Centro',
    description:
      'Asesoría de diseño e interiorismo para local comercial en Santiago Centro, definiendo concepto, materialidades y distribución del espacio.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    origin: 'ARCO',
  },

  // ── SOLO O ────────────────────────────────────────────────────────────────────

  {
    id: 10,
    number: '015',
    name: 'Proyecto Bravo',
    arcoTypes: ['O'],
    tipos: ['Restauración', 'Rehabilitación'],
    comuna: 'Barrio Italia',
    description:
      'Restauración y rehabilitación de inmueble de valor patrimonial en Barrio Italia, recuperando elementos originales de principios del siglo XX sin alterar su carácter histórico.',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80',
    origin: 'ARCO',
  },

  // ── MULTI-LETRA ───────────────────────────────────────────────────────────────

  {
    id: 11,
    number: '029',
    name: 'Proyecto Fuentes',
    arcoTypes: ['A', 'R'],
    tipos: ['Obra Nueva', 'Asesoría Normativa', 'Construcción'],
    comuna: 'San Miguel',
    description:
      'Obra nueva residencial en San Miguel que integra el diseño arquitectónico y la gestión normativa de manera simultánea, agilizando tiempos de tramitación ante la DOM.',
    image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&q=80',
    origin: 'ARCO',
  },
  {
    id: 12,
    number: '044',
    name: 'Proyecto Lagos',
    arcoTypes: ['C', 'O'],
    tipos: ['Interiorismo', 'Restauración', 'Mobiliario'],
    comuna: 'Barrio Yungay',
    description:
      'Interiorismo y restauración de interiores en casona patrimonial del Barrio Yungay, fusionando la preservación histórica de estucos y molduras con un diseño interior contemporáneo.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
    origin: 'ARCO',
  },
]
