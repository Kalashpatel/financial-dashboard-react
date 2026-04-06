import { CATEGORIES } from '../utils/constants';

// Generate random date within last 6 months
const getRandomDate = () => {
  const end = new Date();
  const start = new Date();
  start.setMonth(start.getMonth() - 6);
  
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
};

// Get random item from array
const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

// Mock merchant names
const MERCHANTS = {
  'Food & Dining': ['Swiggy', 'Zomato', 'McDonald\'s', 'Domino\'s', 'Burger King', 'Subway', 'KFC'],
  'Transportation': ['Uber', 'Ola', 'Rapido', 'Shell', 'HP Petrol', 'Indian Oil'],
  'Shopping': ['Amazon', 'Flipkart', 'Myntra', 'Reliance Digital', 'Croma'],
  'Entertainment': ['Netflix', 'Amazon Prime', 'Disney+ Hotstar', 'Spotify', 'YouTube Premium'],
  'Utilities': ['Electricity Bill', 'Water Bill', 'Gas Bill', 'Internet Bill'],
  'Subscriptions': ['Netflix', 'Spotify', 'Amazon Prime', 'Apple One', 'YouTube Premium'],
  'Healthcare': ['Apollo Pharmacy', 'MedPlus', '1mg', 'Fortis Hospital'],
  'Rent': ['Monthly Rent', 'House Rent'],
};

// Generate single transaction
const generateTransaction = (id) => {
  const type = Math.random() > 0.35 ? 'expense' : 'income';
  const category = getRandomItem(CATEGORIES[type]);
  
  let amount, description;
  
  if (type === 'income') {
    if (category === 'Salary') {
      amount = Math.floor(Math.random() * 20000) + 30000; // ₹30k-50k
      description = 'Monthly Salary';
    } else if (category === 'Freelance') {
      amount = Math.floor(Math.random() * 15000) + 5000; // ₹5k-20k
      description = 'Freelance Project Payment';
    } else {
      amount = Math.floor(Math.random() * 10000) + 1000;
      description = category;
    }
  } else {
    // Expense amounts based on category
    if (category === 'Rent') {
      amount = Math.floor(Math.random() * 5000) + 10000; // ₹10k-15k
    } else if (category === 'Food & Dining') {
      amount = Math.floor(Math.random() * 500) + 100; // ₹100-600
    } else if (category === 'Transportation') {
      amount = Math.floor(Math.random() * 300) + 50; // ₹50-350
    } else if (category === 'Subscriptions') {
      amount = Math.floor(Math.random() * 500) + 200; // ₹200-700
    } else {
      amount = Math.floor(Math.random() * 2000) + 200; // ₹200-2200
    }
    
    const merchants = MERCHANTS[category];
    description = merchants ? getRandomItem(merchants) : category;
  }
  
  return {
    id: `txn_${id}`,
    date: getRandomDate(),
    amount,
    category,
    type,
    description,
    createdAt: new Date().toISOString(),
  };
};

// Generate multiple transactions
export const generateMockTransactions = (count = 100) => {
  const transactions = [];
  for (let i = 1; i <= count; i++) {
    transactions.push(generateTransaction(i));
  }
  
  
  return transactions.sort((a, b) => b.date.localeCompare(a.date));
};


export const MOCK_TRANSACTIONS = generateMockTransactions(100);
