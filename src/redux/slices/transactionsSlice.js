import { createSlice, createSelector } from '@reduxjs/toolkit';
import { MOCK_TRANSACTIONS } from '../../data/mockData';
import {
  calculateTotalIncome,
  calculateTotalExpenses,
  calculateBalance,
  groupByCategory,
  getMonthlyData,
  getHighestSpendingCategory,
  calculateMonthlyChange,
} from '../../utils/calculations';

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    items: MOCK_TRANSACTIONS, // Start with mock data
    loading: false,
    error: null,
    filters: {
      type: 'all', // 'all', 'income', 'expense'
      category: 'all',
      searchQuery: '',
      dateRange: 'all', // 'all', 'week', 'month', '3months'
    },
  },
  reducers: {
    setTransactions: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addTransaction: (state, action) => {
      state.items.unshift(action.payload);
    },
    updateTransaction: (state, action) => {
      const index = state.items.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteTransaction: (state, action) => {
      state.items = state.items.filter(t => t.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {
        type: 'all',
        category: 'all',
        searchQuery: '',
        dateRange: 'all',
      };
    },
  },
});

// Selectors
const selectTransactionItems = (state) => state.transactions.items;
const selectFilters = (state) => state.transactions.filters;

// Filtered transactions selector
export const selectFilteredTransactions = createSelector(
  [selectTransactionItems, selectFilters],
  (items, filters) => {
    let filtered = [...items];
    
    // Filter by type
    if (filters.type !== 'all') {
      filtered = filtered.filter(t => t.type === filters.type);
    }
    
    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter(t => t.category === filters.category);
    }
    
    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(t =>
        t.description.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query)
      );
    }
    
    // Filter by date range
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const cutoffDate = new Date();
      
      if (filters.dateRange === 'week') {
        cutoffDate.setDate(now.getDate() - 7);
      } else if (filters.dateRange === 'month') {
        cutoffDate.setMonth(now.getMonth() - 1);
      } else if (filters.dateRange === '3months') {
        cutoffDate.setMonth(now.getMonth() - 3);
      }
      
      filtered = filtered.filter(t => new Date(t.date) >= cutoffDate);
    }
    
    return filtered;
  }
);

// Summary selectors
export const selectTotalIncome = createSelector(
  [selectFilteredTransactions],
  (transactions) => calculateTotalIncome(transactions)
);

export const selectTotalExpenses = createSelector(
  [selectFilteredTransactions],
  (transactions) => calculateTotalExpenses(transactions)
);

export const selectBalance = createSelector(
  [selectTotalIncome, selectTotalExpenses],
  (income, expenses) => income - expenses
);

export const selectExpensesByCategory = createSelector(
  [selectFilteredTransactions],
  (transactions) => groupByCategory(transactions, 'expense')
);

export const selectIncomeByCategory = createSelector(
  [selectFilteredTransactions],
  (transactions) => groupByCategory(transactions, 'income')
);

export const selectMonthlyData = createSelector(
  [selectFilteredTransactions],
  (transactions) => getMonthlyData(transactions)
);

export const selectHighestSpendingCategory = createSelector(
  [selectFilteredTransactions],
  (transactions) => getHighestSpendingCategory(transactions)
);

export const selectMonthlyChange = createSelector(
  [selectFilteredTransactions],
  (transactions) => calculateMonthlyChange(transactions)
);

export const {
  setTransactions,
  setLoading,
  setError,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  setFilter,
  resetFilters,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;