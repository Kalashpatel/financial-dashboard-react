import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useSelector } from 'react-redux';
import { selectExpensesByCategory } from '../../redux/slices/transactionsSlice';
import { Card } from '../common/Card';
import { formatCurrency, formatCompactNumber } from '../../utils/formatters';

const COLORS = [
  '#EF4444', // Red
  '#F59E0B', // Amber
  '#10B981', // Green
  '#3B82F6', // Blue
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#F97316', // Orange
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
          {data.name}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {formatCurrency(data.value)}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
          {data.count} transactions
        </p>
      </div>
    );
  }
  return null;
};

export const SpendingBreakdown = () => {
  const expensesByCategory = useSelector(selectExpensesByCategory);

  // Take top 6 categories, group rest as "Others"
  const topCategories = expensesByCategory.slice(0, 6);
  const others = expensesByCategory.slice(6);

  const chartData = [
    ...topCategories.map(item => ({
      name: item.category,
      value: item.total,
      count: item.count
    })),
    ...(others.length > 0 ? [{
      name: 'Others',
      value: others.reduce((sum, item) => sum + item.total, 0),
      count: others.reduce((sum, item) => sum + item.count, 0)
    }] : [])
  ];

  // Custom label
  const renderLabel = (entry) => {
    const percent = ((entry.value / chartData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(0);
    return `${percent}%`;
  };

  return (
    <Card title="Spending Breakdown">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderLabel}
              outerRadius={100}
              innerRadius={60}
              fill="#8884d8"
              dataKey="value"
              paddingAngle={2}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              wrapperStyle={{ fontSize: '12px' }}
              formatter={(value, entry) => (
                <span className="text-gray-900 dark:text-gray-300">
                  {value} ({formatCompactNumber(entry.payload.value)})
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Category List */}
      <div className="mt-6 space-y-3">
        {topCategories.slice(0, 5).map((category, index) => {
          const total = chartData.reduce((sum, item) => sum + item.value, 0);
          const percentage = ((category.total / total) * 100).toFixed(1);
          
          return (
            <div key={category.category} className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0" 
                style={{ backgroundColor: COLORS[index] }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {category.category}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                    {percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: COLORS[index]
                    }}
                  />
                </div>
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                {formatCurrency(category.total)}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};