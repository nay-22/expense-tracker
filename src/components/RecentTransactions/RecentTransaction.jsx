import { GoHistory } from "react-icons/go";
import { useContext } from "react";

import TransactionContext from "../Contexts/TransactionContext";
import Transaction from "./Transaction/Transaction";
import categories from "../../config/config";

import styles from "./RecentTransactions.module.css";

const RecentTransactions = () => {
    const [transactions, setTransactions] = useContext(TransactionContext);

    return <>
        <div className={styles.recentTransactions}>
            <h1 className={styles.title}>Recent Transactions</h1>
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