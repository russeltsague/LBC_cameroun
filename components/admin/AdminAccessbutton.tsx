// components/AdminAccessButton.tsx
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FiLock, FiUnlock } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function AdminAccessButton() {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // In a real app, you would check authentication status from your backend
    // For now, we'll use localStorage as a simple frontend-only solution
    const adminAuth = localStorage.getItem('adminAuth') === 'true'
    setIsAdmin(adminAuth)
  }, [])

  if (!isAdmin) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link
        href="/admin"
        className="flex items-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-full shadow-lg transition-all duration-300 group"
      >
        <FiUnlock className="mr-2 group-hover:rotate-45 transition-transform" />
        Admin Dashboard
      </Link>
    </motion.div>
  )
}