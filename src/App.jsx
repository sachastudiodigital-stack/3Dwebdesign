import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import GallerySection from './components/GallerySection'
import PackagesSection from './components/PackagesSection'
import TestimonialsSection from './components/TestimonialsSection'
import AmenitiesSection from './components/AmenitiesSection'
import FAQSection from './components/FAQSection'
import BlogSection from './components/BlogSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <GallerySection />
        <PackagesSection />
        <TestimonialsSection />
        <AmenitiesSection />
        <FAQSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
