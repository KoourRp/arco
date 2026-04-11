export type ProjectCategory =
  | 'todos'
  | 'arquitectura'
  | 'regularizacion'
  | 'interiorismo'
  | 'patrimonio'

export interface Project {
  id: number
  name: string
  category: Exclude<ProjectCategory, 'todos'>
  description: string
  image: string
  code: string
  origin: 'propio' | 'colaboracion' | 'academia'
  subcategory?: 'residencial' | 'comercial' | 'publico' | 'industrial'
  details?: string[]
}

export const projects: Project[] = [
  // ── ARQUITECTURA (A) ─────────────────────────────────────────────────────
  {
    id: 1,
    name: 'Casa Vitacura',
    category: 'arquitectura',
    description: 'Vivienda unifamiliar de 320 m² con énfasis en la relación interior–exterior y materialidad de hormigón a la vista.',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
    code: 'A001_CASA VITACURA',
    origin: 'propio',
    subcategory: 'residencial',
    details: [
      'Proyecto de arquitectura y anteproyecto',
      'Diseño estructural y de especialidades',
      'Tramitación de permiso de edificación DOM',
    ],
  },
  {
    id: 2,
    name: 'Torre Isidora',
    category: 'arquitectura',
    description: 'Edificio de oficinas de 18 pisos en Las Condes con fachada vidriada de doble piel y certificación LEED Gold.',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    code: 'A002_TORRE ISIDORA',
    origin: 'propio',
    subcategory: 'comercial',
    details: [
      'Anteproyecto y proyecto de arquitectura',
      'Coordinación de especialidades MEP',
      'Gestión de certificación LEED Gold',
    ],
  },
  {
    id: 3,
    name: 'Condominio El Golf',
    category: 'arquitectura',
    description: 'Conjunto residencial de 48 unidades con áreas comunes bioclimáticas y sistema de gestión hídrica pasiva.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    code: 'A003_CONDOMINIO EL GOLF',
    origin: 'propio',
    subcategory: 'residencial',
    details: [
      'Masterplan y proyecto de arquitectura',
      'Diseño de áreas comunes bioclimáticas',
      'Sistema de captación y gestión hídrica pasiva',
    ],
  },
  {
    id: 4,
    name: 'Centro Cultural Recoleta',
    category: 'arquitectura',
    description: 'Equipamiento cultural de 1.200 m² que integra sala de exposiciones, biblioteca y auditorio en un volumen articulado.',
    image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&q=80',
    code: 'A004_CENTRO CULTURAL RECOLETA',
    origin: 'propio',
    subcategory: 'publico',
    details: [
      'Proyecto de arquitectura y paisajismo',
      'Diseño acústico de auditorio',
      'Gestión municipal y postulación FNDR',
    ],
  },

  // ── REGULARIZACION (R) ───────────────────────────────────────────────────
  {
    id: 5,
    name: 'Dúplex Providencia',
    category: 'regularizacion',
    description: 'Regularización de ampliación vertical de 90 m² con gestión DOM completa y tramitación de recepción final.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    code: 'R001_DUPLEX PROVIDENCIA',
    origin: 'propio',
    subcategory: 'residencial',
    details: [
      'Levantamiento arquitectónico as-built',
      'Gestión DOM y tramitación de recepción final',
      'Regularización bajo Ley de Copropiedad',
    ],
  },
  {
    id: 6,
    name: 'Local Comercial Ñuñoa',
    category: 'regularizacion',
    description: 'Actualización de permisos y regularización de modificaciones estructurales en local de 320 m².',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    code: 'R002_LOCAL COMERCIAL NUÑOA',
    origin: 'propio',
    subcategory: 'comercial',
    details: [
      'Diagnóstico estructural y levantamiento',
      'Actualización de expediente municipal',
      'Obtención de certificado de habitabilidad',
    ],
  },
  {
    id: 7,
    name: 'Bodega Industrial Pudahuel',
    category: 'regularizacion',
    description: 'Gestión de regularización de nave industrial de 2.800 m² incluyendo estudio de impacto vial y saneamiento.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    code: 'R003_BODEGA INDUSTRIAL PUDAHUEL',
    origin: 'propio',
    subcategory: 'industrial',
    details: [
      'Regularización industrial ante SEREMI',
      'Estudio de impacto vial y mitigación',
      'Saneamiento y tramitación SEC',
    ],
  },

  // ── INTERIORISMO (C) ─────────────────────────────────────────────────────
  {
    id: 8,
    name: 'Penthouse Lastarria',
    category: 'interiorismo',
    description: 'Renovación integral de 180 m² con materialidad nórdica, madera de roble y paños de vidrio estructural.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    code: 'C001_PENTHOUSE LASTARRIA',
    origin: 'propio',
    subcategory: 'residencial',
    details: [
      'Diseño de interiores y especificación de materialidades',
      'Diseño de muebles y carpintería a medida',
      'Coordinación y supervisión de obra',
    ],
  },
  {
    id: 9,
    name: 'Restaurante Barrio Italia',
    category: 'interiorismo',
    description: 'Local gastronómico de 220 m² que fusiona estética industrial con calidez artesanal y mobiliario de autor.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    code: 'C002_RESTAURANTE BARRIO ITALIA',
    origin: 'propio',
    subcategory: 'comercial',
    details: [
      'Diseño conceptual e interiorismo completo',
      'Diseño de mobiliario de autor y cocina',
      'Gestión de obra y puesta en marcha',
    ],
  },
  {
    id: 10,
    name: 'Spa Ñuñoa',
    category: 'interiorismo',
    description: 'Centro de bienestar de 350 m² con paleta natural, luz cenital controlada y materiales de bajo impacto ambiental.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
    code: 'C003_SPA NUÑOA',
    origin: 'propio',
    subcategory: 'comercial',
    details: [
      'Diseño de espacios de bienestar y salud',
      'Selección de materialidad natural certificada',
      'Diseño de iluminación y climatización',
    ],
  },
  {
    id: 11,
    name: 'Estudio Vitacura',
    category: 'interiorismo',
    description: 'Oficina boutique de 85 m² diseñada para estudio creativo con zonas de concentración, colaboración y descanso.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
    code: 'C004_ESTUDIO VITACURA',
    origin: 'propio',
    subcategory: 'comercial',
    details: [
      'Diseño de oficina boutique y branding espacial',
      'Diseño acústico y de iluminación',
      'Mobiliario a medida y coordinación de obra',
    ],
  },

  // ── PATRIMONIO (O) ───────────────────────────────────────────────────────
  {
    id: 12,
    name: 'Casona Yungay',
    category: 'patrimonio',
    description: 'Restauración de inmueble de conservación histórica de 1910, recuperando estucos, molduras y sistemas de ventilación original.',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80',
    code: 'O001_CASONA YUNGAY',
    origin: 'propio',
    subcategory: 'residencial',
    details: [
      'Levantamiento patrimonial y diagnóstico',
      'Restauración de estucos, molduras y carpintería',
      'Asesoría y tramitación ante CMN',
    ],
  },
  {
    id: 13,
    name: 'Palacio Cousiño',
    category: 'patrimonio',
    description: 'Intervención de puesta en valor en edificio patrimonial del siglo XIX, con consolidación estructural y restauración de fachada.',
    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&q=80',
    code: 'O002_PALACIO COUSINO',
    origin: 'propio',
    subcategory: 'publico',
    details: [
      'Consolidación estructural sismo-resistente',
      'Restauración de fachada e interiores patrimoniales',
      'Gestión ante SNCR y Ministerio de las Culturas',
    ],
  },
  {
    id: 14,
    name: 'Iglesia San Ignacio',
    category: 'patrimonio',
    description: 'Estudio de diagnóstico y propuesta de restauración de torre campanario con daños sísmicos en zona centro de Santiago.',
    image: 'https://images.unsplash.com/photo-1548509087-fc32a61b5f13?w=800&q=80',
    code: 'O003_IGLESIA SAN IGNACIO',
    origin: 'propio',
    subcategory: 'publico',
    details: [
      'Diagnóstico sísmico y propuesta estructural',
      'Informe técnico y expediente para CMN',
      'Propuesta de restauración de torre campanario',
    ],
  },
]
