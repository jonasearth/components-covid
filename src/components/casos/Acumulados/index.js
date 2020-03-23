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
    const date = new Date();
    const final = date
        .toLocaleDateString()
        .split("/")
        .reverse()
        .join("-");
    const [dayf, setDayf] = useState({
        dayf: final
    });
    date.setDate(date.getDate() - 7);
    const init = date
        .toLocaleDateString()
        .split("/")
        .reverse()
        .join("-");

    const [days, setDays] = useState({
        days: init
    });

    const [resultados, setResultados] = useState([
        {
            state: "",
            day: "",
            num_confirmed: "",
            num_recovered: "",
            num_deaths: ""
        }
    ]);

    function setDaysF(event) {
        const date = event.target.value;

        setDays({ days: date });
    }
    function setDayfF(event) {
        const date = event.target.value;

        setDayf({ dayf: date });
    }

    useEffect(() => {
        api.post("/in-range", {
            dates: {
                first: days.days,
                last: dayf.dayf
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
    }, [dayf, days, resultados.day, resultados.state]);

    return (
        <div style={{ ...Styles.default }}>
            <div style={{ ...Styles.formatting }}>
                <input
                    style={{ ...Styles.date }}
                    type="date"
                    defaultValue={days.days}
                    onInput={e => setDaysF(e)}
                ></input>
                <input
                    style={{ ...Styles.date }}
                    type="date"
                    defaultValue={dayf.dayf}
                    onInput={e => setDayfF(e)}
                ></input>
            </div>
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
        </div>
    );
};
export default Acumulados;
