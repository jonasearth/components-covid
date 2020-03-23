import React, { useState } from "react";
import RankingMunicipios from "./RankingMunicipios/index";

import Acumulados from "./Acumulados/index";
import Styles from "./Styles";

const Casos = props => {
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

    function setDaysF(event) {
        const date = event.target.value;

        setDays({ days: date });
    }
    function setDayfF(event) {
        const date = event.target.value;

        setDayf({ dayf: date });
    }

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
            <RankingMunicipios></RankingMunicipios>
            <Acumulados init={days.days} fim={dayf.dayf}></Acumulados>
        </div>
    );
};
export default Casos;
