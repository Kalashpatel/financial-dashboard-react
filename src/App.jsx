import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from './components/layout/Layout';
import { Card } from './components/common/Card';
import { Button } from './components/common/Button';
import { BalanceTrend } from './components/dashboard/BalanceTrend';
import { SpendingBreakdown } from './components/dashboard/SpendingBreakdown';
import { IncomeBreakdown } from './components/dashboard/IncomeBreakdown';
import { InsightsPanel } from './components/insights/InsightsPanel';
import { TransactionFilters } from './components/transactions/TransactionFilters';
import { TransactionList } from './components/transactions/TransactionList';
import { TransactionForm } from './components/transactions/TransactionForm';
import {
  selectBalance,
  selectTotalIncome,
  selectTotalExpenses,
  selectFilteredTransactions,
  deleteTransaction,
} from './redux/slices/transactionsSlice';
import { formatCurrency, formatDate, formatTime } from './utils/formatters';
import { CATEGORY_ICONS } from './utils/constants';
import { TrendingUp, Plus } from 'lucide-react';

// Dashboard Page
const DashboardPage = ({ balance, income, expenses, transactions, onViewAll }) => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Balance</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {formatCurrency(balance)}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Available balance</p>
        </div>
      </Card>

      <Card>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Income</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {formatCurrency(income)}
          </p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3 text-green-600" />
            <p className="text-xs text-green-600 dark:text-green-400">+12.5% from last month</p>
          </div>
        </div>
      </Card>

      <Card>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Expenses</p>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400">
            {formatCurrency(expenses)}
          </p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3 text-red-600" />
            <p className="text-xs text-red-600 dark:text-red-400">+8.2% from last month</p>
          </div>
        </div>
      </Card>
    </div>

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
      <BalanceTrend />
      <SpendingBreakdown />
    </div>

    <div className="mb-6">
      <IncomeBreakdown />
    </div>

    <Card
      title="Recent Transactions"
      action={
        <button
          onClick={onViewAll}
          className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors"
        >
          View all
        </button>
      }
    >
      <div className="space-y-4">
        {transactions.slice(0, 5).map((txn) => (
          <div
            key={txn.id}
            className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 px-3 -mx-3 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-2xl">
                {CATEGORY_ICONS[txn.category] || '💰'}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{txn.description}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{txn.category}</span>
                  <span className="text-gray-300 dark:text-gray-600">•</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {formatDate(txn.date)} at {formatTime(txn.date)}
                  </span>
                </div>
              </div>
            </div>
            <p className={`font-semibold text-lg ${
              txn.type === 'income'
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}>
              {txn.type === 'income' ? '+' : '-'}{formatCurrency(txn.amount)}
            </p>
          </div>
        ))}
      </div>
    </Card>
  </>
);

// Transactions Page
const TransactionsPage = ({ transactions, role, onAdd, onEdit, onDelete }) => (
  <>
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Transactions</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {transactions.length} total transactions
        </p>
      </div>
      {role === 'admin' && (
        <Button onClick={onAdd}>
          <Plus className="w-4 h-4" />
          Add Transaction
        </Button>
      )}
    </div>
    <TransactionFilters />
    <TransactionList onEdit={onEdit} onDelete={onDelete} />
  </>
);

// Insights Page
const InsightsPage = () => (
  <>
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Financial Insights</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Key metrics and analysis of your financial health
      </p>
    </div>
    <InsightsPanel />
  </>
);

// Settings Page
const SettingsPage = () => (
  <Card>
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-3xl">⚙️</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Settings</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">Settings page coming soon...</p>
    </div>
  </Card>
);

function App() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const balance = useSelector(selectBalance);
  const income = useSelector(selectTotalIncome);
  const expenses = useSelector(selectTotalExpenses);
  const transactions = useSelector(selectFilteredTransactions);
  const role = useSelector(state => state.auth.role);

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowTransactionForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      dispatch(deleteTransaction(id));
    }
  };

  const handleCloseForm = () => {
    setShowTransactionForm(false);
    setEditingTransaction(null);
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {currentPage === 'dashboard' && (
        <DashboardPage
          balance={balance}
          income={income}
          expenses={expenses}
          transactions={transactions}
          onViewAll={() => setCurrentPage('transactions')}
        />
      )}
      {currentPage === 'transactions' && (
        <TransactionsPage
          transactions={transactions}
          role={role}
          onAdd={() => setShowTransactionForm(true)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      {currentPage === 'insights' && <InsightsPage />}
      {currentPage === 'settings' && <SettingsPage />}

      {showTransactionForm && (
        <TransactionForm
          transaction={editingTransaction}
          onClose={handleCloseForm}
        />
      )}
    </Layout>
  );
}

export default App;
