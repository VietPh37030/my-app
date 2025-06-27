import type React from "react"
import { motion } from "framer-motion"
import { Button } from "../UI/Button"

const HeroSection: React.FC = () => {

  return (
    <section className="bg-white py-12 sm:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <motion.div
            className="order-2 lg:order-1 text-center lg:text-left w-full lg:max-w-[520px] lg:-ml-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <span className="text-[#212353]">Save your data<br className="hidden sm:block"/>
              <span className="sm:hidden"> </span>storage here.</span>

            </motion.h1>
            <motion.p
              className="text-gray-600 text-lg mb-8 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              Data Warehouse is a data storage area that has been tested for security, so you can store
              your data here safely but not be afraid of being stolen by others.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-medium">
                Learn more
              </Button>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <div className="relative w-full h-96 lg:h-[500px]">
              <motion.img
                src="/assets/images/header1.png"
                alt="Data Storage Illustration"
                className="w-full h-full object-contain"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
                onError={(e) => {
                  // Fallback nếu không tìm thấy ảnh
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              {/* Fallback content */}
              <motion.div
                className="hidden w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              >
                <div className="text-center">
                  <img
                    src="/assets/images/Logo.png"
                    alt="Logo"
                    className="w-32 h-auto mx-auto mb-4"
                  />
                  <p className="text-gray-600">Data Storage Illustration</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
