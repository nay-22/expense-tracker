import { Bar, BarChart, CartesianGrid, Cell, Legend, Tooltip, XAxis, YAxis } from "recharts";

import styles from "./CustomBar.module.css";
import { useContext } from "react";
import CategoricalExpenseContext from "../../Contexts/CategoricalExpenseContext";
import generateKRandomColors from "../util";


const generateToolTip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const { name, value } = payload[0].payload;
        const tooltipString = `A total of ₹${value} was spent on ${name}`;

        return (
            <div className={styles.tooltip}>
                <p className="label">{tooltipString}</p>
            </div>
        );
    }
}

const CustomBar = () => {

    
    const [categoricalDetailsObject] = useContext(CategoricalExpenseContext);
    const { categoricalDetails } = categoricalDetailsObject;
    const COLORS = generateKRandomColors(categoricalDetails.length, true);

    return (
        <BarChart
            width={600}
            height={300}
            data={categoricalDetails}
            layout="vertical"
            margin={{
                top: 5,
                right: 30,
                left: 45,
                bottom: 5,
              }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis dataKey="name" type="category" />
            <XAxis type="number" />
            <Tooltip content={generateToolTip} shared={false} trigger="hover" />
            <Bar dataKey="value" fill="#82ca9d" >
              {categoricalDetails.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
        </BarChart>
    );
};

export default CustomBar;