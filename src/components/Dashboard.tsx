import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PlusCircle, 
  Brain,
  CreditCard,
  Target,
  AlertTriangle
} from 'lucide-react';
import { ExpenseChart } from './ExpenseChart';
import { AddExpenseModal } from './AddExpenseModal';
import { AIInsights } from './AIInsights';

interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: 'income' | 'expense';
}

export const Dashboard = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      amount: 3500,
      category: 'Salário',
      description: 'Salário mensal',
      date: '2024-01-01',
      type: 'income'
    },
    {
      id: '2',
      amount: 850,
      category: 'Alimentação',
      description: 'Supermercado e restaurantes',
      date: '2024-01-02',
      type: 'expense'
    },
    {
      id: '3',
      amount: 1200,
      category: 'Moradia',
      description: 'Aluguel',
      date: '2024-01-03',
      type: 'expense'
    }
  ]);

  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);

  const totalIncome = expenses
    .filter(e => e.type === 'income')
    .reduce((sum, e) => sum + e.amount, 0);

  const totalExpenses = expenses
    .filter(e => e.type === 'expense')
    .reduce((sum, e) => sum + e.amount, 0);

  const balance = totalIncome - totalExpenses;
  const expensePercentage = totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0;

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString()
    };
    setExpenses([...expenses, newExpense]);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Mordomo Financeiro
              </h1>
              <p className="text-muted-foreground mt-1">
                Seu assistente inteligente para gestão financeira
              </p>
            </div>
            <Button 
              onClick={() => setIsAddExpenseModalOpen(true)}
              className="bg-gradient-primary hover:opacity-90 shadow-elegant transition-smooth"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Nova Transação
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-card shadow-soft border-0 hover:shadow-elegant transition-smooth">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Saldo Total</p>
                <p className={`text-2xl font-bold ${balance >= 0 ? 'text-success' : 'text-destructive'}`}>
                  R$ {balance.toLocaleString('pt-BR')}
                </p>
              </div>
              <div className={`p-3 rounded-full ${balance >= 0 ? 'bg-success/10' : 'bg-destructive/10'}`}>
                <DollarSign className={`w-6 h-6 ${balance >= 0 ? 'text-success' : 'text-destructive'}`} />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card shadow-soft border-0 hover:shadow-elegant transition-smooth">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Receitas</p>
                <p className="text-2xl font-bold text-success">
                  R$ {totalIncome.toLocaleString('pt-BR')}
                </p>
              </div>
              <div className="p-3 rounded-full bg-success/10">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card shadow-soft border-0 hover:shadow-elegant transition-smooth">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Despesas</p>
                <p className="text-2xl font-bold text-destructive">
                  R$ {totalExpenses.toLocaleString('pt-BR')}
                </p>
              </div>
              <div className="p-3 rounded-full bg-destructive/10">
                <TrendingDown className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card shadow-soft border-0 hover:shadow-elegant transition-smooth">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">% Gasto</p>
                <p className="text-2xl font-bold text-foreground">
                  {expensePercentage.toFixed(1)}%
                </p>
              </div>
              <div className="p-3 rounded-full bg-warning/10">
                <Target className="w-6 h-6 text-warning" />
              </div>
            </div>
          </Card>
        </div>

        {/* Spending Progress */}
        <Card className="p-6 mb-8 bg-gradient-card shadow-soft border-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Meta de Gastos do Mês</h3>
            <Badge variant={expensePercentage > 80 ? "destructive" : expensePercentage > 60 ? "secondary" : "default"}>
              {expensePercentage.toFixed(1)}% usado
            </Badge>
          </div>
          <Progress value={expensePercentage} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">
            R$ {totalExpenses.toLocaleString('pt-BR')} de R$ {totalIncome.toLocaleString('pt-BR')}
          </p>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Expense Chart */}
          <Card className="p-6 bg-gradient-card shadow-soft border-0">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-primary" />
              Gastos por Categoria
            </h3>
            <ExpenseChart expenses={expenses.filter(e => e.type === 'expense')} />
          </Card>

          {/* AI Insights */}
          <Card className="p-6 bg-gradient-card shadow-soft border-0">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Brain className="w-5 h-5 mr-2 text-primary" />
              Insights da IA
            </h3>
            <AIInsights 
              expenses={expenses} 
              totalIncome={totalIncome} 
              totalExpenses={totalExpenses} 
            />
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="p-6 bg-gradient-card shadow-soft border-0">
          <h3 className="text-lg font-semibold mb-4">Transações Recentes</h3>
          <div className="space-y-4">
            {expenses.slice(-5).reverse().map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    expense.type === 'income' ? 'bg-success/10' : 'bg-destructive/10'
                  }`}>
                    {expense.type === 'income' ? 
                      <TrendingUp className="w-4 h-4 text-success" /> : 
                      <TrendingDown className="w-4 h-4 text-destructive" />
                    }
                  </div>
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-sm text-muted-foreground">{expense.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    expense.type === 'income' ? 'text-success' : 'text-destructive'
                  }`}>
                    {expense.type === 'income' ? '+' : '-'}R$ {expense.amount.toLocaleString('pt-BR')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(expense.date).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <AddExpenseModal 
        isOpen={isAddExpenseModalOpen}
        onClose={() => setIsAddExpenseModalOpen(false)}
        onAddExpense={addExpense}
      />
    </div>
  );
};