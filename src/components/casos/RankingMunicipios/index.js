import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../services/api";
import Styles from "./Styles";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const RankingMunicipios = props => {
    const [resultados, setResultados] = useState({
        name: [],
        casos: []
    });

    useEffect(() => {
        axios.post("http://localhost").then(response => {
            const buffer = response.data;

            buffer.sort((b, a) => {
                return a.confirmed - b.confirmed;
            });
            let info = { name: [], casos: [] };

            buffer.forEach((data, i) => {
                info.name = [...info.name, data.name_city];
                info.casos = [...info.casos, data.confirmed];
            });
            setResultados({ name: info.name, casos: info.casos });
        });
    }, [resultados.day, resultados.state]);

    const options = {
        title: {
            text: "Ranking dos Municipios"
        },
        chart: {
            zoomType: "x"
        },
        xAxis: {
            categories: resultados.name
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        yAxis: {
            min: 0,
            scrollbar: {
                enabled: true
            },
            title: {
                text: ""
            }
        },
        series: [
            {
                type: "bar",
                name: "Casos Confirmados",
                data: resultados.casos,
                color: "#f59b1a"
            }
        ]
    };

    return (
        <div style={{ ...Styles.default }}>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default RankingMunicipios;
