import React from "react";

const Form = props => (
    <form onSubmit={props.GettingWeather}>
        <input type="text" name="city" placeholder="Город"/>
        <button>Найти</button>
    </form>
);

export default Form;