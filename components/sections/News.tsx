'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FiClock, FiCalendar } from 'react-icons/fi'

const newsItems = [
  {
    id: 1,
    title: 'FAP Basketball Wins Championship',
    excerpt: 'FAP Basketball clinched their 5th consecutive title in a thrilling final match.',
    date: '2023-09-15',
    image: '/images/news-1.jpg',
    category: 'Match Report'
  },
  {
    id: 2,
    title: 'New Rising Stars in Junior League',
    excerpt: 'Young talents emerge in this year\'s junior basketball league competition.',
    date: '2023-09-10',
    image: '/images/news-2.jpg',
    category: 'Features'
  }
]

export const NewsSection = () => {
  return (
    <section className="py-20 bg-gray-950">
      <div className="container px-6 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Latest <span className="text-orange-400">News</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Stay updated with the latest from Cameroon Basketball League
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((news, index) => (
            <motion.article
              key={news.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-orange-500 text-white">
                    {news.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-400 mb-3">
                  <FiCalendar className="mr-1" />
                  {new Date(news.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{news.title}</h3>
                <p className="text-gray-400 mb-4">{news.excerpt}</p>
                <button className="text-orange-400 hover:text-orange-300 font-medium flex items-center">
                  Read More
                  <FiClock className="ml-2" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}