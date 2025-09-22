import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeftRight, 
  Clock, 
  Shield,
  AlertTriangle
} from 'lucide-react'

const TransferConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  transferData,
  isProcessing = false 
}) => {
  if (!transferData) return null

  const formatCurrency = (amount) => {
    return `$${parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
  }

  const estimatedTime = "2-5 minutes"
  const fee = 0 // No fee for internal transfers

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowLeftRight className="h-5 w-5" />
            Confirm Transfer
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Transfer Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">From</p>
                <p className="font-semibold">{transferData.fromAccount}</p>
              </div>
              <ArrowLeftRight className="h-5 w-5 text-gray-400" />
              <div className="text-right">
                <p className="text-sm text-gray-600">To</p>
                <p className="font-semibold">{transferData.toAccount}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Amount</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(transferData.amount)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Fee</p>
                <p className="text-2xl font-bold text-green-600">
                  {fee === 0 ? 'Free' : formatCurrency(fee)}
                </p>
              </div>
            </div>

            {transferData.description && (
              <div>
                <p className="text-sm text-gray-600">Description</p>
                <p className="font-medium">{transferData.description}</p>
              </div>
            )}
          </div>

          {/* Transfer Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Estimated completion: {estimatedTime}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="h-4 w-4" />
              <span>Secured by bank-level encryption</span>
            </div>
          </div>

          {/* Warning for large amounts */}
          {parseFloat(transferData.amount) > 1000 && (
            <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Large Transfer Notice</p>
                <p className="text-sm text-yellow-700">
                  This transfer is over $1,000. Please verify all details are correct.
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button 
            onClick={onConfirm}
            disabled={isProcessing}
            className="min-w-24"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </div>
            ) : (
              'Confirm Transfer'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default TransferConfirmDialog

