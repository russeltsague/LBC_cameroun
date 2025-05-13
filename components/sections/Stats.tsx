'use client'

import { motion } from 'framer-motion'
import { FiAward, FiUsers, FiActivity } from 'react-icons/fi'

const stats = [
  { id: 1, name: 'Teams Competing', value: '24', icon: FiUsers },
  { id: 2, name: 'Matches Played', value: '156', icon: FiActivity },
  { id: 3, name: 'Championships', value: '15', icon: FiAward }
]

export const StatsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="container px-6 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-orange-500/30 transition-colors"
            >
              <div className="flex items-center">
                <div className="p-4 rounded-lg bg-orange-500/10 mr-6">
                  <stat.icon className="w-8 h-8 text-orange-400" />
                </div>
                <div>
                  <p className="text-4xl font-bold text-white mb-2">{stat.value}</p>
                  <p className="text-gray-400">{stat.name}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}