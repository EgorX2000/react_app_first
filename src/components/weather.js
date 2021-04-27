import React from "react";

const Weather = props => (
    <div className="infoWeath">
    { props.city &&
        <div>
            <p>Расположение: {props.city}, {props.country}</p>
            <p>Температура: {props.temp}°C</p>
            <p>Облачность: {props.clouds}</p>
            <p>Давление: {props.pressure} мм рт. ст.</p>
            <p>Ветер: {props.windd}, {props.winds} м/с</p>
        </div>
    }   
    <p className="error">{props.error}</p>
    </div>
);

export default Weather;