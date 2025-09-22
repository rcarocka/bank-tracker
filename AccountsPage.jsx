import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  CreditCard, 
  Plus, 
  RefreshCw, 
  Eye,
  EyeOff,
  TrendingUp,
  TrendingDown,
  MoreVertical
} from 'lucide-react'
import ApiService from '../services/api'

const AccountsPage = () => {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showBalances, setShowBalances] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    loadAccounts()
  }, [])

  const loadAccounts = async () => {
    try {
      setLoading(true)
      // For now, use mock data since we don't have real API keys
      const mockAccounts = [
        {
          id: 1,
          accountName: 'Chase Total Checking',
          accountNumber: '****1234',
          accountType: 'CHECKING',
          balance: { amount: 2450.50, currency: 'USD' },
          providerName: 'Chase Bank',
          status: 'ACTIVE',
          lastUpdated: '2025-09-17T07:00:00Z',
          isManual: false
        },
        {
          id: 2,
          accountName: 'Wells Fargo Way2Save',
          accountNumber: '****5678',
          accountType: 'SAVINGS',
          balance: { amount: 8750.25, currency: 'USD' },
          providerName: 'Wells Fargo',
          status: 'ACTIVE',
          lastUpdated: '2025-09-17T06:30:00Z',
          isManual: false
        },
        {
          id: 3,
          accountName: 'Capital One Quicksilver',
          accountNumber: '****9012',
          accountType: 'CREDIT_CARD',
          balance: { amount: -1250.75, currency: 'USD' },
          availableCredit: { amount: 3749.25, currency: 'USD' },
          creditLimit: { amount: 5000.00, currency: 'USD' },
          providerName: 'Capital One',
          status: 'ACTIVE',
          lastUpdated: '2025-09-17T05:45:00Z',
          isManual: false
        },
        {
          id: 4,
          accountName: 'Emergency Fund',
          accountNumber: 'MANUAL001',
          accountType: 'SAVINGS',
          balance: { amount: 5000.00, currency: 'USD' },
          providerName: 'Manual Account',
          status: 'ACTIVE',
          lastUpdated: '2025-09-16T12:00:00Z',
          isManual: true
        }
      ]
      setAccounts(mockAccounts)
    } catch (error) {
      console.error('Failed to load accounts:', error)
    } finally {
      setLoading(false)
    }
  }

  const refreshAccounts = async () => {
    setRefreshing(true)
    await loadAccounts()
    setRefreshing(false)
  }

  const getAccountTypeColor = (type) => {
    switch (type) {
      case 'CHECKING':
        return 'bg-blue-100 text-blue-800'
      case 'SAVINGS':
        return 'bg-green-100 text-green-800'
      case 'CREDIT_CARD':
        return 'bg-purple-100 text-purple-800'
      case 'INVESTMENT':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getAccountTypeIcon = (type) => {
    switch (type) {
      case 'CHECKING':
      case 'SAVINGS':
        return <CreditCard className="h-5 w-5" />
      case 'CREDIT_CARD':
        return <CreditCard className="h-5 w-5" />
      default:
        return <CreditCard className="h-5 w-5" />
    }
  }

  const formatBalance = (balance, accountType) => {
    const amount = Math.abs(balance.amount)
    const formatted = amount.toLocaleString('en-US', { 
      style: 'currency', 
      currency: balance.currency 
    })
    
    if (accountType === 'CREDIT_CARD' && balance.amount < 0) {
      return `-${formatted}`
    }
    return formatted
  }

  const getBalanceColor = (balance, accountType) => {
    if (accountType === 'CREDIT_CARD') {
      return balance.amount < 0 ? 'text-red-600' : 'text-green-600'
    }
    return balance.amount >= 0 ? 'text-green-600' : 'text-red-600'
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Accounts</h1>
            <p className="text-gray-600">Manage your connected financial accounts</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Accounts</h1>
          <p className="text-gray-600">Manage your connected financial accounts</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowBalances(!showBalances)}
            className="flex items-center gap-2"
          >
            {showBalances ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showBalances ? 'Hide' : 'Show'} Balances
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshAccounts}
            disabled={refreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Account
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Accounts</p>
                <p className="text-2xl font-bold">{accounts.length}</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Connected</p>
                <p className="text-2xl font-bold text-green-600">
                  {accounts.filter(acc => !acc.isManual).length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Manual</p>
                <p className="text-2xl font-bold text-orange-600">
                  {accounts.filter(acc => acc.isManual).length}
                </p>
              </div>
              <TrendingDown className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <Card key={account.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    {getAccountTypeIcon(account.accountType)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{account.accountName}</CardTitle>
                    <p className="text-sm text-gray-500">{account.accountNumber}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge className={getAccountTypeColor(account.accountType)}>
                    {account.accountType.replace('_', ' ')}
                  </Badge>
                  <Badge variant={account.isManual ? 'secondary' : 'default'}>
                    {account.isManual ? 'Manual' : 'Connected'}
                  </Badge>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">
                    {account.accountType === 'CREDIT_CARD' ? 'Current Balance' : 'Available Balance'}
                  </p>
                  <p className={`text-2xl font-bold ${getBalanceColor(account.balance, account.accountType)}`}>
                    {showBalances ? formatBalance(account.balance, account.accountType) : '••••••'}
                  </p>
                </div>

                {account.accountType === 'CREDIT_CARD' && account.availableCredit && (
                  <div>
                    <p className="text-sm text-gray-600">Available Credit</p>
                    <p className="text-lg font-semibold text-green-600">
                      {showBalances ? formatBalance(account.availableCredit, account.accountType) : '••••••'}
                    </p>
                  </div>
                )}
                
                <div className="pt-2 border-t">
                  <p className="text-xs text-gray-500">
                    {account.providerName} • Last updated: {new Date(account.lastUpdated).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default AccountsPage

