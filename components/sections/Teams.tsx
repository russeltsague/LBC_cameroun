'use client'

import { motion } from 'framer-motion'
import { TeamCard } from '../ui/TeamCard'
import { FiSearch } from 'react-icons/fi'

interface Team {
  id: string
  name: string
  city: string
  logo: string
  category: string
  founded: number
  championships: number
}

export const TeamsSection = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  const teams: Team[] = [
    {
      id: '1',
      name: 'FAP Basketball',
      city: 'Yaoundé',
      logo: '/teams/fap-basketball.png',
      category: 'Elite Men',
      founded: 1972,
      championships: 8
    },
    // More teams...
  ]

  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    team.city.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <section id="teams" className="py-24 bg-gray-950">
      <div className="container px-6 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            League <span className="text-orange-400">Teams</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover all the teams competing in this season
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-12 relative"
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search teams..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredTeams.length > 0 ? (
            filteredTeams.map((team, index) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <TeamCard {...team} />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12 text-gray-400"
            >
              No teams found matching your search
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}