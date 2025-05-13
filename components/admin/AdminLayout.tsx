// components/admin/AdminLayout.tsx
'use client'
import { motion } from 'framer-motion'
import { FiLogOut, FiArrowLeft } from 'react-icons/fi'
import Link from 'next/link'

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Admin Navigation */}
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center text-orange-400 hover:text-orange-300">
            <FiArrowLeft className="mr-2" />
            Back to Main Site
          </Link>
          
          <div className="flex items-center space-x-6">
            <button className="text-gray-400 hover:text-white flex items-center">
              <FiLogOut className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  )
}