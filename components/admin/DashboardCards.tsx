// components/admin/DashboardCards.tsx
'use client'
import { motion } from 'framer-motion'
import { FiEdit2, FiUsers, FiCalendar, FiAward } from 'react-icons/fi'
const stats = [
  { name: 'Total Teams', value: '24', change: '+2 from last season' },
  { name: 'Matches Played', value: '156', change: '12 this week' },
  { name: 'Pending Results', value: '8', change: 'Need updates' },
  { name: 'Active Categories', value: '5', change: 'Men, Women, U21, U18, U15' },
]

export function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-orange-500/20 transition-colors"
        >
          <h3 className="text-gray-400 text-sm font-medium">{stat.name}</h3>
          <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
          <p className="text-sm text-gray-500 mt-2">{stat.change}</p>
        </motion.div>
      ))}

      {/* Recent Activity Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="md:col-span-2 lg:col-span-4 bg-gray-900 rounded-lg p-6 border border-gray-800"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'Updated match result', details: 'FAP vs Université Douala (82-76)', time: '2 hours ago' },
            { action: 'Added new team', details: 'Basketball Academy Yaoundé', time: '1 day ago' },
            { action: 'Updated standings', details: 'Men Division 1', time: '2 days ago' },
          ].map((activity, index) => (
            <div key={index} className="flex items-start pb-4 border-b border-gray-800 last:border-0 last:pb-0">
              <div className="bg-orange-500/10 p-2 rounded-lg">
                <FiEdit2 className="w-4 h-4 text-orange-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-white">{activity.action}</p>
                <p className="text-sm text-gray-400">{activity.details}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}