import { useDispatch, useSelector } from 'react-redux';
import { setFilter, resetFilters } from '../../redux/slices/transactionsSlice';
import { CATEGORIES } from '../../utils/constants';
import { Search, X, Filter } from 'lucide-react';
import { Button } from '../common/Button';

export const TransactionFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.transactions.filters);

  const allCategories = [...CATEGORIES.income, ...CATEGORIES.expense];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6">
      <div className="flex items-center gap-4 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={filters.searchQuery}
            onChange={(e) => dispatch(setFilter({ searchQuery: e.target.value }))}
            className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
          />
        </div>

        {/* Type Filter */}
        <select
          value={filters.type}
          onChange={(e) => dispatch(setFilter({ type: e.target.value }))}
          className="px-4 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
        >
          <option value="all">All Types</option>
          <option value="income">Income Only</option>
          <option value="expense">Expense Only</option>
        </select>

        {/* Category Filter */}
        <select
          value={filters.category}
          onChange={(e) => dispatch(setFilter({ category: e.target.value }))}
          className="px-4 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
        >
          <option value="all">All Categories</option>
          {allCategories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Date Range Filter */}
        <select
          value={filters.dateRange}
          onChange={(e) => dispatch(setFilter({ dateRange: e.target.value }))}
          className="px-4 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
        >
          <option value="all">All Time</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="3months">Last 3 Months</option>
        </select>

        {/* Reset Button */}
        <Button 
          variant="outline" 
          size="md"
          onClick={() => dispatch(resetFilters())}
        >
          <X className="w-4 h-4" />
          Reset
        </Button>
      </div>

      {/* Active Filters Indicator */}
      {(filters.type !== 'all' || filters.category !== 'all' || filters.dateRange !== 'all' || filters.searchQuery) && (
        <div className="flex items-center gap-2 mt-3 text-sm text-gray-600 dark:text-gray-400">
          <Filter className="w-4 h-4" />
          <span>Filters active</span>
        </div>
      )}
    </div>
  );
};