import type React from "react"
import HeroSection from "../components/Home/HeroSection"
import AboutSection from "../components/Home/AboutSection"
import FeaturesSection from "../components/Home/FeaturesSection"

import CTASection from "../components/Home/CTASection"
import TestimonialSlider from "../components/Home/TestimonialSlider"


const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <TestimonialSlider />
      {/* <CTASection /> */}
    </>
  )
}

export default HomePage
