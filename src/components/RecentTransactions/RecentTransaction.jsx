import { GoHistory } from "react-icons/go";
import { useContext, useState } from "react";

import TransactionContext from "../Contexts/TransactionContext";
import Transaction from "./Transaction/Transaction";
import categories from "../../config/config";
import { BsCalendarDateFill } from "react-icons/bs";

import { FaCheckCircle } from "react-icons/fa";
import { ImRadioUnchecked } from "react-icons/im";
import { FaAngleDown } from "react-icons/fa6";

import styles from "./RecentTransactions.module.css";
import CategoricalExpenseContext from "../Contexts/CategoricalExpenseContext";
import ReactModal from "react-modal";
import FilterSort from "../Modal/FilterSort/FilterSort";

const RecentTransactions = () => {
    const [categoricalDetailsObject, expenseMapObject] = useContext(CategoricalExpenseContext);
    
    const [transactions, setTransactions] = useContext(TransactionContext);
    const [processed, setProcessed] = useState(transactions);
    const [sortModal, setSortModal] = useState(false);

    const handleSort = () => {
        setSortByDate(prev => !prev);
    }

    const handleClose = () => {
        setSortModal(prev => false);
    }

    return <>
        <div className={styles.recentTransactions}>
            <div className={styles.transactionsControl}>
                <h1 className={styles.title}>Recent Transactions</h1>
                <div className={styles.sortOptions}>
                    <button onClick={() => setSortModal(true)} className={styles.sortBtn}>
                        Filter/Sort <FaAngleDown />
                    </button>
                    <ReactModal
                        isOpen={sortModal}
                        className={styles.modal}
                    >
                        <FilterSort handleClose={handleClose} setProcessed={setProcessed} transactions={transactions} />
                    </ReactModal>
                </div>
            </div>
            <div className={styles.outer}>
                <section className={styles.history}>
                    {(!transactions || transactions.length == 0) && <>
                        <div className={styles.empty}>
                            <h2 ><GoHistory /> No expenses accounted yet...</h2>
                        </div>
                    </> }
                    {transactions.map(item => 
                        <>
                            <Transaction 
                                key={item.id}
                                id={item.id}
                                icon={categories.filter(c => c.value == item.category)[0].icon} 
                                category={item.category}
                                title={item.title}
                                price={item.price}
                                date={item.date}
                                />
                            <hr className={styles.hr} />
                        </>
                    )}
                </section>
            </div>
        </div>
    </>
}

export default RecentTransactions;