import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import generateKRandomColors from "../util";

import styles from "./CustomPie.module.css";
import useWindowSize from "../../hooks/useWindowSize";

const CustomPie = ({categoricalDetails}) => {

    const windowSize = useWindowSize();

    const RADIAN = Math.PI / 180;
    const COLORS_INNER = generateKRandomColors(categoricalDetails.length);
    const COLORS_OUTER = generateKRandomColors(categoricalDetails.length);

    const renderCustomizedInnerLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.2;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="black"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
                style={{ fontWeight: windowSize.width < 492 ? 'none' : 'none' }}
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const renderCustomizedOuterLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        name,
        index,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 1.15;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
                style={{ fontWeight: windowSize.width < 492 ? 'none' : 'bold' }}
            >
                {`${name.charAt(0).toUpperCase() + name.slice(1)}`}
            </text>
        );
    };

    return <>
        <ResponsiveContainer width="100%" height="100%">
            <PieChart width='100%' height='100%'>
                <Pie
                    data={categoricalDetails}
                    dataKey="value"
                    cx='50%'
                    cy='50%'
                    innerRadius={windowSize.width < 492 ? 75 : 90}
                    outerRadius={windowSize.width < 492 ? 120 : 150}
                    fill="#82ca9d"
                    label={renderCustomizedOuterLabel}
                    labelLine={false}
                >
                    {categoricalDetails.map((entry, idx) => (
                        <Cell key={idx} fill={COLORS_OUTER[idx % COLORS_OUTER.length]} />
                    ))}
                </Pie>
                <Pie
                    data={categoricalDetails}
                    dataKey="value"
                    cx='50%'
                    cy='50%'
                    innerRadius={windowSize.width < 492 ? 15 : 30}
                    outerRadius={windowSize.width < 492 ? 60 : 80}
                    fill="#82ca9d"
                    label={renderCustomizedInnerLabel}
                    labelLine={false}
                >
                    {categoricalDetails.map((entry, idx) => (
                        <Cell key={idx} fill={COLORS_INNER[idx % COLORS_INNER.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    </>
};

export default CustomPie;