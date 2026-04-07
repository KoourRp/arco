export type ProjectCategory = 'todos' | 'residencial' | 'comercial' | 'interiorismo'

export interface Project {
  id: string
  title: string
  category: Exclude<ProjectCategory, 'todos'>
  location: string
  year: string
  image: string
  description: string
}

export const projects: Project[] = [
  {
    id: 'casa-vitacura',
    title: 'Casa Vitacura',
    category: 'residencial',
    location: 'Vitacura, Santiago',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
    description: 'Vivienda unifamiliar de 320 m² con énfasis en la relación interior–exterior.',
  },
  {
    id: 'oficinas-isidora',
    title: 'Oficinas Isidora',
    category: 'comercial',
    location: 'Las Condes, Santiago',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    description: 'Planta libre de 800 m² con zonas colaborativas y cabinas acústicas.',
  },
  {
    id: 'penthouse-lastarria',
    title: 'Penthouse Lastarria',
    category: 'interiorismo',
    location: 'Lastarria, Santiago',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    description: 'Renovación integral de 180 m² con materialidad nórdica y toques locales.',
  },
  {
    id: 'restaurante-barrio-italia',
    title: 'Restaurante Barrio Italia',
    category: 'comercial',
    location: 'Barrio Italia, Santiago',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    description: 'Local gastronómico de 220 m² que fusiona industrial y calidez artesanal.',
  },
  {
    id: 'duplex-providencia',
    title: 'Dúplex Providencia',
    category: 'residencial',
    location: 'Providencia, Santiago',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    description: 'Ampliación vertical de 90 m² que incorpora terraza y doble altura.',
  },
  {
    id: 'spa-nuñoa',
    title: 'Spa Ñuñoa',
    category: 'interiorismo',
    location: 'Ñuñoa, Santiago',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
    description: 'Centro de bienestar de 350 m² con paleta natural y luz cenital.',
  },
]
