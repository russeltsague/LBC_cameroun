'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { TeamCard } from '../ui/TeamCard'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

type Category = 
  | 'Elite Men' 
  | 'Elite Women' 
  | 'L1 Men' 
  | 'L2A Men' 
  | 'L2B Men' 
  | 'L1 Women' 
  | 'Veteran'
  | 'U18 Garçon'
  | 'U18 Fille'

interface Team {
  id: string
  name: string
  city: string
  logo: string
  category: Category
  founded: number
}

const categories: Category[] = [
  'Elite Men',
  'Elite Women',
  'L1 Men',
  'L2A Men',
  'L2B Men',
  'L1 Women',
  'Veteran',
  'U18 Garçon',
  'U18 Fille'
]

const featuredTeams: Team[] = [
  // Elite Men
  {
    id: '1',
    name: 'FAP Basketball',
    city: 'Yaoundé',
    logo: '/teams/fap-basketball.png',
    category: 'Elite Men',
    founded: 1972
  },
  {
    id: '2',
    name: 'Université de Douala',
    city: 'Douala',
    logo: '/teams/univ-douala.png',
    category: 'Elite Men',
    founded: 1985
  },
  {
    id: '3',
    name: 'APEJES Academy',
    city: 'Yaoundé',
    logo: '/teams/apejes.png',
    category: 'Elite Men',
    founded: 2001
  },

  // Elite Women
  {
    id: '4',
    name: 'INJS Women',
    city: 'Yaoundé',
    logo: '/teams/injs-women.png',
    category: 'Elite Women',
    founded: 1990
  },
  {
    id: '5',
    name: 'Panthers Ladies',
    city: 'Douala',
    logo: '/teams/panthers-ladies.png',
    category: 'Elite Women',
    founded: 1995
  },

  // L1 Men
  {
    id: '6',
    name: 'New Stars',
    city: 'Douala',
    logo: '/teams/new-stars.png',
    category: 'L1 Men',
    founded: 2010
  },
  {
    id: '7',
    name: 'Basket Evolution',
    city: 'Yaoundé',
    logo: '/teams/basket-evolution.png',
    category: 'L1 Men',
    founded: 2012
  },

  // L2A Men
  {
    id: '8',
    name: 'Young Tigers',
    city: 'Bafoussam',
    logo: '/teams/young-tigers.png',
    category: 'L2A Men',
    founded: 2015
  },

  // L2B Men
  {
    id: '9',
    name: 'Future Legends',
    city: 'Limbe',
    logo: '/teams/future-legends.png',
    category: 'L2B Men',
    founded: 2016
  },

  // L1 Women
  {
    id: '10',
    name: 'Diamond Girls',
    city: 'Yaoundé',
    logo: '/teams/diamond-girls.png',
    category: 'L1 Women',
    founded: 2014
  },

  // Veteran
  {
    id: '11',
    name: 'Golden Lions',
    city: 'Douala',
    logo: '/teams/golden-lions.png',
    category: 'Veteran',
    founded: 2005
  },

  // U18 Garçon
  {
    id: '12',
    name: 'Junior Panthers',
    city: 'Yaoundé',
    logo: '/teams/junior-panthers.png',
    category: 'U18 Garçon',
    founded: 2018
  },

  // U18 Fille
  {
    id: '13',
    name: 'Young Queens',
    city: 'Douala',
    logo: '/teams/young-queens.png',
    category: 'U18 Fille',
    founded: 2019
  }
]

export const FeaturedSection = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('Elite Men')
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)

  const filteredTeams = featuredTeams.filter(team => team.category === activeCategory)

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="container px-6 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured <span className="text-orange-400">Teams</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover teams by competition category
          </p>
        </motion.div>

        {/* Mobile category selector (centered) */}
<div className="md:hidden mb-8 flex justify-center">
  <div className="relative w-full max-w-xs">
    <button
      onClick={() => setIsCategoryOpen(!isCategoryOpen)}
      className="flex items-center justify-between w-full px-6 py-3 bg-gray-800 rounded-lg text-white"
    >
      <span className="truncate">{activeCategory}</span>
      <ChevronDownIcon className={`w-5 h-5 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
    </button>
    
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
            className={`w-full px-6 py-3 text-left truncate ${activeCategory === category ? 'bg-orange-500 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
          >
            {category}
          </button>
        ))}
      </motion.div>
    )}
  </div>
</div>

{/* Desktop category selector (centered and responsive) */}
<div className="hidden md:flex justify-center mb-12 w-full">
  <div className="inline-flex flex-wrap justify-center gap-2 max-w-full px-4 overflow-x-auto py-2">
    {categories.map(category => (
      <button
        key={category}
        onClick={() => setActiveCategory(category)}
        className={`px-4 py-2 rounded-md transition-colors whitespace-nowrap ${
          activeCategory === category 
            ? 'bg-orange-500 text-white' 
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        }`}
      >
        {category}
      </button>
    ))}
  </div>
</div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTeams.map((team, index) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <TeamCard {...team} />
            </motion.div>
          ))}
        </div>

        {filteredTeams.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-400"
          >
            No teams found in the {activeCategory} category
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <button className="inline-flex items-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105">
            View All Teams
            {/* <FiArrowRight className="ml-2" /> */}
          </button>
        </motion.div>
      </div>
    </section>
  )
}