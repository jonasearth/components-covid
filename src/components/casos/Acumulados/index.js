import React, { useEffect, useState } from "react";
import api from "../../../services/api";

import Styles from "./Styles";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

const Acumulados = props => {
    const [resultados, setResultados] = useState([
        {
            state: "",
            day: "",
            num_confirmed: "",
            num_recovered: "",
            num_deaths: ""
        }
    ]);

    useEffect(() => {
        api.post("/in-range", {
            dates: {
                first: props.init,
                last: props.fim
            }
        }).then(response => {
            let buffer = [];
            response.data.forEach((data, i) => {
                let date = new Date(data.date);
                date.setDate(date.getDate() + 1);
                buffer = [
                    ...buffer,
                    {
                        state: data.state,
                        day: date.toLocaleDateString(),
                        num_confirmed: data.num_confirmed,
                        num_recovered: data.num_recovered,
                        num_deaths: data.num_deaths,
                        order: date
                            .toLocaleDateString()
                            .split("/")
                            .reverse()
                            .join("")
                    }
                ];
            });
            // Ordering by latitude
            buffer.sort((a, b) => {
                return a.order - b.order;
            });

            setResultados(buffer);
        });
    }, [props.fim, props.init, resultados.day, resultados.state]);

    return (
        <>
            <LineChart
                width={500}
                height={300}
                data={resultados}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    name="Confirmados"
                    type="monotone"
                    dataKey="num_confirmed"
                    stroke="#f59b1a"
                />
                <Line
                    name="Recuperados"
                    type="monotone"
                    dataKey="num_recovered"
                    stroke="#0f9b0f"
                />
                <Line
                    name="Mortes"
                    type="monotone"
                    dataKey="num_deaths"
                    stroke="#c31432"
                />
            </LineChart>
        </>
    );
};
export default Acumulados;
