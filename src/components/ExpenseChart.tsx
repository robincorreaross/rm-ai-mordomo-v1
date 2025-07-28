import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: 'income' | 'expense';
}

interface ExpenseChartProps {
  expenses: Expense[];
}

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--accent))',
  'hsl(var(--warning))',
  'hsl(var(--destructive))',
  'hsl(var(--success))',
  'hsl(var(--muted-foreground))'
];

export const ExpenseChart = ({ expenses }: ExpenseChartProps) => {
  const categoryData = expenses.reduce((acc, expense) => {
    const existing = acc.find(item => item.name === expense.category);
    if (existing) {
      existing.value += expense.amount;
    } else {
      acc.push({
        name: expense.category,
        value: expense.amount
      });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 rounded-lg shadow-elegant border">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-primary">
            R$ {payload[0].value.toLocaleString('pt-BR')}
          </p>
        </div>
      );
    }
    return null;
  };

  if (categoryData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-muted-foreground">
        Nenhuma despesa encontrada
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
          >
            {categoryData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};