import { AiOutlineCar } from "react-icons/ai";
import { IoAmericanFootballOutline } from "react-icons/io5";
import { MdFastfood } from "react-icons/md";
import { BiSolidTShirt } from "react-icons/bi";

import styles from "./config.module.css";

const categories = [
    {
        value: 'travel',
        'icon': <AiOutlineCar className={styles.blackColor} />
    },
    {
        value: 'food',
        'icon': <MdFastfood className={styles.blackColor} />
    },
    {
        value: 'apparel',
        'icon': <BiSolidTShirt className={styles.blackColor} />
    },
    {
        value: 'entertainment',
        'icon': <IoAmericanFootballOutline className={styles.blackColor} />
    },
]

export default categories;