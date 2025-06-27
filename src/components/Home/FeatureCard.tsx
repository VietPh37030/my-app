import type React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  bgImage: string;
  featureImage: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, bgImage, featureImage }) => {
  const isBgImageValid = () => {
    const img = new Image();
    img.src = bgImage;
    img.onload = () => console.log("Background image loaded:", bgImage);
    img.onerror = () => console.error("Background image failed to load:", bgImage);
  };
  isBgImageValid();

  return (
    <motion.div
      className="rounded-3xl p-8 relative overflow-hidden min-h-[300px] z-0 bg-gray-50"
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Background image chỉ hiển thị trên desktop */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "500px 300px",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Overlay chỉ hiển thị trên desktop khi có background image */}
      <div className="absolute inset-0 bg-white/40 hidden md:block"></div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center h-full"> {/* Loại bỏ gap để sát nhau */}
        <div className="flex justify-center md:justify-start">
          <div className="w-32 h-32 lg:w-40 lg:h-40 relative">
            <img
              src={featureImage}
              alt={title}
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                target.nextElementSibling?.classList.remove("hidden");
              }}
            />
            <div className="hidden w-full h-full bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl items-center justify-center">
              <img
                src="/images/Logo.png"
                alt="Logo"
                className="w-16 h-auto"
              />
            </div>
          </div>
        </div>

        <div className="text-center md:text-left md:-ml-20"> {/* Tăng margin âm để gần hơn nữa */}
          <h3 className="text-2xl text-[#212353] mb-4">{title}</h3>
          <p className="text-gray-600 text-base leading-relaxed mb-6">{description}</p>
          <button className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium transition-colors">
            Learn more
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureCard;