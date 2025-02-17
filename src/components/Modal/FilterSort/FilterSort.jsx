import { useEffect, useState } from "react";
import styles from "./FilterSort.module.css";

import categories from "../../../config/config";

const FilterSort = ({ handleClose, setProcessed, transactions, meta, setMeta, performProcessing }) => {

    const [tempMeta, setTempMeta] = useState(meta);

    useEffect(() => {
        console.log(transactions);
        console.log(tempMeta);
    }, []);

    const handleSort = (e) => {
        setTempMeta(prev => (
            {
                ...prev, 
                sort: {
                    type: e.target.id,
                    order: 'low' 
                }
            }
        ));
        console.log(tempMeta);
    };

    const handleSortOrder = (e) => {
        setTempMeta(prev => ({
            ...prev,
            sort: {
                type: prev.sort.type,
                order: e.target.value
            }
        }));
        console.log(tempMeta);
    };

    const handleFilter = (e) => {
        const {id} = e.target;
        setTempMeta(prev => {
            let filters = prev.filter;
            if (filters.includes(id)) {
                filters = filters.filter(item => item != id);
            } else {
                filters.push(id);
            }
            prev = {
                ...prev,
                filter: filters
            }
            return prev;
        })
        console.log(meta);
    }

    const handleConfirm = () => {
        setMeta(tempMeta);
        console.log(tempMeta);
        performProcessing(tempMeta);
        handleClose();
    }

    return (
        <div className={styles.modal}>
            <div className={styles.section}>
                <h1>Sort</h1>
                <hr />
                <form className={styles.sortOptions} onSubmit={(e) => e.preventDefault()}>
                    <div className={styles.option}>
                        <div>
                            <input
                                onChange={handleSort}
                                checked={tempMeta.sort.type === 'date'}
                                type="radio"
                                name="sort-type"
                                id="date"
                            />
                            Date
                        </div>
                        <div className={styles.sortTypes}>
                            <button
                                disabled={tempMeta.sort.type !== 'date'}
                                type="button"
                                onClick={handleSortOrder}
                                className={`${styles.sortBtn} ${tempMeta.sort.type === 'date' && tempMeta.sort.order === 'low' && styles.sortBtnSelected}`}
                                value={'low'}
                            >
                                Low
                            </button>
                            <button
                            disabled={tempMeta.sort.type !== 'date'}
                                type="button"
                                onClick={handleSortOrder}
                                className={`${styles.sortBtn} ${tempMeta.sort.type === 'date' && tempMeta.sort.order === 'high' && styles.sortBtnSelected}`}
                                value={'high'}
                            >
                                High 
                            </button>
                        </div>
                    </div>
                    <div className={styles.option}>
                        <div>
                            <input
                                onChange={handleSort}
                                checked={tempMeta.sort.type === 'price'}
                                type="radio"
                                name="sort-type"
                                id="price"
                            />
                            Price
                        </div>
                        <div className={styles.sortTypes}>
                            <button
                                disabled={tempMeta.sort.type !== 'price'}
                                type="button"
                                onClick={handleSortOrder}
                                className={`${styles.sortBtn} ${tempMeta.sort.type === 'price' && tempMeta.sort.order === 'low' && styles.sortBtnSelected}`}
                                value={'low'}    
                            >
                                Low 
                            </button>
                            <button
                                disabled={tempMeta.sort.type !== 'price'}
                                type="button"
                                onClick={handleSortOrder}
                                className={`${styles.sortBtn} ${tempMeta.sort.type === 'price' && tempMeta.sort.order === 'high' && styles.sortBtnSelected}`}
                                value={'high'}    
                            >
                                High 
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className={styles.section}>
                <br />
                <h1>Filter</h1>
                <hr />
                <form className={styles.filterContainer} onSubmit={(e) => e.preventDefault()}>
                    <h3>Category</h3>
                    <div className={styles.filterOptions}>
                        {
                            categories.map(item => 
                                <div>
                                    <input 
                                        checked={tempMeta.filter.includes(item.value)} 
                                        type="checkbox" 
                                        name="category" 
                                        id={item.value} 
                                        onChange={handleFilter} 
                                    /> {item.value.charAt(0).toUpperCase() + item.value.slice(1)}
                                </div>
                            )
                        }
                    </div>
                </form>
            </div>
            <div className={styles.affirmation}>
                <div className={styles.control}>
                    <button className={styles.cancel} onClick={handleClose}>Cancel</button>
                </div>
                <div className={styles.control}>
                    <button className={styles.confirm} onClick={handleConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default FilterSort;
