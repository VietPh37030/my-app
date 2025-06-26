import type React from "react"
import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram } from "lucide-react"
import { Button } from "../UI/Button"

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Try for free section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ amount: 0.3 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Try for free!</h2>
          <p className="text-gray-600 text-lg mb-8">Get limited 1 week free try our features!</p>
          <div className="flex justify-center gap-4">
            <Button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full">
              Learn more
            </Button>
            <Button variant="outline" className="border-gray-300 text-gray-700 px-8 py-3 rounded-full">
              Request Demo →
            </Button>
          </div>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ amount: 0.3 }}
        >
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/assets/images/Logo.png"
                alt="DataWarehouse"
                className="h-8 w-auto"
              />
              <span className="text-lg font-bold text-gray-900">DataWarehouse</span>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Warehouse Society, 234</p>
              <p>Bahagia Ave Street PRBW 29281</p>
              <p className="mt-3">info@warehouse.project</p>
              <p>1-232-3434 (Main)</p>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">About</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-purple-600">
                  Profile
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-600">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-600">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-600">
                  DW News
                </a>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Help</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-purple-600">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-600">
                  Sign up
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-600">
                  Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-600">
                  Reports
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-600">
                  Q&A
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="font-semibold text-gray-900 mb-4">Social Media</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Facebook className="w-5 h-5 text-gray-600" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Twitter className="w-5 h-5 text-gray-600" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Instagram className="w-5 h-5 text-gray-600" />
              </a>
            </div>
          </div>



        </motion.div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-600">
            © Datawarehouse™, 2020. All rights reserved.
            <br className="md:hidden" />
            <span className="md:ml-2">Company Registration Number: 21479524.</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
