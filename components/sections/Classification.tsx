'use client'
import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'
import { TrophyIcon, ChevronUpDownIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

type Category = 'Elite Men' | 'Elite Women' | 'U18 Men' | 'U18 Women'

interface TeamStanding {
  position: number
  team: string
  played: number
  wins: number
  losses: number
  pointsFor: number
  pointsAgainst: number
  points: number
  streak: ('W' | 'L')[]
  category: Category
}

export const ClassificationSection = () => {
  const categories: Category[] = ['Elite Men', 'Elite Women', 'U18 Men', 'U18 Women']
  const [activeCategory, setActiveCategory] = useState<Category>('Elite Men')
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [sortConfig, setSortConfig] = useState<{ 
    key: keyof Omit<TeamStanding, 'category'> 
    direction: 'asc' | 'desc' 
  }>({ 
    key: 'position', 
    direction: 'asc' 
  })

  const standings: TeamStanding[] = [
    // Elite Men
    {
      position: 1,
      team: 'FAP Basketball',
      played: 12,
      wins: 10,
      losses: 2,
      pointsFor: 980,
      pointsAgainst: 820,
      points: 22,
      streak: ['W', 'W', 'W', 'L', 'W'],
      category: 'Elite Men'
    },
    {
      position: 2,
      team: 'Université de Douala',
      played: 12,
      wins: 9,
      losses: 3,
      pointsFor: 920,
      pointsAgainst: 850,
      points: 21,
      streak: ['W', 'L', 'W', 'W', 'W'],
      category: 'Elite Men'
    },
    {
      position: 3,
      team: 'APEJES Academy',
      played: 12,
      wins: 8,
      losses: 4,
      pointsFor: 890,
      pointsAgainst: 860,
      points: 20,
      streak: ['L', 'W', 'W', 'L', 'W'],
      category: 'Elite Men'
    },
    {
      position: 4,
      team: 'New Stars',
      played: 12,
      wins: 7,
      losses: 5,
      pointsFor: 870,
      pointsAgainst: 880,
      points: 19,
      streak: ['W', 'L', 'W', 'L', 'W'],
      category: 'Elite Men'
    },
    {
      position: 5,
      team: 'INJS',
      played: 12,
      wins: 6,
      losses: 6,
      pointsFor: 850,
      pointsAgainst: 850,
      points: 18,
      streak: ['L', 'W', 'L', 'W', 'L'],
      category: 'Elite Men'
    },

    // Elite Women
    {
      position: 1,
      team: 'INJS Women',
      played: 10,
      wins: 9,
      losses: 1,
      pointsFor: 850,
      pointsAgainst: 720,
      points: 19,
      streak: ['W', 'W', 'L', 'W', 'W'],
      category: 'Elite Women'
    },
    {
      position: 2,
      team: 'Panthers Ladies',
      played: 10,
      wins: 8,
      losses: 2,
      pointsFor: 820,
      pointsAgainst: 750,
      points: 18,
      streak: ['W', 'L', 'W', 'W', 'W'],
      category: 'Elite Women'
    },
    {
      position: 3,
      team: 'FAP Ladies',
      played: 10,
      wins: 7,
      losses: 3,
      pointsFor: 800,
      pointsAgainst: 780,
      points: 17,
      streak: ['L', 'W', 'W', 'L', 'W'],
      category: 'Elite Women'
    },
    {
      position: 4,
      team: 'Eclair',
      played: 10,
      wins: 6,
      losses: 4,
      pointsFor: 780,
      pointsAgainst: 790,
      points: 16,
      streak: ['W', 'L', 'W', 'L', 'W'],
      category: 'Elite Women'
    },

    // U18 Men
    {
      position: 1,
      team: 'Junior Panthers',
      played: 8,
      wins: 7,
      losses: 1,
      pointsFor: 680,
      pointsAgainst: 580,
      points: 15,
      streak: ['W', 'W', 'W', 'L', 'W'],
      category: 'U18 Men'
    },
    {
      position: 2,
      team: 'Young Lions',
      played: 8,
      wins: 6,
      losses: 2,
      pointsFor: 650,
      pointsAgainst: 600,
      points: 14,
      streak: ['W', 'L', 'W', 'W', 'W'],
      category: 'U18 Men'
    },
    {
      position: 3,
      team: 'Future Stars',
      played: 8,
      wins: 5,
      losses: 3,
      pointsFor: 620,
      pointsAgainst: 610,
      points: 13,
      streak: ['L', 'W', 'W', 'L', 'W'],
      category: 'U18 Men'
    },

    // U18 Women
    {
      position: 1,
      team: 'Rising Queens',
      played: 8,
      wins: 7,
      losses: 1,
      pointsFor: 660,
      pointsAgainst: 570,
      points: 15,
      streak: ['W', 'W', 'W', 'L', 'W'],
      category: 'U18 Women'
    },
    {
      position: 2,
      team: 'Diamond Girls',
      played: 8,
      wins: 6,
      losses: 2,
      pointsFor: 640,
      pointsAgainst: 590,
      points: 14,
      streak: ['W', 'L', 'W', 'W', 'W'],
      category: 'U18 Women'
    },
    {
      position: 3,
      team: 'Young Amazons',
      played: 8,
      wins: 5,
      losses: 3,
      pointsFor: 610,
      pointsAgainst: 600,
      points: 13,
      streak: ['L', 'W', 'W', 'L', 'W'],
      category: 'U18 Women'
    }
  ]

  const filteredStandings = useMemo(() => {
    return standings.filter(team => team.category === activeCategory)
  }, [standings, activeCategory])

  const sortedStandings = useMemo(() => {
    const sortableItems = [...filteredStandings]
    sortableItems.sort((a, b) => {
      if (sortConfig.key === 'position') {
        return a.position - b.position
      }

      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })
    return sortableItems
  }, [filteredStandings, sortConfig])

  const requestSort = (key: keyof Omit<TeamStanding, 'category'>) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  return (
    <section id="classification" className="py-24 bg-gray-950">
      <div className="container px-6 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            League <span className="text-orange-400">Standings</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Current team rankings by category
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

        <div className="overflow-x-auto rounded-lg border border-gray-800">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-gray-900">
              <tr>
                <th 
                  onClick={() => requestSort('position')} 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                >
                  <div className="flex items-center">
                    #
                    <ChevronUpDownIcon className="ml-1 w-4 h-4" />
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('team')} 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                >
                  <div className="flex items-center">
                    Team
                    <ChevronUpDownIcon className="ml-1 w-4 h-4" />
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('played')} 
                  className="px-6 py-4 text-center text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                >
                  <div className="flex items-center justify-center">
                    GP
                    <ChevronUpDownIcon className="ml-1 w-4 h-4" />
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('wins')} 
                  className="px-6 py-4 text-center text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                >
                  <div className="flex items-center justify-center">
                    W
                    <ChevronUpDownIcon className="ml-1 w-4 h-4" />
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('losses')} 
                  className="px-6 py-4 text-center text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                >
                  <div className="flex items-center justify-center">
                    L
                    <ChevronUpDownIcon className="ml-1 w-4 h-4" />
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('pointsFor')} 
                  className="px-6 py-4 text-center text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                >
                  <div className="flex items-center justify-center">
                    Scores
                    <ChevronUpDownIcon className="ml-1 w-4 h-4" />
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('pointsFor')} 
                  className="px-6 py-4 text-center text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                >
                  <div className="flex items-center justify-center">
                    Diff
                    <ChevronUpDownIcon className="ml-1 w-4 h-4" />
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('points')} 
                  className="px-6 py-4 text-center text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                >
                  <div className="flex items-center justify-center">
                    PTS
                    <ChevronUpDownIcon className="ml-1 w-4 h-4" />
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Streak
                </th>
              </tr>
            </thead>
            
            <tbody className="bg-gray-900/50 divide-y divide-gray-800">
              {sortedStandings.map((team, index) => (
                <motion.tr
                  key={`${team.category}-${team.team}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`hover:bg-gray-800 ${team.position <= 4 ? 'bg-green-900/10' : ''}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {team.position === 1 && <TrophyIcon className="w-5 h-5 text-yellow-400 mr-2" />}
                      <span className={`font-medium ${team.position <= 4 ? 'text-green-400' : 'text-white'}`}>
                        {team.position}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{team.team}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-300">
                    {team.played}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-300">
                    {team.wins}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-300">
                    {team.losses}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-300">
                    {team.pointsFor}-{team.pointsAgainst}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-center text-sm font-medium ${
                    team.pointsFor - team.pointsAgainst > 0 ? 'text-green-400' : 
                    team.pointsFor - team.pointsAgainst < 0 ? 'text-red-400' : 'text-gray-300'
                  }`}>
                    {team.pointsFor - team.pointsAgainst > 0 ? '+' : ''}{team.pointsFor - team.pointsAgainst}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-bold text-white">
                    {team.points}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-center space-x-1">
                      {team.streak.slice(0, 5).map((result, i) => (
                        <span 
                          key={i} 
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                            result === 'W' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                          }`}
                        >
                          {result}
                        </span>
                      ))}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}