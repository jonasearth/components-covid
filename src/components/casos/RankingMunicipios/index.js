import React, { useEffect, useState } from "react";
import api from "../../../services/api";
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
        <>
            <ComposedChart
                layout="vertical"
                width={500}
                height={400}
                data={resultados}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20
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
                    fill="#413ea0"
                >
                    <LabelList dataKey="confirmed" position="right" />
                </Bar>
            </ComposedChart>
        </>
    );
};

export default RankingMunicipios;
