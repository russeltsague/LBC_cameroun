'use client'
import { useState } from 'react'
import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiUsers } from 'react-icons/fi'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Team {
  id: string
  name: string
  city: string
  category: string
  championships: number
}

export function TeamManagement() {
  const [teams, setTeams] = useState<Team[]>([
    { id: '1', name: 'FAP Basketball', city: 'Yaoundé', category: 'Elite Men', championships: 8 }
  ])
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null)

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (id: string) => {
    setTeams(teams.filter(team => team.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative max-w-md w-full">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search teams..."
            className="bg-gray-800 rounded-lg pl-10 pr-4 py-2 w-full text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => {
            setCurrentTeam(null)
            setIsModalOpen(true)
          }}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <FiPlus className="mr-2" /> Add Team
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map((team, index) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-orange-500/50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-white">{team.name}</h3>
                <p className="text-gray-400 mt-1">{team.city}</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => {
                    setCurrentTeam(team)
                    setIsModalOpen(true)
                  }}
                  className="text-gray-400 hover:text-orange-400 p-1"
                >
                  <FiEdit2 />
                </button>
                <button 
                  onClick={() => handleDelete(team.id)}
                  className="text-gray-400 hover:text-red-400 p-1"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-300">Category: {team.category}</p>
              <p className="text-sm text-gray-300">Championships: {team.championships}</p>
            </div>
            <Link 
              href={`/admin/teams/${team.id}`}
              className="mt-4 inline-block text-orange-400 hover:text-orange-300 text-sm font-medium"
            >
              Manage Team →
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}