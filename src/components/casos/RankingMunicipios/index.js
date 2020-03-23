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
            geometry: {
                coordinates: []
            },

            name_city: "",
            num_cases: 0
        }
    ]);

    useEffect(() => {
        api.post("/cases-city").then(response => {
            let buffer = [];
            response.data.features.forEach((data, i) => {
                console.log(data);
                buffer = [
                    ...buffer,
                    {
                        geometry: {
                            coordinates: data.coordinates
                        },

                        name_city: data.properties.name_city,
                        num_cases: data.properties.num_cases
                    }
                ];
            });
            // Ordering by latitude
            buffer.sort((b, a) => {
                return a.num_cases - b.num_cases;
            });
            setResultados(buffer);
        });
    }, [resultados.day, resultados.state]);
    console.log(resultados);
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
                    dataKey="num_cases"
                    barSize={20}
                    fill="#413ea0"
                >
                    <LabelList dataKey="num_cases" position="right" />
                </Bar>
            </ComposedChart>
        </>
    );
};

export default RankingMunicipios;
