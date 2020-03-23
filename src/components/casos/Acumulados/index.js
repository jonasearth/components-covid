import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import Styles from './Styles'
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
            num_suspect: "",
            num_rejected: ""
        }
    ]);
    const [days, setDays] = useState({
        days: ""
    });
    const [dayf, setDayf] = useState({
        dayf: ""
    });

    function setDaysF(event) {
        const date = event.target.value;
        const formated = date
            .split("-")
            .reverse()
            .join("/");
        setDays({ days: formated });
    }
    function setDayfF(event) {
        const date = event.target.value;
        const formated = date
            .split("-")
            .reverse()
            .join("/");
        setDayf({ dayf: formated });
    }
    useEffect(() => {
        api.post("/total-cases-day").then(response => {
            let buffer = [];
            response.data.forEach((data, i) => {
                buffer = [
                    ...buffer,
                    {
                        state: data.state,
                        day: data.day,
                        num_confirmed: data.num_confirmed,
                        num_suspect: data.num_suspect,
                        num_rejected: data.num_rejected
                    }
                ];
            });
            // Ordering by latitude
            buffer.sort((a, b) => {
                return a.day - b.day;
            });
            setResultados(buffer);
        });
    }, [resultados.day, resultados.state]);
    console.log(days);
    console.log(dayf);
    return (
        <div style = {{...Styles.default}}>
            <input style={ {...Styles.date}} type="date" onInput={e => setDaysF(e)}></input>
            <input style={ {...Styles.date}} type="date" onInput={e => setDayfF(e)}></input>
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
                    name="Numero Confirmado"
                    type="monotone"
                    dataKey="num_confirmed"
                    stroke="#0000ff"
                />
                <Line 
                type="monotone" dataKey="num_suspect" stroke="#00ff00" />
                <Line type="monotone" dataKey="num_rejected" stroke="#ff0000" />
            </LineChart>
        </div>
    );
};

export default Acumulados;
