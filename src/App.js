import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";

const APIkey = "4108158e1a1ac40620f94bfd83f37504";

class App extends React.Component{

    state = {
        temp: undefined,
        city: undefined,
        country: undefined,
        clouds: undefined,
        pressure: undefined,
        winds: undefined,
        error: undefined
    }

    GetWeather = async (e) => {
        e.preventDefault();
        var city = e.target.elements.city.value;

        if (city){
            const apiURL = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric&lang=ru`);
            const data = await apiURL.json();
            console.log(data);
            
            if (city === data.name) {
                if (data.clouds.all<=25) {
                    var clouds1 = "Ясно";
                }

                if (data.clouds.all>25 && data.clouds.all<=50) {
                    clouds1 = "Переменная облачность";
                }

                if (data.clouds.all>50 && data.clouds.all<=75) {
                    clouds1 = "Облачно";
                }

                if (data.clouds.all>75) {
                    clouds1 = "Пасмурно";
                }

                if (data.wind.deg>337.5 && data.wind.deg<=22.5) {
                    var wind = "С";
                }

                if (data.wind.deg>22.5 && data.wind.deg<=67.5) {
                    wind = "СВ";
                }

                if (data.wind.deg>67.5 && data.wind.deg<=112.5) {
                    wind = "В";
                }

                if (data.wind.deg>112.5 && data.wind.deg<=157.5) {
                    wind = "ЮВ";
                }

                if (data.wind.deg>157.5 && data.wind.deg<=202.5) {
                    wind = "Ю";
                }

                if (data.wind.deg>202.5 && data.wind.deg<=247.5) {
                    wind = "ЮЗ";
                }

                if (data.wind.deg>247.5 && data.wind.deg<=292.5) {
                    wind = "З";
                }

                if (data.wind.deg>292.5 && data.wind.deg<=337.5) {
                    wind = "СЗ";
                }

                this.setState({
                    temp: data.main.temp,
                    city: data.name,
                    country: data.sys.country,
                    clouds: clouds1,
                    pressure: data.main.pressure,
                    winds: data.wind.speed,
                    windd: wind,
                    error: undefined
                });
            }
            else {
                this.setState({
                    temp: undefined,
                    city: undefined,
                    country: undefined,
                    clouds: undefined,
                    pressure: undefined,
                    winds: undefined,
                    error: "Такого города не существует"
                });
            }
        }
        else {
            this.setState({
                temp: undefined,
                city: undefined,
                country: undefined,
                clouds: undefined,
                pressure: undefined,
                winds: undefined,
                error: "Введите город"
            });
        }
    }

    render() {
        return(
            <div className="wrapper">
                <div className="main">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-5 info">
                                <Info />
                            </div>
                            <div className="col-sm-7 form">
                                <Form GettingWeather={this.GetWeather} />
                                <Weather 
                                    temp = {this.state.temp}
                                    city = {this.state.city}
                                    country = {this.state.country}
                                    clouds = {this.state.clouds}
                                    pressure = {Math.trunc(this.state.pressure*0.750062)}
                                    winds = {this.state.winds}
                                    windd = {this.state.windd}
                                    error = {this.state.error}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;