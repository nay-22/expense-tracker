import { useState } from "react";
import styles from "./FilterSort.module.css";

import { FaCheckCircle } from "react-icons/fa";
import { ImRadioUnchecked } from "react-icons/im";
import { FaAngleDown } from "react-icons/fa6";

import { FaSortAmountUp } from "react-icons/fa";
import { FaSortAmountDownAlt } from "react-icons/fa";

const FilterSort = ({ handleClose, setProcessed, transactions }) => {

    return <>
        <div className={styles.modal}>
            <div className={styles.section}>
                <h1>Sort</h1>
                <hr />
                <form className={styles.sortOptions}>
                    <div className={styles.option}>
                        <div>
                            <input type="radio" name="sort-type" id="date" /> Date
                        </div>
                        <div className={styles.sortTypes}>
                            <button onClick={() => setSortModal(true)} className={styles.sortBtn}>
                                Low <FaSortAmountDownAlt />
                            </button>
                            <button onClick={() => setSortModal(true)} className={styles.sortBtn}>
                                High <FaSortAmountUp />
                            </button>
                        </div>
                    </div>
                    <div className={styles.option}>
                        <div>
                            <input type="radio" name="sort-type" id="price" /> Price
                        </div>
                        <div className={styles.sortTypes}>
                            <button onClick={() => setSortModal(true)} className={styles.sortBtn}>
                                Low <FaSortAmountDownAlt />
                            </button>
                            <button onClick={() => setSortModal(true)} className={styles.sortBtn}>
                                High <FaSortAmountUp />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className={styles.section}>
                <br />
                <h1>Filter</h1>
                <hr />
                <form className={styles.filterOptions}>
                    <div>
                        <input type="checkbox" name="category" id="category" /> Category
                    </div>
                </form>
            </div>
            <div className={styles.form}>
                <div className={styles.control}>
                    <button className={styles.cancel} onClick={handleClose}>Cancel</button>
                </div>
                <div className={styles.control}>
                    <button className={styles.cancel} onClick={handleClose}>Filter</button>
                </div>
            </div>
        </div>
    </>
}

export default FilterSort;