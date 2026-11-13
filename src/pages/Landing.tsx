import Hero from '../components/landing/Hero'
import Features from '../components/landing/Features'
import Styles from '../components/landing/Styles'
import Languages from '../components/landing/Languages'
import HowItWorks from '../components/landing/HowItWorks'
import Pricing from '../components/landing/Pricing'
import FinalCta from '../components/landing/FinalCta'

export default function Landing() {
  return (
    <>
      <Hero />
      <Features />
      <Styles />
      <Languages />
      <HowItWorks />
      <Pricing />
      <FinalCta />
    </>
  )
}