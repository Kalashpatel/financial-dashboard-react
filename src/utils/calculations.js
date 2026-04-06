// Calculate total income
export const calculateTotalIncome = (transactions) => {
  return transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
};

// Calculate total expenses
export const calculateTotalExpenses = (transactions) => {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
};

// Calculate balance
export const calculateBalance = (transactions) => {
  const income = calculateTotalIncome(transactions);
  const expenses = calculateTotalExpenses(transactions);
  return income - expenses;
};

// Group transactions by category
export const groupByCategory = (transactions, type) => {
  const filtered = transactions.filter(t => t.type === type);
  
  const grouped = filtered.reduce((acc, transaction) => {
    const category = transaction.category;
    if (!acc[category]) {
      acc[category] = {
        category,
        total: 0,
        count: 0,
        transactions: []
      };
    }
    acc[category].total += transaction.amount;
    acc[category].count += 1;
    acc[category].transactions.push(transaction);
    return acc;
  }, {});
  
  return Object.values(grouped).sort((a, b) => b.total - a.total);
};

// Get monthly data for charts
export const getMonthlyData = (transactions) => {
  const monthlyData = {};
  
  transactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        month: monthKey,
        income: 0,
        expenses: 0,
        balance: 0
      };
    }
    
    if (transaction.type === 'income') {
      monthlyData[monthKey].income += transaction.amount;
    } else {
      monthlyData[monthKey].expenses += transaction.amount;
    }
  });
  
  // Calculate balance for each month
  Object.keys(monthlyData).forEach(key => {
    monthlyData[key].balance = monthlyData[key].income - monthlyData[key].expenses;
  });
  
  return Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));
};

// Get highest spending category
export const getHighestSpendingCategory = (transactions) => {
  const categories = groupByCategory(transactions, 'expense');
  return categories[0] || null;
};

// Calculate month-over-month change
export const calculateMonthlyChange = (transactions) => {
  const monthlyData = getMonthlyData(transactions);
  
  if (monthlyData.length < 2) return 0;
  
  const currentMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];
  
  const change = ((currentMonth.expenses - previousMonth.expenses) / previousMonth.expenses) * 100;
  return Math.round(change);
};