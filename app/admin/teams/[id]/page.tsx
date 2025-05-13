'use client'
import { notFound } from 'next/navigation'
import { FiArrowLeft, FiEdit2, FiSave, FiUpload } from 'react-icons/fi'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiUser, FiTrash2 } from 'react-icons/fi'
import Image from 'next/image'
import TeamRosterAdmin from '@/components/admin/TeamRosterAdmin'

interface Team {
  id: string
  name: string
  city: string
  logo: string
  founded: number
  arena: string
  championships: number
  category: 'Elite Men' | 'Elite Women' | 'U21' | 'U18'
  coach: string
  about: string
}

interface PageProps {
  params: {
    id: string
  }
}

export default function TeamDetailPage({ params }: PageProps) {
  const [team, setTeam] = useState<Team>({
    id: params.id,
    name: 'FAP Basketball',
    city: 'Yaoundé',
    logo: '/teams/fap-basketball.png',
    founded: 1972,
    arena: 'Yaoundé Sports Complex',
    championships: 8,
    category: 'Elite Men',
    coach: 'Jean-Paul Akono',
    about: 'FAP Basketball Club is one of the most successful basketball teams in Cameroon, with multiple national championships.'
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editedTeam, setEditedTeam] = useState<Team>({ ...team })

  const handleSave = () => {
    setTeam(editedTeam)
    setIsEditing(false)
  }

  if (!team) {
    return notFound()
  }

  return (
    <div className="bg-gray-950 min-h-screen">
      {/* Team Header */}
      <div className="relative h-64 bg-gradient-to-r from-blue-900/90 to-orange-900/80">
        <div className="absolute inset-0 bg-[url('/images/court-pattern.svg')] opacity-10" />
        <div className="container mx-auto px-6 h-full flex items-center relative z-10">
          <div className="flex flex-col md:flex-row items-center w-full justify-between">
            <div className="flex items-center">
              <div className="w-32 h-32 md:w-48 md:h-48 relative mr-0 md:mr-8 mb-4 md:mb-0">
                <Image
                  src={team.logo}
                  alt={team.name}
                  fill
                  className="object-contain drop-shadow-lg"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full">
                    <FiUpload className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="text-center md:text-left">
                <Link href="/admin/teams" className="inline-flex items-center text-gray-300 hover:text-white mb-4">
                  <FiArrowLeft className="mr-2" /> Back to Teams
                </Link>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedTeam.name}
                    onChange={(e) => setEditedTeam({ ...editedTeam, name: e.target.value })}
                    className="text-4xl md:text-5xl font-bold text-white mb-2 bg-gray-800 border border-gray-700 rounded px-4 py-2 w-full"
                  />
                ) : (
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{team.name}</h1>
                )}
              </div>
            </div>
            
            <div className="mt-4 md:mt-0">
              {isEditing ? (
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setIsEditing(false)
                      setEditedTeam({ ...team })
                    }}
                    className="px-4 py-2 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-orange-500 rounded-lg text-white hover:bg-orange-600 transition-colors flex items-center"
                  >
                    <FiSave className="mr-2" />
                    Save Changes
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-orange-500 rounded-lg text-white hover:bg-orange-600 transition-colors flex items-center"
                >
                  <FiEdit2 className="mr-2" />
                  Edit Team
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Team Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* About Team */}
            <div className="bg-gray-900 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">About the Team</h2>
                {isEditing && (
                  <button className="text-orange-400 hover:text-orange-300">
                    <FiEdit2 />
                  </button>
                )}
              </div>
              {isEditing ? (
                <textarea
                  value={editedTeam.about}
                  onChange={(e) => setEditedTeam({ ...editedTeam, about: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white min-h-[120px]"
                />
              ) : (
                <p className="text-gray-300">{team.about}</p>
              )}
            </div>

            {/* Team Roster Admin */}
            <TeamRosterAdmin teamId={team.id} />
          </div>

          <div className="space-y-8">
            {/* Team Info Card */}
            <div className="bg-gray-900 rounded-xl p-6 sticky top-4">
              <h3 className="text-xl font-bold text-white mb-4">Team Information</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-1">Category</h4>
                  {isEditing ? (
                    <select
                      value={editedTeam.category}
                      onChange={(e) => setEditedTeam({ 
                        ...editedTeam, 
                        category: e.target.value as Team['category'] 
                      })}
                      className="bg-gray-800 border border-gray-700 rounded w-full px-3 py-2 text-white"
                    >
                      <option value="Elite Men">Elite Men</option>
                      <option value="Elite Women">Elite Women</option>
                      <option value="U21">U21</option>
                      <option value="U18">U18</option>
                    </select>
                  ) : (
                    <p className="text-white">{team.category}</p>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-1">Head Coach</h4>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedTeam.coach}
                      onChange={(e) => setEditedTeam({ ...editedTeam, coach: e.target.value })}
                      className="bg-gray-800 border border-gray-700 rounded w-full px-3 py-2 text-white"
                    />
                  ) : (
                    <p className="text-white">{team.coach}</p>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-1">Home Arena</h4>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedTeam.arena}
                      onChange={(e) => setEditedTeam({ ...editedTeam, arena: e.target.value })}
                      className="bg-gray-800 border border-gray-700 rounded w-full px-3 py-2 text-white"
                    />
                  ) : (
                    <p className="text-white">{team.arena}</p>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-1">Championships</h4>
                  {isEditing ? (
                    <input
                      type="number"
                      min="0"
                      value={editedTeam.championships}
                      onChange={(e) => setEditedTeam({ ...editedTeam, championships: parseInt(e.target.value) || 0 })}
                      className="bg-gray-800 border border-gray-700 rounded w-full px-3 py-2 text-white"
                    />
                  ) : (
                    <p className="text-white">{team.championships}</p>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-1">Founded Year</h4>
                  {isEditing ? (
                    <input
                      type="number"
                      min="1900"
                      max={new Date().getFullYear()}
                      value={editedTeam.founded}
                      onChange={(e) => setEditedTeam({ ...editedTeam, founded: parseInt(e.target.value) || 1970 })}
                      className="bg-gray-800 border border-gray-700 rounded w-full px-3 py-2 text-white"
                    />
                  ) : (
                    <p className="text-white">{team.founded}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}