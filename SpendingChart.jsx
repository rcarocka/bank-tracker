import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const SpendingChart = ({ data, height = 300 }) => {
  // Mock data for spending categories
  const mockData = data || [
    { name: 'Groceries', value: 450, color: '#0088FE' },
    { name: 'Utilities', value: 280, color: '#00C49F' },
    { name: 'Transportation', value: 180, color: '#FFBB28' },
    { name: 'Entertainment', value: 120, color: '#FF8042' },
    { name: 'Dining Out', value: 200, color: '#8884D8' },
    { name: 'Shopping', value: 150, color: '#82CA9D' },
    { name: 'Other', value: 100, color: '#FFC658' }
  ]

  const formatCurrency = (value) => {
    return `$${value.toLocaleString()}`
  }

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.05) return null // Don't show labels for slices less than 5%
    
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={mockData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {mockData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value) => [formatCurrency(value), 'Amount']}
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <Legend 
          verticalAlign="bottom" 
          height={36}
          formatter={(value, entry) => `${value}: ${formatCurrency(entry.payload.value)}`}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default SpendingChart

