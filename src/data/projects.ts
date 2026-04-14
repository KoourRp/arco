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

  {
    id: 1,
    number: '001',
    name: 'AS Los Ciervos',
    arcoTypes: ['A'],
    tipos: ['Ley del Mono'],
    comuna: 'El Bosque',
    description: '',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    origin: 'ARCO',
  },
]
