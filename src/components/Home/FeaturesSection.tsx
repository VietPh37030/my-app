import type React from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { useScrollOnceAnimation } from "../../hooks/useScrollDirection"
import FeatureCard from "./FeatureCard"

const FeaturesSection: React.FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.3, margin: "-100px" })
  const { shouldAnimate } = useScrollOnceAnimation()

  const isAnimated = shouldAnimate(isInView)

  const features = [
    {
      title: "Search Data",
      description:
        "Don't worry if your data is very large, the Data Warehouse provides a search engine, which is useful for making it easier to find data effectively saving time.",
      bgImage: "/assets/images/bg_feature1.png",
      featureImage: "/assets/images/feature1.png",
    },
    {
      title: "24 Hours Access",
      description:
        "Access is given 24 hours a full morning to night and meet again in the morning, giving you comfort when you need data when urgent.",
      bgImage: "/assets/images/bg_feature2.png",
      featureImage: "/assets/images/feature2.png",
    },
    {
      title: "Print Out",
      description:
        "Print out service gives you convenience if someday you need print data, just edit it all and just print it.",
      bgImage: "/assets/images/bg_feature3.png",
      featureImage: "/assets/images/feature3.png",
    },
    {
      title: "Security Code",
      description:
        "Data Security is one of our best facilities. Allows for your files to be safer. The file can be secured with a code or password that you created, so only you can open the file.",
      bgImage: "/assets/images/bg_feature4.png",
      featureImage: "/assets/images/feature4.png",
    },
  ]

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={isAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#212353] mb-6">Features</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Some of the features and advantages that we provide for those of you who store data in this Data Warehouse.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -100 }}
              animate={isAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                bgImage={feature.bgImage}
                featureImage={feature.featureImage}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
