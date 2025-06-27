import type React from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { useScrollOnceAnimation } from "../../hooks/useScrollDirection"
import { Button } from "../UI/Button"
import { MessageCircleMore } from "lucide-react"
import { Button2 } from "../UI/Button2"



const Footer: React.FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.3, margin: "-100px" })
  const { shouldAnimate } = useScrollOnceAnimation()

  const isAnimated = shouldAnimate(isInView)

  return (
    <footer className="bg-white py-16 border-t border-gray-100" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Try for free section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex flex-col lg:flex-row lg:justify-between items-center lg:items-start text-center lg:text-left">
            <div className="mb-8 lg:mb-0">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Try for free!</h2>
              <p className="text-gray-600 text-lg">Get limited 1 week free try our features!</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button2
                className="border-gray-300 text-gray-700 px-8 py-3 rounded-full w-full sm:w-auto"
              >
                Learn more
              </Button2>
              <Button variant="outline" className="border-gray-300 text-gray-700 px-8 py-3 rounded-full w-full sm:w-auto">
                Request Demo →
              </Button>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16"
          initial={{ opacity: 0, y: 100 }}
          animate={isAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{ fontFamily: 'Avenir, -apple-system, BlinkMacSystemFont, sans-serif' }}
        >
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-3 mb-6">
              <img
                src="/assets/images/Logo.png"
                alt="DataWarehouse"
                className="h-8 w-auto"
              />
              <span className="text-lg font-bold text-gray-900">DataWarehouse</span>
            </div>
            <div className="text-gray-600 space-y-1 text-base leading-relaxed">
              <p>Warehouse Society,</p>
              <p><strong>234 Bahagia Ave</strong></p>
              <p><strong>Street PRBW 29281</strong></p>
              <p className="mt-4 italic">info@warehouse.project</p>
              <p><em>1-232-3434 (Main)</em></p>
            </div>
          </div>

          {/* About */}
          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-gray-900 mb-6">About</h3>
            <ul className="space-y-2 text-gray-600 text-base leading-relaxed">
              <li><a href="#" className="hover:text-purple-600">Profile</a></li>
              <li><a href="#" className="hover:text-purple-600">Features</a></li>
              <li><a href="#" className="hover:text-purple-600">Careers</a></li>
            </ul>
          </div>

          {/* Help */}
          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-gray-900 mb-6">Help</h3>
            <ul className="space-y-2 text-gray-600 text-base leading-relaxed">
              <li><a href="#" className="hover:text-purple-600">Support</a></li>
              <li><a href="#" className="hover:text-purple-600">Sign Up</a></li>
              <li><a href="#" className="hover:text-purple-600">Guide</a></li>
              <li><a href="#" className="hover:text-purple-600">Reports</a></li>
              <li><a href="#" className="hover:text-purple-600">Q & A</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-gray-900 mb-6">Social Media</h3>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                <i className="ri-youtube-fill text-gray-600 text-xl" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                <i className="ri-instagram-line text-gray-600 text-xl" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                <i className="ri-github-fill text-gray-600 text-xl" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="border-t border-gray-200 pt-8 mt-12"
          initial={{ opacity: 0 }}
          animate={isAnimated ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
            <p className="text-gray-600 text-sm mb-4 sm:mb-0">
              © DataWarehouse™, 2020. All rights reserved.<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>Company Registration Number: 21479524.
            </p>

            <div className="bg-[#9C69E2] rounded-full p-2 opacity-[0.2]">
              <MessageCircleMore className="w-8 h-8 text-purple-900" />
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
