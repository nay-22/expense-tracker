import { SnackbarProvider } from 'notistack'
import { useEffect, useState } from 'react'


import RecentTransactions from './components/RecentTransactions/RecentTransaction'
import TransactionContext from './components/Contexts/TransactionContext'
import CategoricalExpenseContext from './components/Contexts/CategoricalExpenseContext'
import ExpenseSummary from './components/ExpenseSummary/ExpenseSummary'
import ExpenseTrends from './components/ExpenseTrends/ExpenseTrends'
import Header from './components/Header/Header'

import styles from './App.module.css'
import categories from './config/config'

function App() {

  const [expenseMap, setExpenseMap] = useState();
  if (!localStorage.getItem('balance')) localStorage.setItem('balance', 5000);
  if (!localStorage.getItem('expense')) localStorage.setItem('expense', 0);
  const [transactions, setTransactions] = useState(localStorage.getItem('transactions') != undefined ? JSON.parse(localStorage.getItem('transactions')) : []);
  const [categoricalDetails, setCategoricalDetails] = useState(localStorage.getItem('categorical') != undefined ? JSON.parse(localStorage.getItem('categorical')) : []);
  // const [categoricalDetails, setCategoricalDetails] = useState();

  useEffect(() => {
    const createExpenseMap = () => {
      let map = new Map();
      for (let item of categories) map.set(item.value, 0);
      transactions.map(item => {
        const key = item.category
        if (map.has(key)) map.set(key, map.get(key) + item.price); 
        else map.set(key, item.price);
      });
      console.log(map);
      setExpenseMap(map);
    }
    
    createExpenseMap();
  }, []);


  return (
    <SnackbarProvider>
      <TransactionContext.Provider value={[transactions, setTransactions]}>
        <Header />
        <CategoricalExpenseContext.Provider value={[
          {
            categoricalDetails: categoricalDetails,
            setCategoricalDetails: setCategoricalDetails
          },
          {
            expenseMap: expenseMap,
            setExpenseMap: setExpenseMap
          }
        ]}>
          <ExpenseSummary />
          <div className={styles.transactionsWrapper}>
            <RecentTransactions />
            <ExpenseTrends />
          </div>
        </CategoricalExpenseContext.Provider>
      </TransactionContext.Provider>
    </SnackbarProvider>
  )
}

export default App
