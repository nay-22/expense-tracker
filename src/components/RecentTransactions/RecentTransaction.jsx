import { GoHistory } from "react-icons/go";
import { useContext, useEffect, useState } from "react";

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

import { FaSortAmountUp } from "react-icons/fa";
import { FaSortAmountDownAlt } from "react-icons/fa";

const RecentTransactions = () => {
    
    const [transactions, setTransactions] = useContext(TransactionContext);
    const [processed, setProcessed] = useState(transactions);
    const [meta, setMeta] = useState({
        sort: {
            type: '',
            order: ''
        }, 
        filter: []
    })
    const [sortModal, setSortModal] = useState(false);

    useEffect(() => {
        performProcessing(meta);
    }, [transactions]);

    const performProcessing = (meta) => {
        setProcessed(() => {
            let processed = [...transactions];
            // SORT
            if (meta.sort.type === 'date') {
                if (meta.sort.order === 'low') {
                    processed.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
                } else {
                    processed.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                }
            } else if (meta.sort.type === 'price') {
                if (meta.sort.order === 'low') {
                    processed.sort((a,b) => a.price - b.price);
                } else {
                    processed.sort((a, b) => b.price - a.price);
                }
            }

            const filters = meta.filter;
            console.log(filters);
            //FILTER
            if (filters.length > 0) {
                processed = processed.filter(item => filters.includes(item.category));
            }
            console.log(processed);
            return processed;
        });
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
                        <FilterSort
                            handleClose={handleClose} 
                            setProcessed={setProcessed} 
                            transactions={transactions} 
                            meta={meta}
                            setMeta={setMeta}
                            performProcessing={performProcessing}
                        />
                    </ReactModal>
                </div>
            </div>
            <div className={styles.processedInfo}>
                <p>Sorted By: <span>{meta.sort.type && `${meta.sort.type.charAt(0).toUpperCase()}${meta.sort.type.slice(1)}`} {meta.sort.type && (meta.sort.order === 'low' ? <FaSortAmountDownAlt /> : <FaSortAmountUp />)}{!meta.sort.type && 'None'}</span></p>
                <p>Filter Items: <span>{meta.filter.length}</span></p>
            </div>
            <div className={styles.outer}>
                <section className={styles.history}>
                    {(!processed || processed.length == 0) && <>
                        <div className={styles.empty}>
                            <h2 ><GoHistory /> No expenses accounted yet...</h2>
                        </div>
                    </> }
                    {processed.map(item => 
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