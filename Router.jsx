import { useState, useEffect } from 'react'
import Dashboard from './Dashboard'
import AccountsPage from './AccountsPage'
import AnalyticsPage from './AnalyticsPage'
import TransfersPage from './TransfersPage'
import SettingsPage from './SettingsPage'

const Router = () => {
  const [currentPage, setCurrentPage] = useState('dashboard')

  useEffect(() => {
    // Listen for hash changes to handle navigation
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash) {
        setCurrentPage(hash)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    
    // Set initial page based on current hash
    handleHashChange()

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case 'accounts':
        return <AccountsPage />
      case 'analytics':
        return <AnalyticsPage />
      case 'transfers':
        return <TransfersPage />
      case 'settings':
        return <SettingsPage />
      default:
        return <Dashboard />
    }
  }

  return renderPage()
}

export default Router

