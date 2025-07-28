import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Lightbulb, 
  TrendingUp, 
  AlertTriangle, 
  Target,
  PiggyBank,
  Calendar
} from 'lucide-react';

interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: 'income' | 'expense';
}

interface AIInsightsProps {
  expenses: Expense[];
  totalIncome: number;
  totalExpenses: number;
}

interface Insight {
  type: 'tip' | 'warning' | 'goal' | 'trend';
  title: string;
  description: string;
  icon: React.ReactNode;
  priority: 'high' | 'medium' | 'low';
}

export const AIInsights = ({ expenses, totalIncome, totalExpenses }: AIInsightsProps) => {
  const balance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;
  
  // Analisar gastos por categoria
  const categoryTotals = expenses
    .filter(e => e.type === 'expense')
    .reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

  const topCategory = Object.entries(categoryTotals)
    .sort(([,a], [,b]) => b - a)[0];

  const insights: Insight[] = [];

  // Insights baseados nos dados
  if (savingsRate < 20) {
    insights.push({
      type: 'warning',
      title: 'Taxa de Poupança Baixa',
      description: `Você está poupando apenas ${savingsRate.toFixed(1)}% da renda. Recomenda-se pelo menos 20%.`,
      icon: <AlertTriangle className="w-4 h-4" />,
      priority: 'high'
    });
  } else {
    insights.push({
      type: 'tip',
      title: 'Excelente Controle!',
      description: `Parabéns! Você está poupando ${savingsRate.toFixed(1)}% da sua renda.`,
      icon: <PiggyBank className="w-4 h-4" />,
      priority: 'medium'
    });
  }

  if (topCategory && topCategory[1] > totalIncome * 0.3) {
    insights.push({
      type: 'warning',
      title: 'Categoria em Destaque',
      description: `Seus gastos com ${topCategory[0]} representam ${((topCategory[1]/totalIncome)*100).toFixed(1)}% da renda.`,
      icon: <TrendingUp className="w-4 h-4" />,
      priority: 'medium'
    });
  }

  insights.push({
    type: 'goal',
    title: 'Meta do Mês',
    description: `Para uma reserva de emergência, tente economizar R$ ${(totalIncome * 0.2).toLocaleString('pt-BR')} este mês.`,
    icon: <Target className="w-4 h-4" />,
    priority: 'low'
  });

  insights.push({
    type: 'tip',
    title: 'Dica Inteligente',
    description: 'Considere automatizar suas poupanças transferindo 20% da renda no início do mês.',
    icon: <Lightbulb className="w-4 h-4" />,
    priority: 'low'
  });

  const getInsightColor = (type: Insight['type']) => {
    switch (type) {
      case 'warning': return 'destructive';
      case 'tip': return 'default';
      case 'goal': return 'secondary';
      case 'trend': return 'outline';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: Insight['priority']) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-3">
      {insights.map((insight, index) => (
        <div
          key={index}
          className="p-4 rounded-lg bg-muted/50 border border-border/50 hover:bg-muted/70 transition-smooth"
        >
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-full bg-primary/10 ${getPriorityColor(insight.priority)}`}>
              {insight.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-sm">{insight.title}</h4>
                <Badge variant={getInsightColor(insight.type)} className="text-xs">
                  {insight.type === 'warning' ? 'Atenção' : 
                   insight.type === 'tip' ? 'Dica' :
                   insight.type === 'goal' ? 'Meta' : 'Tendência'}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {insight.description}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* AI Status */}
      <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
        <div className="flex items-center gap-2 text-sm text-primary">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span className="font-medium">IA Mordomo analisando seus padrões financeiros...</span>
        </div>
      </div>
    </div>
  );
};