import { useSelector } from 'react-redux';
import { selectFilteredTransactions } from '../../redux/slices/transactionsSlice';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { formatCurrency, formatTime, getRelativeDate } from '../../utils/formatters';
import { CATEGORY_ICONS } from '../../utils/constants';
import { Edit2, Trash2 } from 'lucide-react';

export const TransactionList = ({ onEdit, onDelete }) => {
  const transactions = useSelector(selectFilteredTransactions);
  const role = useSelector(state => state.auth.role);

  // Group transactions by date
  const groupedTransactions = transactions.reduce((groups, transaction) => {
    const date = getRelativeDate(transaction.date);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {});

  if (transactions.length === 0) {
    return (
      <Card>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📊</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No transactions found
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Try adjusting your filters or add a new transaction
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedTransactions).map(([date, txns]) => (
        <Card key={date}>
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              {date}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {txns.length} transaction{txns.length > 1 ? 's' : ''}
            </p>
          </div>

          <div className="space-y-3">
            {txns.map((txn) => (
              <div
                key={txn.id}
                className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 px-3 -mx-3 rounded-lg transition-colors group"
              >
                {/* Left: Icon + Details */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                    {CATEGORY_ICONS[txn.category] || '💰'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {txn.description}
                      </p>
                      <Badge variant={txn.type === 'income' ? 'income' : 'expense'}>
                        {txn.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {txn.category}
                      </span>
                      <span className="text-gray-300 dark:text-gray-600">•</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {formatTime(txn.date)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Amount + Actions */}
                <div className="flex items-center gap-4">
                  <p className={`font-semibold text-lg whitespace-nowrap ${
                    txn.type === 'income' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {txn.type === 'income' ? '+' : '-'}
                    {formatCurrency(txn.amount)}
                  </p>

                  {/* Admin Actions */}
                  {role === 'admin' && (
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onEdit(txn)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(txn.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};