import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const IncomeExpenseChart = ({ data, height = 300 }) => {
  // Mock data for income vs expenses over time
  const mockData = data || [
    { month: 'Jan', income: 3200, expenses: 2100 },
    { month: 'Feb', income: 3200, expenses: 2350 },
    { month: 'Mar', income: 3400, expenses: 2200 },
    { month: 'Apr', income: 3200, expenses: 2450 },
    { month: 'May', income: 3200, expenses: 2180 },
    { month: 'Jun', income: 3500, expenses: 2300 },
    { month: 'Jul', income: 3200, expenses: 2150 },
    { month: 'Aug', income: 3200, expenses: 2400 },
    { month: 'Sep', income: 3200, expenses: 2100 }
  ]

  const formatCurrency = (value) => {
    return `$${value.toLocaleString()}`
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={mockData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="month" 
          stroke="#666"
          fontSize={12}
        />
        <YAxis 
          tickFormatter={formatCurrency}
          stroke="#666"
          fontSize={12}
        />
        <Tooltip 
          formatter={(value, name) => [formatCurrency(value), name === 'income' ? 'Income' : 'Expenses']}
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <Legend />
        <Bar 
          dataKey="income" 
          fill="#10b981" 
          name="Income"
          radius={[2, 2, 0, 0]}
        />
        <Bar 
          dataKey="expenses" 
          fill="#ef4444" 
          name="Expenses"
          radius={[2, 2, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default IncomeExpenseChart

