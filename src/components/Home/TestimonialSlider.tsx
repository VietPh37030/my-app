import type React from "react"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface Testimonial {
  id: number
  name: string
  company: string
  content: string
  avatar: string
}

const TestimonialSlider: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "John Fang",
      company: "wordfaang.com",
      content:
        "Suspendisse ultrices at diam lectus nullam. Nisl, sagittis viverra enim erat tortor ultricies massa turpis. Arcu pulvinar aenean nam laoreet nulla.",
      avatar: "/assets/images/testimonial1.png",
    },
    {
      id: 2,
      name: "Jane C",
      company: "janedor",
      content:
        "Suspendisse ultrices at diam lectus nullam. Nisl, sagittis viverra enim erat tortor ultricies massa turpis. Arcu pulvinar aenean nam laoreet nulla.",
      avatar: "/assets/images/testimonial2.png",
    },
     {
      id: 3,
      name: "Jane C",
      company: "janedor",
      content:
        "Suspendisse ultrices at diam lectus nullam. Nisl, sagittis viverra enim erat tortor ultricies massa turpis. Arcu pulvinar aenean nam laoreet nulla.",
      avatar: "/assets/images/testimonial2.png",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="testimonial-container relative overflow-hidden mx-auto"
          style={{
            backgroundColor: '#9C69E2',
            width: '100%',
            maxWidth: '1120px',
            height: 'auto',
            minHeight: '710px',
            borderRadius: '50px',
            padding: '60px 40px'
          }}
        >
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ amount: 0.3 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white">Testimonials</h2>
          </motion.div>

          <motion.div
            className="relative mx-auto"
            style={{ maxWidth: '932px' }}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ amount: 0.3 }}
          >
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={2}
              centeredSlides={true}
            
              pagination={{
                clickable: true,
                bulletClass: 'swiper-pagination-bullet !bg-white/50 !w-3 !h-3',
                bulletActiveClass: 'swiper-pagination-bullet-active !bg-white',
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
              }}
              className="testimonial-swiper pb-12"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div
                    className="bg-white shadow-xl mx-2"
                    style={{
                      borderRadius: '20px',
                      width: '100%',
                      maxWidth: '932px',
                      height: 'auto',
                      minHeight: '331px',
                      padding: '24px'
                    }}
                  >
                    <div className="flex items-start space-x-4 h-full">
                      <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement!.classList.add('bg-gradient-to-br', 'from-purple-200', 'to-pink-200');
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-base sm:text-lg mb-1">{testimonial.name}</h4>
                        <p className="text-sm text-purple-600 mb-3 font-medium">{testimonial.company}</p>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed break-words">{testimonial.content}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialSlider
