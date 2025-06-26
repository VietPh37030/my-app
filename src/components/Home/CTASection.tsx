import type React from "react"
import { motion } from "framer-motion"
import { Button } from "../UI/Button"
import { ArrowRight } from "lucide-react"

const CTASection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ amount: 0.3 }}
      >
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Try for free!</h2>
        <p className="text-gray-600 text-lg mb-8">Get limited 1 week free try our features!</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full text-lg font-medium">
            Learn more
          </Button>
          <Button variant="ghost" className="text-gray-700 hover:text-gray-900 font-medium">
            Request Demo
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    </section>
  )
}

export default CTASection
