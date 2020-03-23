import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import Styles from "./Styles";
import {
    ComposedChart,
    Bar,
    LabelList,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

const RankingMunicipios = props => {
    const [resultados, setResultados] = useState([
        {
            name_city: "",
            confirmed: 0
        }
    ]);

    useEffect(() => {
        api.post("/total-cases-city").then(response => {
            let buffer = [];
            response.data.forEach((data, i) => {
                buffer = [
                    ...buffer,
                    {
                        name_city: data.name_city,
                        confirmed: data.confirmed
                    }
                ];
            });
            // Ordering by latitude
            buffer.sort((b, a) => {
                return a.confirmed - b.confirmed;
            });
            setResultados(buffer);
        });
    }, [resultados.day, resultados.state]);

    return (
        <div style={{ ...Styles.default }}>
            <ComposedChart
                layout="vertical"
                width={500}
                height={400}
                data={resultados}
                margin={{
                    top: 10,
                    right: 10,
                    bottom: 10,
                    left: 10
                }}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis type="number" />
                <YAxis dataKey="name_city" type="category" />
                <Tooltip />
                <Legend />

                <Bar
                    name="Casos Confirmados"
                    dataKey="confirmed"
                    barSize={20}
                    fill="#f59b1a"
                >
                    <LabelList dataKey="confirmed" position="right" />
                </Bar>
            </ComposedChart>
        </div>
    );
};

export default RankingMunicipios;
