import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { 
  Settings, 
  Key, 
  Bell, 
  Shield, 
  Palette,
  Download,
  Trash2,
  AlertTriangle
} from 'lucide-react'

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    notifications: {
      emailAlerts: true,
      pushNotifications: false,
      weeklyReports: true,
      transactionAlerts: true
    },
    privacy: {
      dataSharing: false,
      analytics: true,
      marketingEmails: false
    },
    display: {
      darkMode: false,
      currency: 'USD',
      dateFormat: 'MM/DD/YYYY'
    }
  })

  const [apiKeys, setApiKeys] = useState({
    yodlee: '••••••••••••••••',
    trustly: '••••••••••••••••'
  })

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }))
  }

  const handleExportData = () => {
    // Mock data export
    const data = {
      accounts: [],
      transactions: [],
      transfers: [],
      exportDate: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `bank-tracker-data-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Account deletion would be processed here')
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and security</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* API Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              API Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="yodlee-key">Yodlee API Key</Label>
              <div className="flex gap-2">
                <Input
                  id="yodlee-key"
                  type="password"
                  value={apiKeys.yodlee}
                  onChange={(e) => setApiKeys({...apiKeys, yodlee: e.target.value})}
                />
                <Button variant="outline" size="sm">Update</Button>
              </div>
              <p className="text-xs text-gray-500">
                Required for connecting bank accounts via Yodlee
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="trustly-key">Trustly API Key</Label>
              <div className="flex gap-2">
                <Input
                  id="trustly-key"
                  type="password"
                  value={apiKeys.trustly}
                  onChange={(e) => setApiKeys({...apiKeys, trustly: e.target.value})}
                />
                <Button variant="outline" size="sm">Update</Button>
              </div>
              <p className="text-xs text-gray-500">
                Required for money transfers via Trustly
              </p>
            </div>

            <div className="pt-4 border-t">
              <Button variant="outline" className="w-full">
                Test API Connections
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-alerts">Email Alerts</Label>
                <p className="text-sm text-gray-500">Receive important account updates</p>
              </div>
              <Switch
                id="email-alerts"
                checked={settings.notifications.emailAlerts}
                onCheckedChange={(checked) => handleSettingChange('notifications', 'emailAlerts', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-gray-500">Real-time browser notifications</p>
              </div>
              <Switch
                id="push-notifications"
                checked={settings.notifications.pushNotifications}
                onCheckedChange={(checked) => handleSettingChange('notifications', 'pushNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="weekly-reports">Weekly Reports</Label>
                <p className="text-sm text-gray-500">Summary of your financial activity</p>
              </div>
              <Switch
                id="weekly-reports"
                checked={settings.notifications.weeklyReports}
                onCheckedChange={(checked) => handleSettingChange('notifications', 'weeklyReports', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="transaction-alerts">Transaction Alerts</Label>
                <p className="text-sm text-gray-500">Notify on large transactions</p>
              </div>
              <Switch
                id="transaction-alerts"
                checked={settings.notifications.transactionAlerts}
                onCheckedChange={(checked) => handleSettingChange('notifications', 'transactionAlerts', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="data-sharing">Data Sharing</Label>
                <p className="text-sm text-gray-500">Share anonymized data for improvements</p>
              </div>
              <Switch
                id="data-sharing"
                checked={settings.privacy.dataSharing}
                onCheckedChange={(checked) => handleSettingChange('privacy', 'dataSharing', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="analytics">Analytics</Label>
                <p className="text-sm text-gray-500">Help us improve the app</p>
              </div>
              <Switch
                id="analytics"
                checked={settings.privacy.analytics}
                onCheckedChange={(checked) => handleSettingChange('privacy', 'analytics', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="marketing-emails">Marketing Emails</Label>
                <p className="text-sm text-gray-500">Receive product updates and tips</p>
              </div>
              <Switch
                id="marketing-emails"
                checked={settings.privacy.marketingEmails}
                onCheckedChange={(checked) => handleSettingChange('privacy', 'marketingEmails', checked)}
              />
            </div>

            <div className="pt-4 border-t">
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Display Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Display Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-sm text-gray-500">Use dark theme</p>
              </div>
              <Switch
                id="dark-mode"
                checked={settings.display.darkMode}
                onCheckedChange={(checked) => handleSettingChange('display', 'darkMode', checked)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Default Currency</Label>
              <select 
                id="currency"
                className="w-full p-2 border rounded-md"
                value={settings.display.currency}
                onChange={(e) => handleSettingChange('display', 'currency', e.target.value)}
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="CAD">CAD - Canadian Dollar</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date-format">Date Format</Label>
              <select 
                id="date-format"
                className="w-full p-2 border rounded-md"
                value={settings.display.dateFormat}
                onChange={(e) => handleSettingChange('display', 'dateFormat', e.target.value)}
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              onClick={handleExportData}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export Data
            </Button>
            
            <Button 
              variant="destructive" 
              onClick={handleDeleteAccount}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete Account
            </Button>
          </div>
          
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Data Security Notice</p>
                <p className="text-sm text-yellow-700 mt-1">
                  Your financial data is encrypted and stored securely. We never store your banking credentials directly.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SettingsPage

