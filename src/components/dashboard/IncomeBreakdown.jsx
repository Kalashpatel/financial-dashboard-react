import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';
import { selectIncomeByCategory } from '../../redux/slices/transactionsSlice';
import { Card } from '../common/Card';
import { formatCurrency, formatCompactNumber } from '../../utils/formatters';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
          {payload[0].payload.fullCategory}
        </p>
        <p className="text-sm text-green-600 dark:text-green-400 font-semibold">
          {formatCurrency(payload[0].value)}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
          {payload[0].payload.count} transactions
        </p>
      </div>
    );
  }
  return null;
};

export const IncomeBreakdown = () => {
  const incomeByCategory = useSelector(selectIncomeByCategory);

  const chartData = incomeByCategory.map(item => ({
    category: item.category.length > 10 ? item.category.substring(0, 10) + '...' : item.category,
    fullCategory: item.category,
    amount: item.total,
    count: item.count
  }));

  return (
    <Card title="Income Breakdown">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis 
              dataKey="category" 
              stroke="#9CA3AF"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#9CA3AF"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => formatCompactNumber(value)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="amount" 
              fill="#10B981" 
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
