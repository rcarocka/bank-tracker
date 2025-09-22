import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeftRight, 
  Plus, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Send
} from 'lucide-react'
import TransferConfirmDialog from './TransferConfirmDialog'

const TransfersPage = () => {
  const [transfers, setTransfers] = useState([])
  const [accounts, setAccounts] = useState([])
  const [showNewTransfer, setShowNewTransfer] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transferForm, setTransferForm] = useState({
    fromAccount: '',
    toAccount: '',
    amount: '',
    description: ''
  })

  useEffect(() => {
    loadTransfers()
    loadAccounts()
  }, [])

  const loadTransfers = () => {
    // Mock transfer history
    const mockTransfers = [
      {
        id: 'txn_001',
        fromAccount: 'Chase Checking',
        toAccount: 'Wells Fargo Savings',
        amount: 500.00,
        currency: 'USD',
        status: 'completed',
        description: 'Monthly savings transfer',
        timestamp: '2025-09-16T14:30:00Z',
        estimatedCompletion: '2025-09-16T14:32:00Z'
      },
      {
        id: 'txn_002',
        fromAccount: 'Wells Fargo Savings',
        toAccount: 'Chase Checking',
        amount: 200.00,
        currency: 'USD',
        status: 'pending',
        description: 'Emergency fund withdrawal',
        timestamp: '2025-09-17T09:15:00Z',
        estimatedCompletion: '2025-09-17T09:20:00Z'
      },
      {
        id: 'txn_003',
        fromAccount: 'Chase Checking',
        toAccount: 'Capital One Credit',
        amount: 300.00,
        currency: 'USD',
        status: 'failed',
        description: 'Credit card payment',
        timestamp: '2025-09-15T16:45:00Z',
        errorMessage: 'Insufficient funds'
      }
    ]
    setTransfers(mockTransfers)
  }

  const loadAccounts = () => {
    // Mock accounts for transfer selection
    const mockAccounts = [
      { id: 1, name: 'Chase Checking', balance: 2450.50, type: 'checking' },
      { id: 2, name: 'Wells Fargo Savings', balance: 8750.25, type: 'savings' },
      { id: 3, name: 'Capital One Credit', balance: -1250.75, type: 'credit' },
      { id: 4, name: 'Emergency Fund', balance: 5000.00, type: 'savings' }
    ]
    setAccounts(mockAccounts)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleTransferSubmit = (e) => {
    e.preventDefault()
    
    // Validate form
    if (!transferForm.fromAccount || !transferForm.toAccount || !transferForm.amount) {
      alert('Please fill in all required fields')
      return
    }

    if (transferForm.fromAccount === transferForm.toAccount) {
      alert('Source and destination accounts must be different')
      return
    }

    if (parseFloat(transferForm.amount) <= 0) {
      alert('Transfer amount must be greater than zero')
      return
    }

    // Show confirmation dialog
    setShowConfirmDialog(true)
  }

  const handleConfirmTransfer = async () => {
    setIsProcessing(true)
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create new transfer
      const newTransfer = {
        id: `txn_${Date.now()}`,
        fromAccount: transferForm.fromAccount,
        toAccount: transferForm.toAccount,
        amount: parseFloat(transferForm.amount),
        currency: 'USD',
        status: 'pending',
        description: transferForm.description || 'Transfer',
        timestamp: new Date().toISOString(),
        estimatedCompletion: new Date(Date.now() + 5 * 60 * 1000).toISOString()
      }

      setTransfers([newTransfer, ...transfers])
      setTransferForm({ fromAccount: '', toAccount: '', amount: '', description: '' })
      setShowNewTransfer(false)
      setShowConfirmDialog(false)

      // Simulate completion after 3 seconds
      setTimeout(() => {
        setTransfers(prev => prev.map(t => 
          t.id === newTransfer.id ? { ...t, status: 'completed' } : t
        ))
      }, 3000)
    } catch (error) {
      console.error('Transfer failed:', error)
      alert('Transfer failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transfers</h1>
          <p className="text-gray-600">Send money between your accounts</p>
        </div>
        <Button 
          onClick={() => setShowNewTransfer(!showNewTransfer)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          New Transfer
        </Button>
      </div>

      {/* New Transfer Form */}
      {showNewTransfer && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              New Transfer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTransferSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fromAccount">From Account</Label>
                  <Select 
                    value={transferForm.fromAccount} 
                    onValueChange={(value) => setTransferForm({...transferForm, fromAccount: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select source account" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((account) => (
                        <SelectItem key={account.id} value={account.name}>
                          {account.name} (${account.balance.toLocaleString()})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="toAccount">To Account</Label>
                  <Select 
                    value={transferForm.toAccount} 
                    onValueChange={(value) => setTransferForm({...transferForm, toAccount: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination account" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((account) => (
                        <SelectItem key={account.id} value={account.name}>
                          {account.name} (${account.balance.toLocaleString()})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="0.00"
                    value={transferForm.amount}
                    onChange={(e) => setTransferForm({...transferForm, amount: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Input
                    id="description"
                    placeholder="What's this transfer for?"
                    value={transferForm.description}
                    onChange={(e) => setTransferForm({...transferForm, description: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowNewTransfer(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Review Transfer
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Transfer History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowLeftRight className="h-5 w-5" />
            Transfer History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {transfers.length === 0 ? (
            <div className="text-center py-8">
              <ArrowLeftRight className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No transfers yet</p>
              <p className="text-sm text-gray-500">Your transfer history will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {transfers.map((transfer) => (
                <div key={transfer.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(transfer.status)}
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{transfer.fromAccount}</p>
                          <ArrowLeftRight className="h-4 w-4 text-gray-400" />
                          <p className="font-medium">{transfer.toAccount}</p>
                        </div>
                        <p className="text-sm text-gray-600">{transfer.description}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(transfer.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-semibold">
                        ${transfer.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </p>
                      <Badge className={getStatusColor(transfer.status)}>
                        {transfer.status}
                      </Badge>
                      {transfer.status === 'pending' && transfer.estimatedCompletion && (
                        <p className="text-xs text-gray-500 mt-1">
                          Est. completion: {new Date(transfer.estimatedCompletion).toLocaleTimeString()}
                        </p>
                      )}
                      {transfer.status === 'failed' && transfer.errorMessage && (
                        <p className="text-xs text-red-600 mt-1">
                          {transfer.errorMessage}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Transfer Confirmation Dialog */}
      <TransferConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmTransfer}
        transferData={transferForm}
        isProcessing={isProcessing}
      />
    </div>
  )
}

export default TransfersPage

