import type React from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  bgImage: string
  featureImage: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, bgImage, featureImage }) => {
  return (
    <motion.div
      className="rounded-3xl p-8 relative overflow-hidden min-h-[300px]"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Background overlay for better readability */}
      <div className="absolute inset-0 bg-white/80"></div>

      {/* Content Layout: Image left, Text right */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center h-full">
        {/* Feature Image - Left side */}
        <div className="flex justify-center md:justify-start">
          <div className="w-32 h-32 lg:w-40 lg:h-40 relative">
            <img
              src={featureImage}
              alt={title}
              className="w-full h-full object-contain"
              onError={(e) => {
                // Fallback nếu không tìm thấy ảnh
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
            {/* Fallback content */}
            <div className="hidden w-full h-full bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl items-center justify-center">
              <img
                src="/assets/images/Logo.png"
                alt="Logo"
                className="w-16 h-auto"
              />
            </div>
          </div>
        </div>

        {/* Text Content - Right side */}
        <div className="text-center md:text-left">
          <h3 className="text-2xl  text-[#212353] mb-4">{title}</h3>
          <p className="text-gray-600 text-base leading-relaxed mb-6">{description}</p>
          <button className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium transition-colors">
            Learn more
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default FeatureCard
