import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const BalanceChart = ({ data, height = 300 }) => {
  // Mock data for balance history
  const mockData = data || [
    { date: '2025-09-01', balance: 9200 },
    { date: '2025-09-03', balance: 9450 },
    { date: '2025-09-05', balance: 9380 },
    { date: '2025-09-07', balance: 9650 },
    { date: '2025-09-09', balance: 9580 },
    { date: '2025-09-11', balance: 9750 },
    { date: '2025-09-13', balance: 9680 },
    { date: '2025-09-15', balance: 9950 },
    { date: '2025-09-17', balance: 9950 }
  ]

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const formatCurrency = (value) => {
    return `$${value.toLocaleString()}`
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
          tickFormatter={formatCurrency}
          stroke="#666"
          fontSize={12}
        />
        <Tooltip 
          formatter={(value) => [formatCurrency(value), 'Balance']}
          labelFormatter={(label) => `Date: ${formatDate(label)}`}
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="balance" 
          stroke="#2563eb" 
          strokeWidth={2}
          dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: '#2563eb', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default BalanceChart

