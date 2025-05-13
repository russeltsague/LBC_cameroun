'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarIcon, ClockIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { MatchCard } from '../ui/MatchCard'

type Match = {
  id: string
  date: string
  time: string
  homeTeam: string
  awayTeam: string
  homeScore?: number
  awayScore?: number
  category: 'Elite Men' | 'Elite Women' | 'U18 Men' | 'U18 Women'
  venue: string
  status: 'completed' | 'upcoming' | 'live'
}

const categories = ['Elite Men', 'Elite Women', 'U18 Men', 'U18 Women']

const mockMatches: Match[] = [
  {
    id: '1',
    date: '2023-10-15',
    time: '18:00',
    homeTeam: 'FAP Basketball',
    awayTeam: 'Université de Douala',
    homeScore: 78,
    awayScore: 72,
    category: 'Elite Men',
    venue: 'Yaoundé Sports Complex',
    status: 'completed'
  },
  {
    id: '2',
    date: '2023-10-22',
    time: '15:00',
    homeTeam: 'APEJES Academy',
    awayTeam: 'New Stars',
    category: 'Elite Men',
    venue: 'Douala Arena',
    status: 'upcoming'
  },
  {
    id: '3',
    date: '2023-10-20',
    time: '17:30',
    homeTeam: 'INJS',
    awayTeam: 'Panthers',
    homeScore: 65,
    awayScore: 68,
    category: 'Elite Women',
    venue: 'Yaoundé Sports Complex',
    status: 'completed'
  }
]

export const CalendarSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Elite Men')
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)

  const filteredMatches = mockMatches.filter(match => match.category === activeCategory)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <section id="calendar" className="py-24 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container px-6 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Match <span className="text-orange-400">Calendar</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Follow all the matches and results from the current season
          </p>
        </motion.div>

        {/* Mobile category selector */}
        <div className="md:hidden mb-8 relative">
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="flex items-center justify-between w-full px-6 py-3 bg-gray-800 rounded-lg text-white"
          >
            <span>{activeCategory}</span>
            <ChevronDownIcon className={`w-5 h-5 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {isCategoryOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute z-10 w-full mt-2 bg-gray-800 rounded-lg overflow-hidden shadow-xl"
              >
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveCategory(category)
                      setIsCategoryOpen(false)
                    }}
                    className={`w-full px-6 py-3 text-left ${activeCategory === category ? 'bg-orange-500 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                  >
                    {category}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop category selector */}
        <div className="hidden md:flex justify-center mb-12">
          <div className="inline-flex rounded-lg bg-gray-800 p-1">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-md transition-colors ${activeCategory === category ? 'bg-orange-500 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Matches list */}
        {filteredMatches.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 gap-4 max-w-4xl mx-auto"
          >
            {filteredMatches.map(match => (
              <MatchCard 
                key={match.id}
                match={match}
                isExpanded={expandedMatch === match.id}
                onExpand={() => setExpandedMatch(expandedMatch === match.id ? null : match.id)}
                formatDate={formatDate}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-400"
          >
            No matches scheduled for this category
          </motion.div>
        )}
      </div>
    </section>
  )
}