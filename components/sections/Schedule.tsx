'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarIcon, ClockIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface ScheduleMatch {
  id: string
  date: string
  time: string
  homeTeam: string
  awayTeam: string
  venue: string
  competition: string
}

export const ScheduleSection = () => {
  const [currentWeek, setCurrentWeek] = useState(0)
  
  // Generate mock schedule data for 4 weeks
  const weeklySchedules = [
    {
      week: 1,
      matches: [
        {
          id: '1',
          date: '2023-11-01',
          time: '18:00',
          homeTeam: 'FAP Basketball',
          awayTeam: 'Université de Douala',
          venue: 'Yaoundé Sports Complex',
          competition: 'Elite Men'
        },
        // More matches...
      ]
    },
    // More weeks...
  ]

  const currentSchedule = weeklySchedules.find(schedule => schedule.week === currentWeek + 1) || weeklySchedules[0]

  return (
    <section id="schedule" className="py-24 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="container px-6 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Weekly <span className="text-orange-400">Schedule</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Upcoming matches for the current week
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => setCurrentWeek(prev => Math.max(prev - 1, 0))}
              disabled={currentWeek === 0}
              className="p-2 rounded-full bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
            >
              <ChevronLeftIcon className="w-5 h-5 text-white" />
            </button>
            
            <h3 className="text-xl font-bold text-white">
              Week {currentWeek + 1} • {currentSchedule?.matches[0]?.date && new Date(currentSchedule.matches[0].date).toLocaleDateString('en-US', { month: 'long' })}
            </h3>
            
            <button
              onClick={() => setCurrentWeek(prev => Math.min(prev + 1, weeklySchedules.length - 1))}
              disabled={currentWeek === weeklySchedules.length - 1}
              className="p-2 rounded-full bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
            >
              <ChevronRightIcon className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="space-y-4">
            {currentSchedule?.matches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-orange-500/30 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gray-700 p-3 rounded-lg">
                        <CalendarIcon className="text-orange-400 w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {match.homeTeam} vs {match.awayTeam}
                        </h3>
                        <div className="flex items-center space-x-3 text-gray-400 mt-1">
                          <span className="flex items-center text-sm">
                            <ClockIcon className="w-4 h-4 mr-1" /> 
                            {new Date(match.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} • {match.time}
                          </span>
                          <span className="text-sm bg-blue-500/10 text-blue-400 px-2 py-1 rounded">
                            {match.competition}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-4">
                    <button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors">
                      Set Reminder
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}