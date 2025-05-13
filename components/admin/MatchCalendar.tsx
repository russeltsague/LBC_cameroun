'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarIcon, ClockIcon, ChevronDownIcon, PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline'
import { MatchCardAdmin } from '../ui/MatchCardAdmin'

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

export const MatchCalendarAdmin = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Elite Men')
  const [matches, setMatches] = useState<Match[]>([
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
    }
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)

  const filteredMatches = matches.filter(match => match.category === activeCategory)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const handleSaveMatch = (match: Match) => {
    if (match.id) {
      // Update existing match
      setMatches(matches.map(m => m.id === match.id ? match : m))
    } else {
      // Add new match
      setMatches([...matches, { ...match, id: Date.now().toString() }])
    }
    setIsModalOpen(false)
    setCurrentMatch(null)
  }

  const handleDeleteMatch = (id: string) => {
    setMatches(matches.filter(match => match.id !== id))
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 md:mb-0">
          Match Calendar Management
        </h2>
        
        <button
          onClick={() => {
            setCurrentMatch(null)
            setIsModalOpen(true)
          }}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add New Match
        </button>
      </div>

      {/* Category selector */}
      <div className="mb-8">
        <div className="md:hidden mb-4 relative">
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="flex items-center justify-between w-full px-4 py-2 bg-gray-800 rounded-lg text-white"
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
                className="absolute z-10 w-full mt-1 bg-gray-800 rounded-lg overflow-hidden shadow-xl"
              >
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveCategory(category)
                      setIsCategoryOpen(false)
                    }}
                    className={`w-full px-4 py-2 text-left ${activeCategory === category ? 'bg-orange-500 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                  >
                    {category}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="hidden md:flex space-x-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-md transition-colors ${activeCategory === category ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Matches list */}
      <div className="space-y-4">
        {filteredMatches.length > 0 ? (
          filteredMatches.map(match => (
            <div key={match.id} className="bg-gray-800 rounded-lg p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center text-orange-400">
                    <CalendarIcon className="w-5 h-5 mr-2" />
                    <span>{formatDate(match.date)}</span>
                  </div>
                  <div className="flex items-center mt-1 text-gray-300">
                    <ClockIcon className="w-5 h-5 mr-2" />
                    <span>{match.time} • {match.venue}</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="text-center mx-4">
                    <div className="text-white font-medium">{match.homeTeam}</div>
                    <div className="text-gray-300 text-sm">vs</div>
                    <div className="text-white font-medium">{match.awayTeam}</div>
                  </div>
                  
                  {match.status === 'completed' && (
                    <div className="bg-gray-700 px-3 py-1 rounded-md mx-4">
                      <span className="font-bold">{match.homeScore}</span> - <span className="font-bold">{match.awayScore}</span>
                    </div>
                  )}
                  
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => {
                        setCurrentMatch(match)
                        setIsModalOpen(true)
                      }}
                      className="text-gray-400 hover:text-orange-400 p-1"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteMatch(match.id)}
                      className="text-gray-400 hover:text-red-400 p-1"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-gray-400 bg-gray-800 rounded-lg">
            No matches scheduled for this category
          </div>
        )}
      </div>

      {/* Match Edit/Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">
              {currentMatch ? 'Edit Match' : 'Add New Match'}
            </h3>
            
            <form onSubmit={(e) => {
              e.preventDefault()
              handleSaveMatch(currentMatch!)
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                  <select
                    value={currentMatch?.category || activeCategory}
                    onChange={(e) => setCurrentMatch({
                      ...currentMatch!,
                      category: e.target.value as any
                    })}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                    required
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
                    <input
                      type="date"
                      value={currentMatch?.date || ''}
                      onChange={(e) => setCurrentMatch({
                        ...currentMatch!,
                        date: e.target.value
                      })}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Time</label>
                    <input
                      type="time"
                      value={currentMatch?.time || ''}
                      onChange={(e) => setCurrentMatch({
                        ...currentMatch!,
                        time: e.target.value
                      })}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Venue</label>
                  <input
                    type="text"
                    value={currentMatch?.venue || ''}
                    onChange={(e) => setCurrentMatch({
                      ...currentMatch!,
                      venue: e.target.value
                    })}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Home Team</label>
                    <input
                      type="text"
                      value={currentMatch?.homeTeam || ''}
                      onChange={(e) => setCurrentMatch({
                        ...currentMatch!,
                        homeTeam: e.target.value
                      })}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Away Team</label>
                    <input
                      type="text"
                      value={currentMatch?.awayTeam || ''}
                      onChange={(e) => setCurrentMatch({
                        ...currentMatch!,
                        awayTeam: e.target.value
                      })}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                      required
                    />
                  </div>
                </div>
                
                {currentMatch?.status === 'completed' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Home Score</label>
                      <input
                        type="number"
                        min="0"
                        value={currentMatch?.homeScore || ''}
                        onChange={(e) => setCurrentMatch({
                          ...currentMatch!,
                          homeScore: parseInt(e.target.value) || 0
                        })}
                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Away Score</label>
                      <input
                        type="number"
                        min="0"
                        value={currentMatch?.awayScore || ''}
                        onChange={(e) => setCurrentMatch({
                          ...currentMatch!,
                          awayScore: parseInt(e.target.value) || 0
                        })}
                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                  <select
                    value={currentMatch?.status || 'upcoming'}
                    onChange={(e) => setCurrentMatch({
                      ...currentMatch!,
                      status: e.target.value as any
                    })}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                    <option value="live">Live</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 rounded-lg text-white hover:bg-orange-600"
                >
                  Save Match
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}