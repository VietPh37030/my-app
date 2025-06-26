import type React from "react"
import { motion } from "framer-motion"

const AboutSection: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-12 lg:p-16"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ amount: 0.3 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ amount: 0.3 }}
            >
              <div className="relative w-full h-80 lg:h-96">
                <div className="w-full h-full bg-gradient-to-br rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                   <img src="/assets/images/About.png" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              viewport={{ amount: 0.3 }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                We are a high-level data storage bank
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                The place to store various data that you can access at any time through the internet and where you can
                carry it. This very flexible storage area has a high level of security. To enter into your own data you
                must enter the password that you created when you registered in this Data Warehouse.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
