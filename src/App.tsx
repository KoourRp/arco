import { ThemeProvider } from './contexts/ThemeContext'
import { CurtainProvider } from './contexts/CurtainContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Services from './components/sections/Services'
import Portfolio from './components/sections/Portfolio'
import Contact from './components/sections/Contact'
import ScrollToTopButton from './components/ui/ScrollToTopButton'

export default function App() {
  return (
    <ThemeProvider>
      <CurtainProvider>
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
          <Header />
          <main>
            <Hero />
            <About />
            <Services />
            <Portfolio />
            <Contact />
          </main>
          <Footer />
        </div>
        <ScrollToTopButton />
      </CurtainProvider>
    </ThemeProvider>
  )
}
