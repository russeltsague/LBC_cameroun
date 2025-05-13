'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const sponsors = [
  { name: 'Orange', logo: '/sponsors/orange.png' },
  { name: 'Total', logo: '/sponsors/total.png' },
  { name: 'MTN', logo: '/sponsors/mtn.png' },
  { name: 'Canal+', logo: '/sponsors/canalplus.png' }
]

export const SponsorsSection = () => {
  return (
    <section className="py-16 bg-gray-800">
      <div className="container px-6 mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl text-gray-400 mb-2">Official Partners</h3>
          <h2 className="text-3xl font-bold text-white">Our Sponsors</h2>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="relative h-16 w-32 grayscale hover:grayscale-0 transition-all"
            >
              <Image 
                src={sponsor.logo} 
                alt={sponsor.name}
                fill
                className="object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}