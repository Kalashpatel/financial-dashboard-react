import { useSelector } from 'react-redux';
import {
  selectHighestSpendingCategory,
  selectMonthlyChange,
  selectFilteredTransactions,
  selectTotalIncome,
  selectTotalExpenses,
} from '../../redux/slices/transactionsSlice';
import { Card } from '../common/Card';
import { formatCurrency } from '../../utils/formatters';
import { TrendingUp, TrendingDown, AlertCircle, Target, Calendar, PiggyBank } from 'lucide-react';

export const InsightsPanel = () => {
  const highestCategory = useSelector(selectHighestSpendingCategory);
  const monthlyChange = useSelector(selectMonthlyChange);
  const transactions = useSelector(selectFilteredTransactions);
  const totalIncome = useSelector(selectTotalIncome);
  const totalExpenses = useSelector(selectTotalExpenses);

  // Calculate additional insights
  const averageDailySpending = totalExpenses / 30;
  const savingsRate = ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1);
  const transactionCount = transactions.length;
  const averageTransactionAmount = totalExpenses / transactions.filter(t => t.type === 'expense').length;

  const insights = [
    {
      icon: TrendingUp,
      title: 'Highest Spending Category',
      value: highestCategory ? highestCategory.category : 'N/A',
      subtitle: highestCategory ? formatCurrency(highestCategory.total) : '',
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900/20',
    },
    {
      icon: monthlyChange >= 0 ? TrendingUp : TrendingDown,
      title: 'Monthly Spending Change',
      value: `${monthlyChange >= 0 ? '+' : ''}${monthlyChange}%`,
      subtitle: monthlyChange >= 0 ? 'Increased from last month' : 'Decreased from last month',
      color: monthlyChange >= 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400',
      bgColor: monthlyChange >= 0 ? 'bg-red-100 dark:bg-red-900/20' : 'bg-green-100 dark:bg-green-900/20',
    },
    {
      icon: Calendar,
      title: 'Average Daily Spending',
      value: formatCurrency(averageDailySpending),
      subtitle: 'Based on last 30 days',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      icon: PiggyBank,
      title: 'Savings Rate',
      value: `${savingsRate}%`,
      subtitle: `You're saving ${formatCurrency(totalIncome - totalExpenses)}`,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
    },
    {
      icon: Target,
      title: 'Total Transactions',
      value: transactionCount,
      subtitle: `Avg: ${formatCurrency(averageTransactionAmount)} per expense`,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    },
    {
      icon: AlertCircle,
      title: 'Financial Health Score',
      value: savingsRate > 20 ? 'Excellent' : savingsRate > 10 ? 'Good' : 'Needs Attention',
      subtitle: 'Based on your savings rate',
      color: savingsRate > 20 ? 'text-green-600 dark:text-green-400' : savingsRate > 10 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400',
      bgColor: savingsRate > 20 ? 'bg-green-100 dark:bg-green-900/20' : savingsRate > 10 ? 'bg-yellow-100 dark:bg-yellow-900/20' : 'bg-red-100 dark:bg-red-900/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {insights.map((insight, index) => {
        const Icon = insight.icon;
        return (
          <Card key={index}>
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${insight.bgColor}`}>
                <Icon className={`w-6 h-6 ${insight.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {insight.title}
                </p>
                <p className={`text-2xl font-bold ${insight.color} mb-1`}>
                  {insight.value}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  {insight.subtitle}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};