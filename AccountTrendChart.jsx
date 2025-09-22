import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const AccountTrendChart = ({ data, height = 300 }) => {
  // Mock data for multiple account balance trends
  const mockData = data || [
    { date: '2025-09-01', checking: 2400, savings: 8500, credit: -1200 },
    { date: '2025-09-03', checking: 2350, savings: 8550, credit: -1180 },
    { date: '2025-09-05', checking: 2500, savings: 8600, credit: -1220 },
    { date: '2025-09-07', checking: 2450, savings: 8650, credit: -1150 },
    { date: '2025-09-09', checking: 2380, savings: 8700, credit: -1300 },
    { date: '2025-09-11', checking: 2520, savings: 8750, credit: -1250 },
    { date: '2025-09-13', checking: 2480, savings: 8720, credit: -1280 },
    { date: '2025-09-15', checking: 2450, savings: 8750, credit: -1250 },
    { date: '2025-09-17', checking: 2450, savings: 8750, credit: -1250 }
  ]

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const formatCurrency = (value) => {
    return `$${Math.abs(value).toLocaleString()}`
  }

  const formatTooltipValue = (value, name) => {
    const accountNames = {
      checking: 'Checking',
      savings: 'Savings',
      credit: 'Credit Card'
    }
    const sign = value < 0 ? '-' : ''
    return [`${sign}${formatCurrency(value)}`, accountNames[name] || name]
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={mockData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="date" 
          tickFormatter={formatDate}
          stroke="#666"
          fontSize={12}
        />
        <YAxis 
          tickFormatter={(value) => {
            const sign = value < 0 ? '-' : ''
            return `${sign}$${Math.abs(value / 1000).toFixed(0)}k`
          }}
          stroke="#666"
          fontSize={12}
        />
        <Tooltip 
          formatter={formatTooltipValue}
          labelFormatter={(label) => `Date: ${formatDate(label)}`}
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="checking" 
          stroke="#2563eb" 
          strokeWidth={2}
          name="Checking"
          dot={{ fill: '#2563eb', strokeWidth: 2, r: 3 }}
        />
        <Line 
          type="monotone" 
          dataKey="savings" 
          stroke="#10b981" 
          strokeWidth={2}
          name="Savings"
          dot={{ fill: '#10b981', strokeWidth: 2, r: 3 }}
        />
        <Line 
          type="monotone" 
          dataKey="credit" 
          stroke="#ef4444" 
          strokeWidth={2}
          name="Credit Card"
          dot={{ fill: '#ef4444', strokeWidth: 2, r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default AccountTrendChart

