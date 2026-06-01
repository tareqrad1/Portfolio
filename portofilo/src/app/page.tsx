import HeroSection from '@/components/hero/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import EducationSection from '@/components/sections/EducationSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
